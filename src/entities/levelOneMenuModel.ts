import {
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("LevelOneMenu")
export class LevelOneMenuEntity {
  @PrimaryGeneratedColumn("uuid")
  keyId: string;

  @Column()
  id: string;

  @Column()
  mainMenu: string;

  @Column()
  text: string;

  @Column()
  description: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
