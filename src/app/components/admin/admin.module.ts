import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddEditLevelComponent } from './add-edit-level/add-edit-level.component';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { FormsModule } from '@angular/forms';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';
import { BulkAddNewWordsComponent } from './bulk-add-new-words/bulk-add-new-words.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditNewWordComponent } from './edit-new-word/edit-new-word.component';

@NgModule({
  declarations: [
    AddEditLevelComponent,
    AddEditLessonComponent,
    BulkAddNewWordsComponent,
    EditNewWordComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [LevelCefrEquivService, LevelDifficultyService],
})
export class AdminModule {}
