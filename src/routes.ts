export const base = "/pig-pic";
export const home = `${base}/`;
export const drawer = `${base}/drawer`;
export const game = `${base}/game`;
export const words = `${base}/words`;

export type Route = typeof home | typeof drawer | typeof game | typeof words;

export const routesEmojiMap: Record<Route, string> = {
  [home]: '🏠',
  [drawer]: '🎨',
  [game]: '👾',
  [words]: '📚',
};