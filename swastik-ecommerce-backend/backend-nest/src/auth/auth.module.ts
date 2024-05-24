// auth.module.ts

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { User } from './user-entities';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     JwtModule.register({}), 
//     ConfigModule.forRoot(),],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { User } from './user-entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // Add any other JWT options here
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
