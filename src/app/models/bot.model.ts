import {Table} from './table.model';

export class Bot {
  constructor(
    public id?: number,
    public name?: string,
    public serviceUrl?: string,
    public userId?: number,
    public handsPlayed?: number,
    public handsWon?: number,
    public lastPlayed?: Date,
    public tournaments?: [string],
    public currentTable?: string,
    public tablesPlayed?: [Table],
    public totalWinnings?: number,
    public botType?: string,
    public isActive?: boolean
  ) {
  }
}
