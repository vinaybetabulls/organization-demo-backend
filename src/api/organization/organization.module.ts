import { Module } from "@nestjs/common";
import { OrganizationSchema } from "./schema/organization.schema";
import { OrganizationContoller } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonService } from "./common.service";
import { PasswordManipulation } from "../user/passowordHashing";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}]) ],
    controllers: [OrganizationContoller],
    providers: [OrganizationService, CommonService, PasswordManipulation]
})

export class OrganizationModule{}