import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('test')
export class TestController {

  @Get('')
  get(): string {
    console.log('Get TEST');
    return 'Get Test';
  }
  @Post('')
  post(): string {
    console.log('Post TEST');
    return 'Post Test';
  }
  @Put('')
  put(): string {
    console.log('PUT TEST');
    return 'PUT Test';
  }
  @Delete('')
  delete(): string {
    console.log('Delete TEST');
    return 'Delete Test';
  }


}
