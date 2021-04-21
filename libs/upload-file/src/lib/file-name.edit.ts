	import * as moment from 'moment'

export const editImgName = (req, file, callback) => {
	const date = moment().format('DDMMYYYY-HHmmss_SSS')
	callback(null, `${date}-${file.originalname}`)
}