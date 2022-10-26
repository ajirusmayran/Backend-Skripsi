import { createConnection } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () =>
      await createConnection({
        type: "mysql",
        host:"http://34.106.142.51",
        port:3306,
        username: "aji",
        password: "P@ssw0rd123!",
        database: "hajaraswad_db",
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: false,
      }),
  },
];
