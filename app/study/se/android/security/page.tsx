'use client';
export default function AndroidSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">安全与权限管理</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">权限申请</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`// AndroidManifest.xml
<uses-permission android:name="android.permission.CAMERA" />

// 运行时权限
if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
    != PackageManager.PERMISSION_GRANTED) {
    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, 1);
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">数据加密</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`// AES加密
Cipher cipher = Cipher.getInstance("AES");
SecretKeySpec key = new SecretKeySpec(keyBytes, "AES");
cipher.init(Cipher.ENCRYPT_MODE, key);
byte[] encrypted = cipher.doFinal(data);`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">防止逆向与代码混淆</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# proguard-rules.pro
-keep class com.example.** { *; }
-dontwarn com.example.**
-optimizations !code/simplification/arithmetic
-keepattributes Signature,InnerClasses`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/advanced" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 高级特性与性能优化
        </a>
        <a href="/study/se/android/frameworks" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          第三方库与架构模式 →
        </a>
      </div>
    </div>
  );
} 