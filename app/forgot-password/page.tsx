'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button, Card, Form, message } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    try {
      setLoading(true);
      
      // 这里应该调用重置密码的API
      // 暂时显示提示信息
      message.info('密码重置功能正在开发中，请联系管理员');
      
      // 模拟API调用
      setTimeout(() => {
        setLoading(false);
        message.success('如果该邮箱存在，重置链接已发送到您的邮箱');
      }, 1000);
      
    } catch (error) {
      setLoading(false);
      message.error('发送重置邮件失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          忘记密码
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          输入您的邮箱地址，我们将发送重置链接
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg rounded-lg">
          <Form
            name="forgot-password"
            onFinish={handleSubmit}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="邮箱地址" 
                type="email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                发送重置链接
              </Button>
            </Form.Item>
          </Form>
          
          <div className="mt-4 text-center">
            <Link 
              href="/login" 
              className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center"
            >
              <ArrowLeftOutlined className="mr-1" />
              返回登录
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
