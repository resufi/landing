export const TON = {
	vault: "EQCYM6Xhwy-xbfzJtkUrKVjPH2iSjJzkyeq2l9lWFXaqOMTa",
	assetMaster: "EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav",
	assetSymbol: "tsTON",
	trancheMasters: [
		"EQCNRshVQPTZpZbklS95Dbwk94ENTjX_QdSm6XzzX7007NzA",
		"EQD6iQc727xcQfQ52a55kGs5JMFWqkhZ2ZawbUTDG_gxAAnH",
		"EQB0cst-oyrDqJOswEnhzZa0CfqmEnsdpbXXsPen9fKkkL-H",
	],
} as const;

export const EXPLORER = `https://tonviewer.com/${TON.vault}`;
