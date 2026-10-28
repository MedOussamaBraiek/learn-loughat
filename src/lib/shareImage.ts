import type { LeaderRow } from './rankings';

export interface ShareInfo {
  title: string;     // e.g. "A1 · Today"
  rows: LeaderRow[];
}

const medalStyles = [
  { ring: '#f6c453', disc: '#fde68a', star: '#b45309' },
  { ring: '#cbd5e1', disc: '#eef2f7', star: '#64748b' },
  { ring: '#d08a52', disc: '#f5d6bb', star: '#92400e' },
];

// Draws the top 3 as a shareable PNG card
export function drawRankCard({ title, rows }: ShareInfo): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('Image is not supported in this browser.'));

  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#1cb0f6');
  bg.addColorStop(1, '#58cc02');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  const brand = 'Learn Loughat';
  const brandFont = 'bold 84px system-ui, sans-serif';
  const markSize = 100;
  const gap = 26;
  ctx.font = brandFont;
  const brandWidth = ctx.measureText(brand).width;
  const brandX = (canvas.width - (markSize + gap + brandWidth)) / 2;
  roundRect(ctx, brandX, 56, markSize, markSize, 26);
  ctx.fill();
  ctx.fillStyle = '#1cb0f6';
  ctx.font = 'bold 68px system-ui, sans-serif';
  ctx.fillText('L', brandX + markSize / 2, 56 + 76);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = brandFont;
  ctx.fillText(brand, brandX + markSize + gap, 130);
  ctx.textAlign = 'center';
  ctx.font = '600 52px system-ui, sans-serif';
  ctx.fillText(title, canvas.width / 2, 210);

  const top = rows.slice(0, 3);
  top.forEach((r, i) => {
    const y = 300 + i * 300;
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    roundRect(ctx, 80, y, canvas.width - 160, 230, 36);
    ctx.fill();

    const medal = medalStyles[i];
    ctx.beginPath();
    ctx.arc(165, y + 115, 46, 0, Math.PI * 2);
    ctx.fillStyle = medal.disc;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = medal.ring;
    ctx.stroke();
    drawStar(ctx, 165, y + 115, 22, 9, medal.star);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#3c3c3c';
    ctx.font = 'bold 60px system-ui, sans-serif';
    ctx.fillText(truncate(ctx, r.nickname, 520), 250, y + 105);
    ctx.font = '500 44px system-ui, sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText(`${r.correct_total}/${r.total_questions} correct · ${r.pct}%`, 250, y + 170);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#58cc02';
    ctx.font = 'bold 72px system-ui, sans-serif';
    ctx.fillText(`#${i + 1}`, canvas.width - 120, y + 140);
  });

  if (top.length === 0) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 56px system-ui, sans-serif';
    ctx.fillText('No scores yet. Be the first!', canvas.width / 2, 600);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 44px system-ui, sans-serif';
  ctx.fillText('Daily challenge · learn German', canvas.width / 2, 1270);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not create the image.'))), 'image/png');
  });
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, outer: number, inner: number, color: string) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function truncate(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxWidth) t = t.slice(0, -1);
  return t + '…';
}

// Share the card with the system share sheet when possible, otherwise download it
export async function shareRankCard(info: ShareInfo): Promise<'shared' | 'downloaded'> {
  const blob = await drawRankCard(info);
  const file = new File([blob], 'learn-loughat-ranking.png', { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: 'Learn Loughat ranking', text: `${info.title} · Learn Loughat` });
    return 'shared';
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'learn-loughat-ranking.png';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'downloaded';
}
