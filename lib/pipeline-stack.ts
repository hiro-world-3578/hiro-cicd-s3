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
            connectionArn: 'arn:aws:codeconnections:ap-northeast-1:327006267101:connection/09287df6-a951-4987-806f-c26bbeda2a1d'
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
