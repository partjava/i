'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@/app/components/ui/book/BookContent'
import { SafetyOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '安全与权限管理',
  chapterNumber: 8,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '高级特性与性能优化', href: '/study/se/android/advanced' },
  nextChapter: { label: '第三方库与架构模式', href: '/study/se/android/frameworks' },
  theme: THEMES.software,
}

const PERMISSION_CODE = `// AndroidManifest.xml 声明权限
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

// 运行时权限申请
if (ContextCompat.checkSelfPermission(this,
        Manifest.permission.CAMERA)
        != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(this,
        new String[]{Manifest.permission.CAMERA}, REQUEST_CODE);
} else {
    openCamera();
}

// 处理权限结果
@Override
public void onRequestPermissionsResult(int requestCode,
        String[] permissions, int[] grantResults) {
    if (requestCode == REQUEST_CODE
            && grantResults.length > 0
            && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        openCamera();
    }
}`

const ENCRYPTION_CODE = `// AES 加密
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
IvParameterSpec iv = new IvParameterSpec(ivBytes);

// 加密
cipher.init(Cipher.ENCRYPT_MODE, key, iv);
byte[] encrypted = cipher.doFinal(plainText.getBytes());

// 解密
cipher.init(Cipher.DECRYPT_MODE, key, iv);
byte[] decrypted = cipher.doFinal(encrypted);`

const PROGUARD_CODE = `# proguard-rules.pro

# 保留实体类
-keep class com.example.model.** { *; }

# 保留 Retrofit 接口
-keep interface com.example.api.** { *; }

# 忽略警告
-dontwarn com.example.**

# 优化选项
-optimizations !code/simplification/arithmetic
-keepattributes Signature,InnerClasses,EnclosingMethod

# 保留 Gson 序列化类
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}`

const SPREADS = [
  // ===== 跨页 1: 权限申请 =====
  {
    label: '权限管理',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<SafetyOutlined />}>运行时权限</PageTitle>
        <BookParagraph>
          Android 6.0（API 23）引入了运行时权限机制。敏感权限需要在运行时向用户申请，用户可随时在设置中撤销。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={PERMISSION_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<SafetyOutlined />}>权限分类</PageTitle>
        <BookList items={[
          '正常权限 —— 安装时自动授予，如 INTERNET、ACCESS_NETWORK_STATE',
          '危险权限 —— 需运行时申请，如相机、位置、麦克风、存储',
          '特殊权限 —— SYSTEM_ALERT_WINDOW、WRITE_SETTINGS，需特殊处理',
        ]} />
        <BookDivider />
        <PageTitle icon={<SafetyOutlined />}>权限最佳实践</PageTitle>
        <BookList items={[
          '在使用功能时才申请权限，不要安装后立即申请',
          '提供解释说明为什么要该权限（Android 官方推荐）',
          '处理用户拒绝"不再询问"的情况，引导用户到设置页面',
          '使用 shouldShowRequestPermissionRationale() 判断是否需解释',
        ]} />
        <BookAlert type="warning" message="用户拒绝权限后应用仍需正常工作，必须有降级方案" />
      </div>
    ),
  },

  // ===== 跨页 2: 加密与混淆 =====
  {
    label: '安全防护',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<SafetyOutlined />}>数据加密</PageTitle>
        <BookParagraph>
          Android 提供多种加密方式保护敏感数据。推荐使用 AES-GCM 进行数据加密，使用 EncryptedSharedPreferences 存储键值数据。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ENCRYPTION_CODE}
        />
        <BookDivider />
        <PageTitle icon={<SafetyOutlined />}>Android Keystore</PageTitle>
        <BookParagraph>
          使用 Android Keystore 系统安全存储密钥，密钥存储在硬件安全模块（TEE）中，无法被提取。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 生成 Keystore 密钥
KeyGenParameterSpec spec = new KeyGenParameterSpec.Builder(
        "my_key", KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
        .setKeySize(256)
        .build();

KeyGenerator kg = KeyGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
kg.init(spec);
kg.generateKey();`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<SafetyOutlined />}>防止逆向与代码混淆</PageTitle>
        <BookParagraph>
          ProGuard / R8 是 Android 的代码混淆工具，可缩减代码体积、混淆类名与方法名，增加逆向难度。
        </BookParagraph>
        <BookCode
          language="text"
          showLineNumbers
          code={PROGUARD_CODE}
        />
        <BookDivider />
        <PageTitle icon={<SafetyOutlined />}>安全最佳实践</PageTitle>
        <BookList items={[
          '网络传输 —— 全部使用 HTTPS，证书固定（Certificate Pinning）',
          '本地存储 —— 敏感数据使用 EncryptedSharedPreferences 或 Keystore',
          '日志安全 —— 发布版本移除 Log 输出，使用 BuildConfig.DEBUG 控制',
          'WebView 安全 —— 禁用 JavaScript 接口，限制文件访问',
          '动态加载 —— 谨慎使用 DexClassLoader 加载外部代码',
          'SQL 注入 —— 使用 Room 或参数化查询，避免拼接 SQL',
          'Intent 安全 —— 使用显式 Intent 而非隐式，检查 Intent 来源',
        ]} />
      </div>
    ),
  },
]

export default function SecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
