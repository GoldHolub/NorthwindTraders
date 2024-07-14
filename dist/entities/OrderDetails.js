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
let OrderDetails = class OrderDetails {
    id;
    orderId;
    productId;
    unitPrice;
    quantity;
    discount;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "orderId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "productId", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "unitPrice", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
__decorate([
    Column("decimal", { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "discount", void 0);
OrderDetails = __decorate([
    Entity()
], OrderDetails);
export { OrderDetails };
//# sourceMappingURL=OrderDetails.js.map