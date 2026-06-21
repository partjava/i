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
  chapterTitle: '树与二叉树',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '字符串与算法', href: '/study/computer/ds/string' },
  nextChapter: { label: '图与图算法', href: '/study/computer/ds/graph' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本概念与存储',
    left: (
      <div className="space-y-4">
        <PageTitle>树与二叉树的基本概念与存储结构</PageTitle>
        <BookParagraph>树是重要的非线性结构，二叉树是每个节点最多有两个子节点的树。常用术语有根、叶子、深度、高度、度等。二叉树常用链式存储：</BookParagraph>
        <BookCode language="cpp" code={`// 二叉树节点定义
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};`} />
        <BookParagraph>顺序存储常用于完全二叉树（如堆），用数组下标表示父子关系。</BookParagraph>
        <BookCode language="cpp" code={`// 顺序存储（完全二叉树/堆）
vector<int> tree; // tree[0]为根，左子2*i+1，右子2*i+2`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>遍历算法（递归与非递归）</SectionTitle>
        <BookParagraph>常见遍历：先序（根左右）、中序（左根右）、后序（左右根）、层序（BFS）。</BookParagraph>
        <BookCode language="cpp" code={`// 递归遍历
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << ' ';
    preorder(root->left);
    preorder(root->right);
}
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << ' ';
    inorder(root->right);
}
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << ' ';
}`} />
        <TagGrid items={['二叉树', '链式存储', '顺序存储', '递归', '遍历']} />
      </div>
    ),
  },
  {
    label: '非递归遍历',
    left: (
      <div className="space-y-4">
        <PageTitle>非递归遍历</PageTitle>
        <BookParagraph>非递归遍历（用栈/队列实现，含详细注释）：</BookParagraph>
        <BookCode language="cpp" code={`// 先序遍历（非递归，根-左-右）
void preorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    if (root) st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        cout << node->val << ' ';
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
}
// 中序遍历（非递归，左-根-右）
void inorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }
        cur = st.top(); st.pop();
        cout << cur->val << ' ';
        cur = cur->right;
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="cpp" code={`// 后序遍历（非递归，左-右-根）
void postorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root, *last = nullptr;
    while (cur || !st.empty()) {
        while (cur) { st.push(cur); cur = cur->left; }
        cur = st.top();
        if (cur->right && last != cur->right) {
            cur = cur->right;
        } else {
            cout << cur->val << ' ';
            last = cur; st.pop(); cur = nullptr;
        }
    }
}
// 层序遍历（BFS）
void levelOrder(TreeNode* root) {
    queue<TreeNode*> q;
    if (root) q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        cout << node->val << ' ';
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}`} />
        <TagGrid items={['非递归', '栈', '队列', 'BFS', 'DFS']} />
      </div>
    ),
  },
  {
    label: '典型操作与算法',
    left: (
      <div className="space-y-4">
        <PageTitle>二叉树常用操作与算法</PageTitle>
        <BookParagraph>常用操作：求深度、节点计数、叶子计数、镜像、判对称、路径和等。</BookParagraph>
        <BookCode language="cpp" code={`// 求最大深度
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
// 统计节点数
int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}
// 统计叶子节点
int countLeaves(TreeNode* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="cpp" code={`// 镜像二叉树
TreeNode* mirror(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    mirror(root->left);
    mirror(root->right);
    return root;
}
// 判对称
bool isSymmetric(TreeNode* root) {
    function<bool(TreeNode*,TreeNode*)> dfs = [&](TreeNode* l, TreeNode* r) {
        if (!l && !r) return true;
        if (!l || !r || l->val != r->val) return false;
        return dfs(l->left, r->right) && dfs(l->right, r->left);
    };
    return !root || dfs(root->left, root->right);
}`} />
        <TagGrid items={['深度', '镜像', '对称', '递归', '节点统计']} />
      </div>
    ),
  },
  {
    label: '经典例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>经典例题与完整解答</PageTitle>
        <SectionTitle>1. 二叉树的最大深度</SectionTitle>
        <BookCode language="cpp" code={`// LeetCode 104. 二叉树的最大深度
#include <iostream>
#include <algorithm>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    cout << maxDepth(root) << endl; // 输出3
    return 0;
}`} />
        <SectionTitle>2. 路径总和</SectionTitle>
        <BookCode language="cpp" code={`// LeetCode 112. 路径总和
#include <iostream>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
bool hasPathSum(TreeNode* root, int sum) {
    if (!root) return false;
    if (!root->left && !root->right) return root->val == sum;
    return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 最近公共祖先</SectionTitle>
        <BookCode language="cpp" code={`// LeetCode 236. 最近公共祖先
#include <iostream>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* l = lowestCommonAncestor(root->left, p, q);
    TreeNode* r = lowestCommonAncestor(root->right, p, q);
    if (l && r) return root;
    return l ? l : r;
}`} />
        <SectionTitle>练习题</SectionTitle>
        <BookParagraph>1. 实现二叉树的先序遍历（递归和非递归），并输出结果。</BookParagraph>
        <BookParagraph>2. 实现二叉树的镜像操作，并输出镜像后的先序遍历。</BookParagraph>
        <BookAlert type="info" message="建议在IDE中手动输入、调试、理解每个操作的递归与非递归实现。" />
        <TagGrid items={['LCA', '路径总和', '最大深度', '镜像', '遍历']} />
      </div>
    ),
  },
]

export default function DsTreePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
