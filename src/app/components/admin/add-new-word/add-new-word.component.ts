import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Lesson } from 'src/app/models/Lesson';

import { faTrashCan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-new-word',
  templateUrl: './add-new-word.component.html',
  styleUrls: ['./add-new-word.component.scss'],
})
export class AddNewWordComponent implements OnInit {
  addBtn = faPlusCircle;
  deleteBtn = faTrashCan;

  @Input() lesson: Lesson;
  @Input() form: any;
  @Input() isGroupActive: boolean;
  @Output() delete = new EventEmitter<FormGroup>();

  ngOnInit(): void {}

  deleteNewWordGroup(): void {
    this.delete.emit();
  }

  isActiveGroup(): boolean {
    return this.isGroupActive;
  }

  constructor() {}
}
