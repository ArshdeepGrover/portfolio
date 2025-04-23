import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills = [
    {
      category: 'Frontend',
      items: [
        {
          name: 'Html 5',
          rating: '94%',
          color: '#E34F26',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        {
          name: 'Css 3',
          rating: '97%',
          color: '#1472B6',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        },
        {
          name: 'Angular',
          rating: '80%',
          color: '#DD0031',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
        },
        {
          name: 'Typescript',
          rating: '80%',
          color: '#1472B6',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
        {
          name: 'Javascript',
          rating: '80%',
          color: '#323330',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'TailwindCss',
          rating: '80%',
          color: '#38B2AC',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg',
        },
        {
          name: 'BootStrap',
          rating: '80%',
          color: '#8511F9',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/bootstrap/bootstrap-original.svg',
        },
      ],
    },
    {
      category: 'Backend',
      items: [
        {
          name: 'Java',
          rating: '80%',
          color: '#ED8B00',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        },
        {
          name: 'Ruby',
          rating: '80%',
          color: '#CC332D',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/ruby/ruby-original.svg',
        },
        {
          name: 'Rails',
          rating: '80%',
          color: '#CC0100',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/rails/rails-original-wordmark.svg',
        },
        {
          name: 'JSON',
          rating: '80%',
          color: '#CB3837',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/json/json-original.svg',
        },
      ],
    },
    {
      category: 'Version Control',
      items: [
        {
          name: 'Git',
          rating: '80%',
          color: '#F05033',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/git/git-original.svg',
        },
        {
          name: 'GitHub',
          rating: '80%',
          color: '#131011',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/github/github-original.svg',
        },
        {
          name: 'GitLab',
          rating: '80%',
          color: '#181717',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/gitlab/gitlab-original.svg',
        },
      ],
    },
    {
      category: 'Tools',
      items: [
        {
          name: 'Firebase',
          rating: '80%',
          color: '#039BE5',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/firebase/firebase-original.svg',
        },
        {
          name: 'VScode',
          rating: '80%',
          color: '#0078d7',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/vscode/vscode-original.svg',
        },
        {
          name: 'Postman',
          rating: '80%',
          color: '#FF6C37',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/postman/postman-original.svg',
        },
        {
          name: 'Markdown',
          rating: '80%',
          color: '#000000',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/markdown/markdown-original.svg',
        },
        {
          name: 'Figma',
          rating: '80%',
          color: '#F24E1E',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/figma/figma-original.svg',
        },
        {
          name: 'NPM',
          rating: '80%',
          color: '#CB3837',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/npm/npm-original-wordmark.svg',
        },
        {
          name: 'Sanity',
          rating: '80%',
          color: '#CB3837',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/sanity/sanity-original.svg',
        },
        {
          name: 'Linux',
          rating: '80%',
          color: '#FCC624',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/linux/linux-original.svg',
        },
      ],
    },
  ];
}

