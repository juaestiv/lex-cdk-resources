
import { aws_lex as lex } from "aws-cdk-lib";

const botEnOfficesSlots: lex.CfnBot.SlotProperty = {
  name: "branchOffice",
  slotTypeName:"branchOfficeType",
  valueElicitationSetting: {
    slotConstraint:"Required",
    promptSpecification:{
      messageGroupsList: [
        {
          message:{
            plainTextMessage:{
              value: "Which office do you want to talk with?"
            }
          }
        }
      ],
      maxRetries:3,
      allowInterrupt:false
    }
  }
  
};


export { botEnOfficesSlots };
