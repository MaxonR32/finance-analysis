import { Field, InputType } from '@nestjs/graphql'
import { Stream } from 'stream'

@InputType()
export class UploadInput {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => Stream
}