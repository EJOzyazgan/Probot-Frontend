export class Bot {
  constructor(
    public id?: number,
    public name?: string,
    public serviceUrl?: string,
    public userId?: string,
    public handsPlayed?: number,
    public handsWon?: number,
    public lastPlayed?: Date,
    public tournaments?: [string]
  ) {
  }
}
