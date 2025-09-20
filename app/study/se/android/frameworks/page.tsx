'use client';
export default function AndroidFrameworksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">第三方库与架构模式</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">MVP架构模式</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public interface View {
    void showData(String data);
}
public class Presenter {
    private View view;
    public Presenter(View view) { this.view = view; }
    public void loadData() { view.showData("Hello MVP"); }
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Jetpack组件（ViewModel）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public class MyViewModel extends ViewModel {
    private MutableLiveData<String> data = new MutableLiveData<>();
    public LiveData<String> getData() { return data; }
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常用第三方库</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Glide：图片加载</li>
          <li>• Retrofit：网络请求</li>
          <li>• EventBus：事件总线</li>
          <li>• Dagger：依赖注入</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Retrofit接口定义示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public interface ApiService {
    @GET("/users/{id}")
    Call<User> getUser(@Path("id") int id);
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 安全与权限管理
        </a>
        <a href="/study/se/android/testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          测试与发布 →
        </a>
      </div>
    </div>
  );
} 