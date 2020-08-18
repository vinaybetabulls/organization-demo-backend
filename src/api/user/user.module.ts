import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { PasswordManipulation } from "./passowordHashing";
import { AwsService } from "../aws/awsS3";
import { UtilModule } from "../utils/utiles.module";
import { UtilService } from "../utils/util.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), UtilModule ],
    controllers: [UserController],
    providers: [UserService,CommonService, PasswordManipulation, AwsService, UtilService]
})

export class UserModule{}