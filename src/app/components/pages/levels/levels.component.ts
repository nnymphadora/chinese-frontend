import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
})
export class LevelsComponent implements OnInit {
  levels: Level[] = [];

  constructor(private levelsService: LevelsService) {}

  ngOnInit(): void {
    this.levelsService.getAllLevels().subscribe((data) => {
      this.levels = data;
      console.log(this.levels);
    });
  }
}
