import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditLevelComponent } from './add-edit-level/add-edit-level.component';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { FormsModule } from '@angular/forms';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditNewWordComponent } from './edit-new-word/edit-new-word.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AddEditLevelComponent,
    AddEditLessonComponent,
    AddNewWordComponent,
    EditNewWordComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
  ],
  providers: [
    LevelCefrEquivService,
    LevelDifficultyService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class AdminModule {}
