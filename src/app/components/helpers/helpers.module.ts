import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewWordCardComponent } from './new-word-card/new-word-card.component';
import { QuickEditInfoMenuComponent } from './quick-edit-info-menu/quick-edit-info-menu.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { SmallScreenNavMenuComponent } from './small-screen-nav-menu/small-screen-nav-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { QuizOptionsDialogComponent } from './quiz-options-dialog/quiz-options-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewWordCardComponent,
    QuickEditInfoMenuComponent,
    SmallScreenNavMenuComponent,
    ConfirmDialogComponent,
    QuizOptionsDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuickEditInfoMenuComponent,
    NewWordCardComponent,
  ],
})
export class HelpersModule {}
