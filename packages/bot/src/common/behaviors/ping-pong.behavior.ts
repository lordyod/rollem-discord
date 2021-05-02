import { BehaviorContext } from "@common/behavior-context";
import { BehaviorResponse } from "@common/behavior-response";
import { BehaviorBase } from "@common/behavior.base";
import { Injectable } from "injection-js";

/** A ping-pong behavior for testing. */
@Injectable()
export class PingPongBehavior extends BehaviorBase {
  public async onTaggedMessage(trigger: any, content: string, context: BehaviorContext): Promise<BehaviorResponse | null> {
    if (content.startsWith('ping')) {
      this.logger.trackMessageEvent("ping", trigger);

      return {
        response: "pong",
      };
    } else {
      return null;
    }
  }

  public async onUntaggedMessage(trigger: any, content: string, context: BehaviorContext): Promise<BehaviorResponse | null> {
    return null;
  }
}