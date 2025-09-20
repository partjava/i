'use client';
export default function AndroidDataNetworkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">数据存储与网络</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">SharedPreferences用法</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`SharedPreferences sp = getSharedPreferences("config", MODE_PRIVATE);
sp.edit().putString("key", "value").apply();
String value = sp.getString("key", "");`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">SQLite数据库操作</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`SQLiteDatabase db = openOrCreateDatabase("test.db", MODE_PRIVATE, null);
db.execSQL("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name TEXT)");
db.execSQL("INSERT INTO user(name) VALUES('Tom')");`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Room持久化框架</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`@Entity
public class User {
    @PrimaryKey(autoGenerate = true)
    public int id;
    public String name;
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">网络请求（OkHttp）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder().url("https://api.example.com").build();
client.newCall(request).enqueue(new Callback() {
    @Override
    public void onResponse(Call call, Response response) throws IOException {
        String body = response.body().string();
    }
    @Override
    public void onFailure(Call call, IOException e) {}
});`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/ui" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← UI开发与布局
        </a>
        <a href="/study/se/android/media-sensor" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          多媒体与传感器 →
        </a>
      </div>
    </div>
  );
} 