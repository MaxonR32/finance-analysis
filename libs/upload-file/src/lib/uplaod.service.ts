import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
	async messageSaveImg() {
		console.log('Food')
		return 'Message jas saved'
	}
}