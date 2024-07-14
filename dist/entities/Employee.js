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
let Employee = class Employee {
    id;
    employeeID;
    lastName;
    firstName;
    title;
    titleOfCourtesy;
    birthDate;
    hireDate;
    address;
    city;
    region;
    postalCode;
    country;
    homePhone;
    extension;
    notes;
    reportsTo;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Employee.prototype, "employeeID", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "titleOfCourtesy", void 0);
__decorate([
    Column("date"),
    __metadata("design:type", Date)
], Employee.prototype, "birthDate", void 0);
__decorate([
    Column("date"),
    __metadata("design:type", Date)
], Employee.prototype, "hireDate", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "city", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "region", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "postalCode", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "country", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "homePhone", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Employee.prototype, "extension", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], Employee.prototype, "notes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Employee.prototype, "reportsTo", void 0);
Employee = __decorate([
    Entity()
], Employee);
export { Employee };
//# sourceMappingURL=Employee.js.map