'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookDivider, BookList } from '@shared/components/ui/book/BookContent'
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
<BookParagraph>{"原Room实体、DAO、Retrofit接口和OkHttp请求是项目内片段，需依赖、权限及模型定义。Room数据库操作应在合适后台执行；SQLite游标与HTTP响应都要关闭，示例域名不提供真实业务接口。"}</BookParagraph>
        <BookParagraph>
          SharedPreferences 用于存储轻量级的键值对数据，适合保存用户设置、配置信息等。
        </BookParagraph>
<BookParagraph>{"偏好值适合少量设置，不适合承担任务关系、查询和同步队列。区分用户明确保存的业务事实与可重建缓存，才能决定删除、迁移与备份策略。写入接口返回并不意味着页面会自动刷新，存储与观察结果要分别检查。"}</BookParagraph>
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
<BookParagraph>{"SQLite示例需在后台按合适生命周期执行，动态输入使用参数绑定。查询得到Cursor后应按列契约读取并及时关闭；把数据库连接关闭并不会让错误SQL变正确。先用少量固定行核对插入和查询，再连接列表展示。"}</BookParagraph>
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
{ label: "先区分设置、业务事实与缓存", left: (<div className="space-y-4">
<PageTitle>{"先区分设置、业务事实与缓存"}</PageTitle>
<BookParagraph>{"主题颜色只需保存一个偏好值，任务列表需要结构化查询与更新，网络结果缓存还要记录何时失效；三者不能一律塞进SharedPreferences。数据库保存用户已经提交的本地事实，内存只负责加速。网络失败时若仍能查看本地任务，仓库应说明这些数据的更新时间和同步状态，而不是将空响应覆盖本地列表，让用户误以为任务全部被删除。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：离线新增任务的完整路径"}</PageTitle>
<BookParagraph>{"用户离线新增“练习SQL”，先在本地事务中插入任务和待同步操作，再立即显示“待同步”。网络恢复后后台提交带稳定客户端操作号的请求，服务端成功响应并返回任务标识，客户端在事务中更新映射和同步状态。若响应丢失，重试同一操作号应得到同一业务结果。只在请求前检查网络是否连接不能保证提交成功，连接状态与实际请求结果之间仍有时间差。"}</BookParagraph>
</div>) },
{ label: "本地优先与请求直读的差别", left: (<div className="space-y-4">
<PageTitle>{"本地优先与请求直读的差别"}</PageTitle>
<BookParagraph>{"请求直读实现简单，但页面依赖网络，旋转或重复进入容易触发重复请求。本地优先由数据库作为展示事实来源，网络响应先落库再驱动观察者更新，界面不用同时合并两份列表。代价是同步、冲突和过期规则更复杂。下表把读路径、失败表现和适用场景放在一起；设计应由离线需求决定，不应仅因引入了Room就宣称已经具备可靠离线同步。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"方案"}</th><th className="border-b p-2 text-left">{"数据读路径"}</th><th className="border-b p-2 text-left">{"失败时行为"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"请求直读"}</td><td className="border-b p-2 align-top">{"网络到UI"}</td><td className="border-b p-2 align-top">{"需单独处理离线"}</td></tr><tr><td className="border-b p-2 align-top">{"本地优先"}</td><td className="border-b p-2 align-top">{"数据库到UI"}</td><td className="border-b p-2 align-top">{"保留旧数据并标记同步"}</td></tr><tr><td className="border-b p-2 align-top">{"偏好设置"}</td><td className="border-b p-2 align-top">{"轻量键值读取"}</td><td className="border-b p-2 align-top">{"不适合作任务关系查询"}</td></tr><tr><td className="border-b p-2 align-top">{"待同步队列"}</td><td className="border-b p-2 align-top">{"稳定操作号驱动提交"}</td><td className="border-b p-2 align-top">{"重试需幂等与冲突规则"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"参数绑定：输入永远不是SQL结构"}</PageTitle>
<BookParagraph>{"下例是Python 3标准库SQLite的可运行教学实验，展示Android SQLite同样需要的参数绑定原则。输入标题含单引号仍作为数据插入，预期输出一行标题，任务表保持存在。Android侧可使用ContentValues或带占位符的查询；不能拼接用户输入形成SQL。游标读取完要关闭，数据库拥有者负责连接生命周期，不能在列表每一行绑定时反复打开数据库。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"import sqlite3\nwith sqlite3.connect(':memory:') as db:\n    db.execute('CREATE TABLE todo(id INTEGER PRIMARY KEY, title TEXT)')\n    db.execute('INSERT INTO todo(title) VALUES (?)', (\"Review 'SQL'\",))\n    print(db.execute('SELECT title FROM todo WHERE id = ?', (1,)).fetchone()[0])"} />
</div>) },
{ label: "推演二：旧请求覆盖新搜索", left: (<div className="space-y-4">
<PageTitle>{"推演二：旧请求覆盖新搜索"}</PageTitle>
<BookParagraph>{"用户先输入A再输入AB，两次请求分别耗时八百和一百毫秒；若按返回顺序直接更新界面，最终显示的是过时的A结果。可以取消前一次请求，或为请求分配递增编号，只接受与当前查询一致的响应。取消也不保证服务器没有处理请求，所以写操作仍需幂等。展示层要区分加载中、空结果、认证失败、服务端错误与网络异常，不能统一转换成空列表。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"超时、重试与错误分类"}</PageTitle>
<BookParagraph>{"连接超时、读取超时和整个调用截止时间约束不同阶段。查询失败可有限退避重试，但创建任务若没有去重机制就可能重复写入；认证失败不应靠无限重试解决。HTTP成功状态也不保证载荷符合契约，解析前检查状态、内容类型和字段。日志应记请求标识、耗时与分类，不记录完整令牌。重试达到上限后向用户提供可恢复入口，并保留尚未同步的本地修改。"}</BookParagraph>
</div>) },
{ label: "练习：故障注入验证仓库", left: (<div className="space-y-4">
<PageTitle>{"练习：故障注入验证仓库"}</PageTitle>
<BookParagraph>{"为任务仓库准备成功、超时、无效JSON和认证过期四种响应，再模拟离线新增及恢复后重复提交。验收：界面不因失败丢失本地任务，旧查询结果不覆盖新查询，重放同一操作只生成一条服务端记录，错误状态可区分。参考思路：用假网络层控制完成顺序，用本地唯一操作号追踪一次写入；不要依赖真实网络偶然变慢来“测试”竞态。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"数据迁移与资源关闭"}</PageTitle>
<BookParagraph>{"给任务新增优先级字段时，要设计已有行的默认值和迁移步骤，不能通过删除数据库让开发机看似恢复正常。发布前从旧版真实结构升级并核对数量、主键与字段语义。数据库事务用于维持多步修改的一致性，网络请求不宜长期占据事务。HTTP响应体和Cursor通常需要及时关闭；正确结果与资源释放都属于成功条件，否则大量请求后可能出现连接耗尽或句柄泄漏。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/training/data-storage/room" href="https://developer.android.com/training/data-storage/room" target="_blank" rel="noopener noreferrer" className="underline">{"Room持久化"}</a>, <a key="https://developer.android.com/training/data-storage/room/async-queries" href="https://developer.android.com/training/data-storage/room/async-queries" target="_blank" rel="noopener noreferrer" className="underline">{"Room异步查询"}</a>]} />
</div>) },
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
