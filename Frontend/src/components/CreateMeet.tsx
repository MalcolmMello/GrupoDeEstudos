import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthProvider/useAuth';
import { IMeet } from '../types/Meet';

const schema = z.object({
	materia: z.string().nonempty('A matéria é obrigatória').max(50, {
		message: 'O nome da matéria deve conter no máximo 50 caracteres',
	}),
	local: z
		.string()
		.nonempty('O local é obrigatório')
		.max(200, { message: 'O local deve conter no máximo 200 caracteres' }),
	descricao: z
		.string()
		.nonempty()
		.max(350, { message: 'A descrição deve conter no máximo 100 caracteres' }),
	data: z.string().refine(
		(value) => {
			const date = dayjs(value, 'YYYY-MM-DDTHH:mm');
			return date.isValid();
		},
		{
			message: "That's not a valid date and time!",
		}
	),
});

const CreateMeet = () => {
	const [loading, setLoading] = useState(false);
	const [output, setOutput] = useState('');
	const auth = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMeet>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<IMeet> = (data: IMeet) => {
		setOutput(JSON.stringify(data, null, 2));
		window.alert('Reunião criada!');
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button
					className="h-[40px] bg-white font-medium px-3 rounded-md"
					onClick={() => {
						if (!auth.token) {
							navigate('/login', { state: { from: '/mymeetings' } });
						}
					}}
				>
					Criar Reunião
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title className="text-mauve12 m-0 mb-4 text-[17px] font-medium">
						Criar Reunião
					</Dialog.Title>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="materia"
						>
							Matéria
						</label>
						<input
							className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id=" materia"
							defaultValue=""
							type="text"
							{...register('materia')}
						/>
						{errors.materia && (
							<span className="text-sm text-red-600">
								{errors.materia.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="local"
						>
							Local
						</label>
						<input
							className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id="local"
							defaultValue=""
							{...register('local')}
						/>
						{errors.local && (
							<span className="text-sm text-red-600">
								{errors.local.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="Data"
						>
							Data
						</label>
						<input
							className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[5px] text-[12px] sm:text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
							id="local"
							defaultValue=""
							type="datetime-local"
							{...register('data')}
						/>
						{errors.data && (
							<span className="text-sm text-red-600">
								{errors.data.message}
							</span>
						)}
					</fieldset>
					<fieldset className="mb-[15px] flex items-center gap-5">
						<label
							className="text-violet11 w-[90px] text-right text-[15px]"
							htmlFor="descricao"
						>
							Descrição
						</label>
						<textarea
							className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[70px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] py-2"
							{...register('descricao')}
						>
							{errors.descricao && (
								<span className="text-sm text-red-600">
									{errors.descricao.message}
								</span>
							)}
						</textarea>
					</fieldset>
					<div className="mt-[25px] flex justify-end">
						<Dialog.Close asChild>
							<button
								className="font-medium border-2 border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white"
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={handleSubmit(onSubmit)}
							>
								Criar
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
							aria-label="Close"
							disabled={loading}
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
					<pre>{output}</pre>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
export default CreateMeet;
