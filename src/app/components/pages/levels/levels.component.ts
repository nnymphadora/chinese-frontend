import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelsService } from 'src/app/services/levels.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLevelComponent } from '../../admin/add-edit-level/add-edit-level.component';
import { DialogResult } from 'src/app/enums/dialog-result';

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
      panelClass: 'custom-dialog-width',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === DialogResult.Added) {
        this.getLevelsData();
      }
    });
  }

  showElToUser(el: Level): boolean {
    return el.isActive === 1 || this.isAdmin;
  }

  constructor(
    private levelsService: LevelsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}
}
