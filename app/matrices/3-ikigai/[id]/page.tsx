import SheetIkigai from '@/components/SheetIkigai'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SheetIkigai matrixId={id} matrixType="3-ikigai" />
}
