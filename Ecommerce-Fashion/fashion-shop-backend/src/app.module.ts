import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    // Configuración global CON VALIDACIÓN
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
      validate, // 🔥 Valida el .env al iniciar la app
    }),

    // TypeORM con configuración asíncrona ESTRICTA
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get<TypeOrmModuleOptions>('database');
        
        if (!dbConfig) {
          throw new Error('Database configuration not found');
        }

        return dbConfig;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}