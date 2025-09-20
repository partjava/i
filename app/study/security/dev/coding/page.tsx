"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityCodingPage() {
  const [activeTab, setActiveTab] = useState("java");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全编码规范</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("java")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "java"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Java安全编码
        </button>
        <button
          onClick={() => setActiveTab("python")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "python"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Python安全编码
        </button>
        <button
          onClick={() => setActiveTab("web")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "web"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Web安全编码
        </button>
        <button
          onClick={() => setActiveTab("mobile")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "mobile"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          移动端安全编码
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "java" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Java安全编码规范</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 输入验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的输入验证</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的输入验证示例
public class UnsafeInputValidation {
  public void processUserInput(String input) {
    // 直接使用用户输入，没有验证
    String sql = "SELECT * FROM users WHERE name = '" + input + "'";
    executeQuery(sql);
  }
  
  public void displayUserInput(String input) {
    // 直接输出用户输入，没有转义
    response.getWriter().write(input);
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的输入验证</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的输入验证示例
public class SecureInputValidation {
  // 使用预编译语句防止SQL注入
  public void processUserInput(String input) {
    String sql = "SELECT * FROM users WHERE name = ?";
    PreparedStatement stmt = connection.prepareStatement(sql);
    stmt.setString(1, input);
    stmt.executeQuery();
  }
  
  // 使用OWASP HTML Sanitizer防止XSS
  public void displayUserInput(String input) {
    PolicyFactory policy = Sanitizers.FORMATTING.and(Sanitizers.BLOCKS);
    String safeInput = policy.sanitize(input);
    response.getWriter().write(safeInput);
  }
  
  // 使用正则表达式验证输入格式
  public boolean validateEmail(String email) {
    return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
  }
  
  // 使用白名单验证输入
  public boolean validateInput(String input, Set<String> whitelist) {
    return whitelist.contains(input);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 密码学使用</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的密码学使用</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的密码学使用示例
public class UnsafeCryptography {
  // 使用不安全的MD5算法
  public String hashPassword(String password) {
    MessageDigest md = MessageDigest.getInstance("MD5");
    return new String(md.digest(password.getBytes()));
  }
  
  // 使用ECB模式
  public byte[] encryptData(byte[] data, Key key) {
    Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
    cipher.init(Cipher.ENCRYPT_MODE, key);
    return cipher.doFinal(data);
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的密码学使用</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的密码学使用示例
public class SecureCryptography {
  // 使用安全的密码哈希算法
  public String hashPassword(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt(12));
  }
  
  // 使用安全的加密模式
  public byte[] encryptData(byte[] data, Key key) {
    // 生成随机IV
    byte[] iv = new byte[16];
    SecureRandom random = new SecureRandom();
    random.nextBytes(iv);
    
    // 使用CBC模式
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    IvParameterSpec ivSpec = new IvParameterSpec(iv);
    cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
    
    // 组合IV和密文
    byte[] encrypted = cipher.doFinal(data);
    byte[] combined = new byte[iv.length + encrypted.length];
    System.arraycopy(iv, 0, combined, 0, iv.length);
    System.arraycopy(encrypted, 0, combined, iv.length, encrypted.length);
    
    return combined;
  }
  
  // 安全的密钥生成
  public Key generateKey() {
    KeyGenerator keyGen = KeyGenerator.getInstance("AES");
    keyGen.init(256); // 使用256位密钥
    return keyGen.generateKey();
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 异常处理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的异常处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的异常处理示例
public class UnsafeExceptionHandling {
  public void processData() {
    try {
      // 处理数据
    } catch (Exception e) {
      // 直接打印堆栈跟踪
      e.printStackTrace();
      // 暴露敏感信息
      response.getWriter().write("Error: " + e.getMessage());
    }
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的异常处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的异常处理示例
public class SecureExceptionHandling {
  private static final Logger logger = LoggerFactory.getLogger(SecureExceptionHandling.class);
  
  public void processData() {
    try {
      // 处理数据
    } catch (SQLException e) {
      // 记录详细日志
      logger.error("Database error occurred", e);
      // 返回通用错误信息
      throw new ServiceException("A database error occurred");
    } catch (IOException e) {
      // 记录详细日志
      logger.error("IO error occurred", e);
      // 返回通用错误信息
      throw new ServiceException("An IO error occurred");
    } catch (Exception e) {
      // 记录详细日志
      logger.error("Unexpected error occurred", e);
      // 返回通用错误信息
      throw new ServiceException("An unexpected error occurred");
    }
  }
  
  // 自定义异常类
  public class ServiceException extends RuntimeException {
    public ServiceException(String message) {
      super(message);
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "python" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Python安全编码规范</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 输入验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的输入验证</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# 不安全的输入验证示例
def process_user_input(user_input):
    # 直接使用用户输入构建SQL查询
    query = f"SELECT * FROM users WHERE name = '{user_input}'"
    cursor.execute(query)
    
    # 直接输出用户输入
    print(user_input)
    
    # 直接执行用户输入
    eval(user_input)`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的输入验证</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# 安全的输入验证示例
import re
from html import escape
import sqlite3
from typing import Set

class SecureInputValidation:
    def process_user_input(self, user_input: str) -> None:
        # 使用参数化查询
        query = "SELECT * FROM users WHERE name = ?"
        cursor.execute(query, (user_input,))
    
    def display_user_input(self, user_input: str) -> str:
        # 使用html.escape转义HTML
        return escape(user_input)
    
    def validate_email(self, email: str) -> bool:
        # 使用正则表达式验证邮箱
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
    
    def validate_input(self, user_input: str, whitelist: Set[str]) -> bool:
        # 使用白名单验证
        return user_input in whitelist
    
    def sanitize_filename(self, filename: str) -> str:
        # 文件名清理
        return re.sub(r'[^a-zA-Z0-9._-]', '', filename)`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 密码学使用</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的密码学使用</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# 不安全的密码学使用示例
import hashlib
import base64

def hash_password(password: str) -> str:
    # 使用不安全的MD5
    return hashlib.md5(password.encode()).hexdigest()

def encrypt_data(data: bytes, key: bytes) -> bytes:
    # 使用不安全的ECB模式
    from Crypto.Cipher import AES
    cipher = AES.new(key, AES.MODE_ECB)
    return cipher.encrypt(data)`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的密码学使用</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`# 安全的密码学使用示例
import os
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import bcrypt

class SecureCryptography:
    def hash_password(self, password: str) -> str:
        # 使用bcrypt进行密码哈希
        salt = bcrypt.gensalt(rounds=12)
        return bcrypt.hashpw(password.encode(), salt).decode()
    
    def verify_password(self, password: str, hashed: str) -> bool:
        # 验证密码
        return bcrypt.checkpw(password.encode(), hashed.encode())
    
    def encrypt_data(self, data: bytes, key: bytes) -> bytes:
        # 生成随机IV
        iv = os.urandom(16)
        
        # 使用CBC模式
        cipher = Cipher(
            algorithms.AES(key),
            modes.CBC(iv),
            backend=default_backend()
        )
        encryptor = cipher.encryptor()
        
        # 添加PKCS7填充
        padder = padding.PKCS7(algorithms.AES.block_size).padder()
        padded_data = padder.update(data) + padder.finalize()
        
        # 加密数据
        encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
        
        # 组合IV和密文
        return iv + encrypted_data
    
    def generate_key(self, password: str, salt: bytes) -> bytes:
        # 使用PBKDF2生成密钥
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        return kdf.derive(password.encode())`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 文件操作</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-semibold mb-2">安全的文件操作</h5>
                  <pre className="bg-gray-200 p-2 rounded">
                    <code>{`# 安全的文件操作示例
import os
from pathlib import Path
from typing import BinaryIO

class SecureFileOperations:
    def read_file(self, filepath: str) -> str:
        # 使用pathlib进行路径处理
        path = Path(filepath)
        
        # 检查文件是否存在
        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")
        
        # 检查文件权限
        if not os.access(filepath, os.R_OK):
            raise PermissionError(f"No permission to read: {filepath}")
        
        # 使用with语句安全地读取文件
        with open(filepath, 'r') as f:
            return f.read()
    
    def write_file(self, filepath: str, content: str) -> None:
        # 使用pathlib进行路径处理
        path = Path(filepath)
        
        # 检查目录权限
        if not os.access(path.parent, os.W_OK):
            raise PermissionError(f"No permission to write to directory: {path.parent}")
        
        # 使用临时文件进行安全写入
        temp_path = path.with_suffix('.tmp')
        try:
            with open(temp_path, 'w') as f:
                f.write(content)
            # 原子性地重命名文件
            os.replace(temp_path, path)
        except Exception as e:
            # 清理临时文件
            if temp_path.exists():
                temp_path.unlink()
            raise e
    
    def process_upload(self, file: BinaryIO, upload_dir: str) -> str:
        # 安全的文件上传处理
        # 1. 验证文件类型
        allowed_types = {'.jpg', '.png', '.pdf'}
        filename = file.filename
        ext = os.path.splitext(filename)[1].lower()
        
        if ext not in allowed_types:
            raise ValueError(f"Unsupported file type: {ext}")
        
        # 2. 生成安全的文件名
        safe_filename = self.sanitize_filename(filename)
        
        # 3. 构建安全的文件路径
        upload_path = Path(upload_dir) / safe_filename
        
        # 4. 检查文件大小
        file.seek(0, os.SEEK_END)
        size = file.tell()
        file.seek(0)
        
        if size > 10 * 1024 * 1024:  # 10MB限制
            raise ValueError("File too large")
        
        # 5. 安全地保存文件
        with open(upload_path, 'wb') as f:
            while True:
                chunk = file.read(8192)
                if not chunk:
                    break
                f.write(chunk)
        
        return str(upload_path)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "web" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">Web安全编码规范</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. XSS防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的XSS处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的XSS处理示例
// 前端JavaScript
function displayUserInput(input) {
    // 直接使用innerHTML
    document.getElementById('output').innerHTML = input;
}

// 后端Node.js
app.get('/user', (req, res) => {
    const userInput = req.query.input;
    res.send(\`<div>\${userInput}</div>\`);
});`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的XSS处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的XSS处理示例
// 前端JavaScript
function displayUserInput(input) {
    // 使用textContent
    document.getElementById('output').textContent = input;
    
    // 或者使用DOMPurify
    const clean = DOMPurify.sanitize(input);
    document.getElementById('output').innerHTML = clean;
}

// 后端Node.js
const xss = require('xss');

app.get('/user', (req, res) => {
    const userInput = req.query.input;
    // 使用xss库进行过滤
    const cleanInput = xss(userInput);
    res.send(\`<div>\${cleanInput}</div>\`);
});

// 设置安全响应头
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. CSRF防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的CSRF处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的CSRF处理示例
// 前端HTML
<form action="/transfer" method="POST">
    <input type="text" name="amount">
    <input type="text" name="to">
    <button type="submit">Transfer</button>
</form>

// 后端Node.js
app.post('/transfer', (req, res) => {
    const { amount, to } = req.body;
    // 直接处理转账请求，没有CSRF保护
    processTransfer(amount, to);
    res.send('Transfer successful');
});`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的CSRF处理</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的CSRF处理示例
// 前端HTML
<form action="/transfer" method="POST">
    <input type="hidden" name="_csrf" value="<%= csrfToken %>">
    <input type="text" name="amount">
    <input type="text" name="to">
    <button type="submit">Transfer</button>
</form>

// 后端Node.js
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// 设置CSRF保护
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// 提供CSRF令牌给前端
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// 处理转账请求
app.post('/transfer', (req, res) => {
    const { amount, to } = req.body;
    // CSRF令牌会自动验证
    processTransfer(amount, to);
    res.send('Transfer successful');
});

// 错误处理
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).send('Invalid CSRF token');
    } else {
        next(err);
    }
});`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 安全HTTP头</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-semibold mb-2">安全HTTP头配置</h5>
                  <pre className="bg-gray-200 p-2 rounded">
                    <code>{`// 安全HTTP头配置示例
// Node.js Express
const helmet = require('helmet');

app.use(helmet());

// 自定义安全头
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    xssFilter: true,
    noSniff: true,
    frameguard: {
        action: 'deny'
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    dnsPrefetchControl: {
        allow: false
    },
    ieNoOpen: true,
    referrerPolicy: {
        policy: 'same-origin'
    }
}));

// 设置CORS
app.use(cors({
    origin: 'https://trusted-site.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
}));`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mobile" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">移动端安全编码规范</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Android安全编码</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的Android实现</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的Android实现示例
public class UnsafeActivity extends Activity {
    // 不安全的WebView配置
    private void setupWebView() {
        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("javascript:void(0)");
    }
    
    // 不安全的文件存储
    private void saveData(String data) {
        File file = new File(getFilesDir(), "data.txt");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(data.getBytes());
        fos.close();
    }
    
    // 不安全的组件导出
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 组件可以被其他应用访问
        getPackageManager().setComponentEnabledSetting(
            new ComponentName(this, MyService.class),
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
            PackageManager.DONT_KILL_APP
        );
    }
}`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的Android实现</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的Android实现示例
public class SecureActivity extends Activity {
    // 安全的WebView配置
    private void setupWebView() {
        WebView webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        
        // 禁用不必要的功能
        settings.setJavaScriptEnabled(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        
        // 设置安全配置
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // 验证URL
                return !isValidUrl(url);
            }
        });
    }
    
    // 安全的数据存储
    private void saveData(String data) {
        try {
            // 使用EncryptedSharedPreferences
            EncryptedSharedPreferences prefs = EncryptedSharedPreferences.create(
                "secure_prefs",
                getMasterKey(),
                this,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            );
            
            prefs.edit()
                .putString("secure_data", data)
                .apply();
        } catch (Exception e) {
            Log.e("Security", "Error saving data", e);
        }
    }
    
    // 安全的组件配置
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 检查应用签名
        if (!isAppSigned()) {
            finish();
            return;
        }
        
        // 检查root状态
        if (isDeviceRooted()) {
            finish();
            return;
        }
        
        // 检查调试状态
        if (isDebuggerConnected()) {
            finish();
            return;
        }
    }
    
    // 安全的数据传输
    private void sendData(String data) {
        try {
            // 使用HTTPS
            URL url = new URL("https://api.example.com/data");
            HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
            
            // 设置证书验证
            conn.setSSLSocketFactory(getSSLSocketFactory());
            
            // 设置请求头
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Bearer " + getSecureToken());
            
            // 发送数据
            conn.setDoOutput(true);
            try (OutputStream os = conn.getOutputStream()) {
                os.write(data.getBytes());
            }
        } catch (Exception e) {
            Log.e("Security", "Error sending data", e);
        }
    }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. iOS安全编码</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">不安全的iOS实现</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 不安全的iOS实现示例
class UnsafeViewController: UIViewController {
    // 不安全的WebView配置
    func setupWebView() {
        let webView = WKWebView()
        webView.configuration.preferences.javaScriptEnabled = true
        webView.loadHTMLString("<script>alert('unsafe')</script>", baseURL: nil)
    }
    
    // 不安全的数据存储
    func saveData(_ data: String) {
        UserDefaults.standard.set(data, forKey: "sensitive_data")
    }
    
    // 不安全的网络请求
    func sendData(_ data: String) {
        let url = URL(string: "http://api.example.com/data")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = data.data(using: .utf8)
        URLSession.shared.dataTask(with: request).resume()
    }
}`}</code>
                    </pre>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">安全的iOS实现</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全的iOS实现示例
class SecureViewController: UIViewController {
    // 安全的WebView配置
    func setupWebView() {
        let configuration = WKWebViewConfiguration()
        configuration.preferences.javaScriptEnabled = false
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        
        // 设置安全配置
        if let contentController = webView.configuration.userContentController {
            contentController.removeAllUserScripts()
        }
    }
    
    // 安全的数据存储
    func saveData(_ data: String) {
        do {
            // 使用Keychain
            let query: [String: Any] = [
                kSecClass as String: kSecClassGenericPassword,
                kSecAttrAccount as String: "secure_data",
                kSecValueData as String: data.data(using: .utf8)!,
                kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlocked
            ]
            
            SecItemDelete(query as CFDictionary)
            let status = SecItemAdd(query as CFDictionary, nil)
            guard status == errSecSuccess else {
                throw KeychainError.saveFailed
            }
        } catch {
            print("Error saving data: \(error)")
        }
    }
    
    // 安全的网络请求
    func sendData(_ data: String) {
        guard let url = URL(string: "https://api.example.com/data") else {
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(getSecureToken())", forHTTPHeaderField: "Authorization")
        
        // 配置URLSession
        let session = URLSession(configuration: .default)
        let task = session.dataTask(with: request) { data, response, error in
            // 处理响应
            if let error = error {
                print("Error: \(error)")
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                print("Invalid response")
                return
            }
        }
        task.resume()
    }
    
    // 安全的数据加密
    func encryptData(_ data: String) throws -> Data {
        let key = try generateKey()
        let iv = try generateIV()
        
        let encrypted = try AES.GCM.seal(
            data.data(using: .utf8)!,
            using: key,
            nonce: try AES.GCM.Nonce(data: iv)
        )
        
        return encrypted.combined!
    }
    
    // 安全的数据解密
    func decryptData(_ data: Data) throws -> String {
        let key = try generateKey()
        let sealedBox = try AES.GCM.SealedBox(combined: data)
        
        let decrypted = try AES.GCM.open(sealedBox, using: key)
        return String(data: decrypted, encoding: .utf8)!
    }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全开发基础
        </Link>
        <Link
          href="/study/security/dev/patterns"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全设计模式 →
        </Link>
      </div>
    </div>
  );
} 