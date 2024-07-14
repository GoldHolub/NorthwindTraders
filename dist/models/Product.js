import { pgTable, serial, text, integer, decimal } from 'drizzle-orm/pg-core';
export const Product = pgTable('product', {
    id: serial('id').primaryKey(),
    productID: integer('product_id'),
    productName: text('product_name'),
    supplierID: integer('supplier_id'),
    categoryID: integer('category_id'),
    quantityPerUnit: text('quantity_per_unit'),
    unitPrice: decimal('unit_price'),
    unitsInStock: integer('units_in_stock'),
    unitsOnOrder: integer('units_on_order'),
    reorderLevel: integer('reorder_level'),
    discontinued: integer('discontinued'),
});
//# sourceMappingURL=Product.js.map