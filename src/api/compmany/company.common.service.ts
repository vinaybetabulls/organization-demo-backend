import { Injectable } from "@nestjs/common";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { CompanyInterace } from "./interfaces/company.interface";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Model } from "mongoose";

@Injectable()
export class CompanyCommonService {
    constructor(@InjectModel('Company') private companyModel: Model<CompanyInterace>){}

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createCompany(request: CompanyRequestDto, createdBy: any) {
        request.companyId = uuidv4();
        const payload = {...request, createdBy}
        const company = new this.companyModel(payload);
        return await company.save();
    }

    /**
     * 
     * @param companyId 
     */
    async getCompanyById(companyId: string) {
        return await this.companyModel.findOne({companyId});
    }

    async getAllCompaniesList() {
        return await this.companyModel.find({});
    }
}