import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { EmployeeCommonService } from "./employee.common.service";
import { EmployeeSchema } from "./schema/employee.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UtilService } from "../utils/util.service";
import { UtilModule } from "../utils/utiles.module";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Employee', schema: EmployeeSchema}]), UtilModule ],
    controllers: [EmployeeController],
    providers: [UtilService, EmployeeService, EmployeeCommonService]
})

export class EmployeeModule{}