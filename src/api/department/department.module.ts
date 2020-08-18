import { Module } from "@nestjs/common";
import { DepartmentSchema } from "./schema/department.schema";
import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";
import { DepartmentCommonService } from "./department.common.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UtilModule } from "../utils/utiles.module";
import { UtilService } from "../utils/util.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Department', schema: DepartmentSchema}]), UtilModule ],
    controllers: [DepartmentController],
    providers: [DepartmentService, DepartmentCommonService, UtilService]
})

export class DepartmentModule{}