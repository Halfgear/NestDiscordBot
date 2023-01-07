import { ApplicationCommandType } from 'discord.js';
import { BaseCommandOptions } from './base.commands.option';

/**
 * Describe base command options
 */
export interface CommandOptions extends BaseCommandOptions {
  /**
   * Command description (Must be a blank string for context menu commands)
   */
  description: string;

  /**
   * Localize description
   */
  descriptionLocalizations?: 'ko';

  /**
   * Slash command type
   *
   * @default ChatInput
   */
  type?: ApplicationCommandType.ChatInput;
}
