/**
 * Блок цифр.
 *
 * Значение необязательно намеренно: до запуска у нас нет ни одной настоящей
 * цифры, и прочерк — единственное, что здесь можно написать честно. Тип
 * устроен так, что «пусто» — это законное состояние, а не забытое поле:
 * иначе кто-нибудь однажды впишет сюда правдоподобный ноль.
 *
 * Как заполнить: добавить `value` нужной строке. Прочерк и приглушённый цвет
 * снимутся сами, трогать разметку не нужно.
 */
export interface Stat {
	id: string;
	label: string;
	value?: string;
}

export const STATS: readonly Stat[] = [
	{ id: "tvl", label: "Total value locked" },
	{ id: "depositors", label: "Depositors" },
	{ id: "coverage", label: "Active coverage sold" },
	{ id: "losses", label: "Losses applied to date" },
];

export const STATS_NOTE =
	"Figures land here once the pool is live on mainnet. Until then a dash is " +
	"the only honest number.";
