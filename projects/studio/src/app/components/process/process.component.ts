import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { processSteps } from '@stores/process_store';
import { IProcessStep } from '@models/process-step.model';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent {
  steps: IProcessStep[] = processSteps;
}
