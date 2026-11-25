import PdfBookReader from '../components/PdfBookReader';

export default function PdfBookReaderPage({ params }: { params: { id: string } }) {
  const bookId = Number(params.id);
  return <PdfBookReader bookId={Number.isFinite(bookId) ? bookId : 0} />;
}
