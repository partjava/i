/** Accept the direct profile DTO and the Java ApiResponse envelope. */
export async function readProfileResponse<T = Record<string, unknown>>(response: Response): Promise<T> {
  const json = await response.json().catch(() => null);
  if (!response.ok || json?.success === false) {
    throw new Error(json?.message || json?.error || `请求失败（${response.status}）`);
  }
  if (!json || typeof json !== 'object') throw new Error('服务器返回了无效数据');
  return json.data ?? json;
}

/** The profile endpoint updates both users.avatar and user_profiles.avatar. */
export async function saveProfileAvatar(
  image: string,
  request: typeof fetch = fetch,
): Promise<string> {
  const profile = await readProfileResponse(await request('/api/user/profile', {
    credentials: 'include', cache: 'no-store',
  }));
  await readProfileResponse(await request('/api/user/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ ...profile, image }),
  }));
  return image;
}

export function compressAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('图片读取失败，请重试'));
    reader.onabort = () => reject(new Error('图片读取已取消'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('图片无法解码，请换一张图片'));
      image.onload = () => {
        try {
          if (!image.width || !image.height) throw new Error('图片尺寸无效');
          const scale = Math.min(1, 400 / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext('2d');
          if (!context) throw new Error('浏览器无法处理图片');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL(file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', 0.8));
        } catch (error) { reject(error); }
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}


export function getAchievementSummary(
  list: ReadonlyArray<{ unlocked: boolean }>,
  summary?: { total: number; earned: number },
) {
  const total = list.length > 0 ? list.length : Math.max(0, summary?.total ?? 0);
  const earned = Math.min(total, Math.max(0,
    list.length > 0 ? list.filter(item => item.unlocked).length : summary?.earned ?? 0,
  ));
  return { total, earned, percent: total > 0 ? Math.round(earned / total * 100) : 0 };
}
