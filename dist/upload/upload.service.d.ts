/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly configService;
    private readonly region;
    private readonly bucketName;
    private readonly accessKeyId;
    private readonly secretAccessKey;
    private readonly s3URL;
    constructor(configService: ConfigService);
    getKey(url: string): string;
    getSignedUrl(key: string): string;
    updateACL(key: string): Promise<string>;
    uploadFile(file: Express.Multer.File, key?: string): Promise<{
        url: string;
        type: string;
        key: string;
    }>;
    deleteFileS3(url?: string): Promise<boolean>;
    private getS3;
}
