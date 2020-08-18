import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { EmployeeInterace } from "./interfaces/employee.interface";
import { EmployeeRequestDto } from "./dto/employee.request.dto";

@Injectable()
export class EmployeeCommonService {
    constructor(@InjectModel('Employee') private employeeModel: Model<EmployeeInterace>){}

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createEmployee(request: EmployeeRequestDto, createdBy: any) {
        request.employeeId = uuidv4();
        const payload = { ...request, createdBy };
        const employee = new this.employeeModel(payload);
        return await employee.save();
    }
    
    /**
     * 
     * @param employeeId 
     */
    async getEmployeeById(employeeId: string) {
        return await this.employeeModel.findOne({employeeId});
    }

    async getAllEmployeesList() {
        return await this.employeeModel.find({}).sort({employeeFirstName: 1});
    }
}