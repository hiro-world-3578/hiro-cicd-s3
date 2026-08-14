import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

interface S3StackProps extends cdk.StackProps {
  stageName: string;
}

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: S3StackProps) {
    super(scope, id, props);

    const stageNameLower = props.stageName.toLowerCase();

    const bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: `hiro-s3-${stageNameLower}-99999-v2`,
      versioned: true
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'DenyInsecureTransport',
        effect: iam.Effect.DENY,
        principals: [new iam.AnyPrincipal()],
        actions: ['s3:*'],
        resources: [
          bucket.bucketArn,
          `${bucket.bucketArn}/*`
        ],
        conditions: {
          Bool: {
            'aws:SecureTransport': 'false'
          }
        }
      })
    );
  }
}
