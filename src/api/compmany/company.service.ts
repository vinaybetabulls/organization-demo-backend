import { Injectable } from "@nestjs/common";
import { CompanyRequestDto } from "./dto/company.request.dto";
import { CompanyCommonService } from "./company.common.service";


@Injectable()
export class CompanyService {
    constructor(private commonSerice: CompanyCommonService){}

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createCompany(request: CompanyRequestDto, createdBy: any) {
        try {
            return await this.commonSerice.createCompany(request, createdBy);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyId 
     */
    async getCompanyById(companyId: string) {
        try {
            return await this.commonSerice.getCompanyById(companyId);
        } catch (error) {
            throw error;
        }
    }

    async getAllCompaniesList() {
        try {
            return await this.commonSerice.getAllCompaniesList();
        } catch (error) {
            throw error;
        }
    }
}