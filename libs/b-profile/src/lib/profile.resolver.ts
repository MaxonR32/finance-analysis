import { UseGuards, UseInterceptors, UploadedFile, Headers } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { GqlAuthGuard, User, CtxUser, UserModel } from '@full/b-auth'
import { ProfileService } from './profile.service'
import { Args } from '@nestjs/graphql'
import { ImgSrcModel } from './models/imageSrc.model'
import { MemberModel } from './models/member.model'
import { UserMemberModel } from './models/user-member.model'
import { GlobalMessageModel } from './models/global-message.model'
import { MemberInput } from './inputs/member.input'
import { NewDataUserInput } from './inputs/new-data-user.input'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProfileResolver {

	constructor(private readonly profileService: ProfileService) {}	

	// get user data
	@Query(() => UserMemberModel)
	getProfileData(@CtxUser() user: UserModel) {
		return this.profileService.getProfileData(user)
	}

	// save new Image when change avatar
	@Mutation(() => ImgSrcModel)
	saveImgSrc(
		@CtxUser() user: UserModel,
		@Args({name: 'imageSrc', type: () => String}) imageSrc
	) {
		return this.profileService.saveImgSrc(user, imageSrc)
	}

	// createMemebr
	@Mutation(() => GlobalMessageModel)
	createMember(
		@CtxUser() user: UserModel,
		@Args({name: 'member', type: () => MemberInput}) member: MemberInput
	) {
		return this.profileService.createMember(member, user)
	}

	// delete member
	@Mutation(() => GlobalMessageModel)
	deleteMember(@Args({name: 'id', type: () => String}) id: string) {
		return this.profileService.deleteMember(id)		
	}

	// cahngeUserData
	@Mutation(() => GlobalMessageModel)
	changeUserData(
		@CtxUser() user: UserModel,
		@Args({name: 'newData', type: () => NewDataUserInput}) newData: NewDataUserInput
	) {
		return this.profileService.changeUserData(user, newData)
	}
}