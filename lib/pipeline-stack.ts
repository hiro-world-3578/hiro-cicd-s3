import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {
  CodePipeline,
  CodePipelineSource,
  ShellStep
} from 'aws-cdk-lib/pipelines';

import { AppStage } from './app-stage';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'hiro-cicd-s3-pipeline',

      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'hiro-world-3578/hiro-cicd-s3',
          'main',
          {
            connectionArn: 'arn:aws:codeconnections:ap-northeast-1:327006267101:connection/dd590823-f374-4e6d-8bfb-ea405a663ec8'
          }
        ),

        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

    pipeline.addStage(new AppStage(this, 'Prod'));
  }
}
