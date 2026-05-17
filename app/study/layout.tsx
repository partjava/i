import { StudyProgressBar } from '../components/StudyProgressBar';
import StudyScreenshot from '../components/StudyScreenshot';

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      <StudyScreenshot />
      <StudyProgressBar />
    </div>
  );
}