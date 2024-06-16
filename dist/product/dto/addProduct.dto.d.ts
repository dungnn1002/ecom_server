declare class TypeSize {
    size: string;
    quantity: number;
}
export declare class addProductDTO {
    name: string;
    material: string;
    categoryId: number;
    brandId: number;
    contentHTML: string;
    contentMarkdown: string;
    originalPrice: number;
    discountPrice: number;
    sizes: TypeSize[];
}
export {};
