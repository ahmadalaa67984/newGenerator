import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get welcome message for authenticated users' })
  @ApiResponse({ status: 200, description: 'Welcome message returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getWelcome(): { message: string } {
    return this.appService.getWelcome();
  }
} 