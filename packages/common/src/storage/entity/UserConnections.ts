import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, Index, PrimaryColumn} from "typeorm";

@Entity()
export class UserConnections {
    @PrimaryColumn()
    id!: string;

    @Column({ nullable: true})
    discord_access_token!: string;

    @Column({ nullable: true})
    discord_token_type!: string;

    @Column({ nullable: true})
    discord_expires_at!: Date;

    @Column({ nullable: true})
    discord_refresh_token!: string;

    @Column({ nullable: true})
    discord_scope!: string;
}
