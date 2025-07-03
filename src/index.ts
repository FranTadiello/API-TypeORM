import "reflect-metadata"; //para entender os dacorators
import { AppDataSource } from "./data-source"; //cria a conexão com o banco de dados conforme configuração
import { User } from "./entity/User";
import * as readlineSync from 'readline-sync'; 

async function criarUsuario() {
  const nome = readlineSync.question("Digite o nome do usuário: ");
  const email = readlineSync.questionEMail("Digite o email do usuário: ");

  const userRepositorio = AppDataSource.getRepository(User);
  const novoUser = userRepositorio.create({ nome, email });
  await userRepositorio.save(novoUser);

  console.log("Usuário criado com sucesso!");
}

async function DeletarUsuario() {
  const id = readlineSync.questionInt("Digite o ID do usuário que deseja deletar: ");

  const userRepositorio = AppDataSource.getRepository(User);
  const resultado = await userRepositorio.delete(id);
  //console.log("Resultado da exclusão", resultado);

  if (resultado.affected) {
    console.log("Usuário deletado com sucesso!");
  } else {
    console.log("Usuário não encontrado.");
  }
}

async function listarUsuarios() {
  const lista = await AppDataSource.getRepository(User).find();

  console.log("\nUsuários cadastrados:");
  if (lista.length === 0) {
    console.log("Nenhum usuário encontrado.");
  } else {
    console.table(lista);
  }
}

async function atualizarUsuarios() {
  const id = readlineSync.questionInt("Digite o ID do usuário a ser atualizado: ");
  const novoEmail = readlineSync.questionEMail("Digite o novo email: ");

  const userRepositorio = AppDataSource.getRepository(User);
  const usuario = await userRepositorio.findOneBy({ id });

  if (!usuario) {
    console.log("Usuário não encontrado.");
    return;
  }

  usuario.email = novoEmail;
  await userRepositorio.save(usuario);

  console.log("Usuário atualizado com sucesso!");
}

AppDataSource.initialize().then(async () => {
    console.log("Conectado ao banco de dados!\n");

   let exit = false;
    while (!exit) {
        console.log("\nO que deseja fazer?");
        console.log("1. Adicionar Usuário");
        console.log("2. Deletar Usuário");
        console.log("3. Listar Usuários");
        console.log("4. Atualizar email de usuário");
        console.log("5. Sair");

        const choice = readlineSync.question("\nEscolha uma opcão: ");

        switch (choice) {
            case '1':
                await criarUsuario();
                break;
            case '2':
                await DeletarUsuario();
                break;
            case '3':
                await listarUsuarios();
                break;
            case '4':
                await atualizarUsuarios();
                break;
            case '5':
                exit = true;
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}).catch(error => console.log(error));



/*
AppDataSource.initialize().then(async () => {
    const userRepositorio = AppDataSource.getRepository(User);
    
    //adiciona novo usuario
    const novoUser = userRepositorio.create({
        nome: "Fabrício",
        email: "fabricio@gmail.com",
    });
    await userRepositorio.save(novoUser);

    //lista todos usuarios
    const listaUsers = await userRepositorio.find(); 
    console.log(listaUsers);

    // Atualizar email do usuario
    const user = await userRepositorio.findOneBy({ nome: "Fabrício"});
    if (user) {
        user.email = "fabricio.novo@email.com";
        await userRepositorio.save(user);
        console.log("Usuário atualizado", user);
    }

    //Deletar usuário
    await userRepositorio.delete({ nome: "Fabrício"});
    console.log("usuário deletado!");
}) */
