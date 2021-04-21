import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		// console.log(ctx.getContext().req)
		return ctx.getContext().req
	}
}