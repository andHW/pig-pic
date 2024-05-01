export const base = "/pig-pic";
export const home = `${base}/`;
export const drawer = `${base}/drawer`;
export const game = `${base}/game`;
export const words = `${base}/words`;
export const sandbox = `${base}/sandbox`;

export type Route = typeof home | typeof drawer | typeof game | typeof words | typeof sandbox;

export const routesEmojiMap: Record<Route, string> = {
  [home]: '🏠',
  [drawer]: '🎨',
  [game]: '👾',
  [words]: '📚',
  [sandbox]: '🏜️',
};