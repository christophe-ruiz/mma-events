import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UfcController } from './ufc/ufc.controller';

@Module({
  imports: [],
  controllers: [AppController, UfcController],
  providers: [AppService],
})
export class AppModule {}
