import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  experiencesData = [
    {
      company: 'Commudle, New Delhi',
      positions: [
        {
          title: 'Lead Software Developer',
          startDate: '2024-05-01',
          endDate: null, // null means current/present
          description:
            'Spearheaded development of scalable web applications using Angular and Ruby on Rails. Designed secure payment integrations with Razorpay. Mentored developers and led Agile sprint planning.',
        },
        {
          title: 'Software Developer',
          startDate: '2022-08-01',
          endDate: '2024-04-30',
          description:
            'Built high-performance Angular applications with reusable components, improving frontend load times by 20%. Integrated Google Tag Manager for real-time analytics and marketing tracking.',
        },
        {
          title: 'Software Developer, Intern',
          startDate: '2022-05-01',
          endDate: '2022-07-31',
          description:
            'Developed responsive web interfaces using Angular for 10,000+ monthly users. Integrated Sanity.io as headless CMS, reducing content update times by 30%.',
        },
      ],
    },
    {
      company: 'Netplus Broadband PVT LTD, Ludhiana',
      positions: [
        {
          title: 'Technical Support Executive',
          startDate: '2020-12-01',
          endDate: '2022-04-30',
          description:
            'Managed network support and troubleshooting for broadband customers. Led team of 4 technicians, improving ticket resolution time by 25%. Resolved 50+ daily support tickets.',
        },
      ],
    },
    {
      company: 'Coding Ninjas, New Delhi',
      positions: [
        {
          title: 'Teaching Assistant (TA)',
          startDate: '2020-04-01',
          endDate: '2020-08-31',
          description:
            'Supported 50+ students in debugging Node.js and frontend code. Guided learners through assignments, fostering proficiency in full-stack development concepts.',
        },
      ],
    },
    {
      company: 'BBSBEC, Sirhind, Punjab',
      positions: [
        {
          title: 'Social Media Handler',
          startDate: '2019-11-01',
          endDate: '2020-11-30',
          description:
            'Managed college social media channels, boosting student engagement by 40%. Coordinated marketing campaigns and event promotions, significantly increasing participation.',
        },
      ],
    },
  ];

  experiences: any[] = [];

  ngOnInit() {
    this.experiences = this.processExperiences();
  }

  private processExperiences() {
    return this.experiencesData.map((company) => {
      const processedPositions = company.positions.map((position) => ({
        ...position,
        period:
          this.formatDateRange(position.startDate, position.endDate) +
          ' · ' +
          this.calculatePeriod(position.startDate, position.endDate),
      }));

      // Calculate total company period
      const earliestStart = company.positions.reduce(
        (earliest, pos) =>
          pos.startDate < earliest ? pos.startDate : earliest,
        company.positions[0].startDate
      );

      const latestEnd = company.positions.reduce((latest, pos) => {
        const endDate = pos.endDate || new Date().toISOString().split('T')[0];
        return endDate > latest ? endDate : latest;
      }, company.positions[0].endDate || new Date().toISOString().split('T')[0]);

      const isCurrentlyWorking = company.positions.some(
        (pos) => pos.endDate === null
      );

      return {
        company: company.company,
        totalPeriod:
          this.formatDateRange(
            earliestStart,
            isCurrentlyWorking ? null : latestEnd
          ) +
          ' · ' +
          this.calculatePeriod(
            earliestStart,
            isCurrentlyWorking ? null : latestEnd
          ),
        positions: processedPositions,
      };
    });
  }

  private calculatePeriod(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (years === 0) {
      return months === 1 ? '1 mo' : `${months} mos`;
    } else if (months === 0) {
      return years === 1 ? '1 yr' : `${years} yrs`;
    } else {
      const yearText = years === 1 ? '1 yr' : `${years} yrs`;
      const monthText = months === 1 ? '1 mo' : `${months} mos`;
      return `${yearText} ${monthText}`;
    }
  }

  private formatDateRange(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    if (!endDate) {
      return `${startFormatted} – Present`;
    }

    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });

    return `${startFormatted} - ${endFormatted}`;
  }

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
