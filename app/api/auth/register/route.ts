﻿import { NextRequest } from 'next/server'
import { UserService } from '@/app/lib/services/UserService'
import { handleApiError, createSuccessResponse, createErrorResponse } from '@/app/lib/api/middleware'
import { validateRequiredFields } from '@/app/lib/api/utils'

const userService = new UserService()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 验证输入
    const validationError = validateRequiredFields(body, ['name', 'email', 'password'])
    if (validationError) {
      return createErrorResponse(validationError)
    }

    const { name, email, password } = body

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return createErrorResponse('邮箱格式不正确')
    }

    // 验证密码长度
    if (password.length < 6) {
      return createErrorResponse('密码至少需要6位')
    }

    // 注册用户
    const userId = await userService.registerUser({
      name,
      email,
      password
    })

    return createSuccessResponse(
      { userId },
      '注册成功！请使用邮箱登录'
    )

  } catch (error) {
    return handleApiError(error)
  }
}