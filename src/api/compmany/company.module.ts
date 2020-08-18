import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CompanySchema } from "./schema/company.schema";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { CompanyCommonService } from "./company.common.service";
import { UtilService } from "../utils/util.service";
import { UtilModule } from "../utils/utiles.module";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Company', schema: CompanySchema}]), UtilModule ],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyCommonService, UtilService]
})

export class CompanyModule{}