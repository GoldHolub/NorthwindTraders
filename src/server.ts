import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import supplierRouter from "./routes/SupplierRouter.js";
import productRouter from './routes/ProductRouter.js';
import employeeRouter from './routes/EmployeeRouter.js';
import customerRouter from './routes/CustomerRouter.js';
import orderRouter from './routes/OrderRouter.js';
import dashboardRouter from './routes/DashboardRouter.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import { sqlLogs } from './models/SqlLogs.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const PostgresqlStore = connectPgSimple(session);
const sessionStore = new PostgresqlStore({ conString: process.env.DATABASE_URL! });

app.use(session({
  store: sessionStore,
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes max
    secure: 'auto', //process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  } 
}));

declare module "express-session" {
  interface SessionData {
    sqlLogs: sqlLogs;
  }
}

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Northwind Traders',
      version: '1.0.0',
      description: 'API documentation for Northwind Traders',
    },
    servers: [
      {
        url: process.env.HOST_URL,
        description: 'Development server',
      },
    ],
  },
  apis: ['src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin - like mobile apps, curl, etc.
    if (!origin) return callback(null, true);
    // if (allowedOrigins.indexOf(origin) === -1) {
    //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    //   return callback(new Error(msg), false);
    // }
    return callback(null, true);
  },
  credentials: true 
}));

app.use(bodyParser.json());
app.use('/suppliers', supplierRouter);
app.use('/products', productRouter);
app.use('/employees', employeeRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});