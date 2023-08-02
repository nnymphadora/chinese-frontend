import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LevelsComponent } from './levels/levels.component';
import { ViewLessonsForLevelComponent } from './view-lessons-for-level/view-lessons-for-level.component';

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
  { path: 'level/:id', component: ViewLessonsForLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
