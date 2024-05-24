// auth.service.ts

import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import { User } from './user-entities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
   
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
      

  async register(registerDto: RegisterDto) {
    const { name, email, password, shippingAddress } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      shippingAddress,
    });
    await this.userRepository.save(user);

    // Omit the password field from the response
    const { password: _, ...result } = user;
    return result;
  }

  

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });

    // If user doesn't exist or password doesn't match, throw UnauthorizedException
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.password };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  }

