import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('MainMenu')
export default class MainMenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mainMenuId: String;

  @Column()
  text: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
