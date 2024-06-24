/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
import { addCommentDTO } from './dto/addComment.dto.';
import { UploadService } from '../upload/upload.service';
export declare class CommentService {
    private readonly prismaService;
    private readonly uploadService;
    private readonly logger;
    constructor(prismaService: PrismaService, uploadService: UploadService);
    addComment(data: addCommentDTO, images: Express.Multer.File[]): Promise<{
        message: string;
        code: string;
    }>;
    getCommentByProduct(productId: number, page: number, limit: number): Promise<{
        data: ({
            user: {
                firstName: string;
                lastName: string;
                id: number;
                image: string;
            };
            CommentImage: {
                id: number;
                image_url: string;
                commentId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            content: string;
            productId: number;
            userId: number;
            star: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    getAll(page: number, limit: number): Promise<{
        data: {
            id: number;
            content: string;
            productId: number;
            userId: number;
            star: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            totalPage: number;
        };
    }>;
}
