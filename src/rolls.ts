import { randSide, shortId } from './rng';
import type { DieResult, DieSides } from './util';

const createRoller = (sides: DieSides) => (fixed?: number): DieResult => {
  return { value: fixed || randSide(sides), id: shortId(), type: `d${sides}` };
}

export const ROLLERS = {
  d4: createRoller(4),
  d6: createRoller(6),
  d8: createRoller(8),
  d10: createRoller(10),
  d12: createRoller(12),
  d20: createRoller(20),
  d100: createRoller(100),
};
