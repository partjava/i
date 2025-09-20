import { UserRepository } from '../repositories/UserRepository';
import * as bcrypt from 'bcryptjs';
import { User } from '../../types';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<number> {
    // 验证邮箱是否已存在
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    return this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // 返回用户信息（排除密码）
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      website: user.website,
      github: user.github,
      avatar: user.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  }

  async getUserProfile(userId: number): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async getPublicProfile(userId: number): Promise<User | null> {
    return this.userRepository.getPublicProfile(userId);
  }

  async updateUserProfile(userId: number, updates: {
    name?: string;
    email?: string;
    bio?: string;
    location?: string;
    website?: string;
    github?: string;
    avatar?: string;
  }): Promise<boolean> {
    if (updates.email) {
      // 验证邮箱是否已被其他用户使用
      const existingUser = await this.userRepository.findByEmail(updates.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('邮箱已被其他用户使用');
      }
    }

    return this.userRepository.updateProfile(userId, updates);
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('当前密码不正确');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    return this.userRepository.updatePassword(userId, hashedPassword);
  }

  async validateUserPassword(userId: number, password: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password);
  }
}