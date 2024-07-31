export class CustomerDTO {
    customerId: string;
    company: string;
    contact: string;
    title: string;
    city: string;
    country: string;
    phone: string;

    constructor(customer: any) {
        this.customerId = customer.customer_id;
        this.company = customer.company_name;
        this.contact = customer.contact_name;
        this.title = customer.contact_title;
        this.city = customer.city;
        this.country = customer.country;
        this.phone = customer.phone;
    }
}
