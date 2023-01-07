import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GatewayIntentBits } from "discord.js";
import { BotModule } from "./bot/bot.module";
import { BaseInfoCommand } from "./bot/commands/rankup.command";

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get("TOKEN"),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
          ],
          registerCommandOptions: [
            {
              forGuild: configService.get("DISCORD_DEVELOPMENT_GUILD_ID"),
              removeCommandsBefore: true,
            },
          ],
          slashCommandsPermissions: [
            {
              commandClassType: BaseInfoCommand,
              permissions: [],
            },
          ],
        },
      }),
      inject: [ConfigService],
    }),
    BotModule,
  ],
})
export class DelegateDiscordModule {}
