#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ExerciseStack } from '../lib/exercise-stack';

const app = new cdk.App();

new ExerciseStack(app, 'CfnRollbackExerciseStack', {
  stackName: 'CfnRollbackExercise',
});
