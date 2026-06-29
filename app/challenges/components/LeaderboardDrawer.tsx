'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Medal, Star } from 'lucide-react';

interface LeaderboardDrawerProps {
  onClose: () => void;
}

interface LeaderboardUser {
  rank: number;
  username: string;
  challengesCompleted: number;
  points: number;
  title: string;
  isMe?: boolean;
}

export const LeaderboardDrawer: React.FC<LeaderboardDrawerProps> = ({ onClose }) => {
  const users: LeaderboardUser[] = [
    { rank: 1, username: 'AlphaExplorer', challengesCompleted: 28, points: 1120, title: '量子领航者' },
    { rank: 2, username: 'DeepMindLearner', challengesCompleted: 25, points: 980, title: '星系开拓者' },
    { rank: 3, username: 'PartJavaFan', challengesCompleted: 22, points: 880, title: '星河漫游者' },
    { rank: 4, username: 'CodexMatrix', challengesCompleted: 20, points: 800, title: '引力探索者' },
    { rank: 5, username: 'You (你)', challengesCompleted: 15, points: 600, title: '星轨初学者', isMe: true },
    { rank: 6, username: 'CyberAgent', challengesCompleted: 12, points: 480, title: '星轨初学者' },
    { rank: 7, username: 'BytePioneer', challengesCompleted: 9, points: 360, title: '新星观测员' },
    { rank: 8, username: 'SpaceCoder', challengesCompleted: 5, points: 200, title: '新星观测员' },
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-16 h-full w-[360px] bg-slate-950/95 border-l border-slate-900 backdrop-blur-xl z-20 shadow-2xl flex flex-col overflow-hidden font-sans"
    >
      {/* 头部 */}
      <div className="h-14 border-b border-slate-900 px-5 flex justify-between items-center bg-slate-950 shrink-0">
        <h3 className="text-xs font-bold tracking-wider text-slate-200 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-yellow-500" />
          星河探索排行榜 (Leaderboard)
        </h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-950 text-slate-500 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 排行榜列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin select-text">
        {/* 顶部冠军卡片 */}
        <div className="bg-gradient-to-br from-yellow-500/10 via-amber-600/5 to-transparent border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Trophy className="w-24 h-24 text-yellow-500" />
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            #1
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-100">{users[0].username}</span>
              <Medal className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <p className="text-[10px] text-yellow-500 font-medium tracking-wide mt-0.5">{users[0].title}</p>
            <div className="flex gap-3 mt-1.5 text-[10px] text-slate-400">
              <span>通关: <strong className="text-slate-200">{users[0].challengesCompleted}</strong></span>
              <span>得分: <strong className="text-slate-200">{users[0].points}</strong></span>
            </div>
          </div>
        </div>

        {/* 排名名次列表 */}
        <div className="space-y-2">
          {users.slice(1).map((u) => {
            const isTop3 = u.rank <= 3;
            return (
              <div 
                key={u.rank}
                className={`flex items-center justify-between p-3 rounded-xl transition ${u.isMe ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-slate-900/20 border border-slate-900 hover:border-slate-850'}`}
              >
                <div className="flex items-center gap-3">
                  {/* 名次数字 */}
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                    u.rank === 2 ? 'bg-slate-700 text-slate-200' :
                    u.rank === 3 ? 'bg-amber-800/60 text-amber-300' :
                    'bg-slate-950 text-slate-500'
                  }`}>
                    {u.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${u.isMe ? 'text-indigo-400' : 'text-slate-200'}`}>
                        {u.username}
                      </span>
                      {u.isMe && <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 block">{u.title}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-slate-300">{u.points} pts</span>
                  <span className="text-[9px] text-slate-600 block mt-0.5">已通 {u.challengesCompleted} 关</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
