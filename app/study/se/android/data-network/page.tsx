'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookDivider,
} from '@/app/components/ui/book/BookContent'
import { DatabaseOutlined, CloudOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据存储与网络',
  chapterNumber: 5,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: 'UI开发与布局', href: '/study/se/android/ui' },
  nextChapter: { label: '多媒体与传感器', href: '/study/se/android/media-sensor' },
  theme: THEMES.software,
}

const ROOM_ENTITY_CODE = `@Entity
public class User {
    @PrimaryKey(autoGenerate = true)
    public int id;

    @ColumnInfo(name = "user_name")
    public String name;

    public int age;
}`

const OKHTTP_CODE = `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
    .url("https://api.example.com/data")
    .build();

client.newCall(request).enqueue(new Callback() {
    @Override
    public void onResponse(Call call, Response response) throws IOException {
        String body = response.body().string();
        // 主线程更新 UI
        runOnUiThread(() -> textView.setText(body));
    }

    @Override
    public void onFailure(Call call, IOException e) {
        e.printStackTrace();
    }
});`

const SPREADS = [
  // ===== 跨页 1: SharedPreferences与SQLite =====
  {
    label: '本地存储',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<DatabaseOutlined />}>SharedPreferences</PageTitle>
        <BookParagraph>
          SharedPreferences 用于存储轻量级的键值对数据，适合保存用户设置、配置信息等。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 写入数据
SharedPreferences sp = getSharedPreferences("config", MODE_PRIVATE);
sp.edit().putString("username", "Tom")
         .putInt("age", 25)
         .putBoolean("isLogin", true)
         .apply();

// 读取数据
String username = sp.getString("username", "");
int age = sp.getInt("age", 0);
boolean isLogin = sp.getBoolean("isLogin", false);`}
        />
        <BookAlert type="info" message="apply() 异步写入，commit() 同步写入。推荐使用 apply() 提高性能" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<DatabaseOutlined />}>SQLite 数据库</PageTitle>
        <BookParagraph>
          Android 内置 SQLite 数据库引擎，适合存储结构化数据。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 创建或打开数据库
SQLiteDatabase db = openOrCreateDatabase(
    "test.db", MODE_PRIVATE, null);

// 建表
db.execSQL("CREATE TABLE IF NOT EXISTS user(" +
    "id INTEGER PRIMARY KEY, name TEXT, age INTEGER)");

// 插入数据
db.execSQL("INSERT INTO user(name, age) VALUES('Tom', 25)");

// 查询
Cursor cursor = db.rawQuery("SELECT * FROM user", null);
while (cursor.moveToNext()) {
    String name = cursor.getString(cursor.getColumnIndex("name"));
}

// 关闭数据库
db.close();`}
        />
      </div>
    ),
  },

  // ===== 跨页 2: Room与OkHttp =====
  {
    label: 'Room与网络',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<DatabaseOutlined />}>Room 持久化框架</PageTitle>
        <BookParagraph>
          Room 是 Google 官方推出的 ORM 框架，对 SQLite 进行封装，提供编译时 SQL 验证、与 LiveData/Flow 集成等特性。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ROOM_ENTITY_CODE}
        />
        <BookDivider />
        <PageTitle icon={<DatabaseOutlined />}>Room DAO 示例</PageTitle>
        <BookCode
          language="java"
          showLineNumbers
          code={`@Dao
public interface UserDao {
    @Query("SELECT * FROM user")
    List<User> getAll();

    @Insert
    void insert(User user);

    @Delete
    void delete(User user);
}

// 使用 Room
AppDatabase db = Room.databaseBuilder(
    getApplicationContext(),
    AppDatabase.class, "database-name"
).build();
UserDao userDao = db.userDao();`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CloudOutlined />}>网络请求（OkHttp）</PageTitle>
        <BookParagraph>
          OkHttp 是高效的 HTTP 客户端库，支持 HTTP/2、连接池、请求拦截等特性，是 Android 最流行的网络框架之一。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={OKHTTP_CODE}
        />
        <BookDivider />
        <PageTitle icon={<CloudOutlined />}>Retrofit + OkHttp</PageTitle>
        <BookParagraph>
          Retrofit 基于 OkHttp 封装，通过注解定义 API 接口，简化网络请求：
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 定义接口
public interface ApiService {
    @GET("/users/{id}")
    Call<User> getUser(@Path("id") int id);

    @POST("/users")
    Call<User> createUser(@Body User user);
}

// 创建 Retrofit 实例
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build();

ApiService api = retrofit.create(ApiService.class);`}
        />
      </div>
    ),
  },
]

export default function DataNetworkPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
