import { StudyProgressBar } from '../_shared/components/StudyProgressBar';
import StudyScreenshot from '../_shared/components/StudyScreenshot';

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      {/* 桌面端（xl+）由 BookSpread 内的右侧栏承载截图/进度，悬浮球仅在窄屏显示 */}
      <div className="xl:hidden">
        <StudyScreenshot />
        <StudyProgressBar />
      </div>
    </div>
  );
}
