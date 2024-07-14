export class EmployeeDTO {
    employeeId: string;
    name: string;
    title: string;
    city: string;
    phone: string;
    country: string;

    constructor(employee: any) {
        this.employeeId = employee.employeeID;
        this.name = `${employee.firstName} ${employee.lastName}`;
        this.title = employee.title;
        this.city = employee.city;
        this.phone = employee.homePhone;
        this.country = employee.country;
    }
}
