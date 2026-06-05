import SheetMTPNew from '@/components/SheetMTPNew'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SheetMTPNew matrixId={id} matrixType="2-mtp" />
}
