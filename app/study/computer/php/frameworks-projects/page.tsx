'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '框架与项目实战', chapterNumber: 16, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '测试与调试', href: '/study/computer/php/testing-debugging' },
  nextChapter: { label: '高级特性与底层原理', href: '/study/computer/php/advanced-internals' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '主流框架',
    left: (<div className="space-y-4"><PageTitle>Laravel框架</PageTitle><BookCode language="php" code={`// 路由
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);

// Eloquent ORM
$users = User::where('active', true)->get();
$user = User::find(1);
$user->posts()->create(['title' => '新文章']);

// 中间件
Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>ThinkPHP框架</SectionTitle><BookCode language="php" code={`// 路由
Route::get('index/:id', 'index/read');

// 控制器
class Index {
    public function read($id) {
        return User::find($id);
    }
}

// 模型
class User extends Model {
    public function posts() {
        return $this->hasMany(Post::class);
    }
}`} /><TagGrid items={['Laravel', 'Symfony', 'ThinkPHP', 'Eloquent', 'ORM']} /></div>),
  },
  {
    label: '项目实战',
    left: (<div className="space-y-4"><PageTitle>项目实战</PageTitle><BookParagraph><b>博客系统：</b>Post模型+Controller+Comment关联</BookParagraph><BookCode language="php" code={`// 文章与评论
class Post extends Model {
    public function comments() {
        return $this->hasMany(Comment::class);
    }
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>最佳实践</SectionTitle><BookList items={['使用Repository模式分离数据层', '「Service」层处理业务逻辑', '「DTO」数据传输对象', '「遵循PSR规范」']} /><TagGrid items={['Repository', '「Service」', '「PSR」', '「DTO」', '「项目」']} /></div>),
  },
]

export default function PhpFrameworksProjectsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
