import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { matchRequestSchema, type MatchRequestDto } from './dto/match-request.dto';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(matchRequestSchema))
  match(@Body() dto: MatchRequestDto) {
    return this.matchingService.match(dto.requirement);
  }
}
