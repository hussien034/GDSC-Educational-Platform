import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'gdsc-platform-theme';
  private currentTheme: Theme;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const savedTheme = this.document.defaultView?.localStorage.getItem(this.storageKey);
    this.currentTheme = savedTheme === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  toggle(): void {
    this.currentTheme = this.isDarkMode ? 'light' : 'dark';
    this.applyTheme();
    this.document.defaultView?.localStorage.setItem(this.storageKey, this.currentTheme);
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.document.documentElement.style.colorScheme = this.currentTheme;
  }
}
