import { AuthService } from "@infra/auth/auth-service";
import { LocalStrategy } from "@infra/auth/local.strategy"
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [DatabaseModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule{}