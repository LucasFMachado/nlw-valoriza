import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1627429499175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "char",
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: "sender_id",
                        type: "char",
                        generationStrategy: "uuid"
                    },
                    {
                        name: "receiver_id",
                        type: "char",
                        generationStrategy: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "char",
                        generationStrategy: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_compliments_sender_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["sender_id"]
                    },
                    {
                        name: "fk_compliments_receiver_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["receiver_id"]
                    },
                    {
                        name: "fk_compliments_tag_id",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"]
                    }
                ]
            })
        );

        // await queryRunner.createForeignKey(
        //     "compliments",
        //     new TableForeignKey({
        //         name: "fk_compliments_sender_id",
        //         referencedTableName: "users",
        //         referencedColumnNames: ["id"],
        //         columnNames: ["sender_id"],
        //         onDelete: "SET NULL",
        //         onUpdate: "SET NULL"
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
