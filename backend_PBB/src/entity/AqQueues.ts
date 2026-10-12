import { Column, Entity } from "typeorm";

@Entity("AQ$_QUEUES", { schema: "PBB_KUTAI-BARAT" })
export class AqQueues {
  @Column("bytea", { name: "OID" })
  oid!: Buffer;

  @Column("numeric", { name: "EVENTID", precision: 1000, scale: 53 })
  eventid!: string;

  @Column("character varying", { name: "NAME", length: 128 })
  name!: string;

  @Column("numeric", { name: "TABLE_OBJNO", precision: 1000, scale: 53 })
  tableObjno!: string;

  @Column("numeric", { name: "USAGE", precision: 1000, scale: 53 })
  usage!: string;

  @Column("numeric", { name: "ENABLE_FLAG", precision: 1000, scale: 53 })
  enableFlag!: string;

  @Column("numeric", {
    name: "MAX_RETRIES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  maxRetries!: string | null;

  @Column("numeric", {
    name: "RETRY_DELAY",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  retryDelay!: string | null;

  @Column("numeric", {
    name: "PROPERTIES",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  properties!: string | null;

  @Column("numeric", {
    name: "RET_TIME",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  retTime!: string | null;

  @Column("character varying", {
    name: "QUEUE_COMMENT",
    nullable: true,
    length: 2000,
  })
  queueComment!: string | null;

  @Column("character varying", {
    name: "SUBSCRIBERS",
    nullable: true,
    length: 3752,
  })
  subscribers!: string | null;

  @Column("numeric", {
    name: "MEMORY_THRESHOLD",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  memoryThreshold!: string | null;

  @Column("character varying", {
    name: "SERVICE_NAME",
    nullable: true,
    length: 64,
  })
  serviceName!: string | null;

  @Column("character varying", {
    name: "NETWORK_NAME",
    nullable: true,
    length: 256,
  })
  networkName!: string | null;

  @Column("bytea", { name: "SUB_OID", nullable: true })
  subOid!: Buffer | null;

  @Column("numeric", {
    name: "SHARDED",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  sharded!: string | null;

  @Column("numeric", {
    name: "BASE_QUEUE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  baseQueue!: string | null;
}
