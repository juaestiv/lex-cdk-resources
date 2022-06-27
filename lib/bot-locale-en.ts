import { aws_lex as lex } from "aws-cdk-lib";
import {
  botEnIntentWelcome,
  botEnIntentFallback,
  botEnIntentTransfer
} from "./bot-locale-en-intents";
import { botEnSlotTypeOffice, botEnSlotTypeDNI } from "./bot-locale-en-slot-types";

const botEnLocaleProperty: lex.CfnBot.BotLocaleProperty = {
  localeId: "en_US",
  nluConfidenceThreshold: 0.4,
  description: "description",
  slotTypes: [
    botEnSlotTypeOffice,
    botEnSlotTypeDNI
  ],
  intents: [
    botEnIntentWelcome, 
    botEnIntentFallback,
    botEnIntentTransfer
  ],
};

export { botEnLocaleProperty };
