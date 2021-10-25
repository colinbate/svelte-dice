<script lang="ts">
import D6 from './D6.svelte';
import { createEventDispatcher, tick } from 'svelte';
import { delay, autoSizeDice, DieResult, DieLocator, DiceSummary } from './util';
import { ROLLERS } from './rolls';

export let numberOfDice = 1;
export let fixedSizeFor: number | undefined = undefined;
export let autoDiceSize = true;
export let tapToRoll = true;
export let diceColor = '#fff';
export let transparent = false;
export let captureDiceClick = false;
export let padding = 32;

let dice: DieResult[] = [];
let rolling = false;
let tableEl: HTMLElement;

type rollType = typeof ROLLERS.d6;
let rollers: rollType[];
$: rollers = Array(numberOfDice).fill(ROLLERS.d6);
$: {
  if (typeof numberOfDice === 'string') {
    numberOfDice = parseInt(numberOfDice, 10);
  }
  if (numberOfDice > 36) {
    numberOfDice = 36;
    console.warn('Max number of dice is 36');
  } else if (numberOfDice < 1) {
    numberOfDice = 1;
    console.warn('Min number of dice is 1');
  }
  if (fixedSizeFor != null && fixedSizeFor < numberOfDice) {
    fixedSizeFor = numberOfDice;
  }
}

const dispatch = createEventDispatcher();

export async function roll(newCount: number | undefined = undefined, fixedvalues = []): Promise<DiceSummary> {
  rolling = true;
  if (newCount) {
    numberOfDice = newCount;
    await tick();
  }
  if (dice.length) {
    dice = [];
    await delay(300);
  }
  const values = fixedvalues.length
    ? rollers.map((fn, ii) => fn(fixedvalues[ii % fixedvalues.length]))
    : rollers.map(fn => fn());
  const sum = values.reduce((p, c) => p + c.value, 0);
  const payload: DiceSummary = { results: [...values], sum };
  dice = values;
  dispatch('rolled', payload);
  return payload;
}

export function clear() {
  dice = [];
  dispatch('cleared');
}

export function add(die: DieResult) {
  rolling = false;
  dice = [...dice, die];
}

export function getById(id: string): DieLocator {
  const index = dice.findIndex(d => d.id === id);
  if (index < 0) {
    return;
  }
  return {
    index,
    result: dice[index],
    node: tableEl.querySelector(`[data-die-id="${dice[index].id}"]`)
  }
}

function tableRoll() {
  if (tapToRoll) {
    roll();
  }
}

function diceClick(ev: MouseEvent, which: number) {
  if (captureDiceClick) {
    ev.preventDefault();
    ev.stopPropagation();
    const detail: DieLocator = { index: which, result: dice[which], node: ev.target as HTMLElement };
    dispatch('diceclick', detail);
  }
}
</script>
<style>
.table {
  min-width: 300px;
  min-height: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  --die-size: var(--dice-size, 16vmin);
  overflow: hidden;
}
.wooden {
  background-color: #e8cd97;
  background-image: url(https://dice.cbate.com/wood.jpg);
}
</style>
<div class="table" bind:this={tableEl} class:wooden={!transparent} on:click={tableRoll} use:autoSizeDice={{count: fixedSizeFor || numberOfDice, padding, enable: autoDiceSize}}>
  {#each dice as die, i (die.id)}
    <D6 color={diceColor} value={die} on:click={(ev) => diceClick(ev, i)} noToss={!rolling}/>
  {/each}
</div>