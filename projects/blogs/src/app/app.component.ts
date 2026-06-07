import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AosService } from './services/aos.service';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private aosService = inject(AosService);
  private themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.aosService.init();
  }

  ngOnDestroy() {
    this.aosService.destroy();
  }
}
