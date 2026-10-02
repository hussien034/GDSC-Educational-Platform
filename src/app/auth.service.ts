import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface StoredUser {
  first_name: string;
  last_name: string;
  email: string;
  salt: string;
  passwordHash: string;
}

export interface AuthResult {
  message: string;
  token?: string;
}

const USERS_STORAGE_KEY = 'gdsc-platform-users';
const SESSION_STORAGE_KEY = 'gdsc-platform-session';
const PASSWORD_HASH_ITERATIONS = 100000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signup(registerData: RegistrationData): Observable<AuthResult> {
    return from(this.createAccount(registerData));
  }

  signin(loginData: LoginData): Observable<AuthResult> {
    return from(this.login(loginData));
  }

  isAuthenticated(): boolean {
    return Boolean(this.readStorage(SESSION_STORAGE_KEY));
  }

  logout(): void {
    this.removeStorage(SESSION_STORAGE_KEY);
  }

  private async createAccount(data: RegistrationData): Promise<AuthResult> {
    const users = this.readUsers();
    const email = data.email.trim().toLowerCase();

    if (users.some(user => user.email === email)) {
      return { message: 'An account with this email already exists.' };
    }

    const salt = this.createRandomHex(16);
    const passwordHash = await this.hashPassword(data.password, salt);

    users.push({
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email,
      salt,
      passwordHash
    });
    this.writeUsers(users);

    return { message: 'success' };
  }

  private async login(data: LoginData): Promise<AuthResult> {
    const email = data.email.trim().toLowerCase();
    const user = this.readUsers().find(account => account.email === email);

    if (!user) {
      return { message: 'No account was found for this email.' };
    }

    const passwordHash = await this.hashPassword(data.password, user.salt);
    if (!this.hashesMatch(passwordHash, user.passwordHash)) {
      return { message: 'The password is incorrect.' };
    }

    const token = this.createRandomHex(32);
    this.writeStorage(SESSION_STORAGE_KEY, token);
    return { message: 'success', token };
  }

  private readUsers(): StoredUser[] {
    const storedUsers = this.readStorage(USERS_STORAGE_KEY);
    if (storedUsers === null) {
      return [];
    }

    let parsedUsers: unknown;
    try {
      parsedUsers = JSON.parse(storedUsers);
    } catch {
      throw new Error('Saved accounts could not be read. Clear this site’s stored data and register again.');
    }

    if (!Array.isArray(parsedUsers) || !parsedUsers.every(user => this.isStoredUser(user))) {
      throw new Error('Saved accounts are invalid. Clear this site’s stored data and register again.');
    }

    return parsedUsers;
  }

  private isStoredUser(value: unknown): value is StoredUser {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const user = value as Record<string, unknown>;
    return typeof user['first_name'] === 'string'
      && typeof user['last_name'] === 'string'
      && typeof user['email'] === 'string'
      && typeof user['salt'] === 'string'
      && typeof user['passwordHash'] === 'string';
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    if (!globalThis.crypto?.subtle) {
      throw new Error('Secure password storage is unavailable in this browser. Try a current browser on localhost or HTTPS.');
    }

    const encoder = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const hash = await globalThis.crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: this.hexToBytes(salt),
        iterations: PASSWORD_HASH_ITERATIONS,
        hash: 'SHA-256'
      },
      key,
      256
    );

    return this.bytesToHex(new Uint8Array(hash));
  }

  private createRandomHex(byteLength: number): string {
    if (!globalThis.crypto?.getRandomValues) {
      throw new Error('Secure browser storage is unavailable in this browser.');
    }

    const bytes = new Uint8Array(byteLength);
    globalThis.crypto.getRandomValues(bytes);
    return this.bytesToHex(bytes);
  }

  private hexToBytes(value: string): Uint8Array {
    const bytes = new Uint8Array(value.length / 2);
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = parseInt(value.slice(index * 2, index * 2 + 2), 16);
    }
    return bytes;
  }

  private bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private hashesMatch(first: string, second: string): boolean {
    if (first.length !== second.length) {
      return false;
    }

    let difference = 0;
    for (let index = 0; index < first.length; index += 1) {
      difference |= first.charCodeAt(index) ^ second.charCodeAt(index);
    }
    return difference === 0;
  }

  private readStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      throw new Error('Browser storage is unavailable. Enable site storage and try again.');
    }
  }

  private writeStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      throw new Error('Could not save to browser storage. Check that site storage is enabled and has space.');
    }
  }

  private removeStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      throw new Error('Could not clear the local session. Check that browser storage is enabled.');
    }
  }

  private writeUsers(users: StoredUser[]): void {
    this.writeStorage(USERS_STORAGE_KEY, JSON.stringify(users));
  }
}
