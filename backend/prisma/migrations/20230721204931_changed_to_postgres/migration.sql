-- CreateTable
CREATE TABLE "Unidade" (
    "idUnidade" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("idUnidade")
);

-- CreateTable
CREATE TABLE "Curso" (
    "idCurso" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("idCurso")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "idAluno" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "semestre" INTEGER NOT NULL,
    "cursoId" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("idAluno")
);

-- CreateTable
CREATE TABLE "Organizador" (
    "idOrganizador" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Organizador_pkey" PRIMARY KEY ("idOrganizador")
);

-- CreateTable
CREATE TABLE "Reuniao" (
    "idReuniao" TEXT NOT NULL,
    "materia" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(350) NOT NULL,
    "local" VARCHAR(200) NOT NULL,
    "status" VARCHAR(100) NOT NULL DEFAULT 'Em aberto',
    "num_pessoas" INTEGER NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "organizadorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reuniao_pkey" PRIMARY KEY ("idReuniao")
);

-- CreateTable
CREATE TABLE "AlunosOnReunioes" (
    "alunoId" TEXT NOT NULL,
    "reuniaoId" TEXT NOT NULL,

    CONSTRAINT "AlunosOnReunioes_pkey" PRIMARY KEY ("alunoId","reuniaoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nome_key" ON "Curso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizador_alunoId_key" ON "Organizador"("alunoId");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("idUnidade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("idCurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizador" ADD CONSTRAINT "Organizador_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniao" ADD CONSTRAINT "Reuniao_organizadorId_fkey" FOREIGN KEY ("organizadorId") REFERENCES "Organizador"("idOrganizador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosOnReunioes" ADD CONSTRAINT "AlunosOnReunioes_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunosOnReunioes" ADD CONSTRAINT "AlunosOnReunioes_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao"("idReuniao") ON DELETE RESTRICT ON UPDATE CASCADE;
