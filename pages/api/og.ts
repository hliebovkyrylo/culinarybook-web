import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage, registerFont } from 'canvas';
import { join } from 'path';
import { existsSync } from 'fs';

function wrapText(context: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let testLine;
  let metrics;
  let testWidth;
  let lines = [];
  
  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    metrics = context.measureText(testLine);
    testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + (i * lineHeight));
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title = '', description = '' } = req.query;

  const width = 2048;
  const height = 1024;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  try {
    const imagePath = join(process.cwd(), 'public/media/og-background.png');
    if (!existsSync(imagePath)) {
      throw new Error('Background image not found');
    }

    const image = await loadImage(imagePath);
    context.drawImage(image, 0, 0, width, height);

    context.font = '96px arial';
    context.fillStyle = '#FFFFFF';
    wrapText(context, title as string, 100, 530, 1000, 96);

    context.font = '48px arial';
    context.fillStyle = '#6B6B6B';
    wrapText(context, description as string, 100, 650, 1000, 60);

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer());
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
}
