# CloudFormation Rollback Failed Exercise

This codebase uses the [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) to deploy resources to your AWS account and set up an exercise where you experience a CloudFormation `UPDATE_ROLLBACK_FAILED` error and need to resolve it.

## Motivation

This exercise was created because I too frequently see people deleting CloudFormation stacks to resolve these errors, instead of resolving them and continuing the rollback. In non-production environments these actions are often frustrating, but aren't considered an incident. In production environments deleting a Stack often has far more impact.

## Cost

This exercise should be within the monthly free-tier usage limits for the Lambda service. There should be no charges associated with the CloudFormation service.

References:

- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
- [AWS CloudFormation Pricing](https://aws.amazon.com/cloudformation/pricing/)

