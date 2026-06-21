'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookAlert,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: 'C++常用头文件',
  chapterNumber: 20,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '项目实战', href: '/study/computer/cpp/projects' },
  theme: THEMES.computer,
}

function Table({ headers, data }: { headers: string[]; data: string[][] }) {
  return (
    <div className="overflow-hidden rounded-md border border-paper-300 text-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-ink text-paper-100/90 text-xs">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-300 text-xs text-ink-light">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-paper-200/50">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-code text-amber-dark' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SPREADS = [
  {
    label: '输入输出',
    left: (
      <div className="space-y-4">
        <PageTitle>标准输入输出库</PageTitle>
        <BookParagraph>C++ 标准库提供了一套完整的输入输出机制。</BookParagraph>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<iostream>', '输入输出流', 'cin, cout, cerr, clog, istream, ostream'],
            ['<fstream>', '文件输入输出', 'ifstream, ofstream, fstream'],
            ['<sstream>', '字符串流', 'istringstream, ostringstream, stringstream'],
            ['<iomanip>', '格式化IO', 'setw, setprecision, setfill, fixed'],
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据结构与容器</PageTitle>
        <BookParagraph>STL 提供了丰富的数据结构头文件。</BookParagraph>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<vector>', '动态数组', 'vector, push_back, size, begin, end'],
            ['<list>', '双向链表', 'list, push_back, push_front, insert'],
            ['<deque>', '双端队列', 'deque, push_back, push_front, pop'],
            ['<queue>', '队列', 'queue, priority_queue, push, pop'],
            ['<stack>', '栈', 'stack, push, pop, top'],
            ['<map>', '键值对容器', 'map, multimap, insert, find, erase'],
            ['<set>', '集合', 'set, multiset, insert, find, erase'],
            ['<unordered_map>', '哈希表', 'unordered_map, unordered_set'],
          ]}
        />
      </div>
    ),
  },
  {
    label: '算法与工具',
    left: (
      <div className="space-y-4">
        <PageTitle>算法与数值库</PageTitle>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<algorithm>', '通用算法', 'sort, find, binary_search, transform'],
            ['<numeric>', '数值算法', 'accumulate, iota, inner_product'],
            ['<cmath>', '数学函数', 'sin, cos, sqrt, pow, exp, log, abs'],
            ['<cstdlib>', '标准库函数', 'rand, srand, atoi, atof, malloc'],
            ['<ctime>', '时间与日期', 'time, clock, localtime, strftime'],
            ['<random>', '随机数生成', 'mt19937, uniform_int_distribution'],
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>并发与工具</PageTitle>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<thread>', '线程管理', 'thread, this_thread, get_id, sleep_for'],
            ['<mutex>', '互斥锁', 'mutex, lock_guard, unique_lock'],
            ['<atomic>', '原子操作', 'atomic, atomic_int, fetch_add'],
            ['<condition_variable>', '条件变量', 'condition_variable, wait, notify'],
            ['<future>', '异步操作', 'future, promise, async, packaged_task'],
            ['<chrono>', '时间工具', 'system_clock, duration, time_point'],
            ['<regex>', '正则表达式', 'regex, smatch, regex_match, regex_search'],
          ]}
        />
      </div>
    ),
  },
  {
    label: '内存与类型',
    left: (
      <div className="space-y-4">
        <PageTitle>内存与智能指针</PageTitle>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<memory>', '智能指针', 'unique_ptr, shared_ptr, weak_ptr, make_shared'],
            ['<new>', '动态内存管理', 'new, delete, nothrow, bad_alloc'],
            ['<typeinfo>', '运行时类型信息', 'typeid, type_info, bad_cast'],
            ['<type_traits>', '类型特征', 'is_integral, is_same, enable_if, remove_reference'],
            ['<utility>', '通用工具', 'pair, move, forward, swap, exchange'],
            ['<tuple>', '元组', 'tuple, make_tuple, get, tie, tuple_size'],
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>字符串与异常</PageTitle>
        <Table
          headers={['头文件', '主要用途', '常用功能/类']}
          data={[
            ['<string>', '字符串类', 'string, wstring, to_string, stoi, stod'],
            ['<cstring>', 'C风格字符串', 'strlen, strcpy, strcmp, strcat'],
            ['<exception>', '异常处理', 'exception, runtime_error, logic_error'],
            ['<stdexcept>', '标准异常类', 'out_of_range, invalid_argument, bad_alloc'],
            ['<functional>', '函数对象', 'function, bind, less, greater, hash'],
            ['<iterator>', '迭代器', 'begin, end, back_inserter, ostream_iterator'],
          ]}
        />
        <BookAlert type="info" message="本速查表涵盖了 C++ 最常用的标准库头文件，建议收藏供日常编码查阅" />
        <TagGrid items={['STL', '头文件', '标准库', '容器', '算法', '并发']} />
      </div>
    ),
  },
]

export default function HeadersPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
