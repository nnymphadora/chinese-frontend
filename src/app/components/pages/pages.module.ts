import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLessonsForLevelComponent } from './view-lessons-for-level/view-lessons-for-level.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, LevelsComponent, ViewLessonsForLevelComponent],
  imports: [CommonModule, PagesRoutingModule, FontAwesomeModule],
  exports: [],
})
export class PagesModule {}
