import { ChangeLog } from "@bot/changelog";
import { Logger } from "@bot/logger";
import { BehaviorContext } from "@common/behavior-context";
import { BehaviorResponse } from "@common/behavior-response";
import { BehaviorBase } from "@common/behavior.base";
import { BehaviorStatsBase } from "@common/stats-base";
import { Injectable } from "injection-js";
import { toPairs } from "lodash";

/** A ping-pong behavior for testing. */
@Injectable()
export class StatsBehavior extends BehaviorBase {
  constructor(
    private readonly changelog: ChangeLog,
    private readonly statsProvider: BehaviorStatsBase,
    logger: Logger,
  ) {
    super(logger);
  }

  public async onTaggedMessage(trigger: any, content: string, context: BehaviorContext): Promise<BehaviorResponse | null> {
    if (content.startsWith('stats') || content.startsWith('help')) {
      this.logger.trackMessageEvent("stats", trigger);
      const stats = await this.statsProvider.getStats();
      const statsPairs = toPairs(stats);
      const statsArray = statsPairs.map(([name, value]) => `**${name}:** ${value}`);
      const contentArray = [
        '',
        ...statsArray,
        '',
        '- Docs at <http://rollem.rocks>',
        '- Try `@rollem changelog`',
        '- v2 syntax is in the works',
        '',
        "Fund rollem's server addiction:",
        '- <https://patreon.com/david_does>',
        '- <https://ko-fi.com/rollem>',
        '',
        'Avatar by Kagura on Charisma Bonus.'
      ];
      const response = contentArray.join('\n');

      return {
        response: response,
      };
    } else {
      return null;
    }
  }

  public async onUntaggedMessage(trigger: any, content: string, context: BehaviorContext): Promise<BehaviorResponse | null> {
    return null;
  }
}
