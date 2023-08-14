import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditLevelComponent } from './add-edit-level/add-edit-level.component';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';

const routes: Routes = [
  { path: 'add-level', component: AddEditLevelComponent },
  { path: 'edit-level/:id', component: AddEditLevelComponent },
  { path: 'add-lesson', component: AddEditLessonComponent },
  { path: 'edit-lesson/:id', component: AddEditLessonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
