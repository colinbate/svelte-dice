import type { SvelteComponent } from 'svelte';
export class Table extends SvelteComponent {
  roll(count?: number, fixedvalues?: number[]): { values: number[], sum: number };
  clear(): void;
  add(die: {value: number, id: string}): void;
  getById(id: string): {index: number, value: {value: number, id: string}, node: Node}
}
export class D6 extends SvelteComponent {}
export function rollD6(fixed: number): { value: number, id: string }
