import { getNewsItem, type NewsID, type NewsItem } from "@/data/news";
import { atom } from "nanostores";

export const $news = atom<NewsID[]>([]);

export function addNews(id: NewsID): void {
	const current = $news.get();

	if (current.includes(id))
		throw new Error(
			`Attempted to add news item \`${id}\` which is already in the pipeline`,
		);

	$news.set([...current, id]);
}

export function shiftNews(): NewsItem {
	const current = $news.get();

	if (!current.length)
		throw new Error("Attempted to emit news item from an empty pipeline");

	const [id, ...rest] = current;
	// * we know `id` exists because we've checked for length of pipeline
	const item = getNewsItem(id!);

	$news.set(rest);

	return item;
}
