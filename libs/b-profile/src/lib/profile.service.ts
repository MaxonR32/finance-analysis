import { Injectable, UseGuards, UploadedFile } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Express } from 'express'
import { Model } from 'mongoose'
import { UserDocument, User, GqlAuthGuard, CtxUser, UserModel } from '@full/b-auth'
import { imgFilter, editImgName } from '@full/upload-file'
import { FileInterceptor } from '@nestjs/platform-express'
import { Member, MemberDocument } from './schemas/member.schema'
import * as mongoose from 'mongoose'

@Injectable()
export class ProfileService {
		
	user: any

	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@InjectModel(Member.name) private memberModel: Model<MemberDocument>,		
	) {}
	// get profile data
	public async getProfileData(us) {
		let user = await this.userModel.findById({_id: us._id})
		const members = await this.memberModel.find({user: user._id})
		const response = {
			user,
			members
		}
		return response
	}
	// save only image Src with user
	public async saveImgSrc(user, imgSrc) {
		const userFind = await this.userModel.findByIdAndUpdate({_id: user._id})
		userFind.imageSrc = `uploads/${imgSrc}`
		console.log(userFind)
		userFind.save()		

		return { message: 'Image has changed' }
	}
	// test 
	public sendUp(car) {
		console.log('service', car)
		return {car}
	}	
	public async changeImgSrc(imgSrc: string) {
		console.log('profileService', imgSrc)
	}
	// create a member
	public async createMember(member, user) {
		const newMember = new this.memberModel({
			...member,
			user: user._id
		})

		newMember.save()
		return {message: 'Member has created'}
	}
	// delte a member
	public async deleteMember(id: string) {
		await this.memberModel.findByIdAndDelete({_id:  mongoose.Types.ObjectId(id)})
		return {message: 'Member has deleted'}
	}

	// change user data
	public async changeUserData(user, newData) {
		const data = {
			...newData
		}
		const findUser = await this.userModel.findOneAndUpdate(
			{_id: user._id},
			{$set: data},
			{new: true}
		)
		return { message: 'Data of user has changed' }
	}
}