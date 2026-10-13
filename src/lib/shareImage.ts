import type { LeaderRow } from './rankings';

export interface ShareInfo {
  title: string;     // e.g. "A1 · Today"
  rows: LeaderRow[];
}

const medal = ['🥇', '🥈', '🥉'];

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
  ctx.font = 'bold 84px system-ui, sans-serif';
  ctx.fillText('🦉 Learn Loughat', canvas.width / 2, 130);
  ctx.font = '600 52px system-ui, sans-serif';
  ctx.fillText(title, canvas.width / 2, 210);

  const top = rows.slice(0, 3);
  top.forEach((r, i) => {
    const y = 300 + i * 300;
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    roundRect(ctx, 80, y, canvas.width - 160, 230, 36);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#3c3c3c';
    ctx.font = '86px system-ui, sans-serif';
    ctx.fillText(medal[i], 110, y + 150);
    ctx.font = 'bold 60px system-ui, sans-serif';
    ctx.fillText(truncate(ctx, r.nickname, 520), 270, y + 105);
    ctx.font = '500 44px system-ui, sans-serif';
    ctx.fillStyle = '#777';
    ctx.fillText(`${r.correct_total}/${r.total_questions} correct · ${r.pct}%`, 270, y + 170);
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
