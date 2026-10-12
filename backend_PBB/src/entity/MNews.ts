import { Column, Entity } from "typeorm";

@Entity("M_NEWS", { schema: "PBB_KUTAI-BARAT" })
export class MNews {
  @Column("numeric", { name: "NEWS_ID", precision: 1000, scale: 53 })
  newsId!: string;

  @Column("character varying", { name: "NEWS_TITLE", length: 100 })
  newsTitle!: string;

  @Column("character varying", { name: "NEWS_CONTENT", length: 100 })
  newsContent!: string;

  @Column("timestamp without time zone", { name: "NEWS_DATE" })
  newsDate!: Date;
}
