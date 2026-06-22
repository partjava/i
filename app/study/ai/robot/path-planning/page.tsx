'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const astarCode = `import heapq

def astar(start, goal, grid):
    open_set = [(0, start)]
    came_from, g_score = {}, {start: 0}
    while open_set:
        _, cur = heapq.heappop(open_set)
        if cur == goal:
            path = []
            while cur:
                path.append(cur)
                cur = came_from.get(cur)
            return path[::-1]
        for dx, dy in [(0,1),(1,0),(0,-1),(-1,0)]:
            nx, ny = cur[0]+dx, cur[1]+dy
            if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]) and grid[nx][ny] == 0:
                ng = g_score[cur] + 1
                if (nx, ny) not in g_score or ng < g_score[(nx, ny)]:
                    g_score[(nx, ny)] = ng
                    heapq.heappush(open_set, (ng + abs(nx-goal[0]) + abs(ny-goal[1]), (nx, ny)))
                    came_from[(nx, ny)] = cur
    return None`

const META: LessonMeta = {
  subject: '智能机器人', chapterTitle: '路径规划', chapterNumber: 3, totalChapters: 12,
  subjectHref: '/study/ai/robot',
  prevChapter: { label: '运动学与动力学', href: '/study/ai/robot/kinematics' },
  nextChapter: { label: '机器人控制', href: '/study/ai/robot/control' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '基础算法', left: (<div className="space-y-4"><PageTitle>路径规划基础</PageTitle><SectionTitle>全局路径规划</SectionTitle><BookParagraph><b>A*算法：</b>启发式搜索，通过估价函数f(n)=g(n)+h(n)引导搜索方向。适用于静态环境，保证最优解。</BookParagraph><BookParagraph><b>Dijkstra：</b>广度优先搜索，保证最短路径但效率低于A*。</BookParagraph><BookParagraph><b>RRT：</b>快速随机扩展树，通过随机采样在高维空间快速搜索，解决高维约束规划问题。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>局部路径规划</SectionTitle><BookParagraph><b>DWA：</b>动态窗口法，在速度空间采样，评估轨迹安全性、效率和方向，选择最优速度。</BookParagraph><BookParagraph><b>TEB：</b>时间弹性带法，优化轨迹的时间和空间参数，考虑运动学约束和障碍物避让。</BookParagraph></div>) },
  { label: '高级算法', left: (<div className="space-y-4"><PageTitle>高级规划算法</PageTitle><SectionTitle>PRM</SectionTitle><BookParagraph>概率路线图法，在配置空间随机采样构建路线图，进行多查询规划。适合静态环境多次规划。</BookParagraph><SectionTitle>CHOMP</SectionTitle><BookParagraph>协变哈密顿量优化运动规划，通过梯度下降优化轨迹的平滑度和避障代价。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>A*算法实现</SectionTitle><BookCode language="python" code={astarCode} /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><SectionTitle>移动机器人导航</SectionTitle><BookList items={['室内导航：激光SLAM+全局路径规划','室外导航：GPS+局部路径规划','多机器人协同：分布式规划']} /><SectionTitle>机械臂运动规划</SectionTitle><BookList items={['避障规划：避开障碍物','抓取规划：抓取位姿计算','装配规划：装配路径']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RobotPathPlanningPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
