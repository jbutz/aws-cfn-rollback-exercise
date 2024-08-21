import { CustomResource, Stack, StackProps } from 'aws-cdk-lib';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ExerciseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const serviceRole = new Role(this, 'serviceRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    const exerciseFunction = new NodejsFunction(this, 'function', {
      runtime: Runtime.NODEJS_20_X,
      role: serviceRole,
    });

    new CustomResource(this, 'exercise', {
      resourceType: 'Custom::Exercise',
      properties: {
        value: Date.now().toString(),
      },
      serviceToken: exerciseFunction.functionArn,
    });
  }
}
