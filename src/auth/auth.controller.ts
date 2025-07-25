import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { SigninDto } from "./dto/signin.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: "User successfully created and logged in",
  })
  @ApiResponse({ status: 400, description: "Validation error" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const result = await this.authService.signup(signupDto);

      this.logger.log(`User registered successfully: ${signupDto.email}`);

      return {
        message: "User created successfully",
        user: result.user,
      };
    } catch (error) {
      this.logger.error(`Signup failed for ${signupDto.email}:`, error.message);
      throw error;
    }
  }

  @Post("signin")
  @ApiOperation({ summary: "Sign in an existing user" })
  @ApiBody({ type: SigninDto })
  @ApiResponse({ status: 200, description: "User successfully signed in" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const result = await this.authService.signin(signinDto);

      this.logger.log(`User signed in successfully: ${signinDto.email}`);

      return {
        message: "Signed in successfully",
        user: result.user,
      };
    } catch (error) {
      this.logger.error(`Signin failed for ${signinDto.email}:`, error.message);
      throw error;
    }
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout user by clearing JWT cookie" })
  @ApiResponse({ status: 200, description: "User successfully logged out" })
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");
    this.logger.log("User logged out successfully");
    return { message: "Logged out successfully" };
  }
}
