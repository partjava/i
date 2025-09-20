import { NextResponse } from 'next/server';
import { ApiResponse, ApiError } from '../../types';

export function createSuccessResponse<T = any>(data?: T, message?: string): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  };
  return NextResponse.json(response);
}

export function createErrorResponse(error: string, details?: string, status: number = 400): NextResponse {
  const response: ApiError = {
    error,
    details
  };
  return NextResponse.json(response, { status });
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  if (error instanceof Error) {
    return createErrorResponse(error.message, error.stack, 500);
  }

  return createErrorResponse('服务器内部错误', undefined, 500);
}

export function validateRequiredFields(body: any, fields: string[]): string | null {
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      return `${field} 不能为空`;
    }
  }
  return null;
}

export function validatePaginationParams(page: number, limit: number): string | null {
  if (page < 1) {
    return '页码必须大于0';
  }
  if (limit < 1 || limit > 100) {
    return '每页数量必须在1-100之间';
  }
  return null;
}

export function parseNumberParam(value: string | null, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}