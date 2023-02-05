import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { TrackingModule } from "./tracking/tracking.module";
import { AuthModule } from "./auth/auth.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { InterceptorResponse } from "./common/interceptor.response";
import { HttpExceptionFilter } from "./common/http-exception.filter";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   url:"mysql://aji:P@ssw0rd123!@34.106.142.51:3306/hajaraswad_db?allowPublicKeyRetrieval=true",
    //   synchronize: true,
    //   logging: false,
    //   entities: [join(__dirname, "**", "*.entity.{ts,js}")],
    // }),
    // UsersModule,
    // TrackingModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorResponse,
    },
  ],
})
export class AppModule {}
