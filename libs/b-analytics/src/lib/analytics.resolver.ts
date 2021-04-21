import { Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@full/b-auth'

@Resolver()
@UseGuards(AuthGuard)
