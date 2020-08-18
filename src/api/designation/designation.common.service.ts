
import { Model } from "mongoose";
import { DesignationInterace } from "./interface/designation.interface.dto";
import { DesignationRequestDto } from "./dto/designation.request.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';




@Injectable()
export class DesignationCommonService {
    constructor(@InjectModel('Designation') private designationModel: Model<DesignationInterace>) { }

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createDesignation(request: DesignationRequestDto, createdBy: any) {
        request.designationId = uuidv4();
        const payload = { ...request, createdBy };
        const designation = new this.designationModel(payload);
        return await designation.save();

    }

    /**
     * 
     * @param designationId 
     */
    async getDesignationById(designationId: string) {
        return await this.designationModel.findOne({ designationId });
    }

    /**
     * 
     */
    async getAllDesignationsList() {
        return await this.designationModel.find({});
    }
}