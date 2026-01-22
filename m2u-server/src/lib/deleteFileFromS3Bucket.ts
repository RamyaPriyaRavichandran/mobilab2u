import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3'
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
} from '../plugins/env'

export async function deleteFileFromS3Bucket(keys: Array<string>) {
  try {
    const s3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
    const params = {
      Bucket: S3_BUCKET_NAME,
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
        Quiet: false,
      },
    }
    const data = new DeleteObjectsCommand(params)
    await s3.send(data)
    return 'Files deleted successfully'
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return 'An unknown error occurred'
  }
}
