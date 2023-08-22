import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLevelComponent } from './view-level/view-level.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';

import { FormsModule } from '@angular/forms';
import { HelpersModule } from '../helpers/helpers.module';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    LevelsComponent,
    ViewLevelComponent,
    ViewLessonComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HelpersModule,
  ],
  exports: [],
})
export class PagesModule {}
