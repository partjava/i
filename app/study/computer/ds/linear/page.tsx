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
  chapterTitle: '线性表',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '基础与复杂度分析', href: '/study/computer/ds/basic' },
  nextChapter: { label: '字符串与算法', href: '/study/computer/ds/string' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '线性表抽象与数组',
    left: (
      <div className="space-y-4">
        <PageTitle>线性表抽象与存储</PageTitle>
        <BookParagraph>线性表是一种元素线性排列的数据结构，分为顺序存储（数组）和链式存储（链表）。</BookParagraph>
        <BookList items={[
          'ADT定义：支持插入、删除、查找、遍历、逆置等操作',
          '顺序存储：内存连续，支持O(1)随机访问',
          '链式存储：节点分散，插入/删除高效，不支持随机访问',
        ]} />
        <BookAlert type="info" message="线性表是数组、链表、栈、队列等结构的基础，选择存储方式需结合实际应用场景。" />
        <SectionTitle>数组与顺序表</SectionTitle>
        <BookParagraph>数组是最常用的顺序存储结构，C++ STL的vector底层即为动态数组。下面是一个支持插入、删除、查找、扩容的顺序表完整实现：</BookParagraph>
        <BookCode language="cpp" code={`// 顺序表类（支持插入、删除、查找、扩容）
class SeqList {
    int* data; int cap, len;
public:
    SeqList(int c=8):cap(c),len(0){data=new int[cap];}
    ~SeqList(){delete[] data;}
    void push_back(int x){
        if(len==cap){ // 扩容
            int* nd=new int[cap*2];
            for(int i=0;i<len;++i)nd[i]=data[i];
            delete[] data; data=nd; cap*=2;
        }
        data[len++]=x;
    }
    void insert(int pos, int x){
        if(pos<0||pos>len) return;
        if(len==cap){int* nd=new int[cap*2];for(int i=0;i<len;++i)nd[i]=data[i];delete[] data;data=nd;cap*=2;}
        for(int i=len;i>pos;--i)data[i]=data[i-1];
        data[pos]=x; ++len;
    }
    void erase(int pos){
        if(pos<0||pos>=len) return;
        for(int i=pos;i<len-1;++i)data[i]=data[i+1];
        --len;
    }
    int find(int x){
        for(int i=0;i<len;++i)if(data[i]==x)return i;
        return -1;
    }
    int& operator[](int i){return data[i];}
    int size(){return len;}
};
// 使用
SeqList sl; sl.push_back(1); sl.insert(1,2); sl.erase(0); int idx=sl.find(2);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>典型例题：二分查找</PageTitle>
        <BookCode language="cpp" code={`// 二分查找（有序数组）
int binarySearch(vector<int>& arr, int target) {
    int l=0, r=arr.size()-1;
    while(l<=r){
        int m=l+(r-l)/2;
        if(arr[m]==target) return m;
        else if(arr[m]<target) l=m+1;
        else r=m-1;
    }
    return -1;
}`} />
        <TagGrid items={['线性表', '顺序存储', '链式存储', 'ADT', '二分查找']} />
      </div>
    ),
  },
  {
    label: '链表结构与算法',
    left: (
      <div className="space-y-4">
        <PageTitle>链表结构与经典算法</PageTitle>
        <BookParagraph>链表分为单链表、双向链表、循环链表。下面是常用操作和经典算法的C++实现：</BookParagraph>
        <BookCode language="cpp" code={`// 单链表节点
struct ListNode {
    int val; ListNode* next;
    ListNode(int x):val(x),next(nullptr){}
};
// 头插法
ListNode* head=nullptr;
for(int x:{1,2,3}){auto* p=new ListNode(x);p->next=head;head=p;}
// 尾插法
ListNode* tail=head;
while(tail&&tail->next)tail=tail->next;
tail->next=new ListNode(4);
// 删除节点
void deleteNode(ListNode*& head, int val) {
    ListNode dummy(0); dummy.next=head; ListNode* p=&dummy;
    while(p->next){if(p->next->val==val){auto* t=p->next;p->next=t->next;delete t;break;}p=p->next;}
    head=dummy.next;
}
// 链表反转
ListNode* reverse(ListNode* h){
    ListNode* pre=nullptr;
    while(h){auto* nxt=h->next;h->next=pre;pre=h;h=nxt;}
    return pre;
}
// 判环（快慢指针）
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
// 找中点
ListNode* findMid(ListNode* head) {
    ListNode *slow=head, *fast=head;
    while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
    return slow;
}
// 合并两个有序链表
ListNode* merge(ListNode* l1, ListNode* l2) {
    ListNode dummy(0),*p=&dummy;
    while(l1&&l2){
        if(l1->val<l2->val){p->next=l1;l1=l1->next;}
        else{p->next=l2;l2=l2->next;}
        p=p->next;
    }
    p->next=l1?l1:l2;
    return dummy.next;
}
// K个一组反转链表
ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* cur=head; int cnt=0;
    while(cur&&++cnt<k)cur=cur->next;
    if(!cur) return head;
    ListNode* nxt=reverseKGroup(cur->next,k);
    cur->next=nullptr;
    ListNode* newHead=reverse(head);
    head->next=nxt;
    return newHead;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>双向链表与循环链表</PageTitle>
        <BookCode language="cpp" code={`// 双向链表节点
struct DListNode {
    int val; DListNode *prev, *next;
    DListNode(int x):val(x),prev(nullptr),next(nullptr){}
};
// 循环链表节点
struct CListNode {
    int val; CListNode* next;
    CListNode(int x):val(x),next(this){}
};`} />
        <SectionTitle>典型例题：两数相加（LeetCode 2）</SectionTitle>
        <BookCode language="cpp" code={`// 两数相加
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0),*p=&dummy; int carry=0;
    while(l1||l2||carry){
        int sum=(l1?l1->val:0)+(l2?l2->val:0)+carry;
        carry=sum/10;
        p->next=new ListNode(sum%10);
        p=p->next;
        if(l1)l1=l1->next;
        if(l2)l2=l2->next;
    }
    return dummy.next;
}`} />
        <TagGrid items={['单链表', '双向链表', '循环链表', '反转', '判环', '合并']} />
      </div>
    ),
  },
  {
    label: '栈与队列',
    left: (
      <div className="space-y-4">
        <PageTitle>栈与队列结构</PageTitle>
        <BookParagraph>栈和队列的多种实现与典型题型：</BookParagraph>
        <BookCode language="cpp" code={`// 顺序栈
class Stack {
    vector<int> v;
public:
    void push(int x){v.push_back(x);}
    void pop(){v.pop_back();}
    int top(){return v.back();}
    bool empty(){return v.empty();}
};
// 链式栈
struct Node{int val;Node* next;Node(int x):val(x),next(nullptr){}};
class LinkedStack{
    Node* head=nullptr;
public:
    void push(int x){auto* p=new Node(x);p->next=head;head=p;}
    void pop(){if(head){auto* t=head;head=head->next;delete t;}}
    int top(){return head->val;}
    bool empty(){return !head;}
};
// 顺序队列
class Queue{
    vector<int> v; int l=0,r=0;
public:
    Queue(int n):v(n){}
    void push(int x){v[r++]=x;}
    void pop(){l++;}
    int front(){return v[l];}
    bool empty(){return l==r;}
};
// 循环队列
class CircularQueue {
    vector<int> q; int l=0,r=0,cnt=0,cap;
public:
    CircularQueue(int k):q(k),cap(k){}
    bool enq(int x){if(cnt==cap)return false;q[r]=x;r=(r+1)%cap;cnt++;return true;}
    bool deq(){if(cnt==0)return false;l=(l+1)%cap;cnt--;return true;}
    int front(){return q[l];}
    bool empty(){return cnt==0;}
};`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>栈与队列进阶</PageTitle>
        <BookParagraph>栈和队列的进阶用法包括单调栈、最小栈、以及用队列实现栈等。</BookParagraph>
        <BookCode language="cpp" code={`// 单调栈（next greater element）
vector<int> nextGreater(vector<int>& nums) {
    vector<int> res(nums.size(),-1); stack<int> st;
    for(int i=0;i<nums.size();++i){
        while(!st.empty()&&nums[st.top()]<nums[i]){
            res[st.top()]=nums[i];st.pop();
        }
        st.push(i);
    }
    return res;
}
// 最小栈
class MinStack {
    stack<int> s, minS;
public:
    void push(int x){s.push(x);if(minS.empty()||x<=minS.top())minS.push(x);}
    void pop(){if(s.top()==minS.top())minS.pop();s.pop();}
    int top(){return s.top();}
    int getMin(){return minS.top();}
};
// 用队列实现栈
class MyStack {
    queue<int> q;
public:
    void push(int x){q.push(x);for(int i=1;i<q.size();++i){q.push(q.front());q.pop();}}
    void pop(){q.pop();}
    int top(){return q.front();}
    bool empty(){return q.empty();}
};
// 用栈实现队列
class MyQueue {
    stack<int> in, out;
public:
    void push(int x){in.push(x);}
    void pop(){if(out.empty())while(!in.empty()){out.push(in.top());in.pop();}out.pop();}
    int front(){if(out.empty())while(!in.empty()){out.push(in.top());in.pop();}return out.top();}
    bool empty(){return in.empty()&&out.empty();}
};
// 括号匹配
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            char t = st.top(); st.pop();
            if ((c == ')' && t != '(') || (c == ']' && t != '[') || (c == '}' && t != '{')) return false;
        }
    }
    return st.empty();
}`} />
        <TagGrid items={['栈', '队列', '循环队列', '单调栈', '最小栈', '括号匹配']} />
      </div>
    ),
  },
  {
    label: '综合应用与面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>综合应用与高频面试题</PageTitle>
        <BookParagraph>线性表结构在工程和面试中应用极广，常见高频题：</BookParagraph>
        <SectionTitle>LRU缓存机制（链表+哈希表）</SectionTitle>
        <BookCode language="cpp" code={`class LRUCache {
    int cap;
    list<pair<int,int>> lru;
    unordered_map<int,list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c):cap(c){}
    int get(int k){
        if(!mp.count(k))return -1;
        lru.splice(lru.begin(),lru,mp[k]);
        return mp[k]->second;
    }
    void put(int k,int v){
        if(mp.count(k))lru.erase(mp[k]);
        lru.push_front({k,v});mp[k]=lru.begin();
        if(lru.size()>cap){mp.erase(lru.back().first);lru.pop_back();}
    }
};`} />
        <SectionTitle>滑动窗口最大值（单调队列）</SectionTitle>
        <BookCode language="cpp" code={`vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < nums.size(); ++i) {
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>练习题与参考答案</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">1. 手写实现一个支持动态扩容的顺序表类（C++）。</p>
          <BookCode language="cpp" code={`class SeqList {
    int* data; int cap, len;
public:
    SeqList(int c=8):cap(c),len(0){data=new int[cap];}
    ~SeqList(){delete[] data;}
    void push_back(int x){
        if(len==cap){int* nd=new int[cap*2];for(int i=0;i<len;++i)nd[i]=data[i];delete[] data;data=nd;cap*=2;}
        data[len++]=x;
    }
    int& operator[](int i){return data[i];}
    int size(){return len;}
};`} />
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">2. 实现链表判环算法（C++，快慢指针）。</p>
          <BookCode language="cpp" code={`bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`} />
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">3. 实现最小栈（支持O(1)获取最小值，C++）。</p>
          <BookCode language="cpp" code={`class MinStack {
    stack<int> s, minS;
public:
    void push(int x){s.push(x);if(minS.empty()||x<=minS.top())minS.push(x);}
    void pop(){if(s.top()==minS.top())minS.pop();s.pop();}
    int top(){return s.top();}
    int getMin(){return minS.top();}
};`} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">4. LRU缓存机制的C++实现（提示：list+unordered_map）。</p>
          <BookCode language="cpp" code={`class LRUCache {
    int cap;
    list<pair<int,int>> lru;
    unordered_map<int,list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c):cap(c){}
    int get(int k){
        if(!mp.count(k))return -1;
        lru.splice(lru.begin(),lru,mp[k]);
        return mp[k]->second;
    }
    void put(int k,int v){
        if(mp.count(k))lru.erase(mp[k]);
        lru.push_front({k,v});mp[k]=lru.begin();
        if(lru.size()>cap){mp.erase(lru.back().first);lru.pop_back();}
    }
};`} />
        </div>
        <BookAlert type="info" message="多练习线性表结构的手写实现与高频题，提升算法功底。" />
        <TagGrid items={['LRU', '滑动窗口', '顺序表', '链表判环', '最小栈', '面试题']} />
      </div>
    ),
  },
]

export default function DsLinearPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
