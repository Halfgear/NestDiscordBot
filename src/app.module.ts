import { Module } from "@nestjs/common";
import { BotModule } from "./bot/bot.module";
import { ConfigModule } from "@nestjs/config";
import { DelegateDiscordModule } from "./delegate.discord.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      // url: process.env.DATABASE_URL,
      url: "postgres://hwijoon:password@db/no_trollz_data_base",
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + "/data_base/*.entity.ts"],
    }),
    DelegateDiscordModule,
    BotModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}