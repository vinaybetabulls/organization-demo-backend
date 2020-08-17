import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PasswordManipulation } from "../user/passowordHashing";
import { CompanySchema } from "./schema/company.schema";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { CompanyCommonService } from "./company.common.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Company', schema: CompanySchema}]) ],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyCommonService, PasswordManipulation]
})

export class CompanyModule{}