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
  chapterTitle: '动态规划',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '递归与分治', href: '/study/computer/ds/recursion' },
  nextChapter: { label: '面试题与实战', href: '/study/computer/ds/interview' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本原理',
    left: (
      <div className="space-y-4">
        <PageTitle>动态规划基本原理</PageTitle>
        <BookParagraph>动态规划（DP）解决具有最优子结构和重叠子问题的问题，核心步骤：</BookParagraph>
        <BookList items={[
          '定义状态：确定DP数组/表的含义（如dp[i]表示问题规模为i的解）',
          '状态转移方程：找出状态之间的递推关系（如dp[i] = f(dp[i-1], dp[i-2], ...)）',
          '初始化：设置边界条件（如dp[0], dp[1]的初值）',
          '计算顺序：通常从小到大，确保计算当前状态时所依赖的状态已计算完毕',
        ]} />
        <BookCode language="cpp" code={`// 斐波那契数列的DP实现
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
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int c = a + b; a = b; b = c;
    }
    return b;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>经典DP模型</SectionTitle>
        <SectionTitle>线性DP — 最长递增子序列（LIS）</SectionTitle>
        <BookCode language="cpp" code={`// 最长递增子序列 (LIS)
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    vector<int> dp(n, 1);
    for (int i = 1; i < n; ++i)
        for (int j = 0; j < i; ++j)
            if (nums[i] > nums[j])
                dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin(), dp.end());
}`} />
        <SectionTitle>区间DP — 戳气球问题</SectionTitle>
        <BookCode language="cpp" code={`// 戳气球问题
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    for (int len = 1; len <= n; ++len)
        for (int i = 1; i <= n - len + 1; ++i) {
            int j = i + len - 1;
            for (int k = i; k <= j; ++k)
                dp[i][j] = max(dp[i][j],
                    dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j]);
        }
    return dp[1][n];
}`} />
        <TagGrid items={['DP', '状态定义', '转移方程', '初始化', 'LIS']} />
      </div>
    ),
  },
  {
    label: '背包DP与例题',
    left: (
      <div className="space-y-4">
        <PageTitle>背包DP</PageTitle>
        <SectionTitle>0-1背包问题</SectionTitle>
        <BookCode language="cpp" code={`// 0-1背包问题
int knapsack01(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 0; j <= capacity; ++j) {
            dp[i][j] = dp[i-1][j];
            if (j >= weights[i-1])
                dp[i][j] = max(dp[i][j], dp[i-1][j-weights[i-1]] + values[i-1]);
        }
    return dp[n][capacity];
}
// 空间优化版本
int knapsack01Optimized(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<int> dp(capacity + 1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = capacity; j >= weights[i]; --j)
            dp[j] = max(dp[j], dp[j-weights[i]] + values[i]);
    return dp[capacity];
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>经典例题详解</SectionTitle>
        <SectionTitle>1. 最长公共子序列（LCS）</SectionTitle>
        <BookCode language="cpp" code={`// 最长公共子序列 (LCS)
int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i-1] == text2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`} />
        <SectionTitle>2. 编辑距离</SectionTitle>
        <BookCode language="cpp" code={`// 编辑距离
int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; ++i) dp[i][0] = i;
    for (int j = 0; j <= n; ++j) dp[0][j] = j;
    for (int i = 1; i <= m; ++i)
        for (int j = 1; j <= n; ++j)
            if (word1[i-1] == word2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = min({dp[i-1][j-1] + 1, dp[i-1][j] + 1, dp[i][j-1] + 1});
    return dp[m][n];
}`} />
        <SectionTitle>3. 完全背包问题</SectionTitle>
        <BookCode language="cpp" code={`// 完全背包问题（物品可重复选择）
int unboundedKnapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<int> dp(capacity + 1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = weights[i]; j <= capacity; ++j)
            dp[j] = max(dp[j], dp[j-weights[i]] + values[i]);
    return dp[capacity];
}`} />
        <TagGrid items={['0-1背包', 'LCS', '编辑距离', '完全背包', '空间优化']} />
      </div>
    ),
  },
  {
    label: '练习题与参考答案',
    left: (
      <div className="space-y-4">
        <PageTitle>练习题与参考答案</PageTitle>
        <SectionTitle>练习题1：打家劫舍</SectionTitle>
        <BookParagraph>实现打家劫舍问题（不能偷相邻房屋）。</BookParagraph>
        <BookCode language="cpp" code={`// 打家劫舍
#include <iostream>
#include <vector>
using namespace std;
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    for (int i = 2; i < n; ++i)
        dp[i] = max(dp[i-1], dp[i-2] + nums[i]);
    return dp[n-1];
}
int main() {
    vector<int> nums = {2,7,9,3,1};
    cout << rob(nums) << endl; // 输出12
    return 0;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习题2：硬币找零</SectionTitle>
        <BookParagraph>实现硬币找零问题（使用最少的硬币数量）。</BookParagraph>
        <BookCode language="cpp" code={`// 硬币找零
#include <iostream>
#include <vector>
#include <climits>
using namespace std;
int coinChange(vector<int>& coins, int amount) {
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
}`} />
        <BookAlert type="info" message="DP问题难点在于找状态和转移方程，建议多画状态转移表，理解依赖关系。" />
        <TagGrid items={['打家劫舍', '硬币找零', 'DP练习', '状态转移', '边界']} />
      </div>
    ),
  },
]

export default function DsDpPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
