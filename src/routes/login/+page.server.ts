import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	console.log('Here we go from event', event.locals?.user?.email);
	// todo
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');

	if (
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		!email ||
		!password ||
		email !== 's@s.com' ||
		password !== 'pw'
	) {
		return fail(400, { invalid: true });
	}

	const authenticatedUser = {
		email,
		isAdmin: true
	};

	cookies.set('session', JSON.stringify(authenticatedUser), {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30
	});

	// redirect the user
	throw redirect(302, '/');
};

export const actions: Actions = { login };
