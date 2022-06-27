
import { aws_lex as lex } from "aws-cdk-lib";
import { botEnOfficesSlots } from './bot-locale-en-slots'


const botEnIntentWelcome: lex.CfnBot.IntentProperty = {
  name: "Welcome",
  description: "Welcome Intent",
  sampleUtterances: [
    { utterance: "I need help" },
    { utterance: "Can you help me?" },
  ],
};
const botEnIntentTransfer: lex.CfnBot.IntentProperty = {
  name: "Transfer",
  description: "Transfer to offices",
  sampleUtterances: [{ utterance: "Transfer with my office" }],
  slots: [
    botEnOfficesSlots
  ],
  intentConfirmationSetting:{
    promptSpecification:{
      maxRetries:3,
      allowInterrupt:false,
      messageGroupsList:[
        {
          message:{
            plainTextMessage:{
              value: "Do you want to speak with {branchOffice}?"
            }
          }
        }
      ]
    },
    declinationResponse: {
      allowInterrupt:false,
      messageGroupsList:[
        {
          message:{
            plainTextMessage:{
              value:"I don't have all the data needed. Please wait meanwhile I transfer you to an agent"
            }
          }
        }
      ]
    }
  }
};

const botEnIntentFallback: lex.CfnBot.IntentProperty = {
  name: "FallbackIntent",
  description: "some des",
  parentIntentSignature: "AMAZON.FallbackIntent",
  intentClosingSetting: {
    closingResponse: {
      messageGroupsList: [
        {
          message: {
            plainTextMessage: {
              value: "I'm sorry. I can't understand you. You will be transferred to an agent",
            },
          },
        },
      ],
    },
  }
};

// Counter Reading 
const botEnIntentReading: lex.CfnBot.IntentProperty = {
  name: "Reading",
  description: "Welcome Intent",
  sampleUtterances: [
    { utterance: "I need help" },
    { utterance: "Can you help me?" },
  ],
};


export { botEnIntentWelcome, botEnIntentFallback, botEnIntentTransfer, botEnIntentReading };
