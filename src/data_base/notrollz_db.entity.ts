import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class notrollz_entity {
    @PrimaryGeneratedColumn({ type: "int" })
    discord_id: number

    @Column({ type: "varchar" })
    discord_tag: string

    @Column({ type: "varchar" })
    summoner_name: string

    @Column({
        type: "varchar",
        default: ""
    })
    team_name: string

    @Column({
        type: "boolean",
        default: false
    })
    team_catain?: boolean

}