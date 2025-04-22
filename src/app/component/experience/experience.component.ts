import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  experiences = [
    {
      title: 'Lead Software Developer',
      company: 'Commudle',
      start_date: 'May 2024',
      end_date: '',
      currently_working: true,
      location: 'New Delhi',
      description: `🔹 Leading the development of scalable web applications using Angular for frontend and Ruby on Rails for backend, ensuring seamless user experiences and high code quality.<br>
🔹 Architected and implemented payment integration systems to support secure and reliable transactions, improving monetization workflows.<br>
🔹 Mentored and guided a team of developers through code reviews, architectural decisions, and agile ceremonies, fostering a culture of collaboration and continuous improvement.<br>
🔹 Collaborated closely with product managers and designers to translate business requirements into technical solutions, balancing speed and scalability.<br>
🔹 Played a key role in sprint planning, task delegation, and aligning team efforts with business goals.`,
    },
    {
      title: 'Software Developer',
      company: 'Commudle',
      start_date: 'May 2023 ',
      end_date: 'May 2024',
      currently_working: false,
      location: 'New Delhi',
      description: `🔹 Building and maintaining scalable, user-friendly web applications using Angular, with a strong focus on performance and maintainability.<br>
🔹 Enhanced user experience through reusable components, clean UI implementations, and frontend performance optimizations.<br>
🔹 Integrated Google Tag Manager (GTM) to enable seamless marketing and analytics tracking without requiring code redeployments.<br>
🔹 Collaborated with cross-functional teams to design and deliver new features aligned with user and business needs.<br>
🔹 Ensured clean, modular code by following best practices and participating in thorough code reviews.<br>
🔹 Contributed to sprint planning, agile workflows, and continuous improvement through proactive debugging and iterative development.`,
    },
    {
      title: 'Software Developer Intern',
      company: 'Commudle',
      start_date: 'May 2022 ',
      end_date: 'May 2023',
      currently_working: false,
      location: 'New Delhi',
      description: `🔹Collaborating with the frontend team to build scalable and responsive web interfaces using Angular.<br>
      🔹Integrated Sanity.io as a headless CMS to streamline content management workflows.<br>
      🔹Gained hands-on experience in real-world product development and best practices for scalable frontend architecture.`,
    },
    {
      title: 'Technical Support Executive',
      company: 'Netplus Broadband PVT LTD.',
      start_date: 'Dec 2020',
      end_date: 'Apr 2022',
      currently_working: false,
      location: 'New Delhi',
      description: `🔹 Troubleshoot ISP's servers.<br>
      🔹 Managing Team. <br>
      🔹 Helping to maintain data.`,
    },
    {
      title: 'Social Media handler',
      company: 'BBSBEC',
      start_date: 'Nov 2019',
      end_date: 'Nov 2020',
      currently_working: false,
      location: 'Sirhind',
      description: `I am working as a Digital media handler and also work with the team of Digital marketing.`,
    },
    {
      title: 'TA (Teaching Assistant)',
      company: 'Coding Ninjas',
      start_date: 'Apr 2020 ',
      end_date: 'Aug 2020',
      currently_working: false,
      location: 'New Delhi',
      description: `<p>Key responsibilities during the internship were -<br>&bull; Taking doubt sessions.&nbsp;<br>&bull; Debugging codes.<br>&bull; Helping students with their assignments &amp; various projects.</p>`,
    },
  ];
}
