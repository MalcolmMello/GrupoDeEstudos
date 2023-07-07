import { api } from '../../lib/axios';
import { IUser } from './types';

interface LoginResponse {
	token?: string;
}

export function setUserLocalStorage(user: IUser | null) {
	localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
	const json = localStorage.getItem('u');

	if (!json) {
		return null;
	}

	const user = JSON.parse(json) as IUser;

	return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
	try {
		const request = await api.post('login', { email, password });

		return request.data as LoginResponse;
	} catch (error) {
		return null;
	}
}
