'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsTreePage() {
  const tabItems = [
    {
      key: '1',
      label: '🌳 基本概念与存储结构',
      children: (
        <Card title="树与二叉树的基本概念与存储结构" className="mb-6">
          <Paragraph>树是重要的非线性结构，二叉树是每个节点最多有两个子节点的树。常用术语有根、叶子、深度、高度、度等。二叉树常用链式存储：</Paragraph>
          <CodeBlock language="cpp">{`// 二叉树节点定义
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};`}</CodeBlock>
          <Paragraph>顺序存储常用于完全二叉树（如堆），用数组下标表示父子关系。</Paragraph>
          <CodeBlock language="cpp">{`// 顺序存储（完全二叉树/堆）
vector<int> tree; // tree[0]为根，左子2*i+1，右子2*i+2`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🔁 遍历算法（递归与非递归）',
      children: (
        <Card title="二叉树遍历算法" className="mb-6">
          <Paragraph>常见遍历：先序（根左右）、中序（左根右）、后序（左右根）、层序（BFS）。</Paragraph>
          <CodeBlock language="cpp">{`// 递归遍历
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
}`}</CodeBlock>
          <Paragraph>非递归遍历（用栈/队列实现，含详细注释）：</Paragraph>
          <CodeBlock language="cpp">{`// 先序遍历（非递归，根-左-右）
void preorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    if (root) st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        cout << node->val << ' ';
        // 先右后左入栈，保证左子树先访问
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
}
// 中序遍历（非递归，左-根-右）
void inorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root;
    while (cur || !st.empty()) {
        // 一直向左走到底
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        // 访问栈顶节点
        cur = st.top(); st.pop();
        cout << cur->val << ' ';
        // 转向右子树
        cur = cur->right;
    }
}
// 后序遍历（非递归，左-右-根）
void postorderIter(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root, *last = nullptr;
    while (cur || !st.empty()) {
        // 先一路向左
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        // 查看栈顶
        cur = st.top();
        // 如果右子树存在且未访问，转向右子树
        if (cur->right && last != cur->right) {
            cur = cur->right;
        } else {
            // 右子树不存在或已访问，访问当前节点
            cout << cur->val << ' ';
            last = cur;
            st.pop();
            cur = nullptr; // 防止重复入栈
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
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🛠️ 典型操作与算法',
      children: (
        <Card title="二叉树常用操作与算法" className="mb-6">
          <Paragraph>常用操作：求深度、节点计数、叶子计数、镜像、判对称、路径和等。</Paragraph>
          <CodeBlock language="cpp">{`// 求最大深度
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
}
// 镜像二叉树
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
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '4',
      label: '🌟 经典例题与完整解答',
      children: (
        <Card title="经典例题与完整解答" className="mb-6">
          <Paragraph>1. 二叉树的最大深度</Paragraph>
          <CodeBlock language="cpp">{`// LeetCode 104. 二叉树的最大深度
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
// 构造简单二叉树并测试
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    cout << maxDepth(root) << endl; // 输出3
    return 0;
}`}</CodeBlock>
          <Paragraph>2. 路径总和</Paragraph>
          <CodeBlock language="cpp">{`// LeetCode 112. 路径总和
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
}
// 构造简单二叉树并测试
int main() {
    TreeNode* root = new TreeNode(5);
    root->left = new TreeNode(4);
    root->right = new TreeNode(8);
    root->left->left = new TreeNode(11);
    cout << hasPathSum(root, 20) << endl; // 输出1（true）
    return 0;
}`}</CodeBlock>
          <Paragraph>3. 最近公共祖先</Paragraph>
          <CodeBlock language="cpp">{`// LeetCode 236. 最近公共祖先
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
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              实现二叉树的先序遍历（递归和非递归），并输出结果。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 递归与非递归先序遍历
#include <iostream>
#include <stack>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << ' ';
    preorder(root->left);
    preorder(root->right);
}
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
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    preorder(root); cout << endl;
    preorderIter(root); cout << endl;
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现二叉树的镜像操作，并输出镜像后的先序遍历。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 镜像二叉树并先序遍历
#include <iostream>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
TreeNode* mirror(TreeNode* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    mirror(root->left);
    mirror(root->right);
    return root;
}
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << ' ';
    preorder(root->left);
    preorder(root->right);
}
int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    mirror(root);
    preorder(root); // 输出1 3 2
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="建议在IDE中手动输入、调试、理解每个操作的递归与非递归实现。" type="info" showIcon />
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">树与二叉树</h1>
              <p className="text-gray-600 mt-2">掌握树与二叉树的基本原理、遍历、常用算法与高频题型</p>
            </div>
            <Progress type="circle" percent={40} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/string"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：字符串与算法
          </Link>
          <Link
            href="/study/ds/graph"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：图与图算法
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 