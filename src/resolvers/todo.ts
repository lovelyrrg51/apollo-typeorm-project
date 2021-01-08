import { Resolver, Query, InputType, Field, Arg, Ctx, Mutation } from 'type-graphql';
import { User } from "../models";
import { Context } from "apollo-server-core";

import { tracer } from "../tracer";

@InputType({ description: "New User Argument" })
class AddUserInput implements Partial<User> {
  @Field()
  name!: string;
}


@InputType({ description: "Update User Argument" })
class UpdateUserInput implements Partial<User> {
  @Field()
  id!: number;
  @Field()
  name!: string;
}

@Resolver()
export class TodoAppResolver {
  @Query(returns => User, { nullable: true })
  async user(@Arg("id") id: number): Promise<User | undefined> {
    const span = tracer.startSpan("User.findOne");
    const user = User.findOne(id);
    span.log({ user });
    span.finish();
    return user;
  }

  @Mutation(returns => User)
  async addUser(@Arg("data") newUser: AddUserInput, @Ctx() ctx: Context): Promise<User> {
    const span = tracer.startSpan("User.create");
    let user = User.create(newUser);
    user = await user.save();
    span.log({ user });
    span.finish();
    return user;
  }

  @Mutation(returns => User, { nullable: true })
  async updateUser(@Arg("data") updateUser: UpdateUserInput, @Ctx() ctx: Context): Promise<User | null> {
    const user = await User.findOne(updateUser.id);
    if (user !== undefined) {
      user.name = updateUser.name;
      return await user.save();
    }
    return null;
  }
}