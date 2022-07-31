import { createConnection } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () =>
      await createConnection({
        type: "mysql",
        host: "http://35.229.120.72",
        port: 3306,
        username: "root",
        password: "P@ssw0rd",
        database: "hajaraswad_db",
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: false,
      }),
  },
];
