
import { aws_lex as lex } from "aws-cdk-lib";
import { botEnLocaleProperty } from "./bot-locale-en";
import {botEsIntentWelcome, botEsIntentFallback, botEsIntentTransfer, botEsIntentReading } from "./bot-locale-es-intents"
import { botEsSlotTypeOffice, botEsSlotTypeDNI } from './bot-locale-es-slot-types'

const botEsLocaleProperty: lex.CfnBot.BotLocaleProperty = {
  localeId: "es_ES",
  nluConfidenceThreshold: 0.4,
  description: "Descripción",
  slotTypes: [
    botEsSlotTypeOffice, 
    botEsSlotTypeDNI
  ],

  intents: [
    botEsIntentWelcome, 
    botEsIntentFallback, 
    botEsIntentTransfer,
    botEsIntentReading
  ],
  
};



export { botEsLocaleProperty };
