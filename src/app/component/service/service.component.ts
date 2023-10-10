import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  services = [
    {
      title: 'Front-End Development Expertise',
      sub_title:
        'Proficient in creating highly interactive and visually appealing user interfaces for both web and mobile applications.',
      image: '',
    },
    {
      title: 'Dashboard Design and Implementation',
      sub_title:
        'Experienced in developing aesthetically pleasing and informative dashboards for real-time monitoring and logging of application performance and user engagement.',
      image: '',
    },
    {
      title: 'Coding Proficiency',
      sub_title:
        'Adept at crafting clean, efficient, and maintainable code to meet project requirements and exceed client expectations.',
      image: '',
    },
    {
      title: 'Technological Skillset',
      sub_title:
        'Proficiency in a wide range of front-end technologies and frameworks, including but not limited to HTML, CSS, JavaScript, Angular, and TailwindCss.',
      image: '',
    },
    {
      title: 'Problem Solving',
      sub_title:
        'Proven ability to tackle complex technical challenges and find innovative solutions to ensure project success.',
      image: '',
    },
    {
      title: 'Adaptability',
      sub_title:
        'Quick learner who can adapt to new technologies and tools, ensuring the ability to stay up-to-date in a rapidly evolving field.',
      image: '',
    },
    {
      title: 'Team Collaboration',
      sub_title:
        'Effective team player with excellent communication skills, capable of collaborating with cross-functional teams to deliver high-quality projects.',
      image: '',
    },
    {
      title: 'Continuous Learning',
      sub_title:
        'A passion for ongoing professional development and staying current with industry trends and best practices.',
      image: '',
    },
    {
      title: 'Project Management',
      sub_title:
        'Proficient in project planning, task prioritization, and meeting deadlines to ensure the timely delivery of projects.',
      image: '',
    },
  ];
}
