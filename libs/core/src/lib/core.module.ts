import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { CoreResolver } from './core.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { BProfileModule } from '@full/b-profile'
import { BListModule } from '@full/b-list'
import { BAuthModule } from '@full/b-auth'
import { BAnalyticsModule } from '@full/b-analytics'

@Module({
	imports: [
		// ServeStaticModule.forRoot({
	 //      rootPath: join(__dirname, '../../../', '/uploads'),
	 //    }),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validationSchema,
		}),
		GraphQLModule.forRoot({
			include: [
				BProfileModule,
				BListModule,
				BAuthModule,
				BAnalyticsModule
			],
			autoSchemaFile: true,
			playground: true,
			installSubscriptionHandlers: true,
			uploads: true,
			context: ({req}) => req
			}),
		MongooseModule.forRoot(
			process.env.MONGOOSE_CONECTION,
			{ useFindAndModify: false }
		)
	],
  	controllers: [],
  	providers: [CoreResolver],
  	exports: [],
})
export class CoreModule {}
