var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let Product = class Product {
    id;
    productID;
    productName;
    supplierID;
    categoryID;
    quantityPerUnit;
    unitPrice;
    unitsInStock;
    unitsOnOrder;
    reorderLevel;
    discontinued;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "productID", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "supplierID", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "categoryID", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "quantityPerUnit", void 0);
__decorate([
    Column("decimal"),
    __metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "unitsInStock", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "unitsOnOrder", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "reorderLevel", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "discontinued", void 0);
Product = __decorate([
    Entity()
], Product);
export { Product };
//# sourceMappingURL=Product.js.map