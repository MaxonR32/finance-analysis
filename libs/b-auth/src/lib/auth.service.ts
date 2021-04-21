import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { AuthLoginInput } from './inputs/auth-login.input'
import { AuthRegisterInput } from './inputs/auth-register.input'
import { UserToken } from './models/user-token'
import { User, UserDocument } from './schemas/user.schema'
import { JwtDto } from './dto/jwt.dto'
// import { UserModel } from './models/user'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly jwt: JwtService
	) { }

	public async login(input: AuthLoginInput): Promise<UserToken> {
		const user = await this.userModel.findOne({email: input.email})

		if(!user) {
			throw new NotFoundException(`User with email ${input.email} does not exist`)
		}

		const passwordValid = await bcrypt.compare(input.password, user.password)

		if(!passwordValid) {
			throw new Error('Invalid password')
		}

		return { user, token: this.signToken(JSON.stringify(user._id)) }
	}

	public async register(input: AuthRegisterInput): Promise<UserToken> {
		const user = await this.userModel.findOne({email: input.email})

		if(user) {
			throw new BadRequestException(`Email ${input.email} already exists`)			
		}

		const password = await bcrypt.hash(input.password, 10)

		const newUser = new this.userModel({
			...input,
			password
		})

		newUser.save()

		return { user: newUser, token: this.signToken(newUser.email) }
	}

	private signToken(id: string) {
		const payload: JwtDto = {userId: id}
		return this.jwt.sign(payload)
	}

	public async validateUser(id: string) {
		return this.userModel.findById({_id: JSON.parse(id)})
	}
}