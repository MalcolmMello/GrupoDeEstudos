import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../context/AuthProvider/useAuth';
import { ILogin } from '../types/Login';

const schema = z.object({
    email: z.string()
        .nonempty('O Email é obrigatório')
        .max(150, { message: 'O email deve conter no máximo 150 caracteres' })
        .email({ message: 'Email inválido' })
        .transform(
            email => {
                return email.trim().toLowerCase()
            }),
    password: z
        .string()
        .min(8, { message: 'Senha inválida. A senha deve ter pelo menos 8 caracteres.' })
        .max(100, { message: 'A senha deve conter no máximo 100 caracteres' })
    // Tirei o Regex pra testar a ReqRes API
});

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [authError, setAuthError] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: ILogin) {
        try {
            setLoading(true);
            const { email, password } = data;
            await auth.authenticate(email, password);
            const from = location.state?.from || '/';
            navigate(from);
        } catch (error) {
            setAuthError(true);
        } finally {
            setLoading(false);
        }

        setOutput(JSON.stringify(data, null, 2))
    }

    return (
        <form className="py-40 m-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2">
                    <img src="../../src/assets/imgLogin.jpeg" alt="teste" className="w-full h-full" />
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    {authError &&
                        <div className='text-semibold border-2 border-red-300 rounded-lg bg-red-200 text-red-600 px-4 py-6  mb-6 text-sm'>Dados não conferem. Verifique se os dados enviados estão corretos.</div>
                    }
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">StudyHub</h2>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">Fazer Login</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" {...register('email')} />
                        {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                        </div>
                        <input className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" {...register('password')} />
                        {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
                    </div>
                    <div className="mt-8">
                        <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" disabled={loading}>Login</button>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link to={'/signup'} className="text-xs text-gray-500 uppercase">Ou Criar Conta</Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
            <pre>{output}</pre>
        </form>
    )
}

export default Login
