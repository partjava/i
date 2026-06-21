'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '数据结构与算法',
  chapterTitle: '字符串与算法',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '线性表', href: '/study/computer/ds/linear' },
  nextChapter: { label: '树与二叉树', href: '/study/computer/ds/tree' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '字符串存储与操作',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串存储与常用操作</PageTitle>
        <BookParagraph>C++中字符串常用string类，支持灵活操作。常见函数如下：</BookParagraph>
        <BookCode language="cpp" code={`// 基本用法
string s = "hello";
s += " world"; // 拼接
cout << s.substr(0, 5) << endl; // 子串
reverse(s.begin(), s.end()); // 反转
// 手写字符串反转
void reverseStr(string& s) {
    int l = 0, r = s.size() - 1;
    while (l < r) swap(s[l++], s[r--]); // 双指针交换
}`} />
        <BookParagraph>常用操作：查找、替换、分割、去重、统计字符出现次数等。</BookParagraph>
        <BookCode language="cpp" code={`// 统计每个字符出现次数
vector<int> count(256, 0);
for (char c : s) count[c]++;
// 查找子串
int pos = s.find("ll"); // 找到返回下标，否则string::npos`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>字符串匹配算法</SectionTitle>
        <BookParagraph>字符串匹配常用暴力法和KMP算法：</BookParagraph>
        <BookCode language="cpp" code={`// 暴力匹配
int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    for (int i = 0; i <= n - m; ++i) {
        int j = 0;
        while (j < m && haystack[i + j] == needle[j]) ++j;
        if (j == m) return i;
    }
    return -1;
}
// KMP算法
vector<int> getNext(string& p) {
    int m = p.size();
    vector<int> next(m, -1);
    for (int i = 1, j = -1; i < m; ++i) {
        while (j != -1 && p[j + 1] != p[i]) j = next[j];
        if (p[j + 1] == p[i]) ++j;
        next[i] = j;
    }
    return next;
}
int kmp(string s, string p) {
    vector<int> next = getNext(p);
    int n = s.size(), m = p.size(), j = -1;
    for (int i = 0; i < n; ++i) {
        while (j != -1 && p[j + 1] != s[i]) j = next[j];
        if (p[j + 1] == s[i]) ++j;
        if (j == m - 1) return i - m + 1;
    }
    return -1;
}`} />
        <BookAlert type="info" message="KMP算法通过next数组避免重复匹配，大幅提升效率。" />
        <TagGrid items={['string', 'KMP', '子串', '查找', '统计']} />
      </div>
    ),
  },
  {
    label: '字符串哈希与例题',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串哈希</PageTitle>
        <BookParagraph>字符串哈希常用于快速判断子串是否相等、查找重复子串等：</BookParagraph>
        <BookCode language="cpp" code={`// 字符串哈希（Rabin-Karp）
typedef unsigned long long ULL;
const ULL P = 131;
vector<ULL> h, p;
void initHash(const string& s) {
    int n = s.size();
    h.assign(n + 1, 0); p.assign(n + 1, 1);
    for (int i = 1; i <= n; ++i) {
        h[i] = h[i - 1] * P + s[i - 1];
        p[i] = p[i - 1] * P;
    }
}
ULL getHash(int l, int r) {
    return h[r] - h[l] * p[r - l];
}`} />
        <BookParagraph>常见应用：判断两个子串是否相等、查找重复子串、字符串去重等。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>经典例题</SectionTitle>
        <SectionTitle>1. 最长回文子串（中心扩展法）</SectionTitle>
        <BookCode language="cpp" code={`string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    for (int i = 0; i < n; ++i) {
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            --l; ++r;
        }
        l = i, r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            --l; ++r;
        }
    }
    return s.substr(start, maxLen);
}`} />
        <SectionTitle>2. 字符串分割（动态规划）</SectionTitle>
        <BookCode language="cpp" code={`bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j < i; ++j)
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true; break;
            }
    return dp[n];
}`} />
        <SectionTitle>3. 异位词分组（哈希）</SectionTitle>
        <BookCode language="cpp" code={`vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (auto& s : strs) {
        string t = s;
        sort(t.begin(), t.end());
        mp[t].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& p : mp) res.push_back(p.second);
    return res;
}`} />
        <TagGrid items={['回文串', 'DP', '哈希', 'KMP', '中心扩展']} />
      </div>
    ),
  },
  {
    label: '练习题与参考答案',
    left: (
      <div className="space-y-4">
        <PageTitle>练习题与参考答案</PageTitle>
        <SectionTitle>1. 字符串去重</SectionTitle>
        <BookParagraph>实现一个高效的字符串去重函数（C++）。</BookParagraph>
        <BookCode language="cpp" code={`// 字符串去重
string removeDuplicate(string s) {
    unordered_set<char> seen;
    string res;
    for (char c : s) if (!seen.count(c)) { seen.insert(c); res += c; }
    return res;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 判断变位词</SectionTitle>
        <BookParagraph>判断两个字符串是否为变位词（C++）。</BookParagraph>
        <BookCode language="cpp" code={`// 判断变位词
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> cnt(256, 0);
    for (char c : s) cnt[c]++;
    for (char c : t) if (--cnt[c] < 0) return false;
    return true;
}`} />
        <BookAlert type="info" message="多练习字符串算法，掌握KMP、哈希、动态规划等高频技巧。" />
        <TagGrid items={['去重', '变位词', '练习题', '哈希', '字符串']} />
      </div>
    ),
  },
]

export default function DsStringPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
