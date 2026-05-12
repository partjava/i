import { StudyProgressBar } from '../components/StudyProgressBar';

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      <StudyProgressBar />
    </div>
  );
}