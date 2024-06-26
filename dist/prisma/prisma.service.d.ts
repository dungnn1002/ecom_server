import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'prisma/prisma-client';
export declare class PrismaService extends PrismaClient {
    constructor(configService: ConfigService);
}
