import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChainModule } from './chain/chain.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ChainModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
