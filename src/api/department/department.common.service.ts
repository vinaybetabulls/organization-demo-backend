import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { DepartmentInterace } from "./interface/department.interface.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DepartmentRequestDto } from "./dto/department.request.dto";

import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class DepartmentCommonService {
    constructor(@InjectModel('Department') private departmentModel: Model<DepartmentInterace>) { }

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createDepartment(request: DepartmentRequestDto, createdBy: any) {
        request.departmentId = uuidv4();
        request.departmentName = (request.departmentName).toLowerCase();
        const payload = { ...request, createdBy };
        const department = new this.departmentModel(payload);
        return await department.save();
    }

    /**
     * 
     * @param departmentId 
     */
    async getDepartmentById(departmentId: string) {
        return await this.departmentModel.findOne({ departmentId });
    }

    /**
     * 
     */
    async getAllDepartmentsList() {
        return await this.departmentModel.find({}).sort({departmentName: 1});
    }

    /**
     * 
     * @param departmentName 
     * @returns boolean
     */
    async isDepartmentAlreadyExists(departmentName: string) {
        const department =  await this.departmentModel.find({departmentName: departmentName});
        if(department.length > 0) throw new HttpException('Department already exists', HttpStatus.CONFLICT);
        return false;
    }

    /**
     * 
     * @param departmentId 
     */
    async deleteDepartmentById(departmentId: string) {
        return await this.departmentModel.deleteOne({departmentId});
    }
}