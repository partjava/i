import { StudyProgressBar } from '../_shared/components/StudyProgressBar';
import StudyScreenshot from '../_shared/components/StudyScreenshot';

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      <StudyScreenshot />
      <StudyProgressBar />
    </div>
  );
}