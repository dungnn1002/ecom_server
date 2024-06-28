/// <reference types="multer" />
import { CommentService } from './comment.service';
import { addCommentDTO } from './dto/addComment.dto.';
import { PaginationDto } from 'src/share/dto';
export declare class CommentController {
    private readonly addressService;
    constructor(addressService: CommentService);
    addComment(data: addCommentDTO, images: Express.Multer.File[]): Promise<{
        message: string;
        code: string;
    }>;
    getCommentByProduct(productId: number, { page, limit }: PaginationDto): Promise<{
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
    getAll({ page, limit }: PaginationDto): Promise<{
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
