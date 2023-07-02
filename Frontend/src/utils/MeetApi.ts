import { IMeet } from "../types/Meet";

const Meet: IMeet[] = [
  {
    "ativo": true,
    "materia": "Banco de Dados",
    "organizador": "Malcolm Lima",
    "qtdPessoas": 13,
    "data": "20/05",
    "local": "Sala de Estudos",
    "descricao": "Descrição muito legal do que vamos estudar no dia 20/05.",
    "marcado": false
  }
];

export const useApi = () => ({
  getAllMeets: async() => {
    let meets: IMeet[] = [];
    for(let i = 0; i < 8; i++){
      meets.push(...Meet);
    }
    return meets;
  },
  getMeet: async() => {
    return Meet;
  }
});
