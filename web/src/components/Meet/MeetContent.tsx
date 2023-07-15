import { User } from '@phosphor-icons/react';
import { IMeet } from '../../types/Meet';
import dayjs from 'dayjs';

const MeetContent = (meet: IMeet) => {
	const date = meet.date_hour;
	const dateFormated = dayjs(date).format('DD/MM');
	const hourFormated = dayjs(date).format('HH:mm');

	return (
		<div className="bg-white rounded-xl flex flex-col justify-between gap-8">
			<div className="grid grid-cols-4 items-center justify-between ">
				<div className="flex col-span-3 gap-4">
					<div className="bg-slate-200 rounded-xl w-11 h-11 grid place-content-center">
						<User size={24} className="text-slate-700 " />
					</div>
					<div className="flex flex-col">
						<span className="font-medium capitalize">{meet.host.name}</span>
						<span className="text-slate-600 text-sm">
							{hourFormated} - {dateFormated}
						</span>
					</div>
				</div>
				<div className="flex justify-end text-sm md:text-base">
					{meet.status ? (
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

			<div className="flex flex-col">
				<div className="flex items-center justify-start gap-4">
					<span className="text-base font-medium">
						{meet.place}
					</span>
          <span className='text-2xl'>-</span>
					<p className="font-medium text-sm md:text-base">
						{meet.num_persons}
						<span className="font-normal"> Pessoas inscritas</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default MeetContent;
