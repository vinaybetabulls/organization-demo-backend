import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { PasswordManipulation } from "./passowordHashing";


@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]) ],
    controllers: [UserController],
    providers: [UserService,CommonService, PasswordManipulation]
})

export class UserModule{}