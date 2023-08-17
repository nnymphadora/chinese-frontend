import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewWordCardComponent } from './new-word-card/new-word-card.component';
import { QuickEditInfoMenuComponent } from './quick-edit-info-menu/quick-edit-info-menu.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewWordCardComponent,
    QuickEditInfoMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    MatSnackBarModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuickEditInfoMenuComponent,
    NewWordCardComponent,
  ],
})
export class HelpersModule {}
