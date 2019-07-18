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
    public referralCode?: string,
    public referredBy?: string,
    public rankClass?: number,
    public rank?: number,
    public username?: string,
    public friends?: Array<any>,
    public icon?: string,
    public bots?: [Bot]
  ) {
  }
}
