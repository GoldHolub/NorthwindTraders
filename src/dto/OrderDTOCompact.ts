class OrderDTOCompact {
    orderId: number;
    totalPrice: string;
    totalProducts: number;
    totalQuantity: number;
    shippedDate: string;
    shipName: string;
    shipCity: string;
    shipCountry: string;

    constructor(order: any) {
        this.orderId = order.orderId;
        this.totalPrice = order.totalProductsPrice;
        this.totalProducts = order.totalProducts;
        this.totalQuantity = order.totalProductsItems;
        this.shippedDate = order.shippedDate?.toISOString().split('T')[0] || '';
        this.shipName = order.shipName || '';
        this.shipCity = order.shipCity || '';
        this.shipCountry = order.shipCountry || '';
    }
}

export default OrderDTOCompact;
