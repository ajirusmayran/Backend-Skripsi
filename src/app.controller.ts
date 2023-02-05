import {
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common"
import { AppService } from "./app.service"
import { AuthService } from "./auth/auth.service"
import { LocalAuthGuard } from "./auth/local-auth.guard"

export interface LoginRequest {
	username: string
	password: string
	isAdmin?: Boolean
}
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		// private authService: AuthService
	) {}

	// @UseGuards(LocalAuthGuard)
	// @HttpCode(200)
	// @Post("auth/login")
	// async login(@Request() request) {
	// 	return this.authService.login(request)
	// }
	
	@Get('health/check')
	healthcheck(){
		return {
			"status":"Ok Bro Aman"
		}
	}
}
