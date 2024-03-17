import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { SkillsComponent } from './component/skills/skills.component';
import { SocialMediaComponent } from './component/social-media/social-media.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ExperienceComponent } from './component/experience/experience.component';
import { ServiceComponent } from './component/service/service.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ProjectsComponent,
    SkillsComponent,
    SocialMediaComponent,
    ContactUsComponent,
    ExperienceComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
