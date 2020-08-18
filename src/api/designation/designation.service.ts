
import {  DesignationCommonService } from "./designation.common.service";
import {  DesignationRequestDto } from "./dto/designation.request.dto";
import { Injectable } from "@nestjs/common";



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
            return await this.commonService.createDesignation(request, createdBy);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param designationtId 
     */
    async getDesignationById(designationtId: string) {
        try {
            return await this.commonService.getDesignationById(designationtId);
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
}