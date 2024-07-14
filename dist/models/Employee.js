import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
export const employee = pgTable('employee', {
    id: serial('id').primaryKey(),
    employeeID: text('employee_id'),
    lastName: text('last_name'),
    firstName: text('first_name'),
    title: text('title'),
    titleOfCourtesy: text('title_of_courtesy'),
    birthDate: timestamp('birth_date'),
    hireDate: timestamp('hire_date'),
    address: text('address'),
    city: text('city'),
    region: text('region'),
    postalCode: text('postal_code'),
    country: text('country'),
    homePhone: text('home_phone'),
    extension: text('extension'),
    notes: text('notes'),
    reportsTo: text('reports_to'),
});
//# sourceMappingURL=Employee.js.map