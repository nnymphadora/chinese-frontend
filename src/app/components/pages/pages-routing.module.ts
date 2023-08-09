import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLevelComponent } from './view-level/view-level.component';
import { ViewLessonComponent } from './view-lesson/view-lesson.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
