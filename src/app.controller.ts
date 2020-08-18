import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health Check')
  @Get()
  @ApiOperation({summary: 'Api Health Check'})
  getHello(): string {
    return this.appService.getHello();
  }
}
