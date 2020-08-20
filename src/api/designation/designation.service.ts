
import { DesignationCommonService } from "./designation.common.service";
import { DesignationRequestDto } from "./dto/designation.request.dto";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";



@Injectable()

export class DesignationService {
    constructor(private commonService: DesignationCommonService) { }

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createDesignation(request: DesignationRequestDto, createdBy: any) {
        try {
            const designationName = (request.designationName).toLowerCase();
            await this.commonService.isDesignationAlredyExists(designationName);
            return await this.commonService.createDesignation(request, createdBy);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param designationId 
     */
    async getDesignationById(designationId: string) {
        try {
            const designation =  await this.commonService.getDesignationById(designationId);
            if (!designation) throw new HttpException('Designation not found', HttpStatus.NOT_FOUND);
            else return designation;
        } catch (error) {
            throw error;
        }
    }

    async getAllDesignationsList() {
        try {
            return this.commonService.getAllDesignationsList();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param designationId 
     */
    async deleteDesignationById(designationId: string): Promise<any> {
        try {
            const isExists = await this.commonService.getDesignationById(designationId);
            if (!isExists) throw new HttpException('Designation not found', HttpStatus.NOT_FOUND);
            return await this.commonService.deleteDesignationById(designationId);
        } catch (error) {
            throw error;
        }
    }
}