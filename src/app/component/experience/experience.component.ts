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
      start_date: 'May 2022 ',
      end_date: '',
      currently_working: true,
      location: 'New Delhi',
      description: ``,
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
