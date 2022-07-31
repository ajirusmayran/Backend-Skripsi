import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { LoginRequest } from "src/app.controller"
import { AuthService } from "./auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			passReqToCallback: true,
		})
	}

	async validate(
		req: Request,
		username: string,
		password: string
	): Promise<any> {
		const body = req.body
		const isAdmin = JSON.parse(JSON.stringify(body)).isAdmin as boolean
		const user = this.authService.validateUser(username, password, isAdmin)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
