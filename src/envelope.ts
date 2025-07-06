function mmToPx(mm: number): number {
  return mm * 3.78; // Rough conversion
}

function createPath(totalWidth: number, score: number, offsetBoard: number): string {
  const scorePosOffset = score + offsetBoard
  const scoreNegOffset = score - offsetBoard
  return `<path
  d="M 0 ${totalWidth - scorePosOffset} L ${scorePosOffset} ${totalWidth}
     M ${scoreNegOffset} ${totalWidth}  L ${totalWidth} ${scoreNegOffset}
     M ${totalWidth} ${scorePosOffset}  L ${totalWidth - scorePosOffset} 0
     M ${totalWidth - scoreNegOffset} 0 L 0 ${totalWidth - scoreNegOffset}"
  style="stroke:black;stroke-width:1;stroke-dasharray:1,2"/>`
}

function createEnvelopeSVG(width: number, height: number, depth: number): string {
  const offset = 10
  const c = Math.SQRT2 / 2 // cos/sin of 45 deg
  const offsetBoard = 9
  const totalWidth = 2 * offsetBoard + c * (2 * depth + width + height)

  const score1 = offset + c * width
  const score2 = offset + c * (2 * depth + width)

  const paperSizeContainer = document.getElementById("paperSize");
  paperSizeContainer!.innerText = totalWidth.toFixed(0)
  const score1Container = document.getElementById("score1");
  score1Container!.innerText = score1.toFixed(0)
  const score2Container = document.getElementById("score2");
  score2Container!.innerText = score2.toFixed(0)

  return `
<svg viewBox="-${offset} -${offset} ${totalWidth + 2 * offset} ${totalWidth + 2 * offset}" xmlns="http://www.w3.org/2000/svg">
	<rect width="${totalWidth}" height="${totalWidth}" x="0" y="0" style="fill:blue;stroke:none;fill-opacity:0.1" />
  ${createPath(totalWidth, score1, offsetBoard)}
  ${createPath(totalWidth, score2, offsetBoard)}
</svg>
  `
}

document.getElementById("envelopeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const width = parseFloat((document.getElementById("width") as HTMLInputElement).value);
  const height = parseFloat((document.getElementById("height") as HTMLInputElement).value);
  const depth = parseFloat((document.getElementById("depth") as HTMLInputElement).value);

  const svg = createEnvelopeSVG(width, height, depth);
  const container = document.getElementById("svgContainer");
  if (container) container.innerHTML = svg;
});
