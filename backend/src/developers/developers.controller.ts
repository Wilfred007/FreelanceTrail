import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { ReputationAnalystService } from '../ai/reputation-analyst.service';
import { connectSchema, type ConnectDto } from './dto/connect.dto';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly reputationAnalyst: ReputationAnalystService,
  ) {}

  @Post('connect')
  @UsePipes(new ZodValidationPipe(connectSchema))
  connect(@Body() dto: ConnectDto) {
    return this.developersService.connect(dto.walletAddress);
  }

  @Get(':id/passport')
  getPassport(@Param('id') id: string) {
    return this.developersService.getPassport(id);
  }

  @Post(':id/reputation')
  generateReputation(@Param('id') id: string) {
    return this.reputationAnalyst.generate(id);
  }
}
