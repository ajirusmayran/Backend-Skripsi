import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { join } from "path";

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log([join(__dirname, "**", "*.entity.{ts,js}")]);
  }
  getHello(): string {
    return "Hello World!";
  }
}
