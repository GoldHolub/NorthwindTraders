class OrderDTOFull {
    orderId: number;
    customerId: string;
    shipName: string;
    totalProducts: number;
    totalQuantity: number;
    totalPrice: string;
    totalDiscount: string;
    shipVia: string;
    freight: string;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
    products: {
        productId: string;
        productName: string;
        quantity: number;
        orderPrice: string;
        totalPrice: string;
        discount: string;
    }[];

    constructor(order: any, details: any[]) {
        this.orderId = order[0].orderID;
        this.customerId = order[0].customerID;
        this.shipName = order[0].shipName;
        this.totalProducts = details.length;
        this.shipVia = order[0].shipViaName;
        this.freight = order[0].freight;
        this.orderDate = order[0].orderDate;
        this.requiredDate = order[0].requiredDate;
        this.shippedDate = order[0].shippedDate;
        this.shipCity = order[0].shipCity;
        this.shipRegion = order[0].shipRegion;
        this.shipPostalCode = order[0].shipPostalCode;
        this.shipCountry = order[0].shipCountry;
        this.totalQuantity = details.reduce((acc, detail) => acc + detail.quantity, 0);
        this.totalPrice = `$${details.reduce((acc, detail) => acc + (detail.unitPrice * detail.quantity * (1 - detail.discount)), 0).toFixed(2)}`;
        this.totalDiscount = `$${details.reduce((acc, detail) => acc + (detail.unitPrice * detail.quantity * detail.discount), 0).toFixed(2)}`;

        this.products = details.map(detail => ({
            productId: detail.productId,
            productName: detail.productName,
            quantity: detail.quantity,
            orderPrice: `$${detail.unitPrice}`,
            totalPrice: `$${(detail.unitPrice * detail.quantity * (1 - detail.discount)).toFixed(2)}`,
            discount: `${(detail.discount * 100)}%`,
        }));
    }
}

export default OrderDTOFull;
