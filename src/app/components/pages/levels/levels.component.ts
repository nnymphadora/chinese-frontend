import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelsService } from 'src/app/services/levels.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLevelComponent } from '../../admin/add-edit-level/add-edit-level.component';
import { DialogResult } from 'src/app/enums/dialog-result';
import { SnackbarMessage } from 'src/app/enums/snackbar-message';
import { MatSnackbarService } from 'src/app/services/mat-snackbar.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent implements OnInit {
  tokenData: any = this.authService.getTokenData();
  isAdmin: boolean = this.tokenData.isAdmin;
  levels: Level[] = [];

  roundPlus = faPlusCircle;
  snackbarClasses: string[] = ['snackbar', 'snackbar-blue', 'no-action'];

  ngOnInit(): void {
    this.getLevelsData();
  }

  getLevelsData() {
    this.levelsService.getAllLevels().subscribe((data) => {
      this.levels = data;
    });
  }

  onAddLevel() {
    const dialogRef = this.dialog.open(AddEditLevelComponent, {
      panelClass: 'width-35rem',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== DialogResult.Cancelled) {
        const message =
          result === DialogResult.Added
            ? SnackbarMessage.Success
            : SnackbarMessage.Error;
        this.snackBarService.openSnackBar(
          message,
          undefined,
          this.snackbarClasses,
          3000
        );
        if (result === DialogResult.Added) {
          this.getLevelsData();
        }
      }
    });
  }

  showElToUser(el: Level): boolean {
    return el.isActive === 1 || this.isAdmin;
  }

  constructor(
    private levelsService: LevelsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBarService: MatSnackbarService
  ) {}
}
