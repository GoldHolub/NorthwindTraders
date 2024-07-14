export class EmployeeDTO {
    employeeId;
    name;
    title;
    city;
    phone;
    country;
    constructor(employee) {
        this.employeeId = employee.employeeID;
        this.name = `${employee.firstName} ${employee.lastName}`;
        this.title = employee.title;
        this.city = employee.city;
        this.phone = employee.homePhone;
        this.country = employee.country;
    }
}
//# sourceMappingURL=EmployeeDTO.js.map