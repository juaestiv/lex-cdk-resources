import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lex as lex } from "aws-cdk-lib";
import { aws_iam as iam } from "aws-cdk-lib";
import {aws_lambda as lambda} from 'aws-cdk-lib'
import { botEnLocaleProperty } from "./bot-locale-en"
import { botEsLocaleProperty } from "./bot-locale-es"
import * as path from 'path'
import { LambdaInvoke } from "aws-cdk-lib/aws-stepfunctions-tasks";

export class MultiBotUtilitiesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here

    /////// LEX SECTION ////////
    //Role and Policy to be assumed by the service LexV2
   

    
    const customRoleForLex = new iam.Role(this, "polly-lexv2-role", {
      roleName: "polly-lexv2-role",
      assumedBy: new iam.ServicePrincipal("lexv2.amazonaws.com"),
    });
  
    const managedPolicyForLex = new iam.ManagedPolicy(
      this,
      "polly-lexv2-policy",
      {
        description: "Allow to Lex service to pully for Text To Speech",
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["polly:*"],
            resources: ["*"],
          }),
        ],
        roles: [customRoleForLex]
      }
    );
  
    customRoleForLex.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaExecute'))
    
    
 

    // Bot
    const myBot = new lex.CfnBot(this, "multifunctional-bot", {
      dataPrivacy: {
        ChildDirected: false,
      },
      idleSessionTtlInSeconds: 300,
      name: "multifunctional-bot",
      roleArn: customRoleForLex.roleArn,
      description: "description",
      botLocales: [

        // English
        botEnLocaleProperty,
        
        // Spanish
        botEsLocaleProperty,

        //other locales here
      ],
    });
    myBot.autoBuildBotLocales = true


    /////// LAMBDA SECTION ////////
    const lambdaForLexRole = new iam.Role(this, 'lambda-for-lex-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })


    const lambdaForLexEs = new lambda.Function(this, 'lambda-for-lex-es', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      role:lambdaForLexRole
    });
    lambdaForLexEs.role?.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AWSLambdaBasicExecutionRole',
      ),
    );
    


    /////// ?? SECTION ////////

  }
}
