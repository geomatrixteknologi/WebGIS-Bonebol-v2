import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Import all entities from the entities folder
import { AccountRole } from "./entity/entities/AccountRole";
import { BatasBlok } from "./entity/entities/BatasBlok";
import { BatasKecamatan } from "./entity/entities/BatasKecamatan";
import { BatasKelurahan } from "./entity/entities/BatasKelurahan";
import { BatasPersil } from "./entity/entities/BatasPersil";
import { BatasZnt } from "./entity/entities/BatasZnt";
import { CenterPoint } from "./entity/entities/CenterPoint";
import { RefWarnaKelurahan } from "./entity/entities/RefWarnaKelurahan";
import { RefWarnaStatusPembayaran } from "./entity/entities/RefWarnaStatusPembayaran";
import { RefWarnaStatusPendaftaran } from "./entity/entities/RefWarnaStatusPendaftaran";
import { RefWarnaZnt } from "./entity/entities/RefWarnaZnt";
import { UserAccount } from "./entity/entities/UserAccount";
import { Zoom } from "./entity/entities/Zoom";
import { PbjtPoint } from "./entity/entities/PbjtPoint";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SCHEMA } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  schema: DB_SCHEMA,
  synchronize: false,
  logging: true,
  extra: {
    max: 5,
    min: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  },
  ssl: {
    rejectUnauthorized: false, // untuk sementara (non-production)
  },
  entities: [AccountRole, BatasBlok, BatasKecamatan, BatasKelurahan, BatasPersil, BatasZnt, CenterPoint, RefWarnaKelurahan, RefWarnaStatusPembayaran, RefWarnaStatusPendaftaran, RefWarnaZnt, UserAccount, Zoom, PbjtPoint],
  subscribers: [],
  migrations: [],
});
