export class CustomerDTO {
    customerId;
    company;
    contact;
    title;
    city;
    country;
    phone;
    constructor(customer) {
        this.customerId = customer.customer_id;
        this.company = customer.company_name;
        this.contact = customer.contact_name;
        this.title = customer.contact_title;
        this.city = customer.city;
        this.country = customer.country;
        this.phone = customer.phone;
    }
}
//# sourceMappingURL=CustomerDTO.js.map