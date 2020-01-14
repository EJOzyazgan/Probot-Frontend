export class Bracket {
  constructor(
    public id?: number,
    public tournamentId?: number,
    public divisions?: Array<object>,
    public name?: string
  ) {}
}
