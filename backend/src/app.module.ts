import { Module } from '@nestjs/common';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, HttpModule, DatabaseModule, ConfigModule.forRoot()]
})
export class AppModule {}
