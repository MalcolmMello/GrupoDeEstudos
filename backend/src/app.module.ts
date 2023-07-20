import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { RedisClientType } from 'redis';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [AuthModule, RedisModule, HttpModule, DatabaseModule, ConfigModule.forRoot()]
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis}),
          saveUninitialized: false,
          secret: process.env.SESSION_SECRET,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 6000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

