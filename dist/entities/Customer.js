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
let Customer = class Customer {
    id;
    customerID;
    companyName;
    contactName;
    contactTitle;
    address;
    city;
    region;
    postalCode;
    country;
    phone;
    fax;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "customerID", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "companyName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "contactName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "contactTitle", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "region", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "postalCode", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "country", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "fax", void 0);
Customer = __decorate([
    Entity()
], Customer);
export { Customer };
//# sourceMappingURL=Customer.js.map