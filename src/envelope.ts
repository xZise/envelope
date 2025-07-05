function mmToPx(mm: number): number {
  return mm * 3.78; // Rough conversion
}

function createEnvelopeSVG(width: number, height: number): string {
  const margin = 5;
  const sideFlap = width / 3;
  const topFlap = height * 0.4;
  const bottomFlap = height * 0.6;

  const totalWidth = width + 2 * sideFlap + 2 * margin;
  const totalHeight = height + topFlap + bottomFlap + 2 * margin;

  const svgW = mmToPx(totalWidth);
  const svgH = mmToPx(totalHeight);

  const startX = mmToPx(margin + sideFlap);
  const startY = mmToPx(margin + topFlap);

  const cardW = mmToPx(width);
  const cardH = mmToPx(height);

  return `
    <svg width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${startX}" y="${startY}" width="${cardW}" height="${cardH}" fill="#e0f7fa" stroke="#006064" stroke-width="2" />
      <polygon points="
        ${startX},${startY} 
        ${startX + cardW},${startY} 
        ${startX + cardW / 2},${startY - mmToPx(topFlap)}
      " fill="#b2ebf2" stroke="#006064" stroke-width="1" />
      <polygon points="
        ${startX},${startY + cardH} 
        ${startX + cardW},${startY + cardH} 
        ${startX + cardW / 2},${startY + cardH + mmToPx(bottomFlap)}
      " fill="#b2ebf2" stroke="#006064" stroke-width="1" />
      <polygon points="
        ${startX},${startY} 
        ${startX - mmToPx(sideFlap)},${startY + cardH / 2} 
        ${startX},${startY + cardH}
      " fill="#b2ebf2" stroke="#006064" stroke-width="1" />
      <polygon points="
        ${startX + cardW},${startY} 
        ${startX + cardW + mmToPx(sideFlap)},${startY + cardH / 2} 
        ${startX + cardW},${startY + cardH}
      " fill="#b2ebf2" stroke="#006064" stroke-width="1" />
    </svg>
  `;
}

document.getElementById("envelopeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const width = parseFloat((document.getElementById("width") as HTMLInputElement).value);
  const height = parseFloat((document.getElementById("height") as HTMLInputElement).value);

  const svg = createEnvelopeSVG(width, height);
  const container = document.getElementById("svgContainer");
  if (container) container.innerHTML = svg;
});
