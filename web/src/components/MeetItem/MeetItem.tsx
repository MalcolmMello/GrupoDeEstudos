import { User } from '@phosphor-icons/react';
import { IMeet } from '../../types/Meet';
import ButtonCancel from '../ButtonCancel';
import ButtonConfirm from '../ButtonConfirm';
import dayjs from 'dayjs';

export function MeetItem(meet: IMeet) {
	const date = meet.date_hour;
	const dateFormated = dayjs(date).format('DD/MM');
	const hourFormated = dayjs(date).format('HH:mm');

	return (
		<div className="bg-white rounded-xl flex flex-col justify-between gap-10 p-5">
			<div className="grid grid-cols-4 items-center justify-between ">
				<div className="flex col-span-3 gap-4">
					<div className="bg-slate-200 rounded-xl w-11 h-11 grid place-content-center">
						<User size={24} className="text-slate-700 " />
					</div>
					<div className="flex flex-col">
						<span className="font-medium capitalize">{meet.host.name}</span>
						<span className="text-slate-600 text-sm">{hourFormated} - {dateFormated}</span>
					</div>
				</div>
				<div className="flex justify-end text-sm md:text-base">
					{meet.ativo ? (
						<span className="bg-green-200 py-2 px-4 rounded-full text-green-700">
							Ativo
						</span>
					) : (
						<span className="bg-red-200 py-2 px-4 rounded-full text-red-700">
							Inativo
						</span>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-2 ">
				<span className="text-base md:text-lg">{meet.subject}</span>
				<span className="text-slate-600 text-sm">{meet.description}</span>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="font-medium text-sm md:text-base">
						{meet.num_persons}
						<span className="font-normal"> Pessoas inscritas</span>
					</p>
					{meet.marcado ? <ButtonCancel /> : <ButtonConfirm />}
				</div>
			</div>
		</div>
	);
}
