
import { DesignationSchema } from "./schema/designation.schema";
import {  DesignationController } from "./designation.controller";
import {  DesignationService } from "./designation.service";
import {  DesignationCommonService } from "./designation.common.service";

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UtilService } from "../utils/util.service";
import { UtilModule } from "../utils/utiles.module";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Designation', schema: DesignationSchema}]),UtilModule ],
    controllers: [DesignationController],
    providers: [DesignationService, DesignationCommonService, UtilService]
})

export class DesignationModule{}