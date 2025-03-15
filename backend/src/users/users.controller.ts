import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user (Signup)' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiBody({ schema: { properties: { name: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' } } } })
  async signup(@Body() data: { name: string; email: string; password: string }) {
    return this.usersService.signup(data.name, data.email, data.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Returns JWT token' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  async login(@Body() data: { email: string; password: string }) {
    return this.usersService.login(data.email, data.password);
  }
}
