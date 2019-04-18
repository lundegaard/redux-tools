export const IS_SERVER = Boolean(
	typeof process !== 'undefined' && process && process.versions && process.versions.node
);
