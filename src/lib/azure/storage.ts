import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AzureStorageService {

  async uploadImageToAzure(file: Express.Multer.File): Promise<string> {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_STORAGE_NAME;

    if (!connectionString || !containerName) {
      throw new Error('Azure Storage connection string or container name is not configured.');
    }

    // Check if file and originalname are defined
    if (!file || !file.originalname) {
      throw new Error('File or file name is not provided.');
    }

    const extension = file.originalname.split('.').pop();
    const randomString = uuidv4();
    const name = `${randomString}${extension}`;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(name);

    await blockBlobClient.upload(file.buffer, file.buffer.length);

    return blockBlobClient.url;
  }
}