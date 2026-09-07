import { Controller, Get, Param, Post } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { ReputationAnalystService } from '../ai/reputation-analyst.service';

@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly reputationAnalyst: ReputationAnalystService,
  ) {}

  @Get(':id/passport')
  getPassport(@Param('id') id: string) {
    return this.developersService.getPassport(id);
  }

  @Post(':id/reputation')
  generateReputation(@Param('id') id: string) {
    return this.reputationAnalyst.generate(id);
  }
}
