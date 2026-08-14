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

    const stageName = this.node.tryGetContext('stageName') ?? 'Dev';

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'hiro-cicd-s3-pipeline',

      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'hiro-world-3578/hiro-cicd-s3',
          'main',
          {
            connectionArn: 'arn:aws:codeconnections:ap-northeast-1:327006267101:connection/a1f35f20-4c2b-4bc2-a104-7f20f6449781'
          }
        ),

        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

    pipeline.addStage(
      new AppStage(this, stageName, {
        stageName: stageName
      })
    );
  }
}

