import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CtxUser = createParamDecorator(
	(data, ctx) => {
		// console.log(GqlExecutionContext.create(ctx).getContext().req.user)
		return GqlExecutionContext.create(ctx).getContext().req.user
	}
)