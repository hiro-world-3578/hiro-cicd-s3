import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3Stack } from './s3-stack';

interface AppStageProps extends cdk.StageProps {
  stageName: string;
}

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: AppStageProps) {
    super(scope, id, props);

    new S3Stack(this, 'S3Stack', {
      stageName: props.stageName
    });
  }
}
