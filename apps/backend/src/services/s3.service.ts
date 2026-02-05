import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'placeholder',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'placeholder',
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || 'hip-hop-samples';
const SIGNED_URL_EXPIRY = parseInt(
  process.env.AWS_S3_SIGNED_URL_EXPIRY || '86400',
  10
);

interface UploadParams {
  key: string;
  body: Buffer;
  contentType: string;
}

export const s3Service = {
  async uploadFile(params: UploadParams): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: params.key,
        Body: params.body,
        ContentType: params.contentType,
        ACL: 'private',
      });

      await s3Client.send(command);
      logger.info('✅ File uploaded to S3', { key: params.key });

      return params.key;
    } catch (error) {
      logger.error('❌ S3 upload failed', { error });
      throw new AppError(500, 'File upload failed');
    }
  },

  async generateSignedUrl(key: string, expiresIn?: number): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
      });

      const url = await getSignedUrl(s3Client, command, {
        expiresIn: expiresIn || SIGNED_URL_EXPIRY,
      });

      logger.debug('✅ Signed URL generated', { key });
      return url;
    } catch (error) {
      logger.error('❌ Signed URL generation failed', { error });
      throw new AppError(500, 'Failed to generate download link');
    }
  },

  async generateMultipleSignedUrls(
    keys: string[],
    expiresIn?: number
  ): Promise<{ key: string; url: string }[]> {
    try {
      const urls = await Promise.all(
        keys.map(async (key) => ({
          key,
          url: await this.generateSignedUrl(key, expiresIn),
        }))
      );

      logger.info('✅ Multiple signed URLs generated', { count: keys.length });
      return urls;
    } catch (error) {
      logger.error('❌ Multiple signed URLs generation failed', { error });
      throw new AppError(500, 'Failed to generate download links');
    }
  },

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      });

      await s3Client.send(command);
      logger.info('✅ File deleted from S3', { key });
    } catch (error) {
      logger.error('❌ S3 delete failed', { error });
      throw new AppError(500, 'File deletion failed');
    }
  },

  async deleteMultipleFiles(keys: string[]): Promise<void> {
    try {
      await Promise.all(keys.map((key) => this.deleteFile(key)));
      logger.info('✅ Multiple files deleted from S3', { count: keys.length });
    } catch (error) {
      logger.error('❌ Multiple files deletion failed', { error });
      throw new AppError(500, 'Bulk file deletion failed');
    }
  },

  async listObjects(prefix?: string): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
      });

      const response = await s3Client.send(command);
      const keys = response.Contents?.map((obj) => obj.Key || '') || [];

      logger.debug('✅ Objects listed from S3', { count: keys.length });
      return keys;
    } catch (error) {
      logger.error('❌ S3 list failed', { error });
      throw new AppError(500, 'Failed to list files');
    }
  },
};
