'use client';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Stats {
  users: number;
  notes: number;
  studyHours: number;
  challenges: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    notes: 0,
    studyHours: 0,
    challenges: 0
  });
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // 获取真实统计数据
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/platform');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          // 使用模拟数据
          setStats({
            users: 1234,
            notes: 5678,
            studyHours: 12345,
            challenges: 89
          });
        }
      } catch (error) {
        // 使用模拟数据
        setStats({
          users: 1234,
          notes: 5678,
          studyHours: 12345,
          challenges: 89
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      icon: '👥',
      label: '注册用户',
      value: stats.users,
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📝',
      label: '学习笔记',
      value: stats.notes,
      suffix: '+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⏱️',
      label: '学习时长',
      value: stats.studyHours,
      suffix: 'h',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🏆',
      label: '编程挑战',
      value: stats.challenges,
      suffix: '+',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            平台数据一览
          </h2>
          <p className="text-lg text-gray-600">
            与千万学习者一起成长
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* 渐变背景 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* 图标 */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* 数字 */}
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {inView && !loading ? (
                    <>
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                      />
                      {stat.suffix}
                    </>
                  ) : (
                    '0' + stat.suffix
                  )}
                </div>
                
                {/* 标签 */}
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
