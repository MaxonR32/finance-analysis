import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { CoreModule } from '@full/core'
import { BAuthModule } from '@full/b-auth'
import { BProfileModule } from '@full/b-profile'
import { DateScalar } from '@full/b-auth'
import { UploadFileModule } from '@full/upload-file'
import { BListModule } from '@full/b-list'
import { BAnalyticsModule } from '@full/b-analytics'


@Module({
  imports: [
  	CoreModule,
  	BAuthModule,
  	BProfileModule,
    UploadFileModule,
    BListModule,
    BAnalyticsModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
