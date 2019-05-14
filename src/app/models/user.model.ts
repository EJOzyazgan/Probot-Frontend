export class User {
  constructor(
    public id?: number,
    public email?: string,
    public name?: string,
    public password?: string,
    public createdAt?: Date,
    public lastLogedIn?: Date,
    public chips?: number,
    public rankClass?: string,
    public rank?: number,
    public totalWinnings?: number,
    public friends?: [string],
    public icon?: string
  ) {
  }
}
