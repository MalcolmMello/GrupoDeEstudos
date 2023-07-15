export interface IMeet {
	subject: string;
	description: string;
	place: string;
	num_persons: number;
	date_hour: Date;
	ativo: boolean;
	host: {
		name: string;
	};
	marcado: boolean;
}
