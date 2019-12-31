export function action(type: string): { type: string };
export function action<P = undefined>(type: string, payload?: P): { type: string; payload: P };
export function action<P = undefined, M = undefined>(
  type: string,
  payload: P,
  meta: M
): { type: string; payload: P; meta: M };

export function action<P = undefined, M = undefined>(type: string, payload?: P, meta?: M) {
  return { type, meta, payload };
}
