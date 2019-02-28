export class Bracket {
  constructor(
    public _id?: string,
    public tournamentId?: string,
    public divisions?: Array<object>,
    public name?: string
  ) {}
}
