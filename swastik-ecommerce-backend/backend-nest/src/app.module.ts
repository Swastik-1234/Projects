
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user-entities';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';
import { ProductModule } from './products/product.module';
import {Products} from './products/product.entities'
import { OrderController } from './ordres/orders.controller';
import { OrderService } from './ordres/orders.service';
import { OrderModule } from './ordres/orders.module';
import { Order } from './ordres/orders.entities';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([User,Products,Order]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), 
        port: configService.get<number>('DB_PORT'), 
        username: configService.get<string>('DB_USERNAME'), 
        password: configService.get<string>('DB_PASSWORD'), 
        database: configService.get<string>('DB_NAME'),
        entities: [User,Products,Order], 
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get JWT secret from ConfigService
        signOptions: { expiresIn: '1h' }, // Set JWT expiration time
      }),
    }),
  ],
  controllers: [AppController,ProductController,OrderController],
  providers: [AppService,ProductService,OrderService],
})
export class AppModule {
  // constructor(private readonly configService: ConfigService) {
  //   Logger.debug(this.configService.get<object>('')); // Log all environment variables for debugging
  // }
}



