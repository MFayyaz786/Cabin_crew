import "reflect-metadata"
import { DataSource } from 'typeorm';

export const DBConnect = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port:  Number(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entities/**/*.ts"],
  logging: false,
  synchronize: true,
});

DBConnect.initialize().then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});

