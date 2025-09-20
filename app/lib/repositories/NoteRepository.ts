import { BaseRepository } from './BaseRepository';
import { Note, NoteWithStats, NoteCreateRequest, PaginationParams, PaginatedResponse } from '../../types';
import { initDatabase } from '../database';

export class NoteRepository extends BaseRepository {
  constructor() {
    super('notes');
    // Ensure database is initialized when repository is created
    this.ensureDatabaseInitialized();
  }
  
  private async ensureDatabaseInitialized() {
    try {
      await initDatabase();
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }

  async create(noteData: NoteCreateRequest, authorId: number): Promise<number> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const result = await this.executeUpdate(
        `INSERT INTO notes (title, content, category, technology, subcategory, tags, is_public, author_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          noteData.title,
          noteData.content,
          noteData.category || '',
          noteData.technology || '',
          noteData.subcategory || '',
          JSON.stringify(noteData.tags || []),
          noteData.isPublic || false,
          authorId
        ]
      );

      return result.insertId!;
    } catch (error) {
      console.error('Failed to create note:', error);
      throw error; // Re-throw as this is a critical operation
    }
  }

  async update(noteId: number, noteData: Partial<NoteCreateRequest>): Promise<boolean> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const fields: string[] = [];
      const values: any[] = [];

      if (noteData.title !== undefined) {
        fields.push('title = ?');
        values.push(noteData.title);
      }
      if (noteData.content !== undefined) {
        fields.push('content = ?');
        values.push(noteData.content);
      }
      if (noteData.category !== undefined) {
        fields.push('category = ?');
        values.push(noteData.category);
      }
      if (noteData.technology !== undefined) {
        fields.push('technology = ?');
        values.push(noteData.technology);
      }
      if (noteData.subcategory !== undefined) {
        fields.push('subcategory = ?');
        values.push(noteData.subcategory);
      }
      if (noteData.tags !== undefined) {
        fields.push('tags = ?');
        values.push(JSON.stringify(noteData.tags));
      }
      if (noteData.isPublic !== undefined) {
        fields.push('is_public = ?');
        values.push(noteData.isPublic);
      }

      if (fields.length === 0) {
        return false;
      }

      values.push(noteId);
      const result = await this.executeUpdate(
        `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`,
        values
      );

      return result.affectedRows ? result.affectedRows > 0 : false;
    } catch (error) {
      console.error('Failed to update note:', error);
      return false;
    }
  }

  async findByIdWithStats(noteId: number): Promise<NoteWithStats | null> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const notes = await this.executeQuery(
        `SELECT n.*, 
                (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
                (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
                (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
         FROM notes n
         WHERE n.id = ?`,
        [noteId]
      );

      const note = notes[0];
      if (!note) return null;

      return this.mapToNoteWithStats(note);
    } catch (error) {
      console.error('Failed to find note by ID with stats:', error);
      return null;
    }
  }

  async findByAuthor(authorId: number, pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const { page, limit } = pagination;
      const offset = (page - 1) * limit;

      const [notes, countResult] = await Promise.all([
        this.executeQuery(
          `SELECT n.*, 
                  (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
                  (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
                  (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
           FROM notes n
           WHERE n.author_id = ? 
           ORDER BY n.updated_at DESC
           LIMIT ${Number(limit)} OFFSET ${Number(offset)}`,
          [Number(authorId)]
        ),
        this.executeQuery(
          'SELECT COUNT(*) as total FROM notes WHERE author_id = ?',
          [authorId]
        )
      ]);

      const totalCount = countResult[0]?.total || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: notes.map(this.mapToNoteWithStats),
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Failed to find notes by author:', error);
      // Return empty result set instead of throwing error
      return {
        data: [],
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  async findPublicNotes(pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const { page, limit } = pagination;
      const offset = (page - 1) * limit;


      // 使用直接的数字值而不是参数占位符，避免类型问题
      const limitNum = Number(limit);
      const offsetNum = Number(offset);
      
      const [notes, countResult] = await Promise.all([
        this.executeQuery(
          `SELECT n.*, u.name as author_name,
                  (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
                  (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
                  (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
           FROM notes n
           JOIN users u ON n.author_id = u.id
           WHERE n.is_public = 1
           ORDER BY n.updated_at DESC
           LIMIT ${limitNum} OFFSET ${offsetNum}`
        ),
        this.executeQuery(
          'SELECT COUNT(*) as total FROM notes WHERE is_public = 1'
        )
      ]);


      const totalCount = countResult[0]?.total || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: notes.map(this.mapToNoteWithStats),
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Failed to fetch public notes:', error);
      // Return empty result set instead of throwing error
      return {
        data: [],
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  async searchPublicNotes(query: string, pagination: PaginationParams): Promise<PaginatedResponse<NoteWithStats>> {
    try {
      // Ensure database is initialized before querying
      await this.ensureDatabaseInitialized();
      
      const { page, limit } = pagination;
      const offset = (page - 1) * limit;
      const searchTerm = `%${query}%`;

      const [notes, countResult] = await Promise.all([
        this.executeQuery(
          `SELECT n.*, 
                  (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
                  (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
                  (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
           FROM notes n
           WHERE n.is_public = true 
             AND (n.title LIKE ? OR n.content LIKE ? OR n.category LIKE ? OR n.technology LIKE ?)
           ORDER BY n.updated_at DESC
           LIMIT ${Number(limit)} OFFSET ${Number(offset)}`,
          [searchTerm, searchTerm, searchTerm, searchTerm]
        ),
        this.executeQuery(
          `SELECT COUNT(*) as total 
           FROM notes 
           WHERE is_public = true 
             AND (title LIKE ? OR content LIKE ? OR category LIKE ? OR technology LIKE ?)`,
          [searchTerm, searchTerm, searchTerm, searchTerm]
        )
      ]);

      const totalCount = countResult[0]?.total || 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: notes.map(this.mapToNoteWithStats),
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Failed to search public notes:', error);
      // Return empty result set instead of throwing error
      return {
        data: [],
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  private mapToNoteWithStats(row: any): NoteWithStats {
    let tags: string[] = [];
    try {
      if (row.tags) {
        if (Array.isArray(row.tags)) {
          tags = row.tags;
        } else if (typeof row.tags === 'string' && row.tags.trim()) {
          const parsed = JSON.parse(row.tags);
          tags = Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (e) {
      tags = [];
    }

    return {
      id: row.id,
      title: row.title || '',
      content: row.content || '',
      category: row.category || '',
      technology: row.technology || '',
      subcategory: row.subcategory || '',
      tags,
      isPublic: Boolean(row.is_public),
      is_public: Boolean(row.is_public),
      author_id: row.author_id,
      authorId: row.author_id,
      createdAt: row.created_at,
      created_at: row.created_at,
      updatedAt: row.updated_at,
      updated_at: row.updated_at,
      likeCount: row.like_count || 0,
      likesCount: row.like_count || 0,
      bookmarkCount: row.bookmark_count || 0,
      bookmarksCount: row.bookmark_count || 0, 
      commentCount: row.comment_count || 0,
      commentsCount: row.comment_count || 0
    };
  }
}