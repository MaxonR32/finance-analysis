import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtDto } from '../dto/jwt.dto'


@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly service: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'Nice-secret',
			ignoreExpiration: false
		})
	}

	async validate(payload: JwtDto) {
		const user = await this.service.validateUser(payload.userId)
		if(!user) {
			throw new UnauthorizedException('Slap')
		}
		return user
	}
}