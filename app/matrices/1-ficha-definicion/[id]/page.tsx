import SheetFichaDefinicion from '@/components/SheetFichaDefinicion'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <SheetFichaDefinicion matrixId={id} matrixType="1-ficha-definicion" />
}
