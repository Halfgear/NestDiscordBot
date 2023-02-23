import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotGateway } from './bot.gateway';
import { BaseInfoCommand } from './commands/rankup.command';
import { TeamAddRequest } from './commands/teamRequest.command';
import { notrollz_entity } from '../data_base/notrollz_db.entity';
import { UsersService } from './bot.service';
import { DataSource } from 'typeorm';
@Module({
  imports: [DiscordModule.forFeature(),
    TypeOrmModule.forFeature([notrollz_entity]),
  ],
  exports: [TypeOrmModule],
  providers: [BotGateway, 
    BaseInfoCommand, 
    //TeamAddRequest
    UsersService,
  ],
})
export class BotModule { 
  constructor(private dataSource: DataSource) { }
}
