import { NoteRepository } from '@/app/lib/repositories/NoteRepository'

const noteRepository = new NoteRepository()

export async function GET() {
  try {
    const categories = await noteRepository.getDistinctCategories()
    return Response.json({ categories })
  } catch (error) {
    console.error('获取分类列表失败:', error)
    return Response.json({ categories: [] })
  }
}
