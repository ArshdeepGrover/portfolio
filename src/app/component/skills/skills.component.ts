import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills = [
    {
      name: 'Html 5',
      rating: '94%',
      color: '#E34F26',
      src: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
    },
    {
      name: 'Css 3',
      rating: '97%',
      color: '#1472B6',
      src: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white',
    },

    {
      name: 'Angular',
      rating: '80%',
      color: '#DD0031',
      src: 'https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white',
    },
    {
      name: 'Typescript',
      rating: '80%',
      color: '#1472B6',
      src: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
    },
    {
      name: 'Javascript',
      rating: '80%',
      color: '#323330',
      src: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
    },
    {
      name: 'Java',
      rating: '80%',
      color: '#ED8B00',
      src: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white',
    },
    {
      name: 'TailwindCss',
      rating: '80%',
      color: '#38B2AC',
      src: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
    },
    {
      name: 'Git',
      rating: '80%',
      color: '#F05033',
      src: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white',
    },
    {
      name: 'GitHub',
      rating: '80%',
      color: '#131011',
      src: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white',
    },
    {
      name: 'Linux',
      rating: '80%',
      color: '#FCC624',
      src: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
    },
    {
      name: 'GitLab',
      rating: '80%',
      color: '#181717',
      src: 'https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white',
    },
    {
      name: 'Firebase',
      rating: '80%',
      color: '#039BE5',
      src: 'https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white',
    },
    {
      name: 'VScode',
      rating: '80%',
      color: '#0078d7',
      src: 'https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white',
    },
    {
      name: 'Postman',
      rating: '80%',
      color: '#FF6C37',
      src: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
    },
    {
      name: 'Markdown',
      rating: '80%',
      color: '#000000',
      src: 'https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white',
    },
    {
      name: 'BootStrap',
      rating: '80%',
      color: '#8511F9',
      src: 'https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white',
    },
    {
      name: 'Ruby',
      rating: '80%',
      color: '#CC332D',
      src: 'https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white',
    },
    {
      name: 'Rails',
      rating: '80%',
      color: '#CC0100',
      src: 'https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white',
    },
  ];
  randomColor!: string;
}
