import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): { message: string } {
    return { message: 'Welcome to the application' };
  }
} 