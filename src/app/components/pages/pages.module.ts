import { NgModule } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
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

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    LevelsComponent,
    ViewLevelComponent,
    ViewLessonComponent,
    RegisterComponent,
    LoginComponent,
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
