import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  try {
    // 1. 获取 CPU 型号和核心数
    const cpus = os.cpus();
    const cpuModel = cpus.length > 0 ? cpus[0].model : 'Unknown CPU';
    const cpuCores = cpus.length;

    // 2. 内存计算 (单位: 字节 -> GB)
    const totalMemBytes = os.totalmem();
    const freeMemBytes = os.freemem();
    const usedMemBytes = totalMemBytes - freeMemBytes;

    const totalMemGB = parseFloat((totalMemBytes / (1024 * 1024 * 1024)).toFixed(2));
    const freeMemGB = parseFloat((freeMemBytes / (1024 * 1024 * 1024)).toFixed(2));
    const usedMemGB = parseFloat((usedMemBytes / (1024 * 1024 * 1024)).toFixed(2));
    const memoryUsagePercent = parseFloat(((usedMemBytes / totalMemBytes) * 100).toFixed(1));

    // 3. 系统负载 (Load Average)
    const loadAvg = os.loadavg(); // 返回 [1, 5, 15] 分钟的负载

    // 4. 运行时长 (Uptime, 单位: 秒 -> 小时)
    const uptimeHours = parseFloat((os.uptime() / 3600).toFixed(1));

    // 5. 组装物理服务器监控数据
    const sysInfo = {
      osType: os.type(), // 'Linux', 'Windows_NT', 'Darwin'
      osRelease: os.release(), // 内核版本
      osArch: os.arch(), // 'x64', 'arm64'
      cpuModel,
      cpuCores,
      totalMemoryGB: totalMemGB,
      freeMemoryGB: freeMemGB,
      usedMemoryGB: usedMemGB,
      memoryUsagePercent,
      loadAvg1Min: parseFloat(loadAvg[0].toFixed(2)),
      loadAvg5Min: parseFloat(loadAvg[1].toFixed(2)),
      loadAvg15Min: parseFloat(loadAvg[2].toFixed(2)),
      nodeVersion: process.version,
      uptimeHours,
      processMemoryMB: parseFloat((process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(1))
    };

    return NextResponse.json(sysInfo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
