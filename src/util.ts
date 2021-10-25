export type DieSides = 4 | 6 | 8 | 10 | 12 | 20 | 100;
export type DieType = `d${DieSides}`;

export interface DieResult {
  id: string;
  value: number;
  type: DieType;
}

export interface DieLocator {
  index: number;
  result: DieResult;
  node: HTMLElement;
}

export interface DiceSummary {
  results: DieResult[];
  sum: number;
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function findBestSize(count: number, width: number, height: number) {
  const maxRows = Math.floor(Math.sqrt(count));
  let bestSize = 0;
  const [majorLength, minorLength] = width > height ? [width, height] : [height, width];
  for (let r = 1; r <= maxRows; r += 1) {
    const rowSize = Math.ceil(count / r);
    const [majorCount, minorCount] = rowSize > r ? [rowSize, r] : [r, rowSize];
    const localBest = Math.min(majorLength / majorCount, minorLength / minorCount);
    if (localBest > bestSize) {
      bestSize = localBest;
    }
  }
  console.log(`Found best size for ${count} dice on a ${width}x${height} table = ${bestSize}px`);
  return bestSize;
}

export interface ResizeOptions {
  enable: boolean;
  count: number;
  padding: number;
}

function doResize(node: HTMLElement, { count, padding }: Partial<ResizeOptions>) {
  const {offsetHeight, offsetWidth} = node;
  if (!offsetHeight) {
    requestAnimationFrame(() => doResize(node, { count, padding }));
  } else {
    const diceSizeWithMargins = findBestSize(count, offsetWidth - padding, offsetHeight - padding);
    const diceSize = diceSizeWithMargins / 1.41422;
    node.style.setProperty('--dice-size', diceSize + 'px');
    node.style.setProperty('--die-size', diceSize + 'px');
  }
}

export function autoSizeDice(node: HTMLElement, opts: ResizeOptions) {
  if (!opts.enable) {
    return;
  }
  doResize(node, opts);
  return  {
    update(opt: ResizeOptions) {
      doResize(node, opt);
    }
  }
}
