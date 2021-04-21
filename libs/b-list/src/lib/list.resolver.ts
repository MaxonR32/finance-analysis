import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Subscription, Mutation, Args } from '@nestjs/graphql'
import { ListService } from './list.service'
import { ActionModel } from './models/action.model'
import { CtxUser, UserModel, GqlAuthGuard } from '@full/b-auth'
import { GlobalMessageModel } from '@full/b-profile'
import { PubSub } from 'graphql-subscriptions'
import { ActionInput } from './inputs/action.input'


@Resolver()
@UseGuards(GqlAuthGuard)
export class ListResovler {
   private pubSub: PubSub
   constructor(private readonly listService: ListService) {
      this.pubSub = new PubSub()
   }

   @Query(() => [ActionModel])
   getList(
         @CtxUser() user: UserModel
      ) {
      const list = this.listService.getList(user)
       this.pubSub.publish('getListLive', {getListLive: list})
       return list
      }

   

   @Mutation(() => ActionModel)
   addAction(
      @CtxUser() user: UserModel,
      @Args({name: 'action', type: () => ActionInput}
   ) action: ActionInput) {
      const newAction = this.listService.addAction(action, user)
      this.pubSub.publish('getListLive', { getListLive: newAction })
      return newAction
   }

   @Subscription(returns => [ActionModel])
   getListLive() {
      return this.pubSub.asyncIterator('getListLive') 
   }

   @Mutation(returns => GlobalMessageModel)
   example() {
      const mes = {
         message: 'Example'
      }
      this.pubSub.publish('getListLive', { getListLive:  mes})
      return mes
   }
}