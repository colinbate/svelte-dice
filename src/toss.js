import { quadOut} from 'svelte/easing';
import { randSide } from './rng';

export function toss(node, { duration, disable }) {
  if (disable) {
    return {
      duration,
      easing: quadOut,
      css: t => `opacity: ${t}`
    };
  }
  const direction = randSide(2) * 2 - 3; // -1 or 1
  const startingAngle = randSide(360);
  const twist = randSide(120) + 60;
  node.style.transform = `translate3d(0, 0, 0) rotate(${direction * twist + startingAngle}deg)`;
  return {
    duration,
    easing: quadOut,
    css: (t, u) => `transform: translate3d(0, ${200 * u}%, 0) rotate(${(t * direction * twist) + startingAngle}deg)`
  }
}
