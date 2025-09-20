'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AssociationRuleMiningPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基本概念' },
    { id: 'algorithms', label: '算法实现' },
    { id: 'applications', label: '实际应用' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">关联规则挖掘</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">关联规则基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本定义</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则挖掘是数据挖掘中用于发现数据项之间有趣关系的方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本概念
1. 项集（Itemset）
   - 一组项目的集合
   - 例如：{牛奶, 面包, 鸡蛋}

2. 事务（Transaction）
   - 包含多个项目的集合
   - 例如：一次购物记录

3. 支持度（Support）
   - 项集在所有事务中出现的频率
   - Support(X) = P(X)

4. 置信度（Confidence）
   - 规则的可信程度
   - Confidence(X→Y) = P(Y|X)

5. 提升度（Lift）
   - 规则的相关性强度
   - Lift(X→Y) = P(Y|X)/P(Y)

# 示例
事务数据库：
T1: {牛奶, 面包, 鸡蛋}
T2: {牛奶, 面包}
T3: {面包, 鸡蛋}
T4: {牛奶, 鸡蛋}

规则：牛奶 → 面包
- 支持度 = 2/4 = 0.5
- 置信度 = 2/3 = 0.67
- 提升度 = 0.67/0.75 = 0.89`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 规则评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则的评估需要考虑多个指标。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 规则评估指标
1. 最小支持度（Min Support）
   - 过滤低频项集
   - 通常设置为0.01-0.1

2. 最小置信度（Min Confidence）
   - 过滤不可靠规则
   - 通常设置为0.5-0.8

3. 最小提升度（Min Lift）
   - 过滤不相关规则
   - 通常设置为>1

4. 规则长度
   - 规则包含的项目数
   - 通常限制在2-3个

# 评估示例
规则：牛奶 → 面包
- 支持度 = 0.5 > 0.1 ✓
- 置信度 = 0.67 > 0.5 ✓
- 提升度 = 0.89 < 1 ✗
结论：规则不可靠`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 规则类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则可以根据不同的特征进行分类。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 规则类型
1. 基于规则形式
   - 单维规则：A → B
   - 多维规则：A,B → C
   - 分层规则：A → B → C

2. 基于规则方向
   - 单向规则：A → B
   - 双向规则：A ↔ B
   - 循环规则：A → B → C → A

3. 基于规则约束
   - 无约束规则
   - 时间约束规则
   - 空间约束规则

# 示例
1. 单维规则
   牛奶 → 面包

2. 多维规则
   牛奶,鸡蛋 → 面包

3. 时间约束规则
   牛奶 → 面包 (在早上)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">关联规则算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Apriori算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Apriori算法是最经典的关联规则挖掘算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Apriori算法实现
import numpy as np
from itertools import combinations

class Apriori:
    def __init__(self, min_support=0.1, min_confidence=0.5):
        self.min_support = min_support
        self.min_confidence = min_confidence
        self.transactions = []
        self.items = set()
        self.frequent_itemsets = {}
        self.rules = []
    
    def fit(self, transactions):
        self.transactions = transactions
        self.items = set(item for transaction in transactions for item in transaction)
        self._generate_frequent_itemsets()
        self._generate_rules()
        return self
    
    def _generate_frequent_itemsets(self):
        # 生成1项集
        k = 1
        current_itemsets = [{item} for item in self.items]
        
        while current_itemsets:
            # 计算支持度
            itemset_counts = {}
            for itemset in current_itemsets:
                count = sum(1 for transaction in self.transactions 
                          if itemset.issubset(transaction))
                support = count / len(self.transactions)
                if support >= self.min_support:
                    itemset_counts[frozenset(itemset)] = support
            
            # 保存频繁项集
            self.frequent_itemsets.update(itemset_counts)
            
            # 生成下一层项集
            k += 1
            current_itemsets = self._generate_candidates(
                [set(itemset) for itemset in itemset_counts.keys()], k)
    
    def _generate_candidates(self, prev_itemsets, k):
        candidates = set()
        for i in range(len(prev_itemsets)):
            for j in range(i + 1, len(prev_itemsets)):
                union = prev_itemsets[i].union(prev_itemsets[j])
                if len(union) == k:
                    candidates.add(frozenset(union))
        return candidates
    
    def _generate_rules(self):
        for itemset in self.frequent_itemsets:
            if len(itemset) < 2:
                continue
            
            for i in range(1, len(itemset)):
                for antecedent in combinations(itemset, i):
                    antecedent = frozenset(antecedent)
                    consequent = itemset - antecedent
                    
                    # 计算置信度
                    conf = self.frequent_itemsets[itemset] / self.frequent_itemsets[antecedent]
                    
                    if conf >= self.min_confidence:
                        self.rules.append((antecedent, consequent, conf))
    
    def get_rules(self):
        return self.rules

# 使用示例
transactions = [
    {'牛奶', '面包', '鸡蛋'},
    {'牛奶', '面包'},
    {'面包', '鸡蛋'},
    {'牛奶', '鸡蛋'}
]

apriori = Apriori(min_support=0.1, min_confidence=0.5)
apriori.fit(transactions)
rules = apriori.get_rules()

for antecedent, consequent, confidence in rules:
    print(f"{antecedent} -> {consequent}: {confidence:.2f}")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. FP-Growth算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      FP-Growth算法是一种基于FP树的频繁模式挖掘算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# FP-Growth算法实现
from collections import defaultdict

class FPNode:
    def __init__(self, item, count=0, parent=None):
        self.item = item
        self.count = count
        self.parent = parent
        self.children = {}
        self.next = None

class FPTree:
    def __init__(self):
        self.root = FPNode(None)
        self.header_table = defaultdict(list)
    
    def add_transaction(self, transaction, count=1):
        current = self.root
        for item in transaction:
            if item in current.children:
                current.children[item].count += count
            else:
                current.children[item] = FPNode(item, count, current)
                self.header_table[item].append(current.children[item])
            current = current.children[item]
    
    def get_conditional_pattern_base(self, item):
        patterns = []
        for node in self.header_table[item]:
            pattern = []
            current = node.parent
            while current.item is not None:
                pattern.append(current.item)
                current = current.parent
            if pattern:
                patterns.append((pattern, node.count))
        return patterns

class FPGrowth:
    def __init__(self, min_support=0.1, min_confidence=0.5):
        self.min_support = min_support
        self.min_confidence = min_confidence
        self.transactions = []
        self.frequent_itemsets = {}
        self.rules = []
    
    def fit(self, transactions):
        self.transactions = transactions
        self._build_fp_tree()
        self._mine_frequent_itemsets()
        self._generate_rules()
        return self
    
    def _build_fp_tree(self):
        # 计算项集频率
        item_counts = defaultdict(int)
        for transaction in self.transactions:
            for item in transaction:
                item_counts[item] += 1
        
        # 过滤低频项
        self.frequent_items = {item for item, count in item_counts.items() 
                             if count >= len(self.transactions) * self.min_support}
        
        # 构建FP树
        self.fp_tree = FPTree()
        for transaction in self.transactions:
            filtered_transaction = [item for item in transaction 
                                 if item in self.frequent_items]
            if filtered_transaction:
                self.fp_tree.add_transaction(sorted(filtered_transaction))
    
    def _mine_frequent_itemsets(self):
        def mine_tree(tree, prefix, min_support):
            for item, nodes in tree.header_table.items():
                support = sum(node.count for node in nodes)
                if support >= len(self.transactions) * min_support:
                    itemset = prefix | {item}
                    self.frequent_itemsets[frozenset(itemset)] = support
                    
                    # 构建条件模式基
                    conditional_pattern_base = tree.get_conditional_pattern_base(item)
                    if conditional_pattern_base:
                        conditional_tree = FPTree()
                        for pattern, count in conditional_pattern_base:
                            conditional_tree.add_transaction(pattern, count)
                        mine_tree(conditional_tree, itemset, min_support)
        
        mine_tree(self.fp_tree, set(), self.min_support)
    
    def _generate_rules(self):
        for itemset in self.frequent_itemsets:
            if len(itemset) < 2:
                continue
            
            for i in range(1, len(itemset)):
                for antecedent in combinations(itemset, i):
                    antecedent = frozenset(antecedent)
                    consequent = itemset - antecedent
                    
                    # 计算置信度
                    conf = (self.frequent_itemsets[itemset] / 
                           self.frequent_itemsets[antecedent])
                    
                    if conf >= self.min_confidence:
                        self.rules.append((antecedent, consequent, conf))
    
    def get_rules(self):
        return self.rules

# 使用示例
transactions = [
    {'牛奶', '面包', '鸡蛋'},
    {'牛奶', '面包'},
    {'面包', '鸡蛋'},
    {'牛奶', '鸡蛋'}
]

fp_growth = FPGrowth(min_support=0.1, min_confidence=0.5)
fp_growth.fit(transactions)
rules = fp_growth.get_rules()

for antecedent, consequent, confidence in rules:
    print(f"{antecedent} -> {consequent}: {confidence:.2f}")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Eclat算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Eclat算法是一种基于垂直数据格式的频繁项集挖掘算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Eclat算法实现
from collections import defaultdict

class Eclat:
    def __init__(self, min_support=0.1, min_confidence=0.5):
        self.min_support = min_support
        self.min_confidence = min_confidence
        self.transactions = []
        self.vertical_format = {}
        self.frequent_itemsets = {}
        self.rules = []
    
    def fit(self, transactions):
        self.transactions = transactions
        self._convert_to_vertical_format()
        self._mine_frequent_itemsets()
        self._generate_rules()
        return self
    
    def _convert_to_vertical_format(self):
        # 转换为垂直数据格式
        for i, transaction in enumerate(self.transactions):
            for item in transaction:
                if item not in self.vertical_format:
                    self.vertical_format[item] = set()
                self.vertical_format[item].add(i)
    
    def _mine_frequent_itemsets(self):
        def get_support(itemset):
            if not itemset:
                return 1.0
            return len(set.intersection(*[self.vertical_format[item] 
                                       for item in itemset])) / len(self.transactions)
        
        def mine_itemsets(current_itemset, remaining_items):
            support = get_support(current_itemset)
            if support >= self.min_support:
                self.frequent_itemsets[frozenset(current_itemset)] = support
                
                for i, item in enumerate(remaining_items):
                    new_itemset = current_itemset + [item]
                    mine_itemsets(new_itemset, remaining_items[i+1:])
        
        # 从1项集开始挖掘
        items = sorted(self.vertical_format.keys())
        for i, item in enumerate(items):
            mine_itemsets([item], items[i+1:])
    
    def _generate_rules(self):
        for itemset in self.frequent_itemsets:
            if len(itemset) < 2:
                continue
            
            for i in range(1, len(itemset)):
                for antecedent in combinations(itemset, i):
                    antecedent = frozenset(antecedent)
                    consequent = itemset - antecedent
                    
                    # 计算置信度
                    conf = (self.frequent_itemsets[itemset] / 
                           self.frequent_itemsets[antecedent])
                    
                    if conf >= self.min_confidence:
                        self.rules.append((antecedent, consequent, conf))
    
    def get_rules(self):
        return self.rules

# 使用示例
transactions = [
    {'牛奶', '面包', '鸡蛋'},
    {'牛奶', '面包'},
    {'面包', '鸡蛋'},
    {'牛奶', '鸡蛋'}
]

eclat = Eclat(min_support=0.1, min_confidence=0.5)
eclat.fit(transactions)
rules = eclat.get_rules()

for antecedent, consequent, confidence in rules:
    print(f"{antecedent} -> {consequent}: {confidence:.2f}")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 零售分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则挖掘在零售领域有广泛的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 零售分析应用
1. 购物篮分析
   - 发现商品关联
   - 优化商品布局
   - 制定促销策略

2. 交叉销售
   - 推荐相关商品
   - 提高客单价
   - 增加销售额

3. 商品组合
   - 设计套餐
   - 捆绑销售
   - 提高利润

# 代码示例
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# 加载数据
def load_retail_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_data(df):
    # 创建购物篮数据
    basket = df.pivot_table(
        index='TransactionID',
        columns='ProductID',
        values='Quantity',
        aggfunc='sum',
        fill_value=0
    )
    return basket

# 挖掘关联规则
def mine_association_rules(basket, min_support=0.01, min_confidence=0.5):
    # 生成频繁项集
    frequent_itemsets = apriori(
        basket,
        min_support=min_support,
        use_colnames=True
    )
    
    # 生成关联规则
    rules = association_rules(
        frequent_itemsets,
        metric='confidence',
        min_threshold=min_confidence
    )
    
    return rules

# 应用示例
def retail_analysis(file_path):
    # 加载数据
    df = load_retail_data(file_path)
    
    # 数据预处理
    basket = preprocess_data(df)
    
    # 挖掘关联规则
    rules = mine_association_rules(basket)
    
    # 分析结果
    print("Top 5关联规则：")
    print(rules.head())
    
    # 生成建议
    generate_recommendations(rules)

# 生成建议
def generate_recommendations(rules):
    print("\\n商品组合建议：")
    for _, rule in rules.iterrows():
        if rule['lift'] > 1:
            print(f"推荐将 {rule['antecedents']} 和 {rule['consequents']} 放在一起销售")
            print(f"置信度: {rule['confidence']:.2f}, 提升度: {rule['lift']:.2f}\\n")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 医疗诊断</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则挖掘在医疗诊断中也有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 医疗诊断应用
1. 症状关联
   - 发现症状组合
   - 辅助诊断
   - 预测疾病

2. 药物相互作用
   - 发现药物关联
   - 避免不良反应
   - 优化用药方案

3. 治疗方案
   - 分析治疗组合
   - 提高治愈率
   - 降低副作用

# 代码示例
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# 加载医疗数据
def load_medical_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_medical_data(df):
    # 创建症状-疾病矩阵
    symptom_disease = df.pivot_table(
        index='PatientID',
        columns='Symptom',
        values='Severity',
        aggfunc='max',
        fill_value=0
    )
    return symptom_disease

# 挖掘医疗关联规则
def mine_medical_rules(symptom_disease, min_support=0.05, min_confidence=0.7):
    # 生成频繁项集
    frequent_itemsets = apriori(
        symptom_disease,
        min_support=min_support,
        use_colnames=True
    )
    
    # 生成关联规则
    rules = association_rules(
        frequent_itemsets,
        metric='confidence',
        min_threshold=min_confidence
    )
    
    return rules

# 应用示例
def medical_analysis(file_path):
    # 加载数据
    df = load_medical_data(file_path)
    
    # 数据预处理
    symptom_disease = preprocess_medical_data(df)
    
    # 挖掘关联规则
    rules = mine_medical_rules(symptom_disease)
    
    # 分析结果
    print("症状-疾病关联规则：")
    print(rules.head())
    
    # 生成诊断建议
    generate_diagnosis_suggestions(rules)

# 生成诊断建议
def generate_diagnosis_suggestions(rules):
    print("\\n诊断建议：")
    for _, rule in rules.iterrows():
        if rule['lift'] > 1:
            print(f"当出现 {rule['antecedents']} 症状时，")
            print(f"建议考虑 {rule['consequents']} 疾病")
            print(f"置信度: {rule['confidence']:.2f}, 提升度: {rule['lift']:.2f}\\n")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 网络安全</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      关联规则挖掘在网络安全领域也有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 网络安全应用
1. 入侵检测
   - 发现攻击模式
   - 识别异常行为
   - 预防安全威胁

2. 日志分析
   - 分析系统日志
   - 发现潜在问题
   - 优化系统性能

3. 威胁情报
   - 关联攻击特征
   - 预测攻击趋势
   - 制定防御策略

# 代码示例
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# 加载安全日志
def load_security_logs(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_security_data(df):
    # 创建事件-特征矩阵
    event_features = df.pivot_table(
        index='EventID',
        columns='Feature',
        values='Value',
        aggfunc='max',
        fill_value=0
    )
    return event_features

# 挖掘安全关联规则
def mine_security_rules(event_features, min_support=0.01, min_confidence=0.8):
    # 生成频繁项集
    frequent_itemsets = apriori(
        event_features,
        min_support=min_support,
        use_colnames=True
    )
    
    # 生成关联规则
    rules = association_rules(
        frequent_itemsets,
        metric='confidence',
        min_threshold=min_confidence
    )
    
    return rules

# 应用示例
def security_analysis(file_path):
    # 加载数据
    df = load_security_logs(file_path)
    
    # 数据预处理
    event_features = preprocess_security_data(df)
    
    # 挖掘关联规则
    rules = mine_security_rules(event_features)
    
    # 分析结果
    print("安全事件关联规则：")
    print(rules.head())
    
    # 生成安全建议
    generate_security_suggestions(rules)

# 生成安全建议
def generate_security_suggestions(rules):
    print("\\n安全建议：")
    for _, rule in rules.iterrows():
        if rule['lift'] > 1:
            print(f"当检测到 {rule['antecedents']} 事件时，")
            print(f"建议关注 {rule['consequents']} 相关事件")
            print(f"置信度: {rule['confidence']:.2f}, 提升度: {rule['lift']:.2f}\\n")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/datamining/feature-engineering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回特征工程
        </Link>
        <Link 
          href="/study/ai/datamining/clustering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          聚类分析 →
        </Link>
      </div>
    </div>
  );
} 