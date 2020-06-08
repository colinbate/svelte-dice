export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function findBestSize(count, width, height) {
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

function doResize(node, {count, padding}) {
  const {offsetHeight, offsetWidth} = node;
  if (!offsetHeight) {
    requestAnimationFrame(() => doResize(node, {count, padding}));
  } else {
    const diceSizeWithMargins = findBestSize(count, offsetWidth - padding, offsetHeight - padding);
    const diceSize = diceSizeWithMargins / 1.41422;
    node.style.setProperty('--dice-size', diceSize + 'px');
    node.style.setProperty('--die-size', diceSize + 'px');
  }
}

export function autoSizeDice(node, opts) {
  if (!opts.enable) {
    return;
  }
  doResize(node, opts);
  return  {
    update(opt) {
      doResize(node, opt);
    }
  }
}
