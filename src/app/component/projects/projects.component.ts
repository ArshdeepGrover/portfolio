import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects = [
    {
      name: 'Groupix Spinner (NPM Package)',
      image: '/assets/images/projects/spinner.png',
      description:
        'Reusable loading spinner component published on NPM as a standalone library.',
      link: 'https://www.npmjs.com/package/@groupix/groupix-spinner',
    },
    {
      name: 'Movie Search App',
      image: '/assets/images/projects/movie-search.png',
      description:
        'Search and bookmark your favourite movies. Powered by an external movie API.',
      link: 'https://searchmovie-one.vercel.app/',
    },
    {
      name: 'Tic Tac Toe Game',
      image: '/assets/images/projects/tic-tac-toe.png',
      description:
        'Classic Tic Tac Toe game built with clean UI and basic AI logic.',
      link: 'https://tic-tac-toe-nu-ten-20.vercel.app/',
    },
    {
      name: 'Quiz App',
      image: '/assets/images/projects/quiz-app.png',
      description: 'Test your knowledge with this interactive quiz app.',
      link: 'https://quiz-app-hazel-xi.vercel.app/',
    },
    {
      name: 'Calculator',
      image: '/assets/images/projects/calculator.png',
      description:
        'Simple and stylish calculator app with all basic functionalities.',
      link: 'https://calculator-rouge-chi.vercel.app/',
    },
  ];
}
