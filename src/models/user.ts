import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql'
import { Todo } from "./todo";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  // https://github.com/typeorm/typeorm/issues/1139 MySQLでPrimaryGeneratedColumnにUUIDは未対応
  // @PrimaryGeneratedColumn("uuid", { length: 36 })
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  public id!: number;

  @Column()
  @Field()
  public name!: string;

  @OneToMany(type => Todo, todo => todo.user)
  @Field(type => [Todo])
  public todos?: Todo[];

  @CreateDateColumn({ type: "timestamp" })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public readonly updatedAt!: Date;
}
