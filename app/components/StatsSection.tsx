'use client';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
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
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/platform');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setStats({
            users: 1234,
            notes: 5678,
            studyHours: 12345,
            challenges: 89
          });
        }
      } catch (error) {
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
      color: '#4a6741'
    },
    {
      icon: '📝',
      label: '学习笔记',
      value: stats.notes,
      suffix: '+',
      color: '#8b4513'
    },
    {
      icon: '⏱️',
      label: '学习时长',
      value: stats.studyHours,
      suffix: 'h',
      color: '#2c3e6b'
    },
    {
      icon: '🏆',
      label: '编程挑战',
      value: stats.challenges,
      suffix: '+',
      color: '#8b2500'
    }
  ];

  return (
    <div ref={ref} className="py-16 bg-gradient-to-b from-[#ebe5d8] to-[#e5dfd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-wide">
            平台数据一览
          </h2>
          <p className="text-lg text-gray-500">
            与千万学习者一起成长
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-80'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#d4c8b8]"
                style={{
                  background: 'linear-gradient(135deg, #faf6f0 0%, #f5efe6 30%, #faf6f0 60%, #f3ede2 100%)',
                }}
              >
                {/* 宣纸纹理 */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-[0.025]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='12' cy='18' r='0.6'/%3E%3Ccircle cx='35' cy='42' r='0.5'/%3E%3Ccircle cx='8' cy='55' r='0.4'/%3E%3Ccircle cx='48' cy='12' r='0.5'/%3E%3Ccircle cx='28' cy='30' r='0.6'/%3E%3Ccircle cx='52' cy='38' r='0.4'/%3E%3Ccircle cx='18' cy='8' r='0.5'/%3E%3Ccircle cx='42' cy='55' r='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
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
                  
                  <div className="text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
