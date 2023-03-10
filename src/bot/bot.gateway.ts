import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} started!`);
  }

  @On('error')
  onError(error) {
    this.logger.error(`Bot encountered error: ${error}`);
  }

  @On('connectionError')
  onConnectionError(error) {
    this.logger.error(`Bot encountered connection error: ${error}`);
  }
}
