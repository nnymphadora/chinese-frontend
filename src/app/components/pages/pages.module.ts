import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLevelComponent } from './view-level/view-level.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';

import { FormsModule } from '@angular/forms';
import { HelpersModule } from '../helpers/helpers.module';
import RegisterComponent from './register/register.component';
import { LoginComponent } from './login/login.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ViewExercisesComponent } from './view-exercises/view-exercises.component';
import { CharacterQuizComponent } from './character-quiz/character-quiz.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    LevelsComponent,
    ViewLevelComponent,
    ViewLessonComponent,
    RegisterComponent,
    LoginComponent,
    ViewExercisesComponent,
    CharacterQuizComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HelpersModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [],
})
export class PagesModule {}
