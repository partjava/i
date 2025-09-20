import { BaseRepository } from './BaseRepository';
import { DbUser, User } from '../../types';

export class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<DbUser | null> {
    const results = await this.executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return results[0] || null;
  }

  async create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<number> {
    const result = await this.executeUpdate(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.password]
    );
    return result.insertId!;
  }

  async updateProfile(userId: number, updates: {
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
    website?: string;
    github?: string;
    avatar?: string;
  }): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.email !== undefined) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.bio !== undefined) {
      fields.push('bio = ?');
      values.push(updates.bio);
    }
    if (updates.location !== undefined) {
      fields.push('location = ?');
      values.push(updates.location);
    }
    if (updates.website !== undefined) {
      fields.push('website = ?');
      values.push(updates.website);
    }
    if (updates.github !== undefined) {
      fields.push('github = ?');
      values.push(updates.github);
    }
    if (updates.avatar !== undefined) {
      fields.push('avatar = ?');
      values.push(updates.avatar);
    }

    if (fields.length === 0) {
      return false;
    }

    values.push(userId);
    const result = await this.executeUpdate(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows ? result.affectedRows > 0 : false;
  }

  async updatePassword(userId: number, newPassword: string): Promise<boolean> {
    const result = await this.executeUpdate(
      'UPDATE users SET password = ? WHERE id = ?',
      [newPassword, userId]
    );
    return result.affectedRows ? result.affectedRows > 0 : false;
  }

  async getPublicProfile(userId: number): Promise<User | null> {
    const results = await this.executeQuery(
      'SELECT id, name, email, bio, location, website, github, avatar, created_at, updated_at FROM users WHERE id = ?',
      [userId]
    );
    const dbUser = results[0];
    if (!dbUser) return null;
    
    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      bio: dbUser.bio,
      location: dbUser.location,
      website: dbUser.website,
      github: dbUser.github,
      avatar: dbUser.avatar,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  }
}