import { NoteRepository } from '../repositories/NoteRepository';
import { Note, NoteWithStats, NoteCreateRequest, PaginationParams, PaginatedResponse } from '../../types';

export class NoteService {
  private noteRepository: NoteRepository;

  constructor() {
    this.noteRepository = new NoteRepository();
  }

  async createNote(noteData: NoteCreateRequest, authorId: number): Promise<number> {
    if (!noteData.title || !noteData.content) {
      throw new Error('标题和内容不能为空');
    }

    return this.noteRepository.create(noteData, authorId);
  }

  async updateNote(noteId: number, noteData: Partial<NoteCreateRequest>, authorId: number): Promise<boolean> {
    // 验证笔记属于当前用户
    const note = await this.noteRepository.findById(noteId);
    if (!note || note.author_id !== authorId) {
      throw new Error('笔记不存在或无权修改');
    }

    return this.noteRepository.update(noteId, noteData);
  }

  async getNoteById(noteId: number): Promise<NoteWithStats | null> {
    return this.noteRepository.findByIdWithStats(noteId);
  }

  async getUserNotes(userId: number, pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    return this.noteRepository.findByAuthor(userId, pagination);
  }

  async getPublicNotes(pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    return this.noteRepository.findPublicNotes(pagination);
  }

  async searchPublicNotes(query: string, pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    if (!query || query.trim().length < 2) {
      throw new Error('搜索关键词至少需要2个字符');
    }

    return this.noteRepository.searchPublicNotes(query.trim(), pagination);
  }

  async deleteNote(noteId: number, authorId: number): Promise<boolean> {
    // 验证笔记属于当前用户
    const note = await this.noteRepository.findById(noteId);
    if (!note || note.author_id !== authorId) {
      throw new Error('笔记不存在或无权删除');
    }

    return this.noteRepository.delete(noteId);
  }

  async getNoteStats(noteId: number): Promise<{
    likeCount: number;
    bookmarkCount: number;
    commentCount: number;
  }> {
    const note = await this.noteRepository.findByIdWithStats(noteId);
    if (!note) {
      throw new Error('笔记不存在');
    }

    return {
      likeCount: note.likeCount || 0,
      bookmarkCount: note.bookmarkCount || 0,
      commentCount: note.commentCount || 0
    };
  }
}