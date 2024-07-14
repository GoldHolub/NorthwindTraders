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
let Order = class Order {
    id;
    orderID;
    customerID;
    employeeID;
    orderDate;
    requiredDate;
    shippedDate;
    shipVia;
    freight;
    shipName;
    shipAddress;
    shipCity;
    shipRegion;
    shipPostalCode;
    shipCountry;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "orderID", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerID", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "employeeID", void 0);
__decorate([
    Column("timestamp"),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    Column("timestamp"),
    __metadata("design:type", Date)
], Order.prototype, "requiredDate", void 0);
__decorate([
    Column("timestamp"),
    __metadata("design:type", Date)
], Order.prototype, "shippedDate", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "shipVia", void 0);
__decorate([
    Column("decimal"),
    __metadata("design:type", Number)
], Order.prototype, "freight", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "shipName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "shipAddress", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "shipCity", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "shipRegion", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "shipPostalCode", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "shipCountry", void 0);
Order = __decorate([
    Entity()
], Order);
export { Order };
//# sourceMappingURL=Order.js.map