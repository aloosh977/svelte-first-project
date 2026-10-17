import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: players, error } = await locals.supabase
		.from('Players')
		.select('*')
		.order('order_index', { ascending: true });

	if (error) {
		console.error('Error fetching players:', error);
		return { players: [] };
	}

	return { players: players || [] };
};
