// src/spaces/spaces.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SpacesStorageService {
  private readonly logger = new Logger(SpacesStorageService.name);
  private readonly endpointHost: string;   // store raw host
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor() {
    const endpoint = process.env.DO_SPACE_ENDPOINT;      // e.g. "nyc3.digitaloceanspaces.com"
    const region = process.env.DO_SPACE_REGION;
    const accessKeyId = process.env.DO_SPACE_KEY_ID;
    const secretAccessKey = process.env.DO_SPACE_SECRET;
    this.bucket = process.env.DO_SPACE_NAME as string;

    if (!endpoint || !region || !accessKeyId || !secretAccessKey || !this.bucket) {
      throw new Error('DigitalOcean Spaces configuration is incomplete');
    }

    this.endpointHost = endpoint;
    this.s3 = new S3Client({
      endpoint: `https://${endpoint}`,  // full URL used by the SDK
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  /**
   * Uploads a file from local disk to Spaces and returns its public URL
   */
  async uploadFile(filePath: string, destinationKey: string): Promise<string> {
    const fullPath = path.resolve(filePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }
    const stream = fs.createReadStream(fullPath);

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucket,
        Key: destinationKey,
        Body: stream,
        ACL: 'public-read',
      },
      queueSize: 4,
      partSize: 5 * 1024 * 1024,
    });

    upload.on('httpUploadProgress', (progress) => {
      this.logger.debug(`Uploaded ${progress.loaded}/${progress.total} bytes`);
    });

    await upload.done();
    return this.buildPublicUrl(destinationKey);
  }

  /**
   * Uploads a Buffer (e.g., from HTTP request) to Spaces
   */
  async uploadBuffer(
    buffer: Buffer,
    destinationKey: string,
    contentType?: string,
  ): Promise<string> {
    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucket,
        Key: destinationKey,
        Body: buffer,
        ContentType: contentType,
        ACL: 'public-read',
      },
    });

    await upload.done();
    return this.buildPublicUrl(destinationKey);
  }

  /**
   * Uploads a Multer File (Express.Multer.File) to Spaces
   */
  async uploadMulterFile(
    file: Express.Multer.File
  ): Promise<string> {
    const extension = file.originalname.split('.').pop();
    const randomString = uuidv4();
    const name = `projects/${randomString}.${extension}`;
    return this.uploadBuffer(file.buffer, name, file.mimetype);
  }

  private buildPublicUrl(key: string): string {
    return `https://${this.bucket}.${this.endpointHost}/${encodeURIComponent(key)}`;
  }
}
