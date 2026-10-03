import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

import { experiences as workHistory } from '@stores/experience_store';
import { IExperience } from '@models/experience.model';

interface IProcessedPosition {
  title: string;
  period: string;
  description?: string;
  highlights?: string[];
}

interface IProcessedCompany {
  company: string;
  totalPeriod: string;
  positions: IProcessedPosition[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  bioParagraphs = [
    `I started at Commudle as an intern in 2022 and left four years later as
     lead developer. In between I built most of what I'm proud of: a hackathon
     platform taken from an empty repo to production, a payments integration
     that runs real money, a frontend that got measurably faster. Angular and
     Ruby on Rails are where I'm most at home.`,
    `In August 2026 I moved into training delivery at Google Operations Center.
     It's a change of job, not a change of field - the work is still technical,
     just pointed at helping people learn rather than shipping features myself.
     Explaining something well turns out to be harder than building it, which is
     most of why I took the role.`,
    `Outside work I mentor and judge at hackathons, run workshops for students,
     and write about what I learn. I build side projects because I like building
     things, and because teaching stays honest when you're still making things
     yourself.`,
  ].map((paragraph) => paragraph.replace(/\s+/g, ' ').trim());

  aboutHighlights = [
    { icon: '💼', number: '4+', label: 'Years Building Web Products' },
    { icon: '🎓', number: null, label: 'Training Delivery Specialist @ GOC' },
    { icon: '🏆', number: '6', label: 'Hackathons Mentored & Judged' },
    { icon: '🎤', number: '2', label: 'Talks at Colleges & Meetups' },
  ];

  experiences: IProcessedCompany[] = [];

  ngOnInit() {
    this.experiences = this.groupByCompany(workHistory);
  }

  /**
   * Collapses the flat work history into one card per company, keeping the
   * store's newest-first order and listing each role held there.
   */
  private groupByCompany(history: IExperience[]): IProcessedCompany[] {
    const byCompany = new Map<string, IExperience[]>();

    for (const role of history) {
      const existing = byCompany.get(role.company);
      if (existing) {
        existing.push(role);
      } else {
        byCompany.set(role.company, [role]);
      }
    }

    return Array.from(byCompany.entries()).map(([company, roles]) => {
      const location = roles[0].location;
      const today = new Date().toISOString().split('T')[0];

      const earliestStart = roles.reduce(
        (earliest, role) =>
          role.startDate < earliest ? role.startDate : earliest,
        roles[0].startDate
      );

      const isCurrentlyWorking = roles.some((role) => role.endDate === null);

      const latestEnd = roles.reduce(
        (latest, role) => {
          const endDate = role.endDate ?? today;
          return endDate > latest ? endDate : latest;
        },
        roles[0].endDate ?? today
      );

      const companyEnd = isCurrentlyWorking ? null : latestEnd;

      return {
        company: location ? `${company}, ${location}` : company,
        totalPeriod: this.describePeriod(earliestStart, companyEnd),
        positions: roles.map((role) => ({
          title: role.role,
          period: this.describePeriod(role.startDate, role.endDate),
          description: role.description,
          highlights: role.highlights,
        })),
      };
    });
  }

  private describePeriod(startDate: string, endDate: string | null): string {
    return (
      this.formatDateRange(startDate, endDate) +
      ' · ' +
      this.calculatePeriod(startDate, endDate)
    );
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
