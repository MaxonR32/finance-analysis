import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Member, MemberDocument } from '@full/b-profile'
import { Action, ActionDocument } from '@full/b-list'
import * as moment from 'moment'

@Injectable()
export class AnalyticsService {
	constructor(
		@InjectModel(Member.name) private memberModel: Model<MemberDocument>,
		@InjectModel(Action.name) private actionModel: Model<ActionDocument>
	) {
	}

	public async getAnalyticsDataMember(user) {
		const members = await this.memberModel.find({user: user._id})
		const actions = await this.actionModel.find({user: user._id})
		
		let valueMembers = []
		let globalValue = globalValueFunc(actions)
		// console.log(globalValue)
		let valueAnalyticsMember
	
		members.forEach(m => {
			valueAnalyticsMember = getValue(m._id, actions)
			let result = {
				member: m.name,
				profitValue: valueAnalyticsMember.profitValue,
				consumValue: valueAnalyticsMember.consumValue,
				pourcentConsum: ~~((valueAnalyticsMember.consumValue / globalValue.globalConsumValue) * 100)
			}
			valueMembers.push(result)
		})
		const dataOfDay = calculateDays() 

		return {
			valueMembers,
			globalValue,
			dataOfDay
		}
	}

	public async chartMemberMonth(user, month?) {
		const colorArr = ['#f55c47', '#4ca1a3', '#da7f8f', '#ffd56b', '#3edbf0', '#cf0000']

		// curent data of date
		const year = moment().year()
		const numberDaysCurrentMonth = moment().daysInMonth() 

		const members = await this.memberModel.find({user: user._id})
		const actions = await this.actionModel.find({user: user._id})
		// diferent avreviation
		const actionDate = (action) => moment(action.date)
		const setDate = (n) => moment().set({'month': n, 'date': 1})
		const getDayWithDate = (date) => moment(date).date()

		// filter action with Date
		const newActions = actions.filter(action => {
			if (actionDate(action) <= setDate(month+1) && actionDate(action) >= setDate(month)) {
				return action
			}
		})

		let finalResult = []
		let actionData = []

		// count for select color with array
		let cnt = -1
		members.forEach(member => {
			for(let i = 1; i < numberDaysCurrentMonth; i++) { // for all days in month
				let actions = newActions.filter(a => {
					if(JSON.stringify(a.member) == JSON.stringify(member._id)) {
						if(moment(a.date).date() == i) {
							return a
						}	
					}
					
				})
				// counting all action in one day
				let total = actions.reduce((totalPrice, a) => {
					return totalPrice += a.quantityMoney 
				}, 0)

				actionData.push(total)
			}
			cnt++
			let result = {
				member,
				actionData,
				color: colorArr[cnt]
			}
			
			actionData = []
			finalResult.push(result)
		})
		return finalResult
	}

}

function getValue(id, actions) {
	let profitValue = 0
	let consumValue = 0
	actions.forEach(i => {
		if(JSON.stringify(i.member) == JSON.stringify(id)) {
			if(i.profit) {
				profitValue += i.quantityMoney
			} else {
				consumValue += i.quantityMoney
			}
		}
	})
	return {
		profitValue,
		consumValue,
	}	
}

function globalValueFunc(actions) {
	let globalProfitValue = 0
	let globalConsumValue = 0
	actions.forEach(a => {
		if(a.profit) {
			globalProfitValue += a.quantityMoney
		} else {
			globalConsumValue += a.quantityMoney
		}
	})

	return {
		globalProfitValue,
		globalConsumValue
	}
} 

function calculateDays() {
	const day = moment().date()
	const year = moment().year()
	const month = moment().month() + 1
	const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()

	const percentBeforeEndMonth = (day / daysInMonth) * 100

	return {
		day,
		percentBeforeEndMonth
	}
}

function getActionsMap(actions = []) {
	actions.forEach(action => {

	})
}