import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DepartmentCommonService } from "./department.common.service";
import { DepartmentRequestDto } from "./dto/department.request.dto";



@Injectable()

export class DepartmentService {
    constructor(private commonService: DepartmentCommonService) { }

    /**
     * 
     * @param request 
     * @param createdBy 
     */
    async createDepartment(request: DepartmentRequestDto, createdBy: any) {
        try {
            const departmentName = (request.departmentName).toLowerCase();
            await this.commonService.isDepartmentAlreadyExists(departmentName);
            return await this.commonService.createDepartment(request, createdBy);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param departmentId 
     */
    async getDepartmentById(departmentId: string) {
        try {
            const department = await this.commonService.getDepartmentById(departmentId);
            if (!department) throw new HttpException('Department Id Not Found', HttpStatus.NOT_FOUND);
            else return department;
        } catch (error) {
            throw error;
        }
    }

    async getAllDepartmentList() {
        try {
            return this.commonService.getAllDepartmentsList();
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param departmentId 
     */
    async deleteDepartmentById(departmentId: string): Promise<any> {
        const department = await this.commonService.getDepartmentById(departmentId);
        if (!department) throw new HttpException('Department Id Not Found', HttpStatus.NOT_FOUND);
        return await this.commonService.deleteDepartmentById(departmentId);
    }
}