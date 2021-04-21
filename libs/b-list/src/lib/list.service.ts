import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Action, ActionDocument } from './schemas/action.schema'
import { Member, MemberDocument } from '@full/b-profile'
import { Model } from 'mongoose'
import { UserModel } from '@full/b-auth'
import * as mongoose from 'mongoose'

@Injectable()
export class ListService {

	constructor(
		@InjectModel(Action.name) private actionModel: Model<ActionDocument>,
		@InjectModel(Member.name) private memberModel: Model<ActionDocument>

	) {}

	public async getList(user: UserModel) {
		const list = await this.actionModel.find()
		// console.log(list)
		return list
	}

	public async addAction(action, user) {
		const memberFind = await this.memberModel.findOne({_id: mongoose.Types.ObjectId(action.member)})

		// console.log(user)
		const newAction = new this.actionModel({
			...action,
			user: user._id,
			memberName: memberFind?.name,
		})
		newAction.save()
		// console.log('newAction', newAction)
		return newAction
	}

}