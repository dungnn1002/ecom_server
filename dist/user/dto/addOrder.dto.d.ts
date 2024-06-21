declare class typeDataShopCart {
    productSizeId: number;
    quantity: number;
}
export declare class addOrderDTO {
    addressUserId: number;
    typeShipId: number;
    isPaymentOnline: number;
    voucherId: number;
    shopCart: typeDataShopCart[];
    totalPrice: number;
}
export {};
