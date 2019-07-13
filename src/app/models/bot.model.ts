import {Table} from './table.model';

export class Bot {
  constructor(
    public id?: string,
    public name?: string,
    public serviceUrl?: string,
    public userId?: string,
    public handsPlayed?: number,
    public handsWon?: number,
    public lastPlayed?: Date,
    public tournaments?: [string],
    public currentTable?: string,
    public tablesPlayed?: [Table],
    public totalWinnings?: number
  ) {
  }
}
