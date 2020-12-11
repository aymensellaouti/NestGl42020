import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './middlwares/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [
    TestModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(HelmetMiddleware).forRoutes('')
      .apply(LoggerMiddleware).forRoutes('')
    ;
  }
}
