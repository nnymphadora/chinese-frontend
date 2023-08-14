import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddEditLevelComponent } from './add-edit-level/add-edit-level.component';
import { LevelCefrEquivService } from 'src/app/services/level-cefr-equiv.service';
import { LevelDifficultyService } from 'src/app/services/level-difficulty.service';
import { FormsModule } from '@angular/forms';
import { AddEditLessonComponent } from './add-edit-lesson/add-edit-lesson.component';

@NgModule({
  declarations: [AddEditLevelComponent, AddEditLessonComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
  providers: [LevelCefrEquivService, LevelDifficultyService],
})
export class AdminModule {}
