export class SupplierDTO {
    id: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    city: string;
    country: string;

    constructor(supplier: any) {
        this.id = supplier.id;
        this.companyName = supplier.companyName;
        this.contactName = supplier.contactName;
        this.contactTitle = supplier.contactTitle;
        this.city = supplier.city;
        this.country = supplier.country;
    }
}