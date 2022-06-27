
import { aws_lex as lex } from "aws-cdk-lib";

const botEsSlotTypeOffice: lex.CfnBot.SlotTypeProperty = {
  name: "branchOfficeType",
  description:"Oficinas a transferir",
  valueSelectionSetting: {
    resolutionStrategy: 'TOP_RESOLUTION',
  },
  slotTypeValues: [
    {sampleValue: {value:"facturación"}},
    {sampleValue: {value:"soporte"}},
    {sampleValue: {value:"ventas"}}
  ]
};

const botEsSlotTypeDNI: lex.CfnBot.SlotTypeProperty = {
  name: "DNIType",
  description:"Patron Regex para DNI",
  valueSelectionSetting: {
    resolutionStrategy: 'ORIGINAL_VALUE',
    regexFilter: {
      pattern: '[0-9]{8,8}[A-Za-z]'
    }
  },
  parentSlotTypeSignature:'AMAZON.AlphaNumeric' 
};

export { botEsSlotTypeOffice, botEsSlotTypeDNI  };
