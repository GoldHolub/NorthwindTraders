import { pgTable, serial, text, timestamp, integer, decimal, jsonb } from 'drizzle-orm/pg-core';

export const Employee = pgTable('employee', {
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

export const Product = pgTable('product', {
    id: serial('id').primaryKey(),
    productID: integer('product_id'),
    productName: text('product_name'),
    supplierID: integer('supplier_id'),
    categoryID: integer('category_id'),
    quantityPerUnit: text('quantity_per_unit'),
    unitPrice: decimal('unit_price'),
    unitsInStock: integer('units_in_stock'),
    unitsOnOrder: integer('units_on_order'),
    reorderLevel: integer('reorder_level'),
    discontinued: integer('discontinued'),
});

export const Supplier = pgTable('supplier', {
    id: serial('id').primaryKey(),
    supplierID: integer('supplier_id'),
    companyName: text('company_name'),
    contactName: text('contact_name'),
    contactTitle: text('contact_title'),
    address: text('address'),
    city: text('city'),
    region: text('region'),
    postalCode: text('postal_code'),
    country: text('country'),
    phone: text('phone'),
    fax: text('fax'),
    homePage: text('home_page'),
});

export const Customer = pgTable('customer', {
    customerID: text('customer_id').primaryKey(),
    companyName: text('company_name'),
    contactName: text('contact_name'),
    contactTitle: text('contact_title'),
    address: text('address'),
    city: text('city'),
    region: text('region'),
    postalCode: text('postal_code'),
    country: text('country'),
    phone: text('phone'),
    fax: text('fax'),
});

export const Order = pgTable('orders', {
    orderID: serial('order_id').primaryKey(),
    customerID: text('customer_id'),
    employeeID: integer('employee_id'),
    orderDate: timestamp('order_date'),
    requiredDate: timestamp('required_date'),
    shippedDate: timestamp('shipped_date'),
    shipVia: integer('ship_via'),
    freight: decimal('freight'),
    shipName: text('ship_name'),
    shipAddress: text('ship_address'),
    shipCity: text('ship_city'),
    shipRegion: text('ship_region'),
    shipPostalCode: text('ship_postal_code'),
    shipCountry: text('ship_country'),
});

export const OrderDetail = pgTable('orders_details', {
    orderID: integer('order_id'),
    productID: integer('product_id'),
    unitPrice: decimal('unit_price'),
    quantity: integer('quantity'),
    discount: decimal('discount'),
});

export const Session = pgTable('session', {
    sid: text('sid').notNull().primaryKey(),
    sess: jsonb('sess').notNull(),
    expire: timestamp('expire').notNull(),
});

export const IPv4Table = pgTable('ipv4_data', {
    fromIp: text('from_ip').primaryKey(), 
    toIp: text('to_ip').notNull(),
    countryCode: text('country_code'),
    countryName: text('country_name')
});

export const IPv6Table = pgTable('ipv6_data', {
    fromIp: text('from_ip').primaryKey(), 
    toIp: text('to_ip').notNull(),
    countryCode: text('country_code'),
    countryName: text('country_name'),
    regionName: text('region_name'),
    cityName: text('city_name')
});

export const Shipper = pgTable('shippers', {
    shipperID: integer('shipper_id').primaryKey(),
    companyName: text('company_name'),
    phone: text('phone')
})
