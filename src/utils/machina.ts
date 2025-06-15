export const getListeningHistory = async () => {
	const response = await fetch(
		"https://s.kirsi.dev/api/profile/fp0sllluqyvm69f5ukrc6buv/history",
	);
	const json = (await response.json()) as ListeningHistory;
	return json.data;
};

export type ListeningHistory = {
	cursor: number;
	data: Array<{
		id: string;
		time: number;
		name: string;
		duration: number;
		explicit: number;
		artistId: string;
		albumId: string;
		albumName: string;
		coverArt: string;
		artistName: string;
	}>;
};
