import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors()); //usar dentro do parâmetro para deixar os dados do servidor privados'http://localhost:3000'
// Criar usuário
app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }
  })
  res.status(201).json(req.body)
})
// Listar usuários
app.get("/usuarios", async (req, res) => {
  let users = []
  if (req.query){
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  }else{
    users = await prisma.user.findMany()
  }
  res.status(200).json(users)
})
// Atualizar/editar usuário
app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    }
  })
  res.status(201).json(req.body)
})
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {  
      id: req.params.id
    }
  })
  res.status(200).json({message: "Usuário deletado com sucesso!"})

})
app.listen(3000)