'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
import { ApartmentOutlined, BuildOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '第三方库与架构模式',
  chapterNumber: 9,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '安全与权限管理', href: '/study/se/android/security' },
  nextChapter: { label: '测试与发布', href: '/study/se/android/testing' },
  theme: THEMES.software,
}

const MVP_CODE = `// MVP 架构实现
public interface LoginView {
    void showLoading();
    void hideLoading();
    void onLoginSuccess(String token);
    void onLoginError(String error);
}

public class LoginPresenter {
    private LoginView view;
    private LoginModel model;

    public LoginPresenter(LoginView view) {
        this.view = view;
        this.model = new LoginModel();
    }

    public void login(String username, String password) {
        view.showLoading();
        model.login(username, password, new Callback() {
            @Override
            public void onSuccess(String token) {
                view.hideLoading();
                view.onLoginSuccess(token);
            }

            @Override
            public void onError(String error) {
                view.hideLoading();
                view.onLoginError(error);
            }
        });
    }
}`

const RETROFIT_CODE = `// 定义 API 接口
public interface ApiService {
    @GET("/users/{id}")
    Call<User> getUser(@Path("id") int id);

    @GET("/users")
    Call<List<User>> getUsers(@Query("page") int page);

    @POST("/users")
    Call<User> createUser(@Body User user);

    @PUT("/users/{id}")
    Call<User> updateUser(@Path("id") int id, @Body User user);

    @DELETE("/users/{id}")
    Call<Void> deleteUser(@Path("id") int id);
}`

const SPREADS = [
  // ===== 跨页 1: MVP与Jetpack =====
  {
    label: '架构模式',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ApartmentOutlined />}>MVP 架构模式</PageTitle>
<BookParagraph>{"保留MVP、MVVM、Retrofit与Hilt原例；loadFromNetwork、接口实现、资源与Gradle插件须由项目提供。MVVM是一种职责划分，不能仅凭类名ViewModel就认定符合架构；后台任务仍需生命周期与错误控制。"}</BookParagraph>
        <BookParagraph>
          MVP（Model-View-Presenter）是 Android 中常用的架构模式。View 负责 UI 展示，Presenter 负责业务逻辑，Model 负责数据层。
        </BookParagraph>
<BookParagraph>{"MVP中的接口应描述界面能力，Presenter组织规则但不能永久持有失效页面。用假View记录加载、成功和失败顺序，可以脱离设备验证行为。架构的价值在边界可测试，不在于机械创建三个类或把所有网络调用都移动到Presenter。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={MVP_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ApartmentOutlined />}>MVVM 架构模式</PageTitle>
        <BookParagraph>
          MVVM（Model-View-ViewModel）是 Google 官方推荐的架构，结合 Jetpack 组件使用效果最佳。
        </BookParagraph>
<BookParagraph>{"ViewModel持有可恢复状态，View按状态渲染，Repository管理数据来源和同步。把Activity传进ViewModel再直接操作控件会破坏边界。先定义保存中、成功和失败的状态，再接观察机制，才能解释旋转与重复订阅后为何不重新提交。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`public class MyViewModel extends ViewModel {
    private MutableLiveData<String> data = new MutableLiveData<>();

    public LiveData<String> getData() {
        return data;
    }

    public void fetchData() {
        // 在后台线程加载数据
        data.setValue("加载中...");
        new Thread(() -> {
            String result = loadFromNetwork();
            data.postValue(result);
        }).start();
    }
}

// 在 Activity 中使用
MyViewModel viewModel = new ViewModelProvider(this).get(MyViewModel.class);
viewModel.getData().observe(this, text -> {
    textView.setText(text);
});`}
        />
        <BookDivider />
        <PageTitle icon={<ApartmentOutlined />}>架构对比</PageTitle>
        <BookList items={[
          'MVC —— 早期 Android 模式，Activity 既当 View 又当 Controller',
          'MVP —— View 与 Presenter 通过接口通信，可测试性强',
          'MVVM —— ViewModel 与 LiveData/Flow 结合，自动管理生命周期',
          'MVI —— Model-View-Intent，单向数据流，状态可预测',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 第三方库 =====
{ label: "架构首先让变化有归属", left: (<div className="space-y-4">
<PageTitle>{"架构首先让变化有归属"}</PageTitle>
<BookParagraph>{"待办详情页面可以把用户输入和渲染放在View，把可观察界面状态与用户动作处理放在ViewModel，把数据来源与同步规则放在Repository。这样换数据库不需要重写按钮监听，测试保存规则也不需要启动Activity。架构图上的箭头应表示调用或数据依赖，不能只是画三个方框。若ViewModel直接持有Activity并通过findViewById修改控件，即使文件名符合MVVM，边界仍然没有建立。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：一次保存如何穿过各层"}</PageTitle>
<BookParagraph>{"用户按保存，View读取输入并发送Save动作；ViewModel检查是否已有提交、生成Saving状态，再调用仓库；仓库执行持久化，返回业务结果；ViewModel生成Saved或Error状态，View只负责展示。若持久化失败，输入仍保留，重试不会重新生成无关身份。这个过程能逐步观察并单独测试，不依赖界面回调的偶然顺序；每层异常如何转换要明确，不能将所有失败都压成空字符串。"}</BookParagraph>
</div>) },
{ label: "MVP与MVVM的实际取舍", left: (<div className="space-y-4">
<PageTitle>{"MVP与MVVM的实际取舍"}</PageTitle>
<BookParagraph>{"MVP常由Presenter主动调用View接口，测试可用假View记录命令；MVVM常由View观察状态，便于重新订阅和状态恢复。两者都可写出好坏实现，关键在依赖边界、生命周期与状态一致性。下表围绕同一个保存动作比较，不把MVVM理解成自动消除内存泄漏。Presenter必须解除不再有效的View引用，ViewModel也不能长期持有Context类型的页面实例或把导航动作无限重放。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"角度"}</th><th className="border-b p-2 text-left">{"MVP"}</th><th className="border-b p-2 text-left">{"MVVM"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"界面更新"}</td><td className="border-b p-2 align-top">{"Presenter调用View契约"}</td><td className="border-b p-2 align-top">{"View观察可恢复状态"}</td></tr><tr><td className="border-b p-2 align-top">{"测试入口"}</td><td className="border-b p-2 align-top">{"假View记录调用"}</td><td className="border-b p-2 align-top">{"断言动作前后状态"}</td></tr><tr><td className="border-b p-2 align-top">{"生命周期风险"}</td><td className="border-b p-2 align-top">{"Presenter保留过期View"}</td><td className="border-b p-2 align-top">{"任务或事件跨页面重放"}</td></tr><tr><td className="border-b p-2 align-top">{"数据边界"}</td><td className="border-b p-2 align-top">{"Model或Repository封装"}</td><td className="border-b p-2 align-top">{"Repository封装来源与策略"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"纯逻辑状态推演"}</PageTitle>
<BookParagraph>{"下面Python 3标准库代码模拟保存状态归约，不是Android框架实现。输入为空白时变为Error，合法输入变为Saving，原对象不被修改，预期打印Error与Saving。真实Java或Kotlin项目可用普通类实现同样规则，再由ViewModel连接异步仓库。把纯规则抽离后，可快速覆盖边界，设备测试则专门验证渲染与生命周期，两种测试互补而不是互相替代。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"def submit(state, title):\n    if state == 'Saving':\n        return state\n    return 'Saving' if title.strip() else 'Error'\nprint(submit('Editing', '   '))\nprint(submit('Editing', 'Review Room'))\nassert submit('Saving', 'Again') == 'Saving'"} />
</div>) },
{ label: "推演二：依赖注入如何改善测试", left: (<div className="space-y-4">
<PageTitle>{"推演二：依赖注入如何改善测试"}</PageTitle>
<BookParagraph>{"仓库若在构造函数中接收ApiService与Dao，生产环境提供真实实现，测试环境提供可控制延迟和异常的假实现。若在每次方法里直接new Retrofit和创建数据库，测试就被迫访问网络和磁盘，也难以复现特定顺序。Hilt负责对象创建与绑定，不会替你判断业务依赖是否合理。作用域还要匹配拥有者：应用级单例不能直接保留只属于某个Activity的对象。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"一次性事件与持久状态要分开"}</PageTitle>
<BookParagraph>{"“任务已保存”可能需要短暂提示或导航，而“当前任务标题”应在重新观察后仍能取得。把所有东西都放在可重放LiveData里，旋转后可能重复导航；把全部作为一次性事件，又可能让新页面拿不到当前内容。明确哪些结果是可恢复状态，哪些是消费动作，并测试订阅者重新创建。业务完成事实应有稳定身份，不要依赖一个瞬时Toast作为系统唯一成功记录。"}</BookParagraph>
</div>) },
{ label: "练习：在无设备测试中复现失败", left: (<div className="space-y-4">
<PageTitle>{"练习：在无设备测试中复现失败"}</PageTitle>
<BookParagraph>{"为TaskRepository定义读取与保存契约，准备成功、失败和延迟三种假实现，让ViewModel依次接收空标题、合法标题与重复点击。验收：空输入不调用仓库，Saving期间不会重复提交，失败后可重试，旋转后的新观察者得到当前状态而不再次保存。参考思路：先写动作与状态转换表，再用可控仓库推进状态；最后才接入Hilt，不把注解数量当架构质量指标。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"第三方库的契约与成本"}</PageTitle>
<BookParagraph>{"Retrofit负责接口声明和转换，OkHttp负责HTTP调用，Room负责数据库访问，Hilt负责依赖图，它们不能替代业务层对幂等、过期和权限的判断。依赖升级要检查迁移说明、方法签名、混淆与最低系统要求，并记录为何采用。Repository不应只是把每个网络方法改名转发，更重要的是确定数据事实来源、错误类型和缓存策略；若不需要这些职责，也应避免无意义的包装层。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/topic/architecture" href="https://developer.android.com/topic/architecture" target="_blank" rel="noopener noreferrer" className="underline">{"Android应用架构指南"}</a>]} />
</div>) },
  {
    label: '第三方库',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<BuildOutlined />}>常用第三方库</PageTitle>
        <BookList items={[
          'Glide —— 图片加载与缓存，支持 GIF、缩略图',
          'Coil —— Kotlin 协程驱动的图片加载库',
          'Retrofit —— 类型安全的 HTTP 客户端，注解驱动',
          'OkHttp —— 底层 HTTP 库，支持拦截器、连接池',
          'EventBus / FlowBus —— 事件总线，组件间通信',
          'Dagger / Hilt —— 依赖注入框架，管理对象依赖',
          'RxJava / RxKotlin —— 响应式编程，处理异步事件流',
          'Moshi / Gson —— JSON 序列化/反序列化',
        ]} />
        <BookDivider />
        <PageTitle icon={<BuildOutlined />}>Retrofit 接口定义</PageTitle>
        <BookParagraph>
          Retrofit 通过注解简洁地定义 REST API 接口，支持多种数据格式转换器。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={RETROFIT_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<BuildOutlined />}>Hilt 依赖注入</PageTitle>
        <BookParagraph>
          Hilt 是 Google 官方推出的依赖注入框架，基于 Dagger，简化了 Android 中的依赖注入配置。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// Application 入口
@HiltAndroidApp
public class MyApplication extends Application {}

// Activity 注入
@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {
    @Inject
    ApiService apiService;

    @Inject
    UserRepository userRepository;
}

// 模块定义
@Module
@InstallIn(SingletonComponent.class)
public class NetworkModule {
    @Provides
    @Singleton
    public OkHttpClient provideOkHttpClient() {
        return new OkHttpClient.Builder().build();
    }

    @Provides
    @Singleton
    public ApiService provideApiService(OkHttpClient client) {
        return new Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService.class);
    }
}`}
        />
        <BookAlert type="info" message="Hilt 在编译时生成依赖注入代码，不会影响运行性能" />
      </div>
    ),
  },
]

export default function FrameworksPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
