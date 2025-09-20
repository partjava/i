import { executeQuery } from '../database';
import { Comment } from '../../types';

export class CommentService {
  
  async getCommentsByNoteId(noteId: number): Promise<Comment[]> {
    try {
      const comments = await executeQuery(`
        SELECT c.id, c.content, c.parent_id, c.created_at,
               u.name as author_name, u.id as author_id
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.note_id = ?
        ORDER BY c.created_at ASC
      `, [noteId]) as any[];

      // 构建评论树形结构
      const commentMap = new Map();
      const rootComments: Comment[] = [];

      // 初始化所有评论
      comments.forEach(comment => {
        commentMap.set(comment.id, {
          id: comment.id,
          noteId: noteId,
          userId: comment.author_id,
          content: comment.content,
          parentId: comment.parent_id,
          createdAt: comment.created_at,
          authorName: comment.author_name,
          replies: []
        });
      });

      // 构建层次结构
      comments.forEach(comment => {
        const commentObj = commentMap.get(comment.id);
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies.push(commentObj);
          }
        } else {
          rootComments.push(commentObj);
        }
      });

      return rootComments;
    } catch (error) {
      console.error('获取评论失败:', error);
      throw new Error('获取评论失败');
    }
  }

  async createComment(noteId: number, userId: number, content: string, parentId?: number): Promise<number> {
    try {
      // 验证笔记是否存在且为公开笔记
      const notes = await executeQuery(
        'SELECT id, is_public FROM notes WHERE id = ?',
        [noteId]
      ) as any[];

      if (notes.length === 0) {
        throw new Error('笔记不存在');
      }

      if (!notes[0].is_public) {
        throw new Error('只能对公开笔记发表评论');
      }

      // 验证评论内容
      if (!content || content.trim().length === 0) {
        throw new Error('评论内容不能为空');
      }

      // 插入评论
      const result = await executeQuery(`
        INSERT INTO comments (note_id, user_id, content, parent_id)
        VALUES (?, ?, ?, ?)
      `, [noteId, userId, content.trim(), parentId || null]);

      return (result as any).insertId;
    } catch (error) {
      console.error('发布评论失败:', error);
      throw new Error('发布评论失败');
    }
  }

  async deleteComment(commentId: number, userId: number): Promise<boolean> {
    try {
      // 验证评论属于当前用户
      const comments = await executeQuery(
        'SELECT user_id FROM comments WHERE id = ?',
        [commentId]
      ) as any[];

      if (comments.length === 0) {
        throw new Error('评论不存在');
      }

      if (comments[0].user_id !== userId) {
        throw new Error('无权删除此评论');
      }

      // 删除评论
      const result = await executeQuery(
        'DELETE FROM comments WHERE id = ?',
        [commentId]
      );

      return (result as any).affectedRows > 0;
    } catch (error) {
      console.error('删除评论失败:', error);
      throw new Error('删除评论失败');
    }
  }

  async getCommentCount(noteId: number): Promise<number> {
    try {
      const result = await executeQuery(
        'SELECT COUNT(*) as count FROM comments WHERE note_id = ?',
        [noteId]
      ) as any[];

      return result[0]?.count || 0;
    } catch (error) {
      console.error('获取评论数量失败:', error);
      throw new Error('获取评论数量失败');
    }
  }
}