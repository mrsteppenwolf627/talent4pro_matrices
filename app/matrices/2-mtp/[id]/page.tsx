import SheetMTP from '@/components/SheetMTP'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SheetMTP matrixId={id} matrixType="2-mtp" />
}
