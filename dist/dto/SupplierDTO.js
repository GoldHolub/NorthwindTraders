export class SupplierDTO {
    id;
    companyName;
    contactName;
    contactTitle;
    city;
    country;
    constructor(supplier) {
        this.id = supplier.id;
        this.companyName = supplier.companyName;
        this.contactName = supplier.contactName;
        this.contactTitle = supplier.contactTitle;
        this.city = supplier.city;
        this.country = supplier.country;
    }
}
//# sourceMappingURL=SupplierDTO.js.map