import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface PodcastVideo {
  id: string;
  title: string;
  creator: string;
  topic: string;
  description: string;
  tagClass: string;
}

@Component({
  selector: 'app-boodcasts',
  templateUrl: './boodcasts.component.html',
  styleUrls: ['./boodcasts.component.css']
})
export class BoodcastsComponent implements OnInit {
  readonly podcastVideos: PodcastVideo[] = [
    {
      id: '5wpp3vFM41U',
      title: 'A celebrated Arab programmer’s journey',
      creator: 'Droos Online',
      topic: 'Career stories',
      description: 'A conversation about learning programming and building a career.',
      tagClass: 'topic-blue'
    },
    {
      id: 'kRJF-yX5kfo',
      title: 'Programming, work, and money',
      creator: 'Droos Online',
      topic: 'Career stories',
      description: 'An honest discussion about work and money in a developer’s career.',
      tagClass: 'topic-green'
    },
    {
      id: 'c02Klz36-xI',
      title: 'Working as a software engineer at Meta',
      creator: 'Ghareeb Elshaikh',
      topic: 'Career stories',
      description: 'An engineer shares a path to working at a global technology company.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'UfR2AW2eKtk',
      title: 'Software engineering lessons and advice',
      creator: 'Ghareeb Elshaikh',
      topic: 'Career stories',
      description: 'Experience and practical advice for aspiring software developers.',
      tagClass: 'topic-red'
    },
    {
      id: '7rcvqPgijYc',
      title: 'A practical path to success in programming',
      creator: 'Essam Fahmy',
      topic: 'Learning',
      description: 'A discussion about finding a clear path into software development.',
      tagClass: 'topic-blue'
    },
    {
      id: 'mN8l4Zuy8e8',
      title: 'Scaling web applications',
      creator: 'Ahmed Elemam',
      topic: 'Web development',
      description: 'A conversation about building and scaling web applications.',
      tagClass: 'topic-green'
    },
    {
      id: 'SI4TWu8Wnvg',
      title: 'Setting expectations in tech',
      creator: 'Ahmed Elemam',
      topic: 'Career stories',
      description: 'A conversation about expectations and growth in technology careers.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'vkyrDN1JuEM',
      title: 'Choosing a path in technology',
      creator: 'Ahmed Elemam',
      topic: 'Career stories',
      description: 'How one developer chose a specialization and got started.',
      tagClass: 'topic-red'
    },
    {
      id: 'xcZTS1q48Ic',
      title: 'Programming book recommendations',
      creator: 'Ghareeb Elshaikh',
      topic: 'Learning',
      description: 'Book recommendations from people working in software development.',
      tagClass: 'topic-blue'
    },
    {
      id: 'k7TumDEPBNc',
      title: 'How to start learning programming',
      creator: 'Codezilla',
      topic: 'Learning',
      description: 'Advice on choosing a first language and beginning to code.',
      tagClass: 'topic-green'
    },
    {
      id: '4oRQS2-WaoQ',
      title: 'Starting out as a software engineer',
      creator: 'Faltakon',
      topic: 'Career stories',
      description: 'A software engineer at Amazon shares guidance for students.',
      tagClass: 'topic-yellow'
    },
    {
      id: '7jIti9PFW5A',
      title: 'The essential skills for junior developers',
      creator: 'Mohamed Elsherif',
      topic: 'Career stories',
      description: 'A conversation about the skills that help junior developers grow.',
      tagClass: 'topic-red'
    },
    {
      id: 'xs8pDrX4B5k',
      title: 'Studying software engineering',
      creator: 'Arabic Competitive Programming',
      topic: 'Learning',
      description: 'What software engineering studies cover and why they matter.',
      tagClass: 'topic-blue'
    },
    {
      id: 'Uxn12jK2-Ag',
      title: 'How to learn programming effectively',
      creator: 'Ghareeb Elshaikh',
      topic: 'Learning',
      description: 'Practical ways to learn programming and retain what you practice.',
      tagClass: 'topic-green'
    },
    {
      id: 'OPLAXAnDZSE',
      title: 'Learning programming for free',
      creator: 'Codezilla',
      topic: 'Learning',
      description: 'How to make the most of free programming resources online.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'W6NZfCO5SIk',
      title: 'JavaScript for beginners',
      creator: 'Programming with Mosh',
      topic: 'JavaScript',
      description: 'A beginner-friendly introduction to JavaScript and web development.',
      tagClass: 'topic-red'
    },
    {
      id: 'rfscVS0vtbw',
      title: 'Learn Python: full beginner course',
      creator: 'freeCodeCamp.org',
      topic: 'Python',
      description: 'A full introductory course covering Python fundamentals.',
      tagClass: 'topic-blue'
    },
    {
      id: 'UB1O30fR-EE',
      title: 'HTML crash course',
      creator: 'Traversy Media',
      topic: 'Web development',
      description: 'Learn the essential markup for building web pages.',
      tagClass: 'topic-green'
    },
    {
      id: 'fBNz5xF-Kx4',
      title: 'Node.js crash course',
      creator: 'Traversy Media',
      topic: 'Backend',
      description: 'Get started building server-side apps with Node.js.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'Oe421EPjeBE',
      title: 'Node.js and Express.js',
      creator: 'freeCodeCamp.org',
      topic: 'Backend',
      description: 'A full course on building backends with Node and Express.',
      tagClass: 'topic-red'
    },
    {
      id: 'zQnBQ4tB3ZA',
      title: 'TypeScript in 100 seconds',
      creator: 'Fireship',
      topic: 'TypeScript',
      description: 'A quick introduction to JavaScript’s typed superset.',
      tagClass: 'topic-blue'
    },
    {
      id: 'w7ejDZ8SWv8',
      title: 'React JS crash course',
      creator: 'Traversy Media',
      topic: 'React',
      description: 'Build a front end and learn the basics of React.',
      tagClass: 'topic-green'
    },
    {
      id: 'HXV3zeQKqGY',
      title: 'SQL for beginners',
      creator: 'freeCodeCamp.org',
      topic: 'Databases',
      description: 'Learn the essentials of querying and working with databases.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'KJgsSFOSQv0',
      title: 'C programming for beginners',
      creator: 'freeCodeCamp.org',
      topic: 'Programming',
      description: 'A beginner’s guide to the fundamentals of C programming.',
      tagClass: 'topic-red'
    },
    {
      id: 'fqMOX6JJhGo',
      title: 'Docker tutorial for beginners',
      creator: 'freeCodeCamp.org',
      topic: 'Developer tools',
      description: 'Learn how containers help package and run applications.',
      tagClass: 'topic-blue'
    },
    {
      id: 'eIrMbAQSU34',
      title: 'Java full course for beginners',
      creator: 'Programming with Mosh',
      topic: 'Programming',
      description: 'A complete introduction to Java and object-oriented basics.',
      tagClass: 'topic-green'
    },
    {
      id: 'Tn6-PIqc4UM',
      title: 'React in 100 seconds',
      creator: 'Fireship',
      topic: 'React',
      description: 'A fast introduction to the React library and its core ideas.',
      tagClass: 'topic-yellow'
    },
    {
      id: 'k5E2AVpwsko',
      title: 'Angular and TypeScript for beginners',
      creator: 'Programming with Mosh',
      topic: 'Angular',
      description: 'Get started building applications with Angular and TypeScript.',
      tagClass: 'topic-red'
    },
    {
      id: 'Bv_5Zv5c-Ts',
      title: 'Understanding JavaScript',
      creator: 'Tony Alicea',
      topic: 'JavaScript',
      description: 'Explore the concepts behind how JavaScript behaves.',
      tagClass: 'topic-blue'
    },
    {
      id: '1Rs2ND1ryYc',
      title: 'CSS from zero to hero',
      creator: 'freeCodeCamp.org',
      topic: 'Web development',
      description: 'A complete course on styling web pages with CSS.',
      tagClass: 'topic-green'
    }
  ];

  isLgoin:boolean=false;
  constructor(private _Router:Router, private authService: AuthService) {
    this.isLgoin = this.authService.isAuthenticated();
  }
  logout(){
    this.authService.logout();
    this._Router.navigateByUrl('/main')
  }

  ngOnInit(): void {
  }

}
