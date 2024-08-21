# Solutions

> **If you have not completed the exercise, this page will spoil the was to resolve the issue.**

## The Problem

This exercise uses a [CloudFormation custom resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html) to create an artificial scenario that causes CloudFormation to end up in a `UPDATE_ROLLBACK_FAILED` or `DELETE_FAILED` state.

## The Solution

Manually adjusting the memory limit for the Lambda function deployed by the CloudFormation stack to 129MB causes the custom resource to complete successfully, allowing rollbacks and deletes to succeed. The Lambda function's name should start with `CfnRollbackExercise-function`. You can quickly access it via the _Resources_ tab when viewing the CloudFormation stack. By reading through the messages in the _Events_ tab of the stack, you can make this determination.

### Skipping Resources

You can complete the stack rollback and stack deletion by skipping the _exercise_ resource, this is sometimes the solution to use out in the world, but it can result in unused resources being left in your AWS account. These should be manually cleaned up. For this exercise, nothing will be leftover when choosing to skip the _exercise_ resource.
