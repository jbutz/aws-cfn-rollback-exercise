import type { CloudFormationCustomResourceEvent, Context } from 'aws-lambda';
import * as https from 'node:https';
import * as url from 'node:url';

const physicalResourceId = 'CfnRollbackExercise';

export async function handler(
  event: CloudFormationCustomResourceEvent,
  context: Context,
) {
  console.log(event);
  if (event.RequestType === 'Create') {
    await sendResponse(event, context, 'SUCCESS', {}, physicalResourceId);
    return;
  } else if (event.RequestType === 'Update' || event.RequestType === 'Delete') {
    const causeIssue = context.memoryLimitInMB !== '129';
    if (causeIssue) {
      await sendResponse(
        event,
        context,
        'FAILED',
        { reason: 'The Lambda function must have 129MB of memory' },
        physicalResourceId,
      );
    }
    await sendResponse(event, context, 'SUCCESS', {}, physicalResourceId);
    return;
  }
}

/***
 * This function is mostly copied from AWS's documentation
 * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html
 */
function sendResponse(
  event: CloudFormationCustomResourceEvent,
  context: Context,
  responseStatus: 'SUCCESS' | 'FAILED',
  responseData?: Record<string, unknown>,
  physicalResourceId?: string,
  noEcho?: boolean,
) {
  return new Promise((resolve, reject) => {
    const responseBody = JSON.stringify({
      Status: responseStatus,
      Reason:
        responseData?.reason ||
        'See the details in CloudWatch Log Stream: ' + context.logStreamName,
      PhysicalResourceId: physicalResourceId || context.logStreamName,
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
      NoEcho: noEcho || false,
      Data: responseData,
    });

    console.log('Response body:', responseBody);

    const parsedUrl = url.parse(event.ResponseURL);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.path,
      method: 'PUT',
      headers: {
        'content-type': '',
        'content-length': responseBody.length,
      },
    };

    const request = https.request(options, function (response) {
      console.log('Status code', response.statusCode);
      resolve(context.done());
    });

    request.on('error', function (error) {
      console.log('send(..) failed executing https.request(..): ' + error);
      reject(context.done(error));
    });

    request.write(responseBody);
    request.end();
  });
}
