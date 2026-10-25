'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
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

const ENCRYPTION_CODE = "// Android Java片段：keyBytes必须来自受控密钥管理，不能硬编码。\n// 每次加密由provider生成新IV，与密文一起保存，禁止同密钥重复IV。\nCipher cipher = Cipher.getInstance(\"AES/GCM/NoPadding\");\nSecretKeySpec key = new SecretKeySpec(keyBytes, \"AES\");\ncipher.init(Cipher.ENCRYPT_MODE, key);\nbyte[] ivBytes = cipher.getIV();\nbyte[] encrypted = cipher.doFinal(\n    plainText.getBytes(java.nio.charset.StandardCharsets.UTF_8));\ncipher.init(Cipher.DECRYPT_MODE, key,\n    new javax.crypto.spec.GCMParameterSpec(128, ivBytes));\nbyte[] decrypted = cipher.doFinal(encrypted);"

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
<BookParagraph>{"权限、Keystore与加密代码需真实Android环境和安全设计。原AES-GCM示例的参数类型已纠正；硬件保护取决于设备与密钥属性，不能一概宣称所有密钥均在TEE。权限与存储API还受系统和targetSdk影响。"}</BookParagraph>
        <BookParagraph>
          Android 6.0（API 23）引入了运行时权限机制。敏感权限需要在运行时向用户申请，用户可随时在设置中撤销。
        </BookParagraph>
<BookParagraph>{"权限申请应由用户正在进行的功能触发，而非一打开应用就请求全部敏感能力。拒绝和撤销都是正常状态，需要保留输入并提供可用替代路径。权限通过只说明系统允许尝试访问，仍要处理硬件、文件或服务不可用的失败。"}</BookParagraph>
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
{ label: "先画资产与信任边界", left: (<div className="space-y-4">
<PageTitle>{"先画资产与信任边界"}</PageTitle>
<BookParagraph>{"待办标题可能包含私人事项，照片包含位置线索，登录令牌可以代表用户发起请求。先列出它们经过输入框、内存、数据库、日志、备份和网络的路径，标明哪些环节跨越应用边界。加密本地数据库不能防止应用把明文上传到错误地址，混淆也不能让客户端长期保守服务端万能密钥。保护措施要对应具体威胁，而不是在代码里出现一次AES就称为安全。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：用户拒绝相机权限"}</PageTitle>
<BookParagraph>{"用户点拍照按钮时说明目的并请求权限，拒绝后保留输入，提供从已有图片选择或取消的路径，不应循环弹窗。用户后来在设置中撤销权限，页面再次使用能力前仍要检查当前状态并处理安全异常。权限获准也不能保证相机可用，硬件被占用等失败必须独立处理。仅在首次安装时缓存一个isGranted布尔值，会把随后发生的撤销误判为仍有权访问。"}</BookParagraph>
</div>) },
{ label: "认证、权限与加密的职责不同", left: (<div className="space-y-4">
<PageTitle>{"认证、权限与加密的职责不同"}</PageTitle>
<BookParagraph>{"设备权限限制对系统能力的访问，服务端认证确认请求身份，业务授权决定这个身份能读取哪条任务，传输与存储加密保护数据的机密性或完整性。它们不能互相替代。下表以读取照片任务为例，说明每一层仍需独立检查。应用拥有相册权限不表示服务端应允许访问别人的任务；令牌有效也不意味着客户端可以任意获取设备上所有媒体文件。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"层次"}</th><th className="border-b p-2 text-left">{"解决的问题"}</th><th className="border-b p-2 text-left">{"仍需检查"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"系统权限"}</td><td className="border-b p-2 align-top">{"能否使用相机等能力"}</td><td className="border-b p-2 align-top">{"拒绝、撤销和硬件失败"}</td></tr><tr><td className="border-b p-2 align-top">{"服务端认证"}</td><td className="border-b p-2 align-top">{"请求者身份是否可信"}</td><td className="border-b p-2 align-top">{"令牌完整性及有效期"}</td></tr><tr><td className="border-b p-2 align-top">{"业务授权"}</td><td className="border-b p-2 align-top">{"是否拥有指定任务"}</td><td className="border-b p-2 align-top">{"资源归属与租户边界"}</td></tr><tr><td className="border-b p-2 align-top">{"GCM加密"}</td><td className="border-b p-2 align-top">{"密文保密及完整性"}</td><td className="border-b p-2 align-top">{"密钥管理、IV唯一与恢复"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"GCM必须使用独立随机IV"}</PageTitle>
<BookParagraph>{"以下为Java方法体片段，需合法AES密钥key及明文plain，导入javax.crypto和java.nio.charset；Android密钥可来自Keystore。加密初始化后取出新IV，与密文一起保存，解密使用GCMParameterSpec指定认证标签长度。不要对同一密钥重复使用IV。预期合法密文还原原文，篡改密文或IV应导致验证失败而不能显示部分明文；异常需由调用者转为安全错误。"}</BookParagraph>
<BookCode language="java" showLineNumbers code={"Cipher enc = Cipher.getInstance(\"AES/GCM/NoPadding\");\nenc.init(Cipher.ENCRYPT_MODE, key);\nbyte[] iv = enc.getIV();\nbyte[] encrypted = enc.doFinal(plain.getBytes(StandardCharsets.UTF_8));\nCipher dec = Cipher.getInstance(\"AES/GCM/NoPadding\");\ndec.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(128, iv));\nString restored = new String(dec.doFinal(encrypted), StandardCharsets.UTF_8);"} />
</div>) },
{ label: "推演二：重装后为何无法解密", left: (<div className="space-y-4">
<PageTitle>{"推演二：重装后为何无法解密"}</PageTitle>
<BookParagraph>{"如果加密数据被备份恢复到新安装，而原Keystore密钥没有一同可用，密文可能无法解密。系统保护密钥不等于业务自动具备跨设备恢复方案。要定义哪些数据允许备份、密钥失效时如何提示、是否能从可信服务端重新同步。不能为解决恢复问题把密钥硬编码到APK；那会使拿到安装包的人获得解密能力，破坏本来要建立的信任边界。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"组件导出和URI也要验证"}</PageTitle>
<BookParagraph>{"外部应用可能通过导出组件或Intent传入恶意参数，接收方必须验证动作、目标资源和调用者权限。分享文件使用受限URI与最小授权范围，避免暴露整个私有目录。深链中的task_id只是输入，进入详情前仍需检查当前用户是否有权读取。日志、崩溃报告和剪贴板常成为旁路泄漏渠道，开发时就应使用虚构数据和脱敏追踪编号，不能等上线后才删除敏感打印。"}</BookParagraph>
</div>) },
{ label: "练习：权限与篡改测试矩阵", left: (<div className="space-y-4">
<PageTitle>{"练习：权限与篡改测试矩阵"}</PageTitle>
<BookParagraph>{"为拍照待办列出未申请、允许、拒绝、设置撤销和硬件不可用五种场景，再对密文修改一个字节。验收：不强迫授权、不丢输入、拒绝时仍能使用无关功能，篡改后不返回明文，日志不包含令牌和密钥。参考思路：把系统能力状态与业务结果分开建模，并用设备测试验证撤销；加密测试同时覆盖正确恢复与错误密钥，不能只执行加密成功路径。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"旧安全示例的维护边界"}</PageTitle>
<BookParagraph>{"EncryptedSharedPreferences等库API可能随依赖演进而改变支持状态，应查项目所用版本的官方说明后决定迁移。Keystore能减少密钥直接暴露，但被攻陷的应用仍可能借授权接口使用密钥，不能承诺绝对不可攻击。R8规则要按反射和序列化需要最小保留，过宽keep与dontwarn会隐藏问题；混淆提高阅读成本，却不提供真正的访问控制或秘密存储。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/privacy-and-security/keystore" href="https://developer.android.com/privacy-and-security/keystore" target="_blank" rel="noopener noreferrer" className="underline">{"Android Keystore系统"}</a>]} />
</div>) },
  {
    label: '安全防护',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<SafetyOutlined />}>数据加密</PageTitle>
        <BookParagraph>
          Android 提供多种加密方式保护敏感数据。推荐使用 AES-GCM 进行数据加密，使用 EncryptedSharedPreferences 存储键值数据。
        </BookParagraph>
<BookParagraph>{"加密的关键在密钥和参数生命周期。GCM需正确认证标签参数并避免同密钥重复IV，密文应连同所需IV保存。加密成功后还要测试解密与篡改拒绝；不应把明文、密钥或令牌写入日志，混淆也不能替代密钥保护。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ENCRYPTION_CODE}
        />
        <BookDivider />
        <PageTitle icon={<SafetyOutlined />}>Android Keystore</PageTitle>
        <BookParagraph>
          Android Keystore 可限制密钥导出与使用方式。是否由TEE或其他安全硬件保护，取决于设备和密钥属性，应检查实际安全级别；应用仍需保护调用权限与数据。
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
