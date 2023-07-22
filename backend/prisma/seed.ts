import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  await prisma.alunosOnReunioes.deleteMany();

  await prisma.reuniao.deleteMany();
  
  await prisma.organizador.deleteMany();
  
  await prisma.aluno.deleteMany();
  
  await prisma.curso.deleteMany();
  
  await prisma.unidade.deleteMany();

  await Promise.all([
    prisma.unidade.create({
      data: 
        {
          idUnidade: "aa2c0709-df27-41cc-8a7c-9a3e01e7d620",
          nome: "Etec",
          cursos: {
            create: [
              {
                idCurso: "55b3a778-5ca8-4ac6-a6c1-586b7c5ece25",
                nome: "Desenvolvimento de Sistemas"
              },
              {
                idCurso: "9f2165a8-2976-4fec-a2d9-ba00fe88915f",
                nome: "Administração"
              },
              {
                idCurso: "997525aa-e6aa-4bf4-866e-6450369799c2",
                nome: "Logística"
              },
              {
                idCurso: "ea791d2b-5798-434e-b21d-50317fefa627",
                nome: "Marketing"
              },
              {
                idCurso: "7ed037d1-8d54-455e-b382-a45edc9306f9",
                nome: "Informática para Internet"
              },
              {
                idCurso: "2f7d0375-a89e-4213-b9b5-c650130ffd03",
                nome: "Humanas"
              }
            ]
          }
        }
    
    }),
    prisma.unidade.create({
      data: {
        idUnidade: "73e57579-2e63-4293-bd96-7ed58f27f43b",
        nome: "Fatec",
        cursos: {
          create: [
            {
              idCurso: "ec0bb49c-a3b6-4495-b8c0-1a4cfb5a7c3c",
              nome: "Gestão de Tecnologia da Informação"
            },
            {
              idCurso: "3053b5b7-4371-43ec-8b6b-c8f5ae222912",
              nome: "Gestão de Energia e Eficiência Energética"
            }
          ]
        }
      }
    })
  ]);
};

run()
  .then(async() => {
    await prisma.$disconnect();
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });