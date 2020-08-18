import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import config from './config/'
import { UserModule } from './api/user/user.module';
import { OrganizationModule } from './api/organization/organization.module';
import { CompanyModule } from './api/compmany/company.module';
import { DepartmentModule } from './api/department/department.module';
import { DesignationModule } from './api/designation/designation.module';
import { EmployeeModule } from './api/employee/employee.module';
import { UtilModule } from './api/utils/utiles.module';
@Module({
  imports: [MongooseModule.forRoot(config.dbURL, { dbName: process.env.DB_NAME, user: process.env.DB_USER_NAME, pass: process.env.DB_PASSWORD,useNewUrlParser: false }), UserModule , OrganizationModule, CompanyModule, DepartmentModule, DesignationModule, EmployeeModule, UtilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
