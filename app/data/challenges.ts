export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  languages: string[];
  timeLimit: number; // 秒
  memoryLimit: number; // MB
  testCases: TestCase[];
  hints: string[];
  solution?: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description?: string;
}

export interface ChallengeAttempt {
  id: string;
  challengeId: string;
  userId: string;
  code: string;
  language: string;
  status: 'pending' | 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error' | 'compile_error';
  score: number;
  executionTime: number;
  memoryUsed: number;
  submittedAt: string;
  feedback?: string;
}

export const challenges: Challenge[] = [
  {
    id: 'two-sum',
    title: '两数之和',
    description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

**示例 2：**
输入：nums = [3,2,4], target = 6
输出：[1,2]

**示例 3：**
输入：nums = [3,3], target = 6
输出：[0,1]`,
    difficulty: 'easy',
    category: '数组',
    tags: ['数组', '哈希表'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[2,7,11,15]\n9',
        expectedOutput: '[0,1]',
        isHidden: false,
        description: '基本测试用例'
      },
      {
        id: 'test2',
        input: '[3,2,4]\n6',
        expectedOutput: '[1,2]',
        isHidden: false,
        description: '顺序不同的情况'
      },
      {
        id: 'test3',
        input: '[3,3]\n6',
        expectedOutput: '[0,1]',
        isHidden: false,
        description: '相同数字的情况'
      },
      {
        id: 'test4',
        input: '[1,2,3,4,5]\n8',
        expectedOutput: '[2,4]',
        isHidden: true,
        description: '隐藏测试用例'
      }
    ],
    hints: [
      '可以使用哈希表来存储数组中的值和索引',
      '遍历数组时，检查target - nums[i]是否在哈希表中',
      '时间复杂度可以优化到O(n)'
    ],
    solution: `# Python 解法
def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    points: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'reverse-string',
    title: '反转字符串',
    description: `编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

**示例 1：**
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]

**示例 2：**
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]`,
    difficulty: 'easy',
    category: '字符串',
    tags: ['字符串', '双指针'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '["h","e","l","l","o"]',
        expectedOutput: '["o","l","l","e","h"]',
        isHidden: false,
        description: '基本测试用例'
      },
      {
        id: 'test2',
        input: '["H","a","n","n","a","h"]',
        expectedOutput: '["h","a","n","n","a","H"]',
        isHidden: false,
        description: '大小写混合'
      },
      {
        id: 'test3',
        input: '["a"]',
        expectedOutput: '["a"]',
        isHidden: true,
        description: '单个字符'
      }
    ],
    hints: [
      '使用双指针，一个指向开头，一个指向结尾',
      '交换两个指针指向的字符，然后移动指针',
      '当左指针小于右指针时继续循环'
    ],
    points: 8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'valid-parentheses',
    title: '有效的括号',
    description: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**
输入：s = "()"
输出：true

**示例 2：**
输入：s = "()[]{}"
输出：true

**示例 3：**
输入：s = "(]"
输出：false`,
    difficulty: 'easy',
    category: '栈',
    tags: ['栈', '字符串'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '()',
        expectedOutput: 'true',
        isHidden: false,
        description: '简单括号'
      },
      {
        id: 'test2',
        input: '()[]{}',
        expectedOutput: 'true',
        isHidden: false,
        description: '多种括号'
      },
      {
        id: 'test3',
        input: '(]',
        expectedOutput: 'false',
        isHidden: false,
        description: '不匹配的括号'
      },
      {
        id: 'test4',
        input: '((()))',
        expectedOutput: 'true',
        isHidden: true,
        description: '嵌套括号'
      }
    ],
    hints: [
      '使用栈数据结构来存储左括号',
      '遇到右括号时，检查栈顶是否是对应的左括号',
      '最后检查栈是否为空'
    ],
    points: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'fibonacci',
    title: '斐波那契数列',
    description: `斐波那契数列是一个经典的递归问题。

斐波那契数列的定义：
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) (n > 1)

给定一个整数 n，计算 F(n)。

**示例 1：**
输入：n = 2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1

**示例 2：**
输入：n = 3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2

**示例 3：**
输入：n = 4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3`,
    difficulty: 'easy',
    category: '递归',
    tags: ['递归', '动态规划', '数学'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '2',
        expectedOutput: '1',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '3',
        expectedOutput: '2',
        isHidden: false,
        description: '小数字测试'
      },
      {
        id: 'test3',
        input: '4',
        expectedOutput: '3',
        isHidden: false,
        description: '递归测试'
      },
      {
        id: 'test4',
        input: '10',
        expectedOutput: '55',
        isHidden: true,
        description: '较大数字测试'
      }
    ],
    hints: [
      '可以使用递归实现，但效率不高',
      '考虑使用动态规划或迭代方法',
      '空间复杂度可以优化到O(1)'
    ],
    points: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'merge-sorted-arrays',
    title: '合并两个有序数组',
    description: `给你两个按非递减顺序排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你合并 nums2 到 nums1 中，使合并后的数组同样按非递减顺序排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

**示例 1：**
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗的元素来自 nums1 。

**示例 2：**
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。`,
    difficulty: 'easy',
    category: '数组',
    tags: ['数组', '双指针', '排序'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,2,3,0,0,0]\n3\n[2,5,6]\n3',
        expectedOutput: '[1,2,2,3,5,6]',
        isHidden: false,
        description: '基本合并测试'
      },
      {
        id: 'test2',
        input: '[1]\n1\n[]\n0',
        expectedOutput: '[1]',
        isHidden: false,
        description: '空数组测试'
      },
      {
        id: 'test3',
        input: '[0]\n0\n[1]\n1',
        expectedOutput: '[1]',
        isHidden: true,
        description: '第一个数组为空'
      }
    ],
    hints: [
      '从后往前合并可以避免覆盖未处理的元素',
      '使用三个指针分别指向两个数组的末尾和合并位置',
      '比较两个数组末尾的元素，将较大的放到合并位置'
    ],
    points: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'longest-common-prefix',
    title: '最长公共前缀',
    description: `编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

**示例 1：**
输入：strs = ["flower","flow","flight"]
输出："fl"

**示例 2：**
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。

**提示：**
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] 仅由小写英文字母组成`,
    difficulty: 'easy',
    category: '字符串',
    tags: ['字符串'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '["flower","flow","flight"]',
        expectedOutput: '"fl"',
        isHidden: false,
        description: '有公共前缀'
      },
      {
        id: 'test2',
        input: '["dog","racecar","car"]',
        expectedOutput: '""',
        isHidden: false,
        description: '无公共前缀'
      },
      {
        id: 'test3',
        input: '["a"]',
        expectedOutput: '"a"',
        isHidden: true,
        description: '单个字符串'
      }
    ],
    hints: [
      '可以先找出最短的字符串长度',
      '逐个字符比较所有字符串的对应位置',
      '一旦发现不匹配就停止'
    ],
    points: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'binary-search',
    title: '二分查找',
    description: `给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

**示例 1:**
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

**示例 2:**
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1

**提示：**
- 你可以假设 nums 中的所有元素是不重复的。
- n 将在 [1, 10000]之间。
- nums 的每个元素都将在 [-9999, 9999]之间。`,
    difficulty: 'easy',
    category: '查找',
    tags: ['二分查找', '数组'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[-1,0,3,5,9,12]\n9',
        expectedOutput: '4',
        isHidden: false,
        description: '找到目标值'
      },
      {
        id: 'test2',
        input: '[-1,0,3,5,9,12]\n2',
        expectedOutput: '-1',
        isHidden: false,
        description: '未找到目标值'
      },
      {
        id: 'test3',
        input: '[5]\n5',
        expectedOutput: '0',
        isHidden: true,
        description: '单元素数组'
      }
    ],
    hints: [
      '使用左右指针，每次比较中间元素',
      '如果中间元素等于目标值，返回索引',
      '如果中间元素小于目标值，搜索右半部分',
      '如果中间元素大于目标值，搜索左半部分'
    ],
    points: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'palindrome-number',
    title: '回文数',
    description: `给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，121 是回文，而 123 不是。

**示例 1：**
输入：x = 121
输出：true

**示例 2：**
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

**示例 3：**
输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。

**进阶：**你能不将整数转为字符串来解决这个问题吗？`,
    difficulty: 'easy',
    category: '数学',
    tags: ['数学'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '121',
        expectedOutput: 'true',
        isHidden: false,
        description: '正数回文'
      },
      {
        id: 'test2',
        input: '-121',
        expectedOutput: 'false',
        isHidden: false,
        description: '负数'
      },
      {
        id: 'test3',
        input: '10',
        expectedOutput: 'false',
        isHidden: false,
        description: '非回文数'
      },
      {
        id: 'test4',
        input: '0',
        expectedOutput: 'true',
        isHidden: true,
        description: '零'
      }
    ],
    hints: [
      '负数不可能是回文数',
      '可以通过反转数字的一半来判断',
      '不需要完全反转整个数字'
    ],
    points: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'maximum-subarray',
    title: '最大子数组和',
    description: `给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

**示例 1：**
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

**示例 2：**
输入：nums = [1]
输出：1

**示例 3：**
输入：nums = [5,4,-1,7,8]
输出：23

**进阶：**如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。`,
    difficulty: 'medium',
    category: '动态规划',
    tags: ['数组', '动态规划', '分治'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        isHidden: false,
        description: '混合正负数'
      },
      {
        id: 'test2',
        input: '[1]',
        expectedOutput: '1',
        isHidden: false,
        description: '单个元素'
      },
      {
        id: 'test3',
        input: '[5,4,-1,7,8]',
        expectedOutput: '23',
        isHidden: false,
        description: '主要为正数'
      },
      {
        id: 'test4',
        input: '[-1,-2,-3,-4]',
        expectedOutput: '-1',
        isHidden: true,
        description: '全为负数'
      }
    ],
    hints: [
      '这是一个经典的动态规划问题（Kadane算法）',
      '对于每个位置，选择是否将当前元素加入到之前的子数组中',
      '如果之前的子数组和为负数，不如重新开始'
    ],
    points: 15,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'add-two-numbers',
    title: '两数相加',
    description: `给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807

**示例 2：**
输入：l1 = [0], l2 = [0]
输出：[0]

**示例 3：**
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]`,
    difficulty: 'medium',
    category: '链表',
    tags: ['链表', '数学', '递归'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 2,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[2,4,3]\n[5,6,4]',
        expectedOutput: '[7,0,8]',
        isHidden: false,
        description: '基本加法'
      },
      {
        id: 'test2',
        input: '[0]\n[0]',
        expectedOutput: '[0]',
        isHidden: false,
        description: '零相加'
      },
      {
        id: 'test3',
        input: '[9,9,9,9,9,9,9]\n[9,9,9,9]',
        expectedOutput: '[8,9,9,9,0,0,0,1]',
        isHidden: true,
        description: '进位测试'
      }
    ],
    hints: [
      '模拟手工加法过程',
      '注意处理进位',
      '两个链表长度可能不同'
    ],
    points: 18,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'longest-substring-without-repeating',
    title: '无重复字符的最长子串',
    description: `给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

**示例 1：**
输入：s = "abcabcbb"
输出：3
解释：因为无重复字符的最长子串是 "abc"，所以其长度为 3。

**示例 2：**
输入：s = "bbbbb"
输出：1
解释：因为无重复字符的最长子串是 "b"，所以其长度为 1。

**示例 3：**
输入：s = "pwwkew"
输出：3
解释：因为无重复字符的最长子串是 "wke"，所以其长度为 3。`,
    difficulty: 'medium',
    category: '字符串',
    tags: ['字符串', '滑动窗口', '哈希表'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 2,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '"abcabcbb"',
        expectedOutput: '3',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '"bbbbb"',
        expectedOutput: '1',
        isHidden: false,
        description: '重复字符'
      },
      {
        id: 'test3',
        input: '"pwwkew"',
        expectedOutput: '3',
        isHidden: false,
        description: '包含重复'
      },
      {
        id: 'test4',
        input: '""',
        expectedOutput: '0',
        isHidden: true,
        description: '空字符串'
      }
    ],
    hints: [
      '使用滑动窗口技术',
      '用哈希表记录字符出现的位置',
      '当遇到重复字符时，移动窗口起始位置'
    ],
    points: 16,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'container-with-most-water',
    title: '盛最多水的容器',
    description: `给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**示例 1：**
输入：height = [1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**示例 2：**
输入：height = [1,1]
输出：1`,
    difficulty: 'medium',
    category: '数组',
    tags: ['数组', '双指针', '贪心'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 2,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,8,6,2,5,4,8,3,7]',
        expectedOutput: '49',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '[1,1]',
        expectedOutput: '1',
        isHidden: false,
        description: '两个相同高度'
      },
      {
        id: 'test3',
        input: '[4,3,2,1,4]',
        expectedOutput: '16',
        isHidden: true,
        description: '边界测试'
      }
    ],
    hints: [
      '使用双指针从两端向中间移动',
      '容器的面积 = min(height[left], height[right]) * (right - left)',
      '移动高度较小的指针'
    ],
    points: 17,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3sum',
    title: '三数之和',
    description: `给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

**示例 1：**
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。

**示例 2：**
输入：nums = []
输出：[]

**示例 3：**
输入：nums = [0]
输出：[]`,
    difficulty: 'medium',
    category: '数组',
    tags: ['数组', '双指针', '排序'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[-1,0,1,2,-1,-4]',
        expectedOutput: '[[-1,-1,2],[-1,0,1]]',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '[]',
        expectedOutput: '[]',
        isHidden: false,
        description: '空数组'
      },
      {
        id: 'test3',
        input: '[0]',
        expectedOutput: '[]',
        isHidden: false,
        description: '单个元素'
      },
      {
        id: 'test4',
        input: '[0,0,0]',
        expectedOutput: '[[0,0,0]]',
        isHidden: true,
        description: '全零'
      }
    ],
    hints: [
      '先对数组排序',
      '固定一个数，然后用双指针找另外两个数',
      '注意去重处理'
    ],
    points: 20,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'remove-nth-node-from-end',
    title: '删除链表的倒数第N个节点',
    description: `给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

**示例 1：**
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

**示例 2：**
输入：head = [1], n = 1
输出：[]

**示例 3：**
输入：head = [1,2], n = 1
输出：[1]`,
    difficulty: 'medium',
    category: '链表',
    tags: ['链表', '双指针'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 2,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,2,3,4,5]\n2',
        expectedOutput: '[1,2,3,5]',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '[1]\n1',
        expectedOutput: '[]',
        isHidden: false,
        description: '删除头节点'
      },
      {
        id: 'test3',
        input: '[1,2]\n1',
        expectedOutput: '[1]',
        isHidden: true,
        description: '删除尾节点'
      }
    ],
    hints: [
      '使用双指针，快指针先走n步',
      '然后快慢指针同时移动',
      '注意处理删除头节点的情况'
    ],
    points: 16,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'valid-parentheses',
    title: '有效的括号',
    description: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**
输入：s = "()"
输出：true

**示例 2：**
输入：s = "()[]{}"
输出：true

**示例 3：**
输入：s = "(]"
输出：false`,
    difficulty: 'medium',
    category: '栈',
    tags: ['栈', '字符串'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '()',
        expectedOutput: 'true',
        isHidden: false,
        description: '简单括号'
      },
      {
        id: 'test2',
        input: '()[]{}',
        expectedOutput: 'true',
        isHidden: false,
        description: '多种括号'
      },
      {
        id: 'test3',
        input: '(]',
        expectedOutput: 'false',
        isHidden: false,
        description: '不匹配的括号'
      },
      {
        id: 'test4',
        input: '((()))',
        expectedOutput: 'true',
        isHidden: true,
        description: '嵌套括号'
      }
    ],
    hints: [
      '使用栈数据结构来存储左括号',
      '遇到右括号时，检查栈顶是否是对应的左括号',
      '最后检查栈是否为空'
    ],
    points: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'merge-two-sorted-lists',
    title: '合并两个有序链表',
    description: `将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

**示例 1：**
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

**示例 2：**
输入：l1 = [], l2 = []
输出：[]

**示例 3：**
输入：l1 = [], l2 = [0]
输出：[0]`,
    difficulty: 'medium',
    category: '链表',
    tags: ['链表', '递归', '分治'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 2,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,2,4]\n[1,3,4]',
        expectedOutput: '[1,1,2,3,4,4]',
        isHidden: false,
        description: '基本合并'
      },
      {
        id: 'test2',
        input: '[]\n[]',
        expectedOutput: '[]',
        isHidden: false,
        description: '空链表'
      },
      {
        id: 'test3',
        input: '[]\n[0]',
        expectedOutput: '[0]',
        isHidden: true,
        description: '一个空链表'
      }
    ],
    hints: [
      '使用递归或迭代方法',
      '比较两个链表头节点的值',
      '选择较小的节点作为当前节点'
    ],
    points: 14,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'generate-parentheses',
    title: '括号生成',
    description: `数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。

**示例 1：**
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

**示例 2：**
输入：n = 1
输出：["()"]`,
    difficulty: 'medium',
    category: '回溯算法',
    tags: ['字符串', '回溯算法', '动态规划'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '3',
        expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '1',
        expectedOutput: '["()"]',
        isHidden: false,
        description: '单个括号'
      },
      {
        id: 'test3',
        input: '2',
        expectedOutput: '["(())","()()"]',
        isHidden: true,
        description: '两个括号'
      }
    ],
    hints: [
      '使用回溯算法',
      '确保左括号数量不超过n',
      '确保右括号数量不超过左括号数量'
    ],
    points: 19,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'climbing-stairs',
    title: '爬楼梯',
    description: `假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**示例 1：**
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

**示例 2：**
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶

**提示：**
- 1 <= n <= 45`,
    difficulty: 'easy',
    category: '动态规划',
    tags: ['数学', '动态规划', '记忆化搜索'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '2',
        expectedOutput: '2',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '3',
        expectedOutput: '3',
        isHidden: false,
        description: '小数字测试'
      },
      {
        id: 'test3',
        input: '5',
        expectedOutput: '8',
        isHidden: true,
        description: '较大数字测试'
      }
    ],
    hints: [
      '这实际上是一个斐波那契数列问题',
      '到达第n阶的方法数 = 到达第(n-1)阶的方法数 + 到达第(n-2)阶的方法数',
      '可以使用动态规划或递归+记忆化来解决'
    ],
    points: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'median-of-two-sorted-arrays',
    title: '寻找两个正序数组的中位数',
    description: `给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

算法的时间复杂度应该为 O(log (m+n)) 。

**示例 1：**
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

**示例 2：**
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5`,
    difficulty: 'hard',
    category: '数组',
    tags: ['数组', '二分查找', '分治算法'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,3]\n[2]',
        expectedOutput: '2.0',
        isHidden: false,
        description: '奇数长度'
      },
      {
        id: 'test2',
        input: '[1,2]\n[3,4]',
        expectedOutput: '2.5',
        isHidden: false,
        description: '偶数长度'
      },
      {
        id: 'test3',
        input: '[0,0]\n[0,0]',
        expectedOutput: '0.0',
        isHidden: true,
        description: '全零数组'
      }
    ],
    hints: [
      '使用二分查找在较短的数组上',
      '找到合适的分割点',
      '确保左边元素数量等于右边元素数量'
    ],
    points: 25,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'regular-expression-matching',
    title: '正则表达式匹配',
    description: `给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖整个字符串 s的，而不是部分字符串。

**示例 1：**
输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。

**示例 2：**
输入：s = "aa", p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。

**示例 3：**
输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。`,
    difficulty: 'hard',
    category: '动态规划',
    tags: ['字符串', '动态规划', '递归'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '"aa"\n"a"',
        expectedOutput: 'false',
        isHidden: false,
        description: '不匹配'
      },
      {
        id: 'test2',
        input: '"aa"\n"a*"',
        expectedOutput: 'true',
        isHidden: false,
        description: '星号匹配'
      },
      {
        id: 'test3',
        input: '"ab"\n".*"',
        expectedOutput: 'true',
        isHidden: false,
        description: '点星匹配'
      },
      {
        id: 'test4',
        input: '"aab"\n"c*a*b"',
        expectedOutput: 'true',
        isHidden: true,
        description: '复杂模式'
      }
    ],
    hints: [
      '使用动态规划',
      'dp[i][j] 表示 s[0...i-1] 和 p[0...j-1] 是否匹配',
      '分情况处理普通字符、点号和星号'
    ],
    points: 30,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'merge-k-sorted-lists',
    title: '合并K个升序链表',
    description: `给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

**示例 1：**
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

**示例 2：**
输入：lists = []
输出：[]

**示例 3：**
输入：lists = [[]]
输出：[]`,
    difficulty: 'hard',
    category: '链表',
    tags: ['链表', '分治算法', '堆'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 4,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[[1,4,5],[1,3,4],[2,6]]',
        expectedOutput: '[1,1,2,3,4,4,5,6]',
        isHidden: false,
        description: '基本合并'
      },
      {
        id: 'test2',
        input: '[]',
        expectedOutput: '[]',
        isHidden: false,
        description: '空数组'
      },
      {
        id: 'test3',
        input: '[[]]',
        expectedOutput: '[]',
        isHidden: true,
        description: '空链表'
      }
    ],
    hints: [
      '使用优先队列（最小堆）',
      '或者使用分治算法两两合并',
      '注意处理空链表的情况'
    ],
    points: 28,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'reverse-nodes-in-k-group',
    title: 'K个一组翻转链表',
    description: `给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

**示例 1：**
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

**示例 2：**
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]`,
    difficulty: 'hard',
    category: '链表',
    tags: ['链表', '递归'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,2,3,4,5]\n2',
        expectedOutput: '[2,1,4,3,5]',
        isHidden: false,
        description: '基本翻转'
      },
      {
        id: 'test2',
        input: '[1,2,3,4,5]\n3',
        expectedOutput: '[3,2,1,4,5]',
        isHidden: false,
        description: '三节点翻转'
      },
      {
        id: 'test3',
        input: '[1,2,3,4,5]\n1',
        expectedOutput: '[1,2,3,4,5]',
        isHidden: true,
        description: '单节点翻转'
      }
    ],
    hints: [
      '先计算链表长度',
      '分组处理，每组k个节点',
      '使用递归或迭代方法翻转每组'
    ],
    points: 26,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'substring-with-concatenation-of-all-words',
    title: '串联所有单词的子串',
    description: `给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串长度相同。

s 中的串联子串是指一个包含 words 中所有字符串以任意顺序排列连接起来的子串。

返回所有串联子串在 s 中的开始索引。你可以以任意顺序返回答案。

**示例 1：**
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：因为 words.length == 2 且 words[i].length == 3，连接的子字符串的长度必须为 6。
子串 "barfoo" 开始位置是 0。它是 words 中 ["bar","foo"] 的连接。
子串 "foobar" 开始位置是 9。它是 words 中 ["foo","bar"] 的连接。

**示例 2：**
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]`,
    difficulty: 'hard',
    category: '字符串',
    tags: ['字符串', '哈希表', '滑动窗口'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 4,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '"barfoothefoobarman"\n["foo","bar"]',
        expectedOutput: '[0,9]',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '"wordgoodgoodgoodbestword"\n["word","good","best","word"]',
        expectedOutput: '[]',
        isHidden: false,
        description: '无匹配'
      },
      {
        id: 'test3',
        input: '"barfoofoobarthefoobarman"\n["bar","foo","the"]',
        expectedOutput: '[6,9,12]',
        isHidden: true,
        description: '多个匹配'
      }
    ],
    hints: [
      '使用滑动窗口',
      '用哈希表记录words中每个单词的出现次数',
      '检查每个窗口是否包含所有单词'
    ],
    points: 32,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'longest-valid-parentheses',
    title: '最长有效括号',
    description: `给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

**示例 1：**
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

**示例 2：**
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

**示例 3：**
输入：s = ""
输出：0`,
    difficulty: 'hard',
    category: '动态规划',
    tags: ['字符串', '动态规划', '栈'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '"(()"',
        expectedOutput: '2',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '")()())"',
        expectedOutput: '4',
        isHidden: false,
        description: '复杂情况'
      },
      {
        id: 'test3',
        input: '""',
        expectedOutput: '0',
        isHidden: false,
        description: '空字符串'
      },
      {
        id: 'test4',
        input: '"()(()"',
        expectedOutput: '2',
        isHidden: true,
        description: '不连续'
      }
    ],
    hints: [
      '使用动态规划',
      'dp[i] 表示以s[i]结尾的最长有效括号长度',
      '或者使用栈记录括号位置'
    ],
    points: 27,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'sudoku-solver',
    title: '解数独',
    description: `编写一个程序，通过已填充的空格来解决数独问题。

一个数独的解法需遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。

**示例：**
输入：board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]`,
    difficulty: 'hard',
    category: '回溯算法',
    tags: ['数组', '回溯算法', '哈希表'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 5,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expectedOutput: '[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]',
        isHidden: false,
        description: '标准数独'
      },
      {
        id: 'test2',
        input: '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        expectedOutput: '[["8","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]',
        isHidden: true,
        description: '另一个数独'
      }
    ],
    hints: [
      '使用回溯算法',
      '检查行、列、3x3宫格的有效性',
      '找到空白位置，尝试填入1-9的数字'
    ],
    points: 35,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'first-missing-positive',
    title: '缺失的第一个正数',
    description: `给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

**示例 1：**
输入：nums = [1,2,0]
输出：3

**示例 2：**
输入：nums = [3,4,-1,1]
输出：2

**示例 3：**
输入：nums = [7,8,9,11,12]
输出：1`,
    difficulty: 'hard',
    category: '数组',
    tags: ['数组', '哈希表'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[1,2,0]',
        expectedOutput: '3',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '[3,4,-1,1]',
        expectedOutput: '2',
        isHidden: false,
        description: '包含负数'
      },
      {
        id: 'test3',
        input: '[7,8,9,11,12]',
        expectedOutput: '1',
        isHidden: false,
        description: '都大于1'
      },
      {
        id: 'test4',
        input: '[1]',
        expectedOutput: '2',
        isHidden: true,
        description: '单个元素'
      }
    ],
    hints: [
      '使用原地哈希',
      '将数字放到对应的位置',
      '第一个不在正确位置的数字就是答案'
    ],
    points: 29,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'trapping-rain-water',
    title: '接雨水',
    description: `给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

**示例 2：**
输入：height = [4,2,0,3,2,5]
输出：9`,
    difficulty: 'hard',
    category: '数组',
    tags: ['数组', '双指针', '动态规划'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        expectedOutput: '6',
        isHidden: false,
        description: '基本测试'
      },
      {
        id: 'test2',
        input: '[4,2,0,3,2,5]',
        expectedOutput: '9',
        isHidden: false,
        description: '复杂情况'
      },
      {
        id: 'test3',
        input: '[2,0,2]',
        expectedOutput: '2',
        isHidden: true,
        description: '简单情况'
      }
    ],
    hints: [
      '使用双指针',
      '记录左右两边的最大高度',
      '当前位置能接的水 = min(左边最大高度, 右边最大高度) - 当前高度'
    ],
    points: 31,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'wildcard-matching',
    title: '通配符匹配',
    description: `给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
两个字符串完全匹配才算匹配成功。

**示例 1：**
输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。

**示例 2：**
输入：s = "aa", p = "*"
输出：true
解释：'*' 可以匹配任意字符串。

**示例 3：**
输入：s = "cb", p = "?a"
输出：false
解释：'?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。`,
    difficulty: 'hard',
    category: '动态规划',
    tags: ['字符串', '动态规划', '贪心算法'],
    languages: ['python', 'javascript', 'java', 'cpp'],
    timeLimit: 3,
    memoryLimit: 256,
    testCases: [
      {
        id: 'test1',
        input: '"aa"\n"a"',
        expectedOutput: 'false',
        isHidden: false,
        description: '不匹配'
      },
      {
        id: 'test2',
        input: '"aa"\n"*"',
        expectedOutput: 'true',
        isHidden: false,
        description: '星号匹配'
      },
      {
        id: 'test3',
        input: '"cb"\n"?a"',
        expectedOutput: 'false',
        isHidden: false,
        description: '问号匹配'
      },
      {
        id: 'test4',
        input: '"adceb"\n"*a*b"',
        expectedOutput: 'true',
        isHidden: true,
        description: '复杂模式'
      }
    ],
    hints: [
      '使用动态规划',
      'dp[i][j] 表示 s[0...i-1] 和 p[0...j-1] 是否匹配',
      '分情况处理普通字符、问号和星号'
    ],
    points: 33,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const challengeCategories = [
  '数组',
  '字符串',
  '栈',
  '队列',
  '链表',
  '树',
  '图',
  '递归',
  '动态规划',
  '贪心算法',
  '回溯算法',
  '分治算法',
  '数学',
  '位运算',
  '查找',
  '排序'
];

export const difficultyColors = {
  easy: '#52c41a',
  medium: '#faad14',
  hard: '#f5222d'
};

export const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}; 