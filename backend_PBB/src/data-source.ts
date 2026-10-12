import "reflect-metadata";
import "dotenv/config"; // Import this before entities to load environment variables first
import { DataSource } from "typeorm";
import oracledb from "oracledb";

// Import all entities from the entities folder
import { PembayaranSppt } from "./entity_prod/PembayaranSppt";
import { RefKecamatan } from "./entity_prod/RefKecamatan";
import { RefKelurahan } from "./entity_prod/RefKelurahan";
import { KelasTanah } from "./entity_prod/KelasTanah";
import { Sppt } from "./entity_prod/Sppt";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SID, DB_LIBDIR } = process.env;

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: DB_HOST || "localhost",
//   port: parseInt(DB_PORT || "5432"),
//   username: DB_USERNAME || "postgres",
//   password: DB_PASSWORD || "root",
//   database: DB_DATABASE || "PBB_MURA",
//   schema: DB_SCHEMA,
//   synchronize: false,
//   logging: true,
//   ssl: {
//     rejectUnauthorized: false, // untuk sementara (non-production)
//   },
//   entities: [Sppt, PembayaranSppt, RefKecamatan, RefKelurahan, KelasTanah],
//   migrations: [],
//   subscribers: ["src/subscriber/*.ts"],
// });
oracledb.initOracleClient({
  libDir: DB_LIBDIR
});

export const AppDataSource = new DataSource({
  type: "oracle",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  extra: {
    connectString: `${DB_HOST}:${DB_PORT}/${DB_SID}`,
  },
  entities: [Sppt, PembayaranSppt, RefKecamatan, RefKelurahan, KelasTanah],
  migrations: [],
  subscribers: ["src/subscriber/*.ts"],
});