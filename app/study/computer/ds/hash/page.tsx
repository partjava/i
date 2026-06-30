'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '数据结构与算法',
  chapterTitle: '哈希表与集合',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '排序与查找', href: '/study/computer/ds/sort' },
  nextChapter: { label: '递归与分治', href: '/study/computer/ds/recursion' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '哈希表原理',
    left: (
      <div className="space-y-4">
        <PageTitle>哈希表原理与实现</PageTitle>
        <BookParagraph>哈希表通过哈希函数将关键码映射到数组下标，常用冲突解决有拉链法和开放寻址法：</BookParagraph>
        <BookCode language="cpp" code={`// 拉链法哈希表
const int N = 10007;
vector<pair<int,int>> hashTable[N];
void insert(int key, int val) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) { p.second = val; return; }
    hashTable[h].push_back({key, val});
}
int find(int key) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) return p.second;
    return -1;
}`} />
        <BookCode language="cpp" code={`// 开放寻址法哈希表
const int N = 10007;
int keyArr[N], valArr[N];
bool used[N];
void insert(int key, int val) {
    int h = key % N;
    while (used[h] && keyArr[h] != key) h = (h + 1) % N;
    keyArr[h] = key; valArr[h] = val; used[h] = true;
}
int find(int key) {
    int h = key % N;
    while (used[h]) {
        if (keyArr[h] == key) return valArr[h];
        h = (h + 1) % N;
    }
    return -1;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>STL哈希容器用法</SectionTitle>
        <BookParagraph>C++ STL提供了高效的哈希容器：</BookParagraph>
        <BookCode language="cpp" code={`#include <unordered_map>
#include <unordered_set>
unordered_map<int, string> mp;
mp[1] = "one";
mp.count(2); // 判断key是否存在
unordered_set<int> st;
st.insert(3);
st.count(3); // 判断元素是否存在`} />
        <TagGrid items={['拉链法', '开放寻址', 'unordered_map', 'unordered_set', '哈希']} />
      </div>
    ),
  },
  {
    label: '应用与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>典型应用与例题</PageTitle>
        <SectionTitle>1. 两数之和</SectionTitle>
        <BookCode language="cpp" code={`// 两数之和
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); ++i) {
        int t = target - nums[i];
        if (mp.count(t)) return {mp[t], i};
        mp[nums[i]] = i;
    }
    return {};
}`} />
        <SectionTitle>2. 最长无重复子串</SectionTitle>
        <BookCode language="cpp" code={`// 最长无重复子串
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> mp;
    int res = 0, l = 0;
    for (int r = 0; r < s.size(); ++r) {
        if (mp.count(s[r])) l = max(l, mp[s[r]] + 1);
        mp[s[r]] = r;
        res = max(res, r - l + 1);
    }
    return res;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习题与参考答案</SectionTitle>
        <BookParagraph><b>练习题1：</b>实现哈希表查找与插入操作。</BookParagraph>
        <BookCode language="cpp" code={`// 哈希表查找与插入
#include <iostream>
#include <vector>
using namespace std;
const int N = 10007;
vector<pair<int,int>> hashTable[N];
void insert(int key, int val) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) { p.second = val; return; }
    hashTable[h].push_back({key, val});
}
int find(int key) {
    int h = key % N;
    for (auto& p : hashTable[h]) if (p.first == key) return p.second;
    return -1;
}
int main() {
    insert(1, 10); insert(2, 20);
    cout << find(1) << ' ' << find(2) << ' ' << find(3) << endl;
    return 0;
}`} />
        <BookParagraph><b>练习题2：</b>用unordered_map统计数组中每个元素出现次数。</BookParagraph>
        <BookCode language="cpp" code={`// 统计出现次数
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;
int main() {
    vector<int> a = {1,2,2,3,1,4};
    unordered_map<int,int> mp;
    for(int x:a) mp[x]++;
    for(auto& p:mp) cout<<p.first<<":"<<p.second<<endl;
    return 0;
}`} />
        <BookAlert type="info" message="建议多练习哈希表的手写实现与高频应用题，理解哈希冲突处理方式。" />
        <TagGrid items={['两数之和', '无重复子串', '哈希练习', 'STL', '冲突']} />
      </div>
    ),
  },
]

export default function DsHashPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
