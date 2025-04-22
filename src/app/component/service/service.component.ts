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
        'Expert in crafting highly interactive, responsive, and visually appealing user interfaces with **Angular** and **TailwindCSS**, ensuring a seamless user experience across all devices.',
      image: '',
    },
    {
      title: 'Dashboard Design and Implementation',
      sub_title:
        'Skilled in designing aesthetically pleasing and data-driven dashboards using **Angular** and **D3.js**, providing real-time insights into application performance and user engagement.',
      image: '',
    },
    {
      title: 'Payment Integration with Razorpay',
      sub_title:
        'Proficient in integrating secure and scalable payment systems using **Razorpay**, ensuring seamless and smooth online transactions for users. I implement features like payment gateway setup, recurring billing, and transaction tracking.',
      image: '',
    },
    {
      title: 'Clean and Efficient Coding Practices',
      sub_title:
        'Proficient in writing maintainable, efficient, and well-documented code that adheres to industry best practices, delivering high-quality solutions while reducing technical debt.',
      image: '',
    },
    {
      title: 'Technological Expertise',
      sub_title:
        'Proficient in a wide range of front-end and back-end technologies, including **Angular**, **Ruby on Rails**, **Google Tag Manager**, and **Sanity.io** for seamless content management.',
      image: '',
    },
    {
      title: 'Problem Solving & Innovation',
      sub_title:
        'Proven track record in solving complex technical challenges, ensuring timely resolution of issues while implementing innovative solutions that improve performance and user experience.',
      image: '',
    },
    {
      title: 'Adaptability to New Technologies',
      sub_title:
        'Quick to adopt and learn new technologies and frameworks, with a strong passion for staying current with the latest industry trends to ensure the team remains ahead of the curve.',
      image: '',
    },
    {
      title: 'Continuous Learning & Professional Growth',
      sub_title:
        'Committed to continuous learning, attending workshops and conferences, and working on personal projects to enhance skills and stay updated on emerging trends and technologies.',
      image: '',
    },
    {
      title: 'Project Management & Delivery',
      sub_title:
        'Experienced in planning, prioritizing, and managing projects to ensure timely delivery, meeting deadlines, and aligning project outcomes with business goals.',
      image: '',
    },
    {
      title: 'Agile Methodologies & Sprint Management',
      sub_title:
        'Experienced in Agile/Scrum environments, leading sprint planning sessions, retrospectives, and working in short iterative cycles to deliver high-quality software quickly.',
      image: '',
    },
    {
      title: 'Client Communication & Requirements Gathering',
      sub_title:
        'Strong interpersonal and communication skills, capable of working closely with clients to understand their needs, gather requirements, and ensure successful project delivery.',
      image: '',
    },
    {
      title: 'Code Review & Quality Assurance',
      sub_title:
        'Focused on maintaining high code quality through regular code reviews, unit testing, and adopting best practices to ensure reliability and maintainability of the codebase.',
      image: '',
    },
  ];
}
