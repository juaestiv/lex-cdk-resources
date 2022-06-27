import { aws_lex as lex } from "aws-cdk-lib";
import { platform } from "os";
import { botEsOfficesSlots, botEsDNISlot, botEsDNIRegSlot } from './bot-locale-es-slots'

const botEsIntentWelcome: lex.CfnBot.IntentProperty = {
  name: "Welcome",
  description: "Intent Bienenida",
  sampleUtterances: [{ utterance: "Necesito ayuda" }]

};

const botEsIntentTransfer: lex.CfnBot.IntentProperty = {
  name: "Transfer",
  description: "Transferencia a oficinas",
  sampleUtterances: [{ utterance: "Pásame con mi oficina" }],
  slots: [
    botEsOfficesSlots
  ],
  intentConfirmationSetting:{
    promptSpecification:{
      maxRetries:3,
      allowInterrupt:false,
      messageGroupsList:[
        {
          message:{
            plainTextMessage:{
              value: "Desea hablar con {branchOffice}"
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
              value:"No consigo recopilar todos los datos. Le paso con un agente"
            }
          }
        }
      ]
    }
  }
};


const botEsIntentFallback: lex.CfnBot.IntentProperty = {
  name: "FallbackIntent",
  description: "FAllback Intent español",
  parentIntentSignature: "AMAZON.FallbackIntent",
  intentClosingSetting: {
    closingResponse: {
      messageGroupsList: [
        {
          message: {
            plainTextMessage: {
              value:
                "Lo siento no logro entenderle. Le pasamos con un operador",
            },
          },
        },
      ],
    },
  },
};

// Counter Reading 
const botEsIntentReading: lex.CfnBot.IntentProperty = {
  name: "Reading",
  description: "Intent de lectura de contador",
  sampleUtterances: [
    { utterance: "v. " },
    { utterance: "Can you help me?" },
  ],
  slots: [
    //botEsDNISlot, 
    botEsDNIRegSlot
  ],
  intentConfirmationSetting:{
    promptSpecification:{
      maxRetries:3,
      allowInterrupt:false,
      messageGroupsList:[
        {
          message:{
            plainTextMessage:{
              value: "Su D N I es {DniReg}"
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
              value:"No consigo recopilar todos los datos. Le paso con un agente"
            }
          }
        }
      ]
    }
  }
};

export { botEsIntentWelcome, botEsIntentFallback, botEsIntentTransfer, botEsIntentReading };
