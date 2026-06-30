'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@shared/components/ui/book/BookContent'
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
        <BookParagraph>
          MVP（Model-View-Presenter）是 Android 中常用的架构模式。View 负责 UI 展示，Presenter 负责业务逻辑，Model 负责数据层。
        </BookParagraph>
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
