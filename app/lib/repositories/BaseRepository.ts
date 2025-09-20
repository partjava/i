import pool from '../database';
import { QueryResult } from '../../types';

export abstract class BaseRepository {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async executeQuery(sql: string, params: any[] = []): Promise<any[]> {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(sql, params);
      return results as any[];
    } catch (error) {
      console.error('SQL查询失败:', sql, params, error);
      throw error;
    } finally {
      connection.release();
    }
  }

  protected async executeUpdate(sql: string, params: any[] = []): Promise<QueryResult> {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return result as QueryResult;
    } catch (error) {
      console.error('SQL更新失败:', sql, params, error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async findById(id: number): Promise<any | null> {
    const results = await this.executeQuery(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return results[0] || null;
  }

  async findAll(limit: number = 100, offset: number = 0): Promise<any[]> {
    return this.executeQuery(
      `SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }

  async count(): Promise<number> {
    const results = await this.executeQuery(
      `SELECT COUNT(*) as count FROM ${this.tableName}`
    );
    return results[0]?.count || 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.executeUpdate(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return result.affectedRows ? result.affectedRows > 0 : false;
  }
}