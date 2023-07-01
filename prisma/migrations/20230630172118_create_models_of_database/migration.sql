-- CreateTable
CREATE TABLE `Unidade` (
    `idUnidade` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idUnidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `idCurso` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `unidadeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Curso_nome_key`(`nome`),
    PRIMARY KEY (`idCurso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `idAluno` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `semestre` INTEGER NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idAluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizador` (
    `idOrganizador` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Organizador_alunoId_key`(`alunoId`),
    PRIMARY KEY (`idOrganizador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reuniao` (
    `idReuniao` VARCHAR(191) NOT NULL,
    `materia` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(350) NOT NULL,
    `local` VARCHAR(200) NOT NULL,
    `num_pessoas` INTEGER NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `organizadorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idReuniao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunosOnReunioes` (
    `alunoId` VARCHAR(191) NOT NULL,
    `reuniaoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`alunoId`, `reuniaoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`idUnidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`idCurso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizador` ADD CONSTRAINT `Organizador_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`idAluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reuniao` ADD CONSTRAINT `Reuniao_organizadorId_fkey` FOREIGN KEY (`organizadorId`) REFERENCES `Organizador`(`idOrganizador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunosOnReunioes` ADD CONSTRAINT `AlunosOnReunioes_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`idAluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunosOnReunioes` ADD CONSTRAINT `AlunosOnReunioes_reuniaoId_fkey` FOREIGN KEY (`reuniaoId`) REFERENCES `Reuniao`(`idReuniao`) ON DELETE RESTRICT ON UPDATE CASCADE;
