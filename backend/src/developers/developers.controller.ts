import { Controller, Get, Param } from '@nestjs/common';
import { DevelopersService } from './developers.service';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get(':id/passport')
  getPassport(@Param('id') id: string) {
    return this.developersService.getPassport(id);
  }
}
