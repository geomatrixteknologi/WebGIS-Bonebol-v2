import { Column, Entity } from "typeorm";

@Entity("OL$NODES", { schema: "PBB_KUTAI-BARAT" })
export class OlNodes {
  @Column("character varying", { name: "OL_NAME", nullable: true, length: 128 })
  olName!: string | null;

  @Column("character varying", {
    name: "CATEGORY",
    nullable: true,
    length: 128,
  })
  category!: string | null;

  @Column("numeric", {
    name: "NODE_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nodeId!: string | null;

  @Column("numeric", {
    name: "PARENT_ID",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  parentId!: string | null;

  @Column("numeric", {
    name: "NODE_TYPE",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nodeType!: string | null;

  @Column("numeric", {
    name: "NODE_TEXTLEN",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nodeTextlen!: string | null;

  @Column("numeric", {
    name: "NODE_TEXTOFF",
    nullable: true,
    precision: 1000,
    scale: 53,
  })
  nodeTextoff!: string | null;

  @Column("character varying", {
    name: "NODE_NAME",
    nullable: true,
    length: 64,
  })
  nodeName!: string | null;
}
