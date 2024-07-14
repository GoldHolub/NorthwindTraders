import {Customer, Employee, Order, Product, Supplier } from "../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductType = InferSelectModel<typeof Product>;
export type CustomerType = InferSelectModel<typeof Customer>;
export type EmployeeType = InferSelectModel<typeof Employee>;
export type SupplierType = InferSelectModel<typeof Supplier>;
export type OrderType = InferSelectModel<typeof Order>;
