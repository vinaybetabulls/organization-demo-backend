import { Injectable } from "@nestjs/common";
import { EmployeeCommonService } from "./employee.common.service";
import { EmployeeRequestDto } from "./dto/employee.request.dto";

@Injectable()
export class EmployeeService {
    constructor(private commonSerice: EmployeeCommonService) {}

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createEmployee(request: EmployeeRequestDto, createdBy: any) {
        try {
            return await this.commonSerice.createEmployee(request, createdBy);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param employeeId 
     */
    async getEmployeeById(employeeId: string) {
        try {
            return await this.commonSerice.getEmployeeById(employeeId);
        } catch (error) {
            throw error;
        }
    }

    async getAllEmployeesList() {
        try {
            return await this.commonSerice.getAllEmployeesList();
        } catch (error) {
            throw error;
        }
    }
}