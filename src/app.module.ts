import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
console.log('-----NODE_ENV', process.env.NODE_ENV);
const envFilePath = `.env${
  process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
}`;
console.log('------envFilePath', envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
