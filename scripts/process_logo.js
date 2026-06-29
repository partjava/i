const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/images/logo-calligraphy.png');
  const outputPath = path.join(__dirname, '../public/images/logo-calligraphy-transparent.png');

  try {
    const image = await loadImage(inputPath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imgData.data;

    let minX = image.width;
    let maxX = 0;
    let minY = image.height;
    let maxY = 0;

    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % image.width;
      const y = Math.floor(pixelIndex / image.width);

      // 强制将核心文字区域外的星散墨迹置为透明，仅分析核心文字区
      if (x < 50 || x > 970 || y < 220 || y > 820) {
        data[i+3] = 0;
        continue;
      }

      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // 灰度值计算
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // 接近白色的背景与浅灰纸张纹理设为全透明
      if (gray > 220) {
        data[i+3] = 0;
      } else {
        // 墨迹灰度与透明度转换
        const alpha = Math.round(255 * (1.0 - (gray / 255.0)));
        
        // 重新着色为深沉的书法墨色 (炭黑偏灰色)
        data[i] = 31;   // R
        data[i+1] = 41; // G
        data[i+2] = 55; // B
        data[i+3] = alpha;

        // 计算文字所在的 bounding box 边界
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // 裁切四周大面积透明空白，压缩多余垂直距离，将其压平成横幅
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    
    const croppedCanvas = createCanvas(cropWidth, cropHeight);
    const croppedCtx = croppedCanvas.getContext('2d');
    
    croppedCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    const out = fs.createWriteStream(outputPath);
    const stream = croppedCanvas.createPNGStream();
    stream.pipe(out);
    
    out.on('finish', () => {
      console.log(`Successfully cropped canvas from ${image.width}x${image.height} to ${cropWidth}x${cropHeight} and saved transparent PNG!`);
    });
  } catch (err) {
    console.error("Processing failed:", err);
  }
}

processLogo();
