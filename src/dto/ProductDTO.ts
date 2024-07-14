export class ProductDTO {
    productId: string;
    name: string;
    quantityPerUnit: string;
    price: string;
    stock: number;
    orders: number;

    constructor(product: any) {
        this.productId = product.product_id
        this.name = product.product_name;
        this.quantityPerUnit = product.quantity_per_unit;
        this.price = `$${product.unit_price}`;
        this.stock = product.units_in_stock;
        this.orders = product.units_on_order;
    }
}
