import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CookieService } from 'src/utils/cookie/cookie.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signup.dto';
import { GetSessionInfoDto } from './dto/get.session.info.dto';
import { SessionInfo } from './decorator/session-info.decorator';
import { UserResponseDto } from './dto/response.user.info.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.surname,
      signUpDto.name,
      signUpDto.lastname,
      signUpDto.avatarUrl,
    );

    this.cookieService.setToken(res, token);
    return { ...user };
  }

  @Post('sign-in')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    this.cookieService.setToken(res, token);
    return { ...user };
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOkResponse()
  async signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
    return { message: 'Вы вышли из системы' };
  }

  @Get('session')
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @UseGuards(AuthGuard)
  async getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return await this.authService.getSessionInfo(session.id);
  }
}
