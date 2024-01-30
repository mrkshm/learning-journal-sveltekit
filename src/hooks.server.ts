import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const sessionCookie = event.cookies.get('session');

	if (!sessionCookie) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	const session = JSON.parse(sessionCookie);

	event.locals.user = {
		email: session.email,
		isAdmin: session.isAdmin
	};

	// load page as normal
	return await resolve(event);
};
