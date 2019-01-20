export class User {
  constructor(
    public id?: number,
    public email?: string,
    public name?: string,
    public password?: string,
    public isAdmin?: boolean,
    public resetPasswordLink?: string,
    public updatedAt?: Date,
    public createdAt?: Date,
  ) {}
}
