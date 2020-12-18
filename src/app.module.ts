import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './middlwares/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { TodoEntity } from './todo/entities/todo.entity';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    TestModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(HelmetMiddleware).forRoutes('')
      .apply(LoggerMiddleware).forRoutes('')
    ;
  }
}
