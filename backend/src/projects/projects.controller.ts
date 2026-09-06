import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectSchema, type CreateProjectDto } from './dto/create-project.dto';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProjectSchema))
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
