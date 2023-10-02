import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLevelComponent } from './view-level/view-level.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';
import RegisterComponent from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewExercisesComponent } from './view-exercises/view-exercises.component';
import { CharacterQuizComponent } from './character-quiz/character-quiz.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: 'levels', component: LevelsComponent },
  { path: 'level/:id', component: ViewLevelComponent },
  { path: 'lesson/:id', component: ViewLessonComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'exercises', component: ViewExercisesComponent },
  { path: 'character-quiz', component: CharacterQuizComponent },
  { path: ':user/edit', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
