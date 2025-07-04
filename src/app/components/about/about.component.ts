import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  experiences = [
    {
      title: 'Lead Software Developer',
      company: 'Commudle, New Delhi',
      period: 'May 2024 – Present',
      description:
        'Spearheaded development of scalable web applications using Angular and Ruby on Rails. Designed secure payment integrations with Razorpay. Mentored developers and led Agile sprint planning.',
    },
    {
      title: 'Software Developer',
      company: 'Commudle, New Delhi',
      period: 'May 2023 - May 2024',
      description:
        'Built high-performance Angular applications with reusable components, improving frontend load times by 20%. Integrated Google Tag Manager for real-time analytics and marketing tracking.',
    },
    {
      title: 'Software Developer, Intern',
      company: 'Commudle, New Delhi',
      period: 'May 2022 - May 2023',
      description:
        'Developed responsive web interfaces using Angular for 10,000+ monthly users. Integrated Sanity.io as headless CMS, reducing content update times by 30%.',
    },
    {
      title: 'Technical Support Executive',
      company: 'Netplus Broadband PVT LTD, Ludhiana',
      period: 'Dec 2020 - Apr 2022',
      description:
        'Managed network support and troubleshooting for broadband customers. Led team of 4 technicians, improving ticket resolution time by 25%. Resolved 50+ daily support tickets.',
    },
    {
      title: 'Teaching Assistant (TA)',
      company: 'Coding Ninjas, New Delhi',
      period: 'Apr 2020 - Aug 2020',
      description:
        'Supported 50+ students in debugging Node.js and frontend code. Guided learners through assignments, fostering proficiency in full-stack development concepts.',
    },
    {
      title: 'Social Media Handler',
      company: 'BBSBEC, Sirhind, Punjab',
      period: 'Nov 2019 - Nov 2020',
      description:
        'Managed college social media channels, boosting student engagement by 40%. Coordinated marketing campaigns and event promotions, significantly increasing participation.',
    },
  ];

  education = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Information Technology',
      institution:
        'Baba Banda Singh Bahadur Engineering College (MRSPTU), Punjab',
      year: '2016 – 2020',
      description:
        'Comprehensive study of Information Technology with focus on software development and system design',
    },
    {
      degree: 'Higher Secondary (Non-Medical)',
      institution: 'R.S. Model Sr. Sec. School, (PSEB), Punjab',
      year: '2015 – 2016',
      description: 'Science stream with Mathematics, Physics, and Chemistry',
    },
    {
      degree: 'Matriculation',
      institution: 'R.S. Model Sr. Sec. School, (PSEB), Punjab',
      year: '2012 – 2013',
      description:
        'Secondary education with strong foundation in core subjects',
    },
  ];
}
