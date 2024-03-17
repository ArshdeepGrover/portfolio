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
      start_date: 'May 2023',
      end_date: '',
      currently_working: true,
      location: 'New Delhi',
      description: `<p class="p1"><span class="s1">&bull;</span> Orchestrated transition to lead software developer role by consistently delivering high-quality code,mentoring junior developers, and implementing agile practices, resulting in a 40% decrease in&nbsp;project delivery time.</p>
<p class="p1"><span class="s1">&bull;</span> Leading in the development of key projects, overseeing a team of developers and ensuring project&nbsp;milestones are met.</p>
<p class="p1"><span class="s1">&bull;</span> Collaborate with cross-functional teams to design and implement software solutions that meet client&nbsp;requirements.</p>
<p class="p1"><span class="s1">&bull;</span> Provide technical guidance and mentorship to junior developers, fostering a culture of learning and&nbsp;growth within the team.</p>`,
    },
    {
      title: 'Software Developer',
      company: 'Commudle',
      start_date: 'May 2022 ',
      end_date: 'May 2023',
      currently_working: false,
      location: 'New Delhi',
      description: `<p class="p1"><span class="s1">&bull;</span> Contributed to the development of various software applications using Angular, Ruby on Rails, and&nbsp;other technologies.</p>
<p class="p1"><span class="s1">&bull;</span> Collaborated with team members to design and implement new features, ensuring high-quality code&nbsp;and adherence to best practices.</p>
<p class="p1"><span class="s1">&bull;</span> Participated in code reviews and provided constructive feedback to improve code quality and&nbsp;maintainability.</p>
<p class="p1"><span class="s1">&bull;</span> Assisted in troubleshooting and resolving technical issues, ensuring smooth operation of software&nbsp;applications.</p>`,
    },
    {
      title: 'Technical Support Executive',
      company: 'Netplus Broadband PVT LTD.',
      start_date: 'Dec 2020',
      end_date: 'Apr 2022',
      currently_working: false,
      location: 'New Delhi',
      description: `<p>Key responsibilities during my job were -<br>&bull; Troubleshoot ISP's servers.&nbsp;<br>&bull; Managing Team.<br>&bull; Helping to maintain data.</p>`,
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
