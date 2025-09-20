'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Input, Button, Checkbox, Card, Form, message, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';

// 提取参数检查到单独组件，以便使用Suspense包装
function LoginStatusChecker() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // 检查URL参数
    const expired = searchParams.get('expired');
    const errorParam = searchParams.get('error');
    
    if (expired === 'true') {
      message.info('会话已过期，请重新登录');
    }
    
    if (errorParam === 'true') {
      message.error('退出登录时发生错误');
    }
    
    // 清除可能残留的会话数据
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('user_data');
    }
  }, [searchParams]);
  
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.push('/');
    }
  }, [session, status, router]);

  const handleSubmit = async (values: { email: string; password: string; remember: boolean }) => {
    try {
      setLoading(true);
      setError('');
      
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      });
      
      if (result?.error) {
        setError(result.error);
        message.error('登录失败：' + result.error);
      } else if (result?.url) {
        message.success('登录成功！');
        router.push('/');
      }
    } catch (error) {
      setError('登录过程中发生错误');
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* 使用Suspense包装参数检查器 */}
      <Suspense fallback={null}>
        <LoginStatusChecker />
      </Suspense>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          欢迎回来
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          还没有账号？{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            立即注册
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg rounded-lg">
          {error && (
            <Alert
              message="登录失败"
              description={error}
              type="error"
              showIcon
              className="mb-4"
            />
          )}
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: '请输入邮箱地址' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="邮箱地址" 
                type="email"
                autoComplete="email"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="密码"
                autoComplete="current-password"
              />
            </Form.Item>
            
            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  忘记密码?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  或者
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                icon={<GoogleOutlined />}
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="w-full flex items-center justify-center"
              >
                使用 Google 登录
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}