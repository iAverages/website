import { z } from "zod/v4-mini";
import { trytm } from "./trytm";

const schema = z.object({
	cursor: z.number(),
	data: z.array(
		z.object({
			id: z.string(),
			time: z.number(),
			name: z.string(),
			duration: z.number(),
			explicit: z.number(),
			artistId: z.string(),
			albumId: z.string(),
			albumName: z.string(),
			coverArt: z.string(),
			artistName: z.string(),
		}),
	),
});

export type ListeningHistory = z.infer<typeof schema>["data"];
export type Track = ListeningHistory[number];

export const getListeningHistory = async () => {
	const response = await fetch(
		"https://s.kirsi.dev/api/profile/fp0sllluqyvm69f5ukrc6buv/history",
	);
	const [json, error] = await trytm(response.json());
	if (json) {
		const validator = schema.safeParse(json);
		if (validator.success) {
			return validator.data.data;
		}
	}

	console.warn("failed to load listening history from machina", {
		json,
		error,
	});

	return [];
};
