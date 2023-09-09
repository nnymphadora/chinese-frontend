import { LevelCefrEquiv } from './LevelCefrEquiv';
import { LevelDifficulty } from './LevelDifficulty';

export class Level {
  id: number;
  name: string;
  difficulty: LevelDifficulty;
  description: string;
  cefrEquiv: LevelCefrEquiv;
  isActive: number;
  isRemoved: number;
}
