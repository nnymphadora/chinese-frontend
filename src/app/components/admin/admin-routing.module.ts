import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditLevelComponent } from './add-edit-level/add-edit-level.component';

const routes: Routes = [
  { path: 'add-level', component: AddEditLevelComponent },
  { path: 'edit-level/:id', component: AddEditLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}