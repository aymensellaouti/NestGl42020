import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FirstPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Todo mettre le code nécessaire
    return value;
  }
}
