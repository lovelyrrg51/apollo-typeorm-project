import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from "./user";

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  // https://github.com/typeorm/typeorm/issues/1139 MySQLでPrimaryGeneratedColumnにUUIDは未対応
  // @PrimaryGeneratedColumn("uuid", { length: 36 })
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  public id!: number;

  @ManyToOne(type => User, user => user.todos)
  @Field(type => User)
  public user!: User;

  @Column()
  @Field()
  public title!: string;

  @Column("text")
  @Field()
  public content?: string;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  public readonly updatedAt!: Date;
}