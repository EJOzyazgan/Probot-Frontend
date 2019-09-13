export class Session {
    constructor(
      public id?: number,
      public botId?: number,
      public tableType?: string,
      public createdAt?: Date,
      public endedAt?: Date,
    ) {
    }
  }
  