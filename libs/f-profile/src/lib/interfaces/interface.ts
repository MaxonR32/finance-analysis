export interface ActionInterface {
	comment?: string
	profit: boolean 
	quantityMoney: number
	date: Date
	member: string
	memberName: string
}

export interface ListTable {
	date: Date
	comment?: string
	profit: boolean
	quantityMoney: number
	member: number
}

export interface MemberInterface {
	name: string
	who: string
	age: number
}

export interface AnalyticsMember {
	member: string
	profitValue?: number
    consumValue?: number
    pourcentConsum?: number
}

export interface DataOfDay {
	day: number
	percentBeforeEndMonth: number
}