import { Column, Entity } from "typeorm";

@Entity("M_INBOX", { schema: "PBB_KUTAI-BARAT" })
export class MInbox {
  @Column("character", { name: "ID_INBOX", nullable: true, length: 4 })
  idInbox!: string | null;

  @Column("character varying", {
    name: "TITLE_INBOX",
    nullable: true,
    length: 32,
  })
  titleInbox!: string | null;

  @Column("character varying", {
    name: "SUB_TITLE_INBOX",
    nullable: true,
    length: 32,
  })
  subTitleInbox!: string | null;

  @Column("character varying", {
    name: "MSG_INBOX",
    nullable: true,
    length: 64,
  })
  msgInbox!: string | null;

  @Column("timestamp without time zone", { name: "TGL_INBOX", nullable: true })
  tglInbox!: Date | null;

  @Column("character varying", {
    name: "USRNAME_PENGIRIM",
    nullable: true,
    length: 32,
  })
  usrnamePengirim!: string | null;

  @Column("character varying", {
    name: "USRNAME_PENERIMA",
    nullable: true,
    length: 32,
  })
  usrnamePenerima!: string | null;

  @Column("numeric", {
    name: "IS_READ",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isRead!: string | null;

  @Column("character varying", { name: "TYPE", nullable: true, length: 32 })
  type!: string | null;

  @Column("character varying", { name: "NM_ADMIN", nullable: true, length: 32 })
  nmAdmin!: string | null;
}
