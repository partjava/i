import { createStageLookup, type VisualizerEntry } from '../shared/VisualizerEngine';
import { ConfigTypeParserVisualizer, BracketMatchVisualizer } from './VariablesAndTypesVisualizers';
import { LogLevelFilterVisualizer, FizzBuzzVisualizer } from './ConditionalsVisualizers';
import { BatchTaskSchedulerVisualizer, TwoSumHashVisualizer } from './LoopsVisualizers';
import { MemoizeNVisualizer, PalindromePointersVisualizer } from './FunctionsVisualizers';
import { SlidingWindowStatsVisualizer, ArrayRotateVisualizer } from './ListVisualizers';
import { MultiFieldSortVisualizer, MergeIntervalsVisualizer } from './TupleVisualizers';
import { DeepMergeDictVisualizer, TopKFrequentVisualizer } from './DictVisualizers';
import { PermissionSetDiffVisualizer, SetOperationsVisualizer } from './SetVisualizers';
import { LogKeywordStreamVisualizer, FileFinderTreeVisualizer } from './FileIoVisualizers';
import { JsonCleanPipelineVisualizer, JsonFlattenVisualizer } from './JsonParsingVisualizers';
import { CsvGroupAggregateVisualizer, CsvQuoteParserVisualizer } from './CsvAnalysisVisualizers';
import { ConnectionPoolVisualizer, StackCalculatorVisualizer } from './ClassBasicsVisualizers';
import { ShoppingCartEncapVisualizer, BankAccountEncapVisualizer } from './EncapsulationVisualizers';
import { CacheInheritanceVisualizer, ShapeAreaInheritanceVisualizer } from './InheritanceVisualizers';
import { PolymorphicLogFormatterVisualizer, LoggerWriterDuckTypingVisualizer } from './PolymorphismVisualizers';
import { PaginatedIteratorVisualizer, RangeIteratorVisualizer } from './IteratorsVisualizers';
import { GeneratorLogStreamVisualizer, FibonacciGeneratorVisualizer } from './GeneratorsVisualizers';
import { RetryDecoratorVisualizer, TimerDecoratorVisualizer } from './DecoratorsVisualizers';
import { LambdaSortUsersVisualizer, LambdaSortWordsVisualizer } from './LambdaVisualizers';

const ENTRIES: VisualizerEntry[] = [
  { subtopic: '变量与数据类型', levelIndex: 1, levelTitle: '带类型校验的配置值解析器', component: ConfigTypeParserVisualizer },
  { subtopic: '变量与数据类型', levelIndex: 2, levelTitle: '括号匹配校验器', component: BracketMatchVisualizer },
  { subtopic: '条件语句', levelIndex: 1, levelTitle: '日志级别过滤器', component: LogLevelFilterVisualizer },
  { subtopic: '条件语句', levelIndex: 2, levelTitle: 'FizzBuzz', component: FizzBuzzVisualizer },
  { subtopic: '循环', levelIndex: 1, levelTitle: '分批任务调度器', component: BatchTaskSchedulerVisualizer },
  { subtopic: '循环', levelIndex: 2, levelTitle: '两数之和', component: TwoSumHashVisualizer },
  { subtopic: '函数', levelIndex: 1, levelTitle: '最近 N 次缓存装饰器', component: MemoizeNVisualizer },
  { subtopic: '函数', levelIndex: 2, levelTitle: '回文检测器', component: PalindromePointersVisualizer },
  { subtopic: 'List 列表', levelIndex: 1, levelTitle: '滑动窗口统计分析器', component: SlidingWindowStatsVisualizer },
  { subtopic: 'List 列表', levelIndex: 2, levelTitle: '数组旋转', component: ArrayRotateVisualizer },
  { subtopic: 'Tuple 元组', levelIndex: 1, levelTitle: '多字段排序引擎', component: MultiFieldSortVisualizer },
  { subtopic: 'Tuple 元组', levelIndex: 2, levelTitle: '区间合并', component: MergeIntervalsVisualizer },
  { subtopic: 'Dict 字典', levelIndex: 1, levelTitle: '嵌套字典深度合并器', component: DeepMergeDictVisualizer },
  { subtopic: 'Dict 字典', levelIndex: 2, levelTitle: '单词频率统计 Top-K', component: TopKFrequentVisualizer },
  { subtopic: 'Set 集合', levelIndex: 1, levelTitle: '权限交集与越权检测器', component: PermissionSetDiffVisualizer },
  { subtopic: 'Set 集合', levelIndex: 2, levelTitle: '集合运算', component: SetOperationsVisualizer },
  { subtopic: '文件读写', levelIndex: 1, levelTitle: '日志关键词频率统计器', component: LogKeywordStreamVisualizer },
  { subtopic: '文件读写', levelIndex: 2, levelTitle: '文件查找器', component: FileFinderTreeVisualizer },
  { subtopic: 'JSON解析', levelIndex: 1, levelTitle: 'JSON 数据清洗管道', component: JsonCleanPipelineVisualizer },
  { subtopic: 'JSON解析', levelIndex: 2, levelTitle: 'JSON 扁平化器', component: JsonFlattenVisualizer },
  { subtopic: 'CSV数据分析', levelIndex: 1, levelTitle: 'CSV 分组聚合计算器', component: CsvGroupAggregateVisualizer },
  { subtopic: 'CSV数据分析', levelIndex: 2, levelTitle: 'CSV 解析器', component: CsvQuoteParserVisualizer },
  { subtopic: 'Class类', levelIndex: 1, levelTitle: '简易数据库连接池', component: ConnectionPoolVisualizer },
  { subtopic: 'Class类', levelIndex: 2, levelTitle: '栈计算器', component: StackCalculatorVisualizer },
  { subtopic: '封装', levelIndex: 1, levelTitle: '购物车与价格计算器', component: ShoppingCartEncapVisualizer },
  { subtopic: '封装', levelIndex: 2, levelTitle: '银行账户类', component: BankAccountEncapVisualizer },
  { subtopic: '继承', levelIndex: 1, levelTitle: '缓存后端抽象与继承', component: CacheInheritanceVisualizer },
  { subtopic: '继承', levelIndex: 2, levelTitle: '形状面积计算', component: ShapeAreaInheritanceVisualizer },
  { subtopic: '多态', levelIndex: 1, levelTitle: '多态日志格式化器', component: PolymorphicLogFormatterVisualizer },
  { subtopic: '多态', levelIndex: 2, levelTitle: '日志写入器', component: LoggerWriterDuckTypingVisualizer },
  { subtopic: '迭代器', levelIndex: 1, levelTitle: '分页迭代器', component: PaginatedIteratorVisualizer },
  { subtopic: '迭代器', levelIndex: 2, levelTitle: '范围迭代器', component: RangeIteratorVisualizer },
  { subtopic: '生成器', levelIndex: 1, levelTitle: '日志行解析生成器', component: GeneratorLogStreamVisualizer },
  { subtopic: '生成器', levelIndex: 2, levelTitle: '斐波那契生成器', component: FibonacciGeneratorVisualizer },
  { subtopic: '装饰器', levelIndex: 1, levelTitle: '自动重试装饰器', component: RetryDecoratorVisualizer },
  { subtopic: '装饰器', levelIndex: 2, levelTitle: '函数计时装饰器', component: TimerDecoratorVisualizer },
  { subtopic: 'Lambda表达式', levelIndex: 1, levelTitle: '多维度数据排序工具', component: LambdaSortUsersVisualizer },
  { subtopic: 'Lambda表达式', levelIndex: 2, levelTitle: '自定义排序', component: LambdaSortWordsVisualizer },
];

export const findPythonProgrammingVisualizer = createStageLookup(ENTRIES);
