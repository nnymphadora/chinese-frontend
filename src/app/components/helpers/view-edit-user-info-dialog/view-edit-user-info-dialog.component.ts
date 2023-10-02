import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment.development';
import {
  faPenToSquare,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-edit-user-info-dialog',
  templateUrl: './view-edit-user-info-dialog.component.html',
  styleUrls: ['./view-edit-user-info-dialog.component.scss'],
})
export class ViewEditUserInfoDialogComponent implements OnInit {
  user: User;
  userAvatarPath: string;
  apiUrl = environment.API_URL;
  editIcon = faPenToSquare;
  saveIcon = faCheck;
  cancelIcon = faXmark;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.user = this.dialogData;
    this.userAvatarPath = `${this.apiUrl}/${this.user.avatarPath}`;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  onEdit() {
    this.dialogRef.close(true);
  }
  constructor(
    private dialogRef: MatDialogRef<ViewEditUserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}
}
