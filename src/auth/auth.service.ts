import { Injectable } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}
	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.findByUsername(username)
		const isMatch = await bcrypt.compare(pass, user.password)
		if (user && isMatch) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(req: any) {
		const { user } = req
		const payload = { username: user.username, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload),
			user,
		}
	}
}
