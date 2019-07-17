import {Bot} from './bot.model';

export class User {
  constructor(
    public id?: string,
    public email?: string,
    public name?: string,
    public password?: string,
    public createdAt?: Date,
    public lastLoggedIn?: Date,
    public firstLoggedIn?: Date,
    public daysLoggedIn?: number,
    public chips?: number,
    public rankClass?: string,
    public rank?: number,
    public username?: string,
    public friends?: [string],
    public icon?: string,
    public bots?: [Bot]
  ) {
  }
}
