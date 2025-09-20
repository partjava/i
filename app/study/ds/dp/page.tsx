'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsDpPage() {
  const tabItems = [
    {
      key: '1',
      label: '📝 动态规划基本原理',
      children: (
        <Card title="动态规划基本原理" className="mb-6">
          <Paragraph>动态规划（DP）解决具有最优子结构和重叠子问题的问题，核心步骤：</Paragraph>
          <ul className="list-disc pl-6 mb-4">
            <li><b>定义状态</b>：确定DP数组/表的含义（如dp[i]表示问题规模为i的解）</li>
            <li><b>状态转移方程</b>：找出状态之间的递推关系（如dp[i] = f(dp[i-1], dp[i-2], ...)）</li>
            <li><b>初始化</b>：设置边界条件（如dp[0], dp[1]的初值）</li>
            <li><b>计算顺序</b>：通常从小到大，确保计算当前状态时所依赖的状态已计算完毕</li>
          </ul>
          <CodeBlock language="cpp">{`// 斐波那契数列的DP实现
int fibDP(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1; // 初始化
    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2]; // 状态转移方程
    }
    return dp[n];
}

// 空间优化版本
int fibDP2(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1; // dp[0], dp[1]
    for (int i = 2; i <= n; ++i) {
        int c = a + b; // dp[i]
        a = b; b = c;  // 滚动更新
    }
    return b;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🧩 经典DP模型',
      children: (
        <Card title="经典DP模型" className="mb-6">
          <Paragraph><b>线性DP</b>：状态依赖关系是线性的，如最长递增子序列（LIS）</Paragraph>
          <CodeBlock language="cpp">{`// 最长递增子序列 (LIS)
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    // dp[i]表示以nums[i]结尾的最长递增子序列长度
    vector<int> dp(n, 1);
    for (int i = 1; i < n; ++i)
        for (int j = 0; j < i; ++j)
            if (nums[i] > nums[j])
                dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin(), dp.end());
}`}</CodeBlock>
          <Paragraph><b>区间DP</b>：状态定义在区间上，如戳气球问题</Paragraph>
          <CodeBlock language="cpp">{`// 戳气球问题
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    // dp[i][j]表示戳破(i,j)区间内所有气球获得的最大硬币数
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    for (int len = 1; len <= n; ++len)
        for (int i = 1; i <= n - len + 1; ++i) {
            int j = i + len - 1;
            for (int k = i; k <= j; ++k) // k是最后一个戳破的气球
                dp[i][j] = max(dp[i][j], dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j]);
        }
    return dp[1][n];
}`}</CodeBlock>
          <Paragraph><b>背包DP</b>：物品与容量的选择问题，如0-1背包</Paragraph>
          <CodeBlock language="cpp">{`// 0-1背包问题
int knapsack01(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    // dp[i][j]表示考虑前i个物品，容量为j时的最大价值
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j <= capacity; ++j) {
            dp[i][j] = dp[i-1][j]; // 不选第i个物品
            if (j >= weights[i-1]) // 能选第i个物品
                dp[i][j] = max(dp[i][j], dp[i-1][j-weights[i-1]] + values[i-1]);
        }
    return dp[n][capacity];
}

// 空间优化版本
int knapsack01Optimized(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<int> dp(capacity + 1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = capacity; j >= weights[i]; --j) // 倒序遍历避免重复选择
            dp[j] = max(dp[j], dp[j-weights[i]] + values[i]);
    return dp[capacity];
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🌟 经典例题详解',
      children: (
        <Card title="经典例题详解" className="mb-6">
          <Paragraph>1. 最长公共子序列（LCS）</Paragraph>
          <CodeBlock language="cpp">{`// 最长公共子序列 (LCS)
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    // dp[i][j]表示text1[0...i-1]和text2[0...j-1]的LCS长度
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i-1] == text2[j-1]) // 字符相同，LCS长度+1
                dp[i][j] = dp[i-1][j-1] + 1;
            else // 字符不同，取两种情况的较大值
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`}</CodeBlock>
          <Paragraph>2. 编辑距离</Paragraph>
          <CodeBlock language="cpp">{`// 编辑距离
int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    // dp[i][j]表示word1[0...i-1]变换到word2[0...j-1]的最小操作数
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; ++i) dp[i][0] = i; // 删除操作
    for (int j = 0; j <= n; ++j) dp[0][j] = j; // 插入操作
    
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (word1[i-1] == word2[j-1]) // 字符相同，无需操作
                dp[i][j] = dp[i-1][j-1];
            else // 取三种操作的最小值：替换、删除、插入
                dp[i][j] = min({dp[i-1][j-1] + 1, dp[i-1][j] + 1, dp[i][j-1] + 1});
        }
    }
    return dp[m][n];
}`}</CodeBlock>
          <Paragraph>3. 完全背包问题</Paragraph>
          <CodeBlock language="cpp">{`// 完全背包问题（物品可重复选择）
int unboundedKnapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<int> dp(capacity + 1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = weights[i]; j <= capacity; ++j) // 正序遍历允许重复选择
            dp[j] = max(dp[j], dp[j-weights[i]] + values[i]);
    return dp[capacity];
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '4',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              实现打家劫舍问题（不能偷相邻房屋）。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 打家劫舍
#include <iostream>
#include <vector>
using namespace std;

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    // dp[i]表示偷到第i个房屋时的最大金额
    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; ++i)
        dp[i] = max(dp[i-1], dp[i-2] + nums[i]); // 不偷或偷
    
    return dp[n-1];
}

int main() {
    vector<int> nums = {2,7,9,3,1};
    cout << rob(nums) << endl; // 输出12
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现硬币找零问题（使用最少的硬币数量）。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 硬币找零
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // dp[i]表示组成金额i所需的最少硬币数
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; ++i)
        for (int coin : coins)
            if (coin <= i)
                dp[i] = min(dp[i], dp[i - coin] + 1);
    
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    cout << coinChange(coins, amount) << endl; // 输出3 (5+5+1)
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="DP问题难点在于找状态和转移方程，建议多画状态转移表，理解依赖关系。" type="info" showIcon />
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
              <h1 className="text-3xl font-bold text-gray-900">动态规划</h1>
              <p className="text-gray-600 mt-2">掌握DP核心思想、常见模型及其高频应用</p>
            </div>
            <Progress type="circle" percent={90} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/recursion"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：递归与分治
          </Link>
          <Link
            href="/study/ds/interview"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：面试题与实战
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 