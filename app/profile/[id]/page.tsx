"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Avatar, Typography, Tag, Space, Divider, Spin, message } from "antd";
import { UserOutlined, GithubOutlined, MailOutlined, GlobalOutlined, EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph, Link } = Typography;

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // 尝试请求 /api/user/profile-by-id?id=xxx，如果没有该API可临时用 /api/user/profile
    fetch(`/api/user/profile-by-id?id=${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("用户不存在");
        const data = await res.json();
        setUser(data);
      })
      .catch(() => {
        message.error("用户不存在或已注销");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }
  if (!user) {
    return <div className="text-center text-gray-500 mt-20">未找到该用户</div>;
  }

  // 头像路径修正
  let avatarSrc = undefined;
  if (user.image) {
    avatarSrc = user.image.startsWith('http')
      ? user.image
      : `/avatars/${user.image.replace(/^.*[\\/]/, '')}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="text-center py-8">
            <div className="mb-6">
              <Avatar
                size={120}
                src={avatarSrc}
                icon={<UserOutlined />}
                className="mx-auto"
              />
            </div>
            <Title level={2} className="mb-2">
              {user.name || "未设置用户名"}
            </Title>
            <Space direction="vertical" size="middle" className="mb-4">
              {user.email && (
                <Tag icon={<MailOutlined />} color="blue">
                  {user.email}
                </Tag>
              )}
              {user.github && (
                <Tag icon={<GithubOutlined />} color="black" onClick={() => window.open(`https://github.com/${user.github}`, "_blank")}
                  style={{ cursor: "pointer" }}>
                  {user.github}
                </Tag>
              )}
              {user.website && (
                <Tag icon={<GlobalOutlined />} color="cyan" onClick={() => window.open(user.website, "_blank")}
                  style={{ cursor: "pointer" }}>
                  {user.website}
                </Tag>
              )}
              {user.location && (
                <Tag icon={<EnvironmentOutlined />} color="green">
                  {user.location}
                </Tag>
              )}
            </Space>
            {user.bio && (
              <Paragraph className="max-w-xl mx-auto text-lg text-gray-700 mt-4">
                {user.bio}
              </Paragraph>
            )}
            <Divider />
            <div className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm">
              {user.created_at && (
                <span><CalendarOutlined /> 注册时间：{new Date(user.created_at).toLocaleDateString()}</span>
              )}
              {user.updated_at && (
                <span><CalendarOutlined /> 最近更新：{new Date(user.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </Card>
        {/* 可扩展：成就、学习统计等 */}
      </div>
    </div>
  );
} 