import { Module } from "@nestjs/common";
import { OrganizationSchema } from "./schema/organization.schema";
import { OrganizationContoller } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonService } from "./common.service";
import { UtilModule } from "../utils/utiles.module";
import { UtilService } from "../utils/util.service";
import { AwsService } from "../aws/awsS3";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}]), UtilModule ],
    controllers: [OrganizationContoller],
    providers: [OrganizationService, CommonService, UtilService, AwsService]
})

export class OrganizationModule{}