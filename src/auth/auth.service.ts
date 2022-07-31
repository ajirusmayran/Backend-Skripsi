import { Injectable } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import UserType from "src/users/const/user.type"

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}
	async validateUser(
		username: string,
		pass: string,
		isAdmin: boolean
	): Promise<any> {
		const user = await this.userService.findByUsername(username)
		if (!user) {
			return null
		}
		if (isAdmin) {
			if (user.type.toLowerCase() !== UserType.ADMIN) return null
		}
		const isMatch = await bcrypt.compare(pass, user.password)
		if (isMatch) {
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
