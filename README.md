# CloudFormation Rollback Failed Exercise

This codebase uses the [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) to deploy resources to your AWS account and set up an exercise where you experience a CloudFormation `UPDATE_ROLLBACK_FAILED` error and need to resolve it.

## Motivation

This exercise was created because I too frequently see people deleting CloudFormation stacks to resolve these errors, instead of resolving them and continuing the rollback. In non-production environments these actions are often frustrating, but aren't considered an incident. In production environments deleting a Stack often has far more impact.

## Cost

This exercise should be within the monthly free-tier usage limits for the Lambda service. There should be no charges associated with the CloudFormation service.

References:

- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [AWS CloudFormation Pricing](https://aws.amazon.com/cloudformation/pricing/)

## Setup

You will need [Node.js](https://nodejs.org/en) v20 and [Git](https://git-scm.com/) installed. You will also need access to an AWS account, to be safe you should have administrator access. You can probably complete this exercise with lower access levels, but due to the number of potential configurations I can't say that for certain.

### Codebase Setup

1. Using git, clone this respository to your machine. The command below will only clone the most recent code, since you don't need the code's entire history for this exercise.
   ```bash
   git clone --depth 1 https://github.com/jbutz/aws-cfn-rollback-exercise.git
   ```
2. Install the node modules using NPM
   ```bash
   npm install
   ```

### Exercise Setup

1. Configure your [command line to have access to your AWS account](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html).
2. If it is not already set, set the `AWS_REGION` environment variable to the AWS Region you want to use, it will make things easier
   ```bash
   # On Linux and Mac you can use the command below to set the region to US East 2 (Ohio)
   export AWS_REGION=us-east-2
   ```
3. [Bootstrap](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html) the AWS CDK into your account and region
   ```bash
   npm run bootstrap
   ```
4. [Deploy](https://docs.aws.amazon.com/cdk/v2/guide/deploy.html) the application into your AWS account using the CDK. The deployment will ask your permission to make IAM changes. You must allow these to deploy the exercise.
   ```bash
   npm run deploy
   ```
5. Without making any code changes, deploy the application again. This will cause the `UPDATE_ROLLBACK_FAILED` error and enable you to resolve the issue.
   ```bash
   npm run deploy
   ```

## The Exercise

You should use the AWS Management Console for the exercise and navigate to the CloudFormation service to view your CloudFormation stack, it should be called `CfnRollbackExercise`. Click the _Stack actions_ button, notice that there is an option there labeled _Continue update rollback_. Your goal is to be able to use that option and successfully rollback the stack and have the stack in the `UPDATE_ROLLBACK_COMPLETE` status. Once you have done that, delete the stack from the console. If the delete fails, discovery the issue and resolve it.

To view the notes about the solutions, go to [SOLUTION.md](./SOLUTION.md).
