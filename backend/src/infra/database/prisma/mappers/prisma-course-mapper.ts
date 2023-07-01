import { Course } from "@application/entities/course";
import { Unit } from "@application/entities/unit";
import { Unidade as RawUnidade} from "@prisma/client";

interface RawCourseAndRawUnidade {
    idCurso: string,
    nome: string,
    unidade: RawUnidade
}

export class PrismaCourseMapper {
    static toPrisma() {
        return {
        }
    }

    static toDomain(rawCourse: RawCourseAndRawUnidade) {
        const unit = new Unit(rawCourse.unidade.nome, rawCourse.unidade.idUnidade);
        return new Course(
            rawCourse.nome, 
            unit, 
            rawCourse.idCurso
        );
    }
}