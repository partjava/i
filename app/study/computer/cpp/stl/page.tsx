'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: 'STL标准库',
  chapterNumber: 13,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '模板编程', href: '/study/computer/cpp/templates' },
  nextChapter: { label: '文件操作', href: '/study/computer/cpp/file-io' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 容器 =====
  {
    label: '容器',
    left: (
      <div className="space-y-4">
        <PageTitle>顺序容器</PageTitle>
        <BookParagraph>包括 vector、list、deque 等顺序存储的容器。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <vector>
#include <list>
#include <deque>
using namespace std;

int main() {
    // vector示例
    vector<int> vec = {1, 2, 3, 4, 5};
    vec.push_back(6);                // 在末尾添加元素
    vec.pop_back();                  // 删除末尾元素
    cout << vec.front() << endl;     // 访问第一个元素
    cout << vec.back() << endl;      // 访问最后一个元素

    // list示例（双向链表）
    list<string> lst = {"C++", "Java", "Python"};
    lst.push_front("Rust");          // 在开头添加元素
    lst.push_back("Go");             // 在末尾添加元素

    // deque示例（双端队列）
    deque<double> dq;
    dq.push_front(1.1);             // 在开头添加元素
    dq.push_back(2.2);              // 在末尾添加元素

    // 使用迭代器遍历
    for(const auto& item : vec) {
        cout << item << " ";
    }
    cout << endl;

    // 使用迭代器修改元素
    for(auto it = lst.begin(); it != lst.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关联容器</PageTitle>
        <BookParagraph>包括 set、map、multiset、multimap 等基于键值对的容器。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <map>
#include <set>
using namespace std;

int main() {
    // map示例（键值对容器）
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 89;
    scores["Charlie"] = 92;

    // 检查键是否存在
    if(scores.find("Alice") != scores.end()) {
        cout << "Alice's score: " << scores["Alice"] << endl;
    }

    // 遍历map
    for(const auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }

    // set示例（有序集合）
    set<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6, 5};  // 自动去重和排序
    numbers.insert(7);

    // 检查元素是否存在
    if(numbers.count(5) > 0) {
        cout << "5 exists in the set" << endl;
    }

    // multimap示例（允许重复键）
    multimap<string, string> dictionary;
    dictionary.insert({"apple", "一种水果"});
    dictionary.insert({"apple", "一个科技公司"});

    // 查找所有相同键的值
    auto range = dictionary.equal_range("apple");
    for(auto it = range.first; it != range.second; ++it) {
        cout << it->first << ": " << it->second << endl;
    }
}`} />
        <BookAlert type="info" message="顺序容器适合按位置访问和修改元素，关联容器适合需要快速查找的场景。所有容器都支持迭代器操作" />
      </div>
    ),
  },

  // ===== 跨页 2: 算法 =====
  {
    label: '算法',
    left: (
      <div className="space-y-4">
        <PageTitle>常用算法</PageTitle>
        <BookParagraph>STL提供了大量的通用算法，可以在不同的容器上使用。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <algorithm>
#include <vector>
#include <numeric>  // 用于数值算法
using namespace std;

int main() {
    vector<int> nums = {4, 1, 8, 5, 2, 9, 3, 7, 6};

    // 排序算法
    sort(nums.begin(), nums.end());  // 升序排序

    // 查找算法
    auto it = find(nums.begin(), nums.end(), 5);
    if(it != nums.end()) {
        cout << "Found 5 at position: " << (it - nums.begin()) << endl;
    }

    // 二分查找（要求已排序）
    bool exists = binary_search(nums.begin(), nums.end(), 7);

    // 最大最小值
    auto [min_it, max_it] = minmax_element(nums.begin(), nums.end());
    cout << "Min: " << *min_it << ", Max: " << *max_it << endl;

    // 数值算法
    int sum = accumulate(nums.begin(), nums.end(), 0);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>算法与 Lambda</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`    // 修改序列算法
    vector<int> squared;
    transform(nums.begin(), nums.end(), back_inserter(squared),
        [](int x) { return x * x; });

    // 删除算法
    vector<int> even_nums = nums;
    auto new_end = remove_if(even_nums.begin(), even_nums.end(),
        [](int x) { return x % 2 != 0; });
    even_nums.erase(new_end, even_nums.end());

    // 排列算法
    vector<int> perm = {1, 2, 3};
    do {
        for(int x : perm) cout << x << " ";
        cout << endl;
    } while(next_permutation(perm.begin(), perm.end()));
}`} />
        <BookAlert type="info" message="大多数算法都支持自定义比较函数，通过迭代器实现可用于不同容器。结合 lambda 表达式使用更加灵活" />
      </div>
    ),
  },

  // ===== 跨页 3: 迭代器 =====
  {
    label: '迭代器',
    left: (
      <div className="space-y-4">
        <PageTitle>迭代器类型和使用</PageTitle>
        <BookParagraph>迭代器是容器和算法之间的桥梁，提供了统一的访问接口。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <vector>
#include <list>
#include <iterator>
using namespace std;

int main() {
    // 基本迭代器使用
    vector<int> vec = {1, 2, 3, 4, 5};

    // 正向迭代器
    for(vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;

    // 反向迭代器
    for(vector<int>::reverse_iterator rit = vec.rbegin();
        rit != vec.rend(); ++rit) {
        cout << *rit << " ";
    }
    cout << endl;

    // 常量迭代器（只读）
    for(vector<int>::const_iterator cit = vec.cbegin();
        cit != vec.cend(); ++cit) {
        cout << *cit << " ";
    }
    cout << endl;

    // 使用auto简化迭代器声明
    for(auto it = vec.begin(); it != vec.end(); ++it) {
        *it *= 2;  // 修改元素
    }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>流迭代器与插入迭代器</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`    // 流迭代器
    cout << "Enter numbers (Ctrl+D to end):" << endl;
    istream_iterator<int> input_iter(cin);
    istream_iterator<int> eof;

    vector<int> numbers(input_iter, eof);

    // 输出流迭代器
    ostream_iterator<int> output_iter(cout, " ");
    copy(numbers.begin(), numbers.end(), output_iter);
    cout << endl;

    // 插入迭代器
    list<int> lst;
    back_insert_iterator<list<int>> back_it(lst);
    *back_it = 1;  // 在末尾插入
    *back_it = 2;

    front_insert_iterator<list<int>> front_it(lst);
    *front_it = 0;  // 在开头插入
}`} />
        <h3 className="text-sm font-medium text-ink mt-3 mb-1.5">迭代器分类</h3>
        <BookList items={[
          '输入迭代器：只读，单遍扫描',
          '输出迭代器：只写，单遍扫描',
          '前向迭代器：可读写，多遍扫描，只能向前',
          '双向迭代器：可读写，可向前向后',
          '随机访问迭代器：可读写，可随机访问',
        ]} />
      </div>
    ),
  },
]

export default function STLPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
