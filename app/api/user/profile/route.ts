export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 根据用户ID获取个性化资料
    const userId = session.user.id;
    
    // 尝试从数据库获取用户资料
    try {
      const { executeQuery } = await import('@/app/lib/database');
      
      // 先从users表获取基础信息（包括头像、用户名和角色）
      const userResult = await executeQuery(
        `SELECT id, username, name, email, role, image, bio, location, github, website, vip, vip_level, vip_expire_time FROM users WHERE id = ?`,
        [userId]
      );
      
      let userImage = session.user.image || '';
      let userName = session.user.name || '';
      let userBio = '';
      let userLocation = '';
      let userGithub = '';
      let userWebsite = '';
      let userUsername = '';
      let userRole = 'USER';
      let userVip = 0;
      let userVipLevel = 0;
      let userVipExpireTime: string | null = null;
      
      if (Array.isArray(userResult) && userResult.length > 0) {
        const user = userResult[0] as any;
        userImage = user.image || userImage;
        userName = user.name || userName;
        userBio = user.bio || '';
        userLocation = user.location || '';
        userGithub = user.github || '';
        userWebsite = user.website || '';
        userUsername = user.username || '';
        userRole = user.role || 'USER';
        userVip = user.vip || 0;
        userVipLevel = user.vip_level || 0;
        userVipExpireTime = user.vip_expire_time || null;
      }
      
      // 再从user_profiles表获取扩展信息
      const userProfileResult = await executeQuery(
        `SELECT * FROM user_profiles WHERE user_id = ?`,
        [userId]
      );
      
      // 如果找到用户资料，返回数据库中的资料
      if (Array.isArray(userProfileResult) && userProfileResult.length > 0) {
        const userProfile = userProfileResult[0] as any;
        
        const profile = {
          id: session.user.id,
          name: (userProfile.name as string) || userName,
          email: session.user.email,
          image: (userProfile.avatar as string) || userImage,
          jobTitle: (userProfile.job_title as string) || '',
          company: (userProfile.company as string) || '',
          bio: (userProfile.bio as string) || userBio,
          location: (userProfile.location as string) || userLocation,
          github: (userProfile.github as string) || userGithub,
          website: (userProfile.website as string) || userWebsite,
          username: userUsername,
          role: userRole,
          vip: userVip === 1,
          vipLevel: userVipLevel,
          vipExpireTime: userVipExpireTime,
          skills: userProfile.skills ? (typeof userProfile.skills === 'string' ? JSON.parse(userProfile.skills) : userProfile.skills) : [],
          socialLinks: userProfile.social_links ? (typeof userProfile.social_links === 'string' ? JSON.parse(userProfile.social_links) : userProfile.social_links) : {}
        };
        
        return NextResponse.json(profile);
      } else {
        // 如果没有user_profiles记录，使用users表的数据
        const profile = {
          id: session.user.id,
          name: userName,
          email: session.user.email,
          image: userImage,
          jobTitle: '',
          company: '',
          bio: userBio,
          location: userLocation,
          github: userGithub,
          website: userWebsite,
          username: userUsername,
          role: userRole,
          vip: userVip === 1,
          vipLevel: userVipLevel,
          vipExpireTime: userVipExpireTime,
          skills: [],
          socialLinks: {}
        };
        
        return NextResponse.json(profile);
      }
    } catch (dbError) {
      console.error('数据库查询失败:', dbError);
      // 如果数据库查询失败，继续使用会话信息
    }
    
    // 如果没有找到用户资料或数据库查询失败，使用会话信息
    const profile = {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      image: session.user.image || '',
      jobTitle: '',
      company: '',
      bio: '',
      location: '',
      github: '',
      website: '',
      username: (session.user as any).username || '',
      role: (session.user as any).role || 'USER',
      skills: [],
      socialLinks: {}
    };
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      console.log('PUT /api/user/profile - 未授权访问');
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 获取请求数据
    const data = await request.json();
    const userId = session.user.id;
    
    // 更新数据库中的用户资料
    try {
      const { executeQuery } = await import('@/app/lib/database');
      
      // 验证新用户名格式与占用情况
      if (data.username) {
        if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
          return NextResponse.json({ error: '用户名只能是英文和数字的组合' }, { status: 400 });
        }
        const existingUser = await executeQuery(
          'SELECT id FROM users WHERE username = ? AND id != ?',
          [data.username, userId]
        );
        if (Array.isArray(existingUser) && existingUser.length > 0) {
          return NextResponse.json({ error: '该用户名已被其他账号占用' }, { status: 400 });
        }
      }

      // 检查用户资料是否存在
      const existingProfile = await executeQuery(
        `SELECT id FROM user_profiles WHERE user_id = ?`,
        [userId]
      );
      
      if (Array.isArray(existingProfile) && existingProfile.length > 0) {
        // 更新现有资料
        await executeQuery(
          `UPDATE user_profiles 
           SET name = ?, job_title = ?, company = ?, bio = ?, location = ?, github = ?, website = ?, 
               skills = ?, social_links = ?, avatar = ?, updated_at = NOW()
           WHERE user_id = ?`,
          [
            data.name || '', 
            data.jobTitle || '', 
            data.company || '', 
            data.bio || '', 
            data.location || '', 
            data.github || '', 
            data.website || '', 
            data.skills ? JSON.stringify(data.skills) : null,
            data.socialLinks ? JSON.stringify(data.socialLinks) : null,
            data.image || '', 
            userId
          ]
        );
      } else {
        // 创建新资料
        await executeQuery(
          `INSERT INTO user_profiles (user_id, name, job_title, company, bio, location, github, website, skills, social_links, avatar, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            userId, 
            data.name || '', 
            data.jobTitle || '', 
            data.company || '', 
            data.bio || '', 
            data.location || '', 
            data.github || '', 
            data.website || '', 
            data.skills ? JSON.stringify(data.skills) : null,
            data.socialLinks ? JSON.stringify(data.socialLinks) : null,
            data.image || ''
          ]
        );
      }
      
      // 同时更新 users 表中的基础个人信息
      await executeQuery(
        `UPDATE users 
         SET username = ?, name = ?, bio = ?, location = ?, github = ?, website = ?, image = ?, updated_at = NOW()
         WHERE id = ?`,
        [
          data.username || '',
          data.name || '', 
          data.bio || '', 
          data.location || '', 
          data.github || '', 
          data.website || '', 
          data.image || '', 
          userId
        ]
      );
    } catch (dbError) {
      console.error('数据库更新失败:', dbError);
      return NextResponse.json({ error: '数据库更新失败', details: String(dbError) }, { status: 500 });
    }
    
    const updatedProfile = {
      ...data,
      id: session.user.id,
      email: session.user.email
    };
    
    return NextResponse.json({
      success: true,
      message: '资料更新成功',
      user: updatedProfile
    });
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return NextResponse.json({ error: '服务器错误', details: String(error) }, { status: 500 });
  }
}