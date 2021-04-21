import { UseGuards } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthLoginInput } from './inputs/auth-login.input'
import { AuthRegisterInput } from './inputs/auth-register.input'
import { UserToken } from './models/user-token'
import { Model } from 'mongoose'
import { UserDocument, User } from './schemas/user.schema'
import { UserModel } from './models/user'

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService
	) { }

	@Query(() => UserToken)
	login(@Args({name: 'input', type: () => AuthLoginInput}) input: AuthLoginInput) {
		return this.authService.login(input)
	}

	@Mutation(() => UserToken)
	register(@Args({name: 'input', type: () => AuthRegisterInput}) input: AuthRegisterInput) {
		return this.authService.register(input)
	}
}