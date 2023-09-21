import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { SaveUser } from 'src/common/decorator/SaveUser';
import { tokenPayload } from 'src/common/types/payload.token';
import { TokenGuard } from 'src/common/util/token.guards';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JobService } from './job.service';
import { JobDto } from './dto';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  create(@Body() dto: JobDto, @SaveUser() user: tokenPayload) {
    return this.jobService.createjob(dto, user.userId);
  }

  @Get('seller/all/:userId')
  getSellerJobs(
    @SaveUser() user: tokenPayload,
    @Param('userId') userId: string,
  ) {
    return this.jobService.getSellerJobs(userId);
  }

  @Get('/all')
  allJobs(
    @SaveUser() user: tokenPayload,
    @Query('page') page: string,
    @Query('name') name: string,
    @Query('price') price: string,
    @Query('categories') categories: string,
  ) {
    return this.jobService.jobsTimiline(page, name, price, categories);
  }

  @Get('/:jobId')
  @UseGuards(TokenGuard)
  @Roles(Role.Buyer, Role.Seller)
  getSingleJob(@SaveUser() user: tokenPayload, @Param('jobId') jobId: string) {
    return this.jobService.singleJob(jobId);
  }

  @Get('details/:jobId')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  getJobDetails(@SaveUser() user: tokenPayload, @Param('jobId') jobId: string) {
    return this.jobService.jobDetails(jobId, user.userId);
  }

  @Put('close/:jobId')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  closeJob(@SaveUser() user: tokenPayload, @Param('jobId') jobId: string) {
    return this.jobService.closeJob(jobId, user.userId);
  }

  @Put('delivery/:jobId')
  @UseGuards(TokenGuard)
  @Roles(Role.Seller)
  deliveryJob(@SaveUser() user: tokenPayload, @Param('jobId') jobId: string) {
    return this.jobService.deliveryJob(jobId, user.userId);
  }
}
