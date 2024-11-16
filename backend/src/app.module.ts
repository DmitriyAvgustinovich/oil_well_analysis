import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './utils/db/prisma.service';
import { PasswordService } from './utils/password/password.service';
import { CookieService } from './utils/cookie/cookie.service';
import { JwtService } from '@nestjs/jwt';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [PrismaService, PasswordService, CookieService, JwtService],
})
export class AppModule {}
