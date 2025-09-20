'use client';

import { useState } from 'react';

const tabs = [
  { key: 'laravel', label: 'Laravel框架' },
  { key: 'symfony', label: 'Symfony框架' },
  { key: 'thinkphp', label: 'ThinkPHP框架' },
  { key: 'projects', label: '项目实战' },
  { key: 'best-practices', label: '最佳实践' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpFrameworksProjectsPage() {
  const [activeTab, setActiveTab] = useState('laravel');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">框架与项目实战</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'laravel' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Laravel框架</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Laravel是一个优雅的PHP Web框架。</li>
              <li>提供路由、ORM、模板引擎等功能。</li>
              <li>支持依赖注入和中间件。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// Laravel示例',
  '',
  '// 1. 安装Laravel',
  '// composer create-project laravel/laravel my-project',
  '',
  '// 2. 路由示例',
  'Route::get("/", function () {',
  '    return view("welcome");',
  '});',
  '',
  'Route::get("/users", [UserController::class, "index"]);',
  '',
  '// 3. 控制器示例',
  'namespace App\\Http\\Controllers;',
  '',
  'use App\\Models\\User;',
  'use Illuminate\\Http\\Request;',
  '',
  'class UserController extends Controller',
  '{',
  '    public function index()',
  '    {',
  '        $users = User::all();',
  '        return view("users.index", compact("users"));',
  '    }',
  '',
  '    public function store(Request $request)',
  '    {',
  '        $validated = $request->validate([',
  '            "name" => "required|max:255",',
  '            "email" => "required|email|unique:users",',
  '        ]);',
  '',
  '        $user = User::create($validated);',
  '        return redirect("/users")->with("success", "用户创建成功");',
  '    }',
  '}',
  '',
  '// 4. 模型示例',
  'namespace App\\Models;',
  '',
  'use Illuminate\\Database\\Eloquent\\Model;',
  '',
  'class User extends Model',
  '{',
  '    protected $fillable = ["name", "email", "password"];',
  '',
  '    protected $hidden = ["password", "remember_token"];',
  '',
  '    public function posts()',
  '    {',
  '        return $this->hasMany(Post::class);',
  '    }',
  '}',
  '',
  '// 5. 中间件示例',
  'namespace App\\Http\\Middleware;',
  '',
  'use Closure;',
  'use Illuminate\\Http\\Request;',
  '',
  'class CheckAge',
  '{',
  '    public function handle(Request $request, Closure $next)',
  '    {',
  '        if ($request->age <= 18) {',
  '            return redirect("home");',
  '        }',
  '',
  '        return $next($request);',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'symfony' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Symfony框架</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Symfony是一个企业级PHP框架。</li>
              <li>提供组件化架构和依赖注入。</li>
              <li>支持RESTful API开发。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// Symfony示例',
  '',
  '// 1. 安装Symfony',
  '// composer create-project symfony/website-skeleton my-project',
  '',
  '// 2. 控制器示例',
  'namespace App\\Controller;',
  '',
  'use Symfony\\Component\\HttpFoundation\\Response;',
  'use Symfony\\Component\\Routing\\Annotation\\Route;',
  '',
  'class UserController',
  '{',
  '    /**',
  '     * @Route("/users", name="user_list")',
  '     */',
  '    public function list(): Response',
  '    {',
  '        $users = $this->getDoctrine()',
  '            ->getRepository(User::class)',
  '            ->findAll();',
  '',
  '        return $this->render("user/list.html.twig", [',
  '            "users" => $users,',
  '        ]);',
  '    }',
  '',
  '    /**',
  '     * @Route("/users/{id}", name="user_show")',
  '     */',
  '    public function show(int $id): Response',
  '    {',
  '        $user = $this->getDoctrine()',
  '            ->getRepository(User::class)',
  '            ->find($id);',
  '',
  '        if (!$user) {',
  '            throw $this->createNotFoundException("用户不存在");',
  '        }',
  '',
  '        return $this->render("user/show.html.twig", [',
  '            "user" => $user,',
  '        ]);',
  '    }',
  '}',
  '',
  '// 3. 实体示例',
  'namespace App\\Entity;',
  '',
  'use Doctrine\\ORM\\Mapping as ORM;',
  '',
  '/**',
  ' * @ORM\\Entity(repositoryClass="App\\Repository\\UserRepository")',
  ' */',
  'class User',
  '{',
  '    /**',
  '     * @ORM\\Id',
  '     * @ORM\\GeneratedValue',
  '     * @ORM\\Column(type="integer")',
  '     */',
  '    private $id;',
  '',
  '    /**',
  '     * @ORM\\Column(type="string", length=255)',
  '     */',
  '    private $name;',
  '',
  '    /**',
  '     * @ORM\\Column(type="string", length=255, unique=true)',
  '     */',
  '    private $email;',
  '',
  '    // Getters and setters',
  '}',
  '',
  '// 4. 服务示例',
  'namespace App\\Service;',
  '',
  'class UserService',
  '{',
  '    private $entityManager;',
  '',
  '    public function __construct(EntityManagerInterface $entityManager)',
  '    {',
  '        $this->entityManager = $entityManager;',
  '    }',
  '',
  '    public function createUser(array $data): User',
  '    {',
  '        $user = new User();',
  '        $user->setName($data["name"]);',
  '        $user->setEmail($data["email"]);',
  '',
  '        $this->entityManager->persist($user);',
  '        $this->entityManager->flush();',
  '',
  '        return $user;',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'thinkphp' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">ThinkPHP框架</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>ThinkPHP是一个轻量级PHP框架。</li>
              <li>提供MVC架构和ORM支持。</li>
              <li>适合快速开发。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// ThinkPHP示例',
  '',
  '// 1. 安装ThinkPHP',
  '// composer create-project topthink/think my-project',
  '',
  '// 2. 控制器示例',
  'namespace app\\controller;',
  '',
  'use think\\facade\\View;',
  'use think\\Request;',
  '',
  'class User extends BaseController',
  '{',
  '    public function index()',
  '    {',
  '        $list = UserModel::select();',
  '        return View::fetch("index", [',
  '            "list" => $list',
  '        ]);',
  '    }',
  '',
  '    public function add(Request $request)',
  '    {',
  '        if ($request->isPost()) {',
  '            $data = $request->post();',
  '            $result = UserModel::create($data);',
  '            if ($result) {',
  '                return $this->success("添加成功");',
  '            } else {',
  '                return $this->error("添加失败");',
  '            }',
  '        }',
  '        return View::fetch();',
  '    }',
  '}',
  '',
  '// 3. 模型示例',
  'namespace app\\model;',
  '',
  'use think\\Model;',
  '',
  'class User extends Model',
  '{',
  '    // 设置表名',
  '    protected $name = "user";',
  '',
  '    // 设置主键',
  '    protected $pk = "id";',
  '',
  '    // 自动写入时间戳',
  '    protected $autoWriteTimestamp = true;',
  '',
  '    // 关联方法',
  '    public function profile()',
  '    {',
  '        return $this->hasOne(Profile::class);',
  '    }',
  '}',
  '',
  '// 4. 中间件示例',
  'namespace app\\middleware;',
  '',
  'class Auth',
  '{',
  '    public function handle($request, \\Closure $next)',
  '    {',
  '        if (!session("user_id")) {',
  '            return redirect("login");',
  '        }',
  '',
  '        return $next($request);',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">项目实战</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>博客系统开发。</li>
              <li>电商网站开发。</li>
              <li>API服务开发。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 项目实战示例 - 博客系统',
  '',
  '// 1. 文章模型',
  'class Post extends Model',
  '{',
  '    protected $fillable = ["title", "content", "user_id"];',
  '',
  '    public function user()',
  '    {',
  '        return $this->belongsTo(User::class);',
  '    }',
  '',
  '    public function comments()',
  '    {',
  '        return $this->hasMany(Comment::class);',
  '    }',
  '',
  '    public function tags()',
  '    {',
  '        return $this->belongsToMany(Tag::class);',
  '    }',
  '}',
  '',
  '// 2. 文章控制器',
  'class PostController extends Controller',
  '{',
  '    public function index()',
  '    {',
  '        $posts = Post::with(["user", "tags"])',
  '            ->latest()',
  '            ->paginate(10);',
  '',
  '        return view("posts.index", compact("posts"));',
  '    }',
  '',
  '    public function store(Request $request)',
  '    {',
  '        $validated = $request->validate([',
  '            "title" => "required|max:255",',
  '            "content" => "required",',
  '            "tags" => "array",',
  '        ]);',
  '',
  '        $post = auth()->user()->posts()->create($validated);',
  '',
  '        if ($request->has("tags")) {',
  '            $post->tags()->sync($request->tags);',
  '        }',
  '',
  '        return redirect("/posts")->with("success", "文章发布成功");',
  '    }',
  '',
  '    public function show(Post $post)',
  '    {',
  '        $post->load(["user", "comments.user", "tags"]);',
  '        return view("posts.show", compact("post"));',
  '    }',
  '}',
  '',
  '// 3. 评论系统',
  'class CommentController extends Controller',
  '{',
  '    public function store(Request $request, Post $post)',
  '    {',
  '        $validated = $request->validate([',
  '            "content" => "required|min:3",',
  '        ]);',
  '',
  '        $comment = $post->comments()->create([',
  '            "content" => $validated["content"],',
  '            "user_id" => auth()->id(),',
  '        ]);',
  '',
  '        return back()->with("success", "评论发布成功");',
  '    }',
  '}',
  '',
  '// 4. 标签系统',
  'class TagController extends Controller',
  '{',
  '    public function index()',
  '    {',
  '        $tags = Tag::withCount("posts")->get();',
  '        return view("tags.index", compact("tags"));',
  '    }',
  '',
  '    public function show(Tag $tag)',
  '    {',
  '        $posts = $tag->posts()',
  '            ->with(["user", "tags"])',
  '            ->latest()',
  '            ->paginate(10);',
  '',
  '        return view("tags.show", compact("tag", "posts"));',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'best-practices' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">最佳实践</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>项目结构组织。</li>
              <li>代码规范。</li>
              <li>性能优化。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 最佳实践示例',
  '',
  '// 1. 项目结构',
  'app/',
  '├── Console/',
  '│   └── Commands/',
  '├── Http/',
  '│   ├── Controllers/',
  '│   ├── Middleware/',
  '│   └── Requests/',
  '├── Models/',
  '├── Services/',
  '├── Repositories/',
  '└── Exceptions/',
  '',
  '// 2. 服务层示例',
  'class UserService',
  '{',
  '    private $userRepository;',
  '',
  '    public function __construct(UserRepository $userRepository)',
  '    {',
  '        $this->userRepository = $userRepository;',
  '    }',
  '',
  '    public function createUser(array $data): User',
  '    {',
  '        // 业务逻辑',
  '        $user = $this->userRepository->create($data);',
  '',
  '        // 触发事件',
  '        event(new UserCreated($user));',
  '',
  '        return $user;',
  '    }',
  '}',
  '',
  '// 3. 仓储层示例',
  'class UserRepository',
  '{',
  '    private $model;',
  '',
  '    public function __construct(User $model)',
  '    {',
  '        $this->model = $model;',
  '    }',
  '',
  '    public function create(array $data): User',
  '    {',
  '        return $this->model->create($data);',
  '    }',
  '',
  '    public function find(int $id): ?User',
  '    {',
  '        return $this->model->find($id);',
  '    }',
  '',
  '    public function update(int $id, array $data): bool',
  '    {',
  '        return $this->model->where("id", $id)->update($data);',
  '    }',
  '}',
  '',
  '// 4. 请求验证示例',
  'class CreateUserRequest extends FormRequest',
  '{',
  '    public function rules(): array',
  '    {',
  '        return [',
  '            "name" => "required|string|max:255",',
  '            "email" => "required|email|unique:users",',
  '            "password" => "required|string|min:8",',
  '        ];',
  '    }',
  '',
  '    public function messages(): array',
  '    {',
  '        return [',
  '            "name.required" => "用户名不能为空",',
  '            "email.unique" => "该邮箱已被注册",',
  '        ];',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何选择PHP框架？</b><br />A: 根据项目需求、团队熟悉度和性能要求选择合适的框架。</li>
              <li><b>Q: 如何组织大型项目？</b><br />A: 使用领域驱动设计，合理分层，遵循SOLID原则。</li>
              <li><b>Q: 如何保证代码质量？</b><br />A: 编写单元测试，使用代码规范工具，进行代码审查。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>使用Laravel开发一个博客系统。</li>
              <li>使用Symfony开发一个RESTful API。</li>
              <li>使用ThinkPHP开发一个简单的CMS。</li>
              <li>实现一个完整的用户认证系统。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/testing-debugging"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：测试与调试
          </a>
          <a
            href="/study/php/advanced-internals"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：高级特性与底层原理
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 