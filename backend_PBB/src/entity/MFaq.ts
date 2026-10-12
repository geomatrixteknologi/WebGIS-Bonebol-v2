import { Column, Entity } from "typeorm";

@Entity("M_FAQ", { schema: "PBB_KUTAI-BARAT" })
export class MFaq {
  @Column("numeric", { name: "FAQ_ID", precision: 1000, scale: 53 })
  faqId!: string;

  @Column("character varying", {
    name: "FAQ_TITLE",
    nullable: true,
    length: 100,
  })
  faqTitle!: string | null;

  @Column("character varying", {
    name: "FAQ_CONTENT",
    nullable: true,
    length: 100,
  })
  faqContent!: string | null;

  @Column("character varying", {
    name: "FAQ_CATEGORY",
    nullable: true,
    length: 100,
  })
  faqCategory!: string | null;

  @Column("timestamp without time zone", { name: "FAQ_DATE", nullable: true })
  faqDate!: Date | null;
}
