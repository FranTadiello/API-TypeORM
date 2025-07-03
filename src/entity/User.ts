import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() //a classe abaixo é uma tabela de BD
export class User {
    @PrimaryGeneratedColumn() //propriedade abaixo é a chave primaria da tabela e gerada automaticamente (como um identificador unico)
    id!: number;

    @Column() //propriedade abaixo é uma coluna comum da tabela
    nome!: string;

    @Column()
    email!: string;
}

