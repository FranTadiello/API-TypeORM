import "reflect-metadata"; //para entender os dacorators
import { User } from "./entity/User";
import { createConnection } from "typeorm"; //lê o arquivo ormconfig.json e cria a conexão com o banco de dados

createConnection().then(async (conectar) => {
    const userRepositorio = conectar.getRepository(User);
    
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
})