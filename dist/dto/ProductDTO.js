export class ProductDTO {
    productId;
    name;
    quantityPerUnit;
    price;
    stock;
    orders;
    constructor(product) {
        this.productId = product.product_id;
        this.name = product.product_name;
        this.quantityPerUnit = product.quantity_per_unit;
        this.price = `$${product.unit_price}`;
        this.stock = product.units_in_stock;
        this.orders = product.units_on_order;
    }
}
//# sourceMappingURL=ProductDTO.js.map