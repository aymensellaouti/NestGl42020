import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    console.log('From Logger Middleware Request ip is:', req.headers);
    next();
  }
}
