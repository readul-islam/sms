import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  getData(): { message: string } {
    console.log(this.connection.name);
    return { message: 'Hello API' };
  }
}
