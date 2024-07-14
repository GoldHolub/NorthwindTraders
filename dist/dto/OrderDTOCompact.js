class OrderDTOCompact {
    orderId;
    totalPrice;
    totalProducts;
    totalQuantity;
    shippedDate;
    shipName;
    shipCity;
    shipCountry;
    constructor(order) {
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
//# sourceMappingURL=OrderDTOCompact.js.map