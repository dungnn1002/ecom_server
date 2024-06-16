"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const path_1 = require("path");
const env_constant_1 = require("../share/constants/env.constant");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.region = this.configService.get(env_constant_1.EnvConstant.AWS_S3_REGION);
        this.bucketName = this.configService.get(env_constant_1.EnvConstant.AWS_S3_BUCKET_NAME);
        this.accessKeyId = this.configService.get(env_constant_1.EnvConstant.AWS_S3_ACCESS_KEY_ID);
        this.secretAccessKey = this.configService.get(env_constant_1.EnvConstant.AWS_S3_SECRET_ACCESS_KEY);
        this.s3URL = this.configService.get(env_constant_1.EnvConstant.AWS_S3_URL);
    }
    getKey(url) {
        return url.replace(this.s3URL, '');
    }
    getSignedUrl(key) {
        const s3 = this.getS3();
        return s3.getSignedUrl('getObject', {
            Bucket: this.bucketName,
            Key: key,
            Expires: 60 * 60 * 12,
        });
    }
    async updateACL(key) {
        const s3 = this.getS3();
        await s3
            .putObjectAcl({
            Bucket: this.bucketName,
            Key: key,
            ACL: 'public-read',
        })
            .promise();
        return (s3.endpoint.protocol +
            '//' +
            this.bucketName +
            '.' +
            s3.endpoint.hostname +
            '/' +
            key);
    }
    async uploadFile(file, key) {
        const s3 = this.getS3();
        const { Location, Key } = await s3
            .upload({
            Bucket: this.bucketName,
            Body: file.buffer,
            Key: key
                ? `${key}${(0, path_1.extname)(file.originalname)}`
                : ` ${Date.now()}_${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname)}`,
            ContentType: file.mimetype,
            ACL: 'public-read',
        })
            .promise();
        return {
            url: Location,
            type: file.mimetype,
            key: Key,
        };
    }
    async deleteFileS3(url) {
        if (!url)
            return false;
        const s3 = this.getS3();
        const key = this.getKey(url);
        await s3
            .deleteObject({
            Bucket: this.bucketName,
            Key: key,
        })
            .promise();
        return true;
    }
    getS3() {
        return new aws_sdk_1.S3({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map