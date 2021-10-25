<script lang="ts">
import { toss } from './toss';
import type { DieResult } from './util';
export let value: DieResult;
export let color = '#fff';
export let noToss = false;
$: side = 'n' + value.value;
</script>
<style>
.die {
  width: calc(1 * var(--die-size, 50vmin));
  height: calc(1 * var(--die-size, 50vmin));
  border-radius: calc(0.015 * var(--die-size, 50vmin));
  box-shadow: calc(0.015 * var(--die-size, 50vmin)) calc(0.015 * var(--die-size, 50vmin)) calc(0.1 * var(--die-size, 50vmin)) 0 rgba(0,0,0,0.2),
              inset calc(-0.01 * var(--die-size, 50vmin)) calc(-0.01 * var(--die-size, 50vmin)) calc(0.04 * var(--die-size, 50vmin)) 0 rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 5;
  margin: var(--die-margin, calc(0.20715 * var(--die-size, 50vmin)));
}

.die::after {
  content: "";
  position: absolute;
  width: 98%;
  height: 98%;
  border-radius: 10%;
  box-shadow: 0 0 calc(0.08 * var(--die-size, 50vmin)) calc(0.04 * var(--die-size, 50vmin)) rgba(0,0,0,0.1),
              inset 0 0 calc(0.04 * var(--die-size, 50vmin)) calc(0.004 * var(--die-size, 50vmin)) rgba(0,0,0,0.1);
}
.dot {
  width: 16.6666%;
  height: 16.6666%;
  margin: 16.6666%;
  background-color: var(--dot-color, #444);
  border-radius: 50%;
  box-shadow: inset calc(0.015 * var(--die-size, 50vmin)) calc(0.015 * var(--die-size, 50vmin)) calc(0.04 * var(--die-size, 50vmin)) calc(0.004 * var(--die-size, 50vmin)) var(--dot-shadow-color, rgba(0,0,0,0.3));
}

.die.n1 .dot2,
.die.n1 .dot3,
.die.n1 .dot4,
.die.n1 .dot5,
.die.n1 .dot6,
.die.n2 .dot3,
.die.n2 .dot4,
.die.n2 .dot5,
.die.n2 .dot6,
.die.n3 .dot4,
.die.n3 .dot5,
.die.n3 .dot6,
.die.n4 .dot5,
.die.n4 .dot6,
.die.n5 .dot6
{
  display: none;
}
/* DIE: 2 */
.die.n2 .dot1 {
  align-self: flex-start;
}

.die.n2 .dot2 {
  align-self: flex-end;
}

/* DIE: 3 */
.die.n3 .dot1 {
  align-self: flex-start;
  margin-right: 0;
  margin-bottom: 0;
}

.die.n3 .dot2 {
  margin: 8.3333%;
}

.die.n3 .dot3 {
  align-self: flex-end;
  margin-top: 0;
  margin-left: 0;
}

/* DIE: 4 */
.die.n4 {
  flex-wrap: wrap;
}

/* DIE: 5 */
.die.n5 {
  flex-wrap: wrap;
}

.die.n5 .dot1 {
  margin-right: 0;
  margin-bottom: 25%;
}

.die.n5 .dot2 {
  margin: 41.6666% 8.3333% 0;
}

.die.n5 .dot3 {
  margin-left: 0;
  margin-bottom: 25%;
}

.die.n5 .dot4 {
  margin-top: 8.3333%;
}

.die.n5 .dot5 {
  margin-top: 8.3333%;
}

/* DIE: 6 */
.die.n6 {
  flex-wrap: wrap;
}

.die.n6 .dot1 {
  margin-bottom: 8.3333%;
}

.die.n6 .dot2 {
  margin-bottom: 8.3333%;
}

.die.n6 .dot3 {
  margin-top: 0;
  margin-bottom: 0;
}

.die.n6 .dot4 {
  margin-top: 0;
  margin-bottom: 0;
}

.die.n6 .dot5 {
  margin-top: 8.3333%;
}

.die.n6 .dot6 {
  margin-top: 8.3333%;
}
</style>
<div class="die {side}" data-die-id={value.id} on:click style="background-color: var(--dice-color, {color});" in:toss={{duration: 700, disable: noToss}}>
  <div class="dot1 dot"></div>
  <div class="dot2 dot"></div>
  <div class="dot3 dot"></div>
  <div class="dot4 dot"></div>
  <div class="dot5 dot"></div>
  <div class="dot6 dot"></div>
</div>