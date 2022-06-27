
import { aws_lex as lex } from "aws-cdk-lib";

const botEsOfficesSlots: lex.CfnBot.SlotProperty = {
  name: "branchOffice",
  slotTypeName:"branchOfficeType",
  valueElicitationSetting: {
    slotConstraint:"Required",
    promptSpecification:{
      messageGroupsList: [
        {
          message:{
            plainTextMessage:{
              value: "¿Cuál es el departamento con el que sesea hablar"
            }
          }
        }
      ],
      maxRetries:3,
      allowInterrupt:false
    }
  }
  
};

const botEsDNISlot: lex.CfnBot.SlotProperty = {
  name: "Dni",
  slotTypeName:"AMAZON.AlphaNumeric",
  valueElicitationSetting: {
    slotConstraint:"Required",
    promptSpecification:{
      messageGroupsList: [
        {
          message:{
            plainTextMessage:{
              value: "¿Cuál es su DNI?"
            }
          }
        }
      ],
      maxRetries:3,
      allowInterrupt:false
    }
  }
  
};
const botEsDNIRegSlot: lex.CfnBot.SlotProperty = {
  name: "DniReg",
  slotTypeName:"DNIType",
  valueElicitationSetting: {
    slotConstraint:"Required",
    promptSpecification:{
      messageGroupsList: [
        {
          message:{
            plainTextMessage:{
              value: "¿Cuál es su DNI?"
            }
          }
        }
      ],
      maxRetries:3,
      allowInterrupt:false
    }
  }
  
};


export { botEsOfficesSlots, botEsDNISlot,  botEsDNIRegSlot };
