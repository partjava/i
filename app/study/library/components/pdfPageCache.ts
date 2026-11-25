export interface CachedPageBitmap {
  canvas: HTMLCanvasElement;
  cssWidth: number;
  cssHeight: number;
}

export class PdfPageRenderCache {
  private pdfDoc: any;
  private maxEntries: number;
  private cache = new Map<string, CachedPageBitmap>();
  private inFlight = new Map<string, Promise<CachedPageBitmap>>();
  private prefetchToken = 0;

  constructor(pdfDoc: any, maxEntries = 20) {
    this.pdfDoc = pdfDoc;
    this.maxEntries = maxEntries;
  }

  private quantizeWidth(targetWidth: number): number {
    return Math.max(192, Math.round(targetWidth / 16) * 16);
  }

  private key(pageNumber: number, targetWidth: number, dpr: number): string {
    return `${pageNumber}@${this.quantizeWidth(targetWidth)}@${dpr.toFixed(2)}`;
  }

  getSync(pageNumber: number, targetWidth: number, dpr: number): CachedPageBitmap | null {
    const k = this.key(pageNumber, targetWidth, dpr);
    const hit = this.cache.get(k);
    if (!hit) return null;
    this.cache.delete(k);
    this.cache.set(k, hit);
    return hit;
  }

  async renderPage(pageNumber: number, targetWidth: number, dpr: number): Promise<CachedPageBitmap> {
    const bucketWidth = this.quantizeWidth(targetWidth);
    const syncHit = this.getSync(pageNumber, bucketWidth, dpr);
    if (syncHit) return syncHit;

    const k = this.key(pageNumber, bucketWidth, dpr);
    const pending = this.inFlight.get(k);
    if (pending) return pending;

    const task = (async (): Promise<CachedPageBitmap> => {
      const page = await this.pdfDoc.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const cssScale = Math.max(0.2, bucketWidth / Math.max(1, baseViewport.width));
      const displayViewport = page.getViewport({ scale: cssScale });
      const renderViewport = page.getViewport({ scale: cssScale * dpr });

      const offscreen = document.createElement('canvas');
      offscreen.width = Math.max(1, Math.round(renderViewport.width));
      offscreen.height = Math.max(1, Math.round(renderViewport.height));
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas 2D context unavailable');
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, offscreen.width, offscreen.height);

      await page.render({ canvasContext: ctx, viewport: renderViewport, canvas: offscreen }).promise;
      try {
        page.cleanup();
      } catch {}

      const entry: CachedPageBitmap = {
        canvas: offscreen,
        cssWidth: Math.round(displayViewport.width),
        cssHeight: Math.round(displayViewport.height),
      };

      if (this.cache.size >= this.maxEntries) {
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey !== undefined) {
          this.cache.delete(oldestKey);
        }
      }
      this.cache.set(k, entry);
      return entry;
    })();

    this.inFlight.set(k, task);
    try {
      return await task;
    } finally {
      this.inFlight.delete(k);
    }
  }

  prefetch(pages: number[], targetWidth: number, dpr: number): void {
    const numPages = this.pdfDoc?.numPages || 0;
    if (!numPages || targetWidth <= 120) return;

    const bucketWidth = this.quantizeWidth(targetWidth);
    const myToken = ++this.prefetchToken;
    const uniquePages = Array.from(
      new Set(pages.filter((p) => Number.isInteger(p) && p >= 1 && p <= numPages))
    );

    const runQueue = async () => {
      for (const pageNum of uniquePages) {
        if (this.prefetchToken !== myToken) return;
        if (this.getSync(pageNum, bucketWidth, dpr)) continue;
        try {
          await this.renderPage(pageNum, bucketWidth, dpr);
        } catch {
          // 后台预加载失败静默忽略，等待用户实际翻到再渲染
        }
        await new Promise((r) => setTimeout(r, 12));
      }
    };

    void runQueue();
  }

  clear(): void {
    this.prefetchToken++;
    this.cache.clear();
    this.inFlight.clear();
  }
}
