import {
	ChalkboardTeacher,
	House,
	List,
	SignIn,
	Users,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ListIcon = () => {
	const [opened, setOpened] = useState(false);

	return (
		<div
			className="flex sm:hidden relative z-10"
			onClick={() => {
				setOpened(opened ? false : true);
			}}
		>
			<List size={32} color="#fff" weight="bold" />
			{opened && (
				<div className="bg-white flex flex-col shadow-md w-48 rounded-md absolute top-8 right-0 divide-y-2">
					<ul className="text-black p-3 flex flex-col gap-3">
						<Link to={'/'} className="">
							<li className="flex gap-2 items-center">
								<House weight="bold" size={24} /> Home
							</li>
						</Link>
						<Link to={'/scheduledmeetings'}>
							<li className="flex gap-2 items-center">
								<Users size={24} color="#050505" weight="bold" /> Reuniões
								Marcadas
							</li>
						</Link>
						<Link to={'/mymeetings'}>
							<li className="flex gap-2 items-center">
								<ChalkboardTeacher size={24} color="#050505" weight="bold" />
								Minhas Reuniões
							</li>
						</Link>
					</ul>
					<Link to={'/login'}>
						<p className="flex gap-2 items-center text-black p-3">
							<SignIn size={24} color="#050505" weight="bold" />
							Login
						</p>
					</Link>
				</div>
			)}
		</div>
	);
};

export default ListIcon;
