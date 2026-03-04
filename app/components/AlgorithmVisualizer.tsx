'use client';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AlgorithmVisualizerProps {
  algorithm: string;
  data: number[];
  speed?: number;
}

export default function AlgorithmVisualizer({ 
  algorithm, 
  data, 
  speed = 1000 
}: AlgorithmVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // 初始化 3D 场景
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    // 更炫酷的渐变背景
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 10, 50);
    
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 6, 18); // 降低 y 坐标，从 8 改为 6
    camera.lookAt(0, 2, 0); // 看向稍微高一点的位置

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 更丰富的光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // 添加彩色点光源
    const pointLight1 = new THREE.PointLight(0x00ffff, 0.5, 50);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 50);
    pointLight2.position.set(10, 5, -5);
    scene.add(pointLight2);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // 添加相机动画
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      
      // 相机轻微摆动 - 调整高度范围
      camera.position.x = Math.sin(time * 0.3) * 2;
      camera.position.y = 6 + Math.sin(time * 0.5) * 0.8; // 从 8 改为 6，摆动幅度从 1 改为 0.8
      camera.lookAt(0, 2, 0); // 看向稍微高一点的位置

      // 光源动画
      pointLight1.position.x = Math.sin(time) * 10;
      pointLight1.position.z = Math.cos(time) * 10;
      pointLight2.position.x = Math.cos(time) * 10;
      pointLight2.position.z = Math.sin(time) * 10;

      renderer.render(scene, camera);
    };
    animate();

    // 响应式调整
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // 生成算法步骤
  useEffect(() => {
    const generatedSteps = generateAlgorithmSteps(algorithm, [...data]);
    setSteps(generatedSteps);
    setCurrentStep(0);
  }, [algorithm, data]);

  // 渲染当前步骤
  useEffect(() => {
    if (!sceneRef.current || steps.length === 0) return;
    
    renderStep(sceneRef.current, steps[currentStep], data);
  }, [currentStep, steps, data]);

  // 自动播放
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      {/* 3D 画布 */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-[400px]"
      />

      {/* 控制面板 */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⏮ 上一步
            </button>
            
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ▶ 播放
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                ⏸ 暂停
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={currentStep >= steps.length - 1}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一步 ⏭
            </button>
            
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🔄 重置
            </button>
          </div>

          <div className="text-white">
            步骤: {currentStep + 1} / {steps.length}
          </div>
        </div>

        {/* 步骤说明 */}
        {steps[currentStep] && (
          <div className="bg-slate-700 p-3 rounded-lg">
            <div className="text-blue-400 text-sm font-semibold mb-1">
              {steps[currentStep].title}
            </div>
            <div className="text-gray-300 text-sm">
              {steps[currentStep].description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 生成算法步骤
function generateAlgorithmSteps(algorithm: string, data: number[]) {
  switch (algorithm) {
    // 排序算法 - 使用用户输入的数据
    case 'bubble':
      return generateBubbleSortSteps(data);
    case 'quick':
      return generateQuickSortSteps(data);
    case 'merge':
      return generateMergeSortSteps(data);
    case 'heap':
      return generateHeapSortSteps(data);
    case 'insertion':
      return generateInsertionSortSteps(data);
    case 'selection':
      return generateSelectionSortSteps(data);
    // 查找算法 - 使用用户输入的数据
    case 'binary':
      return generateBinarySearchSteps(data);
    case 'linear':
      return generateLinearSearchSteps(data);
    case 'fibonacci':
      return generateFibonacciSteps(data.length);
    // 数学可视化 - 不使用用户数据，自己生成
    case 'sine-wave':
      return generateSineWaveSteps();
    case 'spiral':
      return generateSpiralSteps();
    case 'mandelbrot':
      return generateMandelbrotSteps();
    case 'lorenz':
      return generateLorenzSteps();
    case 'wave-3d':
      return generateWave3DSteps();
    case 'torus':
      return generateTorusSteps();
    case 'klein':
      return generateKleinBottleSteps();
    // 机器学习 - 不使用用户数据，自己生成
    case 'kmeans':
      return generateKMeansSteps();
    case 'linear-regression':
      return generateLinearRegressionSteps();
    case 'neural-network':
      return generateNeuralNetworkSteps();
    case 'gradient-descent':
      return generateGradientDescentSteps();
    case 'decision-tree':
      return generateDecisionTreeSteps();
    default:
      return [];
  }
}

// 冒泡排序步骤
function generateBubbleSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  steps.push({
    title: '开始冒泡排序',
    description: '比较相邻元素，如果顺序错误就交换',
    array: [...data],
    comparing: [],
    sorted: []
  });

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      steps.push({
        title: `比较 ${data[j]} 和 ${data[j + 1]}`,
        description: data[j] > data[j + 1] ? '需要交换' : '顺序正确',
        array: [...data],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k)
      });

      if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
        steps.push({
          title: '交换完成',
          description: `${data[j + 1]} 和 ${data[j]} 已交换`,
          array: [...data],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => data.length - 1 - k)
        });
      }
    }
  }

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    comparing: [],
    sorted: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

// 快速排序步骤
function generateQuickSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  function quickSort(arr: number[], low: number, high: number, depth: number = 0) {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, depth);
      quickSort(arr, low, pivotIndex - 1, depth + 1);
      quickSort(arr, pivotIndex + 1, high, depth + 1);
    }
  }

  function partition(arr: number[], low: number, high: number, depth: number) {
    const pivot = arr[high];
    steps.push({
      title: `选择基准值: ${pivot}`,
      description: `深度 ${depth}，分区范围 [${low}, ${high}]`,
      array: [...arr],
      pivot: high,
      comparing: [],
      sorted: []
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        title: `比较 ${arr[j]} 和基准值 ${pivot}`,
        description: arr[j] <= pivot ? '小于等于基准，移到左侧' : '大于基准，保持位置',
        array: [...arr],
        pivot: high,
        comparing: [j],
        sorted: []
      });

      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if (i !== j) {
          steps.push({
            title: '交换元素',
            description: `${arr[j]} 和 ${arr[i]} 交换位置`,
            array: [...arr],
            pivot: high,
            comparing: [i, j],
            sorted: []
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      title: '基准值归位',
      description: `${pivot} 放到正确位置 ${i + 1}`,
      array: [...arr],
      pivot: i + 1,
      comparing: [],
      sorted: [i + 1]
    });

    return i + 1;
  }

  steps.push({
    title: '开始快速排序',
    description: '选择基准值，分区排序',
    array: [...data],
    pivot: -1,
    comparing: [],
    sorted: []
  });

  quickSort(data, 0, data.length - 1);

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    pivot: -1,
    comparing: [],
    sorted: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

// 归并排序步骤
function generateMergeSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  function mergeSort(arr: number[], left: number, right: number, depth: number = 0) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        title: `分割数组 (深度 ${depth})`,
        description: `将 [${left}, ${right}] 分为 [${left}, ${mid}] 和 [${mid + 1}, ${right}]`,
        array: [...arr],
        dividing: [left, mid, right],
        merging: []
      });

      mergeSort(arr, left, mid, depth + 1);
      mergeSort(arr, mid + 1, right, depth + 1);
      merge(arr, left, mid, right, depth);
    }
  }

  function merge(arr: number[], left: number, mid: number, right: number, depth: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    steps.push({
      title: `合并数组 (深度 ${depth})`,
      description: `合并 [${leftArr.join(', ')}] 和 [${rightArr.join(', ')}]`,
      array: [...arr],
      dividing: [],
      merging: [left, right]
    });

    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
      
      steps.push({
        title: '合并中...',
        description: `当前结果: [${arr.slice(left, k).join(', ')}]`,
        array: [...arr],
        dividing: [],
        merging: [left, k - 1]
      });
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    steps.push({
      title: '合并完成',
      description: `区间 [${left}, ${right}] 已排序`,
      array: [...arr],
      dividing: [],
      merging: [left, right]
    });
  }

  steps.push({
    title: '开始归并排序',
    description: '分治法：分割、排序、合并',
    array: [...data],
    dividing: [],
    merging: []
  });

  mergeSort(data, 0, data.length - 1);

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    dividing: [],
    merging: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

// 二分查找步骤
function generateBinarySearchSteps(arr: number[]) {
  const steps = [];
  const sortedArr = [...arr].sort((a, b) => a - b);
  const target = sortedArr[Math.floor(sortedArr.length / 2)];
  
  steps.push({
    title: '开始二分查找',
    description: `在有序数组中查找目标值: ${target}`,
    array: [...sortedArr],
    left: 0,
    right: sortedArr.length - 1,
    mid: -1,
    found: false
  });

  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      title: `检查中间位置 ${mid}`,
      description: `中间值: ${sortedArr[mid]}, 目标值: ${target}`,
      array: [...sortedArr],
      left,
      right,
      mid,
      found: false
    });

    if (sortedArr[mid] === target) {
      steps.push({
        title: '找到目标！',
        description: `在位置 ${mid} 找到目标值 ${target}`,
        array: [...sortedArr],
        left,
        right,
        mid,
        found: true
      });
      break;
    } else if (sortedArr[mid] < target) {
      steps.push({
        title: '目标在右半部分',
        description: `${sortedArr[mid]} < ${target}，搜索右半部分`,
        array: [...sortedArr],
        left: mid + 1,
        right,
        mid,
        found: false
      });
      left = mid + 1;
    } else {
      steps.push({
        title: '目标在左半部分',
        description: `${sortedArr[mid]} > ${target}，搜索左半部分`,
        array: [...sortedArr],
        left,
        right: mid - 1,
        mid,
        found: false
      });
      right = mid - 1;
    }
  }

  return steps;
}

// 堆排序步骤
function generateHeapSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  steps.push({
    title: '开始堆排序',
    description: '构建最大堆，然后逐个取出最大值',
    array: [...data],
    comparing: [],
    sorted: []
  });

  // 构建最大堆
  const n = data.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(data, n, i, steps);
  }

  steps.push({
    title: '最大堆构建完成',
    description: '根节点是最大值',
    array: [...data],
    comparing: [],
    sorted: []
  });

  // 逐个取出最大值
  for (let i = n - 1; i > 0; i--) {
    [data[0], data[i]] = [data[i], data[0]];
    steps.push({
      title: '交换根节点和末尾',
      description: `将最大值 ${data[i]} 放到位置 ${i}`,
      array: [...data],
      comparing: [0, i],
      sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
    });

    heapify(data, i, 0, steps);
  }

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    comparing: [],
    sorted: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

function heapify(arr: number[], n: number, i: number, steps: any[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    steps.push({
      title: `调整堆结构`,
      description: `交换 ${arr[i]} 和 ${arr[largest]}`,
      array: [...arr],
      comparing: [i, largest],
      sorted: []
    });

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, steps);
  }
}

// 正弦波可视化
function generateSineWaveSteps() {
  const steps = [];
  const points = 100;
  
  for (let frame = 0; frame <= 60; frame++) {
    const phase = (frame / 60) * Math.PI * 2;
    const waveData = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * Math.PI * 4;
      const y = Math.sin(x + phase);
      const z = Math.cos(x + phase) * 0.5;
      waveData.push({ x: (i - points / 2) * 0.2, y: y * 3, z: z * 2 });
    }
    
    steps.push({
      title: '正弦波动画',
      description: `帧 ${frame + 1}/60 - 波形传播`,
      type: 'wave',
      data: waveData
    });
  }
  
  return steps;
}

// 螺旋线可视化
function generateSpiralSteps() {
  const steps = [];
  const points = 200;
  
  for (let frame = 0; frame <= 60; frame++) {
    const spiralData = [];
    const maxT = (frame + 1) / 60 * Math.PI * 8;
    
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * maxT;
      const r = t * 0.5;
      const x = r * Math.cos(t);
      const y = t * 0.3;
      const z = r * Math.sin(t);
      spiralData.push({ x, y, z });
    }
    
    steps.push({
      title: '螺旋线生成',
      description: `绘制进度: ${Math.round((frame + 1) / 60 * 100)}%`,
      type: 'spiral',
      data: spiralData
    });
  }
  
  return steps;
}

// 曼德博集合可视化
function generateMandelbrotSteps() {
  const steps = [];
  const size = 50;
  
  for (let zoom = 1; zoom <= 10; zoom++) {
    const mandelbrotData = [];
    const scale = 3 / zoom;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x0 = (i / size - 0.5) * scale - 0.5;
        const y0 = (j / size - 0.5) * scale;
        
        let x = 0, y = 0;
        let iteration = 0;
        const maxIteration = 50;
        
        while (x * x + y * y <= 4 && iteration < maxIteration) {
          const xtemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xtemp;
          iteration++;
        }
        
        const height = (iteration / maxIteration) * 5;
        mandelbrotData.push({
          x: (i - size / 2) * 0.3,
          y: height,
          z: (j - size / 2) * 0.3,
          color: iteration / maxIteration
        });
      }
    }
    
    steps.push({
      title: '曼德博集合',
      description: `缩放级别: ${zoom}/10`,
      type: 'mandelbrot',
      data: mandelbrotData
    });
  }
  
  return steps;
}

// 洛伦兹吸引子
function generateLorenzSteps() {
  const steps = [];
  const dt = 0.01;
  const sigma = 10, rho = 28, beta = 8 / 3;
  
  for (let frame = 0; frame <= 100; frame++) {
    const lorenzData = [];
    let x = 0.1, y = 0, z = 0;
    
    for (let i = 0; i < frame * 10; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      
      x += dx;
      y += dy;
      z += dz;
      
      if (i % 2 === 0) {
        lorenzData.push({ x: x * 0.1, y: y * 0.1, z: z * 0.1 });
      }
    }
    
    steps.push({
      title: '洛伦兹吸引子',
      description: `轨迹点数: ${lorenzData.length}`,
      type: 'lorenz',
      data: lorenzData
    });
  }
  
  return steps;
}

// 3D 波浪
function generateWave3DSteps() {
  const steps = [];
  const size = 30;
  
  for (let frame = 0; frame <= 60; frame++) {
    const waveData = [];
    const time = (frame / 60) * Math.PI * 2;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = (i - size / 2) * 0.5;
        const z = (j - size / 2) * 0.5;
        const distance = Math.sqrt(x * x + z * z);
        const y = Math.sin(distance - time) * Math.cos(distance * 0.5) * 2;
        
        waveData.push({ x, y, z });
      }
    }
    
    steps.push({
      title: '3D 波浪动画',
      description: `帧 ${frame + 1}/60`,
      type: 'wave3d',
      data: waveData
    });
  }
  
  return steps;
}

// 环面（甜甜圈）
function generateTorusSteps() {
  const steps = [];
  const R = 3, r = 1;
  
  for (let frame = 0; frame <= 60; frame++) {
    const torusData = [];
    const rotation = (frame / 60) * Math.PI * 2;
    
    for (let i = 0; i <= 40; i++) {
      for (let j = 0; j <= 20; j++) {
        const u = (i / 40) * Math.PI * 2;
        const v = (j / 20) * Math.PI * 2;
        
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        
        // 旋转
        const xRot = x * Math.cos(rotation) - z * Math.sin(rotation);
        const zRot = x * Math.sin(rotation) + z * Math.cos(rotation);
        
        torusData.push({ x: xRot, y, z: zRot });
      }
    }
    
    steps.push({
      title: '环面旋转',
      description: `旋转角度: ${Math.round((frame / 60) * 360)}°`,
      type: 'torus',
      data: torusData
    });
  }
  
  return steps;
}

// 克莱因瓶
function generateKleinBottleSteps() {
  const steps = [];
  
  for (let frame = 0; frame <= 60; frame++) {
    const kleinData = [];
    const rotation = (frame / 60) * Math.PI * 2;
    
    for (let i = 0; i <= 40; i++) {
      for (let j = 0; j <= 40; j++) {
        const u = (i / 40) * Math.PI * 2;
        const v = (j / 40) * Math.PI * 2;
        
        const r = 4 * (1 - Math.cos(u) / 2);
        let x, y, z;
        
        if (u < Math.PI) {
          x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(u) * Math.cos(v);
          y = 16 * Math.sin(u) + r * Math.sin(u) * Math.cos(v);
        } else {
          x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(v + Math.PI);
          y = 16 * Math.sin(u);
        }
        z = r * Math.sin(v);
        
        // 缩放和旋转
        const scale = 0.3;
        const xRot = x * Math.cos(rotation) - z * Math.sin(rotation);
        const zRot = x * Math.sin(rotation) + z * Math.cos(rotation);
        
        kleinData.push({ x: xRot * scale, y: y * scale, z: zRot * scale });
      }
    }
    
    steps.push({
      title: '克莱因瓶',
      description: `四维物体的三维投影 - 旋转 ${Math.round((frame / 60) * 360)}°`,
      type: 'klein',
      data: kleinData
    });
  }
  
  return steps;
}

// 插入排序步骤
function generateInsertionSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  steps.push({
    title: '开始插入排序',
    description: '将每个元素插入到已排序部分的正确位置',
    array: [...data],
    comparing: [],
    sorted: [0]
  });

  for (let i = 1; i < data.length; i++) {
    const key = data[i];
    let j = i - 1;

    steps.push({
      title: `选择元素 ${key}`,
      description: `将 ${key} 插入到已排序部分`,
      array: [...data],
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k)
    });

    while (j >= 0 && data[j] > key) {
      steps.push({
        title: `比较 ${data[j]} 和 ${key}`,
        description: `${data[j]} > ${key}，向右移动`,
        array: [...data],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k)
      });

      data[j + 1] = data[j];
      j--;
    }

    data[j + 1] = key;
    
    steps.push({
      title: '插入完成',
      description: `${key} 已插入到位置 ${j + 1}`,
      array: [...data],
      comparing: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k)
    });
  }

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    comparing: [],
    sorted: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

// 选择排序步骤
function generateSelectionSortSteps(arr: number[]) {
  const steps = [];
  const data = [...arr];
  
  steps.push({
    title: '开始选择排序',
    description: '每次选择最小元素放到前面',
    array: [...data],
    comparing: [],
    sorted: []
  });

  for (let i = 0; i < data.length - 1; i++) {
    let minIdx = i;

    steps.push({
      title: `寻找最小值`,
      description: `在位置 ${i} 到 ${data.length - 1} 中查找`,
      array: [...data],
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k)
    });

    for (let j = i + 1; j < data.length; j++) {
      steps.push({
        title: `比较 ${data[minIdx]} 和 ${data[j]}`,
        description: data[j] < data[minIdx] ? '找到更小的值' : '当前最小值不变',
        array: [...data],
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k)
      });

      if (data[j] < data[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [data[i], data[minIdx]] = [data[minIdx], data[i]];
      steps.push({
        title: '交换元素',
        description: `将最小值 ${data[i]} 放到位置 ${i}`,
        array: [...data],
        comparing: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      });
    }
  }

  steps.push({
    title: '排序完成！',
    description: '所有元素已按升序排列',
    array: [...data],
    comparing: [],
    sorted: Array.from({ length: data.length }, (_, i) => i)
  });

  return steps;
}

// 线性查找步骤
function generateLinearSearchSteps(arr: number[]) {
  const steps = [];
  const target = arr[Math.floor(arr.length / 2)];
  
  steps.push({
    title: '开始线性查找',
    description: `顺序查找目标值: ${target}`,
    array: [...arr],
    comparing: [],
    found: false
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      title: `检查位置 ${i}`,
      description: `当前值: ${arr[i]}, 目标值: ${target}`,
      array: [...arr],
      comparing: [i],
      found: false
    });

    if (arr[i] === target) {
      steps.push({
        title: '找到目标！',
        description: `在位置 ${i} 找到目标值 ${target}`,
        array: [...arr],
        comparing: [i],
        found: true
      });
      break;
    }
  }

  return steps;
}

// 斐波那契数列步骤
function generateFibonacciSteps(n: number) {
  const steps = [];
  const fib = [0, 1];
  
  steps.push({
    title: '开始生成斐波那契数列',
    description: `生成前 ${n} 个斐波那契数`,
    array: [0, 1],
    comparing: [],
    sorted: []
  });

  for (let i = 2; i < n; i++) {
    const next = fib[i - 1] + fib[i - 2];
    fib.push(next);
    
    steps.push({
      title: `计算第 ${i + 1} 个数`,
      description: `${fib[i - 2]} + ${fib[i - 1]} = ${next}`,
      array: [...fib],
      comparing: [i - 2, i - 1, i],
      sorted: []
    });
  }

  steps.push({
    title: '生成完成！',
    description: `前 ${n} 个斐波那契数已生成`,
    array: [...fib],
    comparing: [],
    sorted: Array.from({ length: fib.length }, (_, i) => i)
  });

  return steps;
}

// 渲染步骤到 3D 场景
function renderStep(scene: THREE.Scene, step: any, originalData: number[]) {
  // 清除之前的对象（保留前4个光源：ambient, main, point1, point2）
  while (scene.children.length > 4) {
    const obj = scene.children[4];
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points || obj instanceof THREE.Sprite || obj instanceof THREE.GridHelper) {
      if (obj.geometry) {
        obj.geometry.dispose();
      }
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }
    scene.remove(obj);
  }

  if (!step) return;

  // 根据类型渲染不同的可视化
  if (step.type) {
    switch (step.type) {
      case 'wave':
        renderWave(scene, step);
        return;
      case 'spiral':
        renderSpiral(scene, step);
        return;
      case 'mandelbrot':
        renderMandelbrot(scene, step);
        return;
      case 'lorenz':
        renderLorenz(scene, step);
        return;
      case 'wave3d':
        renderWave3D(scene, step);
        return;
      case 'torus':
        renderTorus(scene, step);
        return;
      case 'klein':
        renderKlein(scene, step);
        return;
      case 'kmeans':
        renderKMeans(scene, step);
        return;
      case 'linear-regression':
        renderLinearRegression(scene, step);
        return;
      case 'neural-network':
        renderNeuralNetwork(scene, step);
        return;
      case 'gradient-descent':
        renderGradientDescent(scene, step);
        return;
      case 'decision-tree':
        renderDecisionTree(scene, step);
        return;
    }
  }

  if (!step.array) return;

  const array = step.array;
  const maxValue = Math.max(...array); // 使用当前数组而不是原始数据
  const spacing = 1.8;
  const startX = -(array.length * spacing) / 2;

  array.forEach((value: number, index: number) => {
    const height = (value / maxValue) * 10 + 0.5;
    
    // 创建更炫酷的圆柱体
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, height, 32);
    
    // 根据状态设置颜色和发光
    let color = 0x3b82f6;
    let emissiveIntensity = 0.3;
    let scale = 1;
    
    if (step.comparing && step.comparing.includes(index)) {
      color = 0xfbbf24; // 金色 - 正在比较
      emissiveIntensity = 1.0;
      scale = 1.15;
    } else if (step.sorted && step.sorted.includes(index)) {
      color = 0x10b981; // 绿色 - 已排序
      emissiveIntensity = 0.6;
    } else if (step.pivot === index) {
      color = 0xef4444; // 红色 - 基准值
      emissiveIntensity = 1.2;
      scale = 1.2;
    } else if (step.merging && index >= step.merging[0] && index <= step.merging[1]) {
      color = 0xa855f7; // 紫色 - 正在合并
      emissiveIntensity = 0.7;
    } else if (step.mid === index) {
      color = 0xf59e0b; // 橙色 - 中间值
      emissiveIntensity = 0.8;
      scale = 1.1;
    } else if (step.found && step.mid === index) {
      color = 0x22c55e; // 亮绿 - 找到目标
      emissiveIntensity = 1.5;
      scale = 1.3;
    } else if (step.left !== undefined && step.right !== undefined) {
      if (index < step.left || index > step.right) {
        color = 0x64748b; // 灰色 - 搜索范围外
        emissiveIntensity = 0.1;
        scale = 0.85;
      }
    }
    
    // 使用更炫酷的材质 - 金属光泽
    const material = new THREE.MeshStandardMaterial({ 
      color,
      emissive: color,
      emissiveIntensity,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95
    });
    
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.x = startX + index * spacing;
    cylinder.position.y = height / 2;
    cylinder.scale.set(scale, 1, scale);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    
    // 添加脉动动画
    if (step.comparing && step.comparing.includes(index)) {
      const pulse = Math.sin(Date.now() * 0.005) * 0.1 + 1;
      cylinder.scale.set(scale * pulse, 1, scale * pulse);
      cylinder.rotation.y = Math.sin(Date.now() * 0.003) * 0.2;
    }
    
    scene.add(cylinder);

    // 添加更炫的发光环效果
    if (step.comparing && step.comparing.includes(index) || 
        step.pivot === index || 
        (step.found && step.mid === index)) {
      // 主光环
      const ringGeometry = new THREE.TorusGeometry(0.7, 0.12, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(cylinder.position.x, height + 0.5, 0);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      
      // 外层光环
      const ring2Geometry = new THREE.TorusGeometry(0.9, 0.08, 16, 100);
      const ring2Material = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.4
      });
      const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
      ring2.position.set(cylinder.position.x, height + 0.5, 0);
      ring2.rotation.x = Math.PI / 2;
      scene.add(ring2);
    }

    // 添加数字标签（更大更清晰，带阴影）
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 128;
    canvas.height = 128;
    
    // 添加发光背景圆形
    const gradient = context.createRadialGradient(64, 64, 20, 64, 64, 50);
    gradient.addColorStop(0, `rgba(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}, 0.9)`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(64, 64, 50, 0, Math.PI * 2);
    context.fill();
    
    // 绘制数字（带阴影）
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.fillStyle = 'white';
    context.font = 'bold 52px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(value.toString(), 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(cylinder.position.x, height + 1.8, 0);
    sprite.scale.set(1.8, 1.8, 1);
    scene.add(sprite);

    // 添加更炫的底座光晕
    const baseGeometry = new THREE.CylinderGeometry(0.75, 0.85, 0.15, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      emissive: color,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(cylinder.position.x, 0.08, 0);
    base.receiveShadow = true;
    scene.add(base);
    
    // 添加底部光圈
    const glowGeometry = new THREE.RingGeometry(0.6, 1.0, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(cylinder.position.x, 0.01, 0);
    scene.add(glow);
  });

  // 添加更炫酷的网格地面
  const gridSize = array.length * spacing + 6;
  const gridHelper = new THREE.GridHelper(gridSize, array.length + 4, 0x00ffff, 0x1e293b);
  gridHelper.position.y = 0;
  gridHelper.material.opacity = 0.4;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // 添加发光地面反射平面
  const planeGeometry = new THREE.PlaneGeometry(gridSize, gridSize);
  const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0a0e27,
    metalness: 1.0,
    roughness: 0.05,
    transparent: true,
    opacity: 0.6,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.2
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);
  
  // 添加边框光效
  const borderGeometry = new THREE.EdgesGeometry(planeGeometry);
  const borderMaterial = new THREE.LineBasicMaterial({ 
    color: 0x00ffff,
    transparent: true,
    opacity: 0.6
  });
  const border = new THREE.LineSegments(borderGeometry, borderMaterial);
  border.rotation.x = -Math.PI / 2;
  border.position.y = 0.01;
  scene.add(border);
}

// 渲染正弦波
function renderWave(scene: THREE.Scene, step: any) {
  const points = step.data.map((p: any) => new THREE.Vector3(p.x, p.y, p.z));
  
  // 使用管道几何体代替简单线条
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.15, 8, false);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 0.8,
    metalness: 0.8,
    roughness: 0.2
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);

  // 添加发光粒子
  step.data.forEach((p: any, i: number) => {
    if (i % 3 === 0) {
      const sphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const hue = (i / step.data.length) * 0.3 + 0.5;
      const color = new THREE.Color().setHSL(hue, 1, 0.6);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.2
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(p.x, p.y, p.z);
      scene.add(sphere);
      
      // 添加光晕
      const glowGeometry = new THREE.SphereGeometry(0.35, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.set(p.x, p.y, p.z);
      scene.add(glow);
    }
  });
}

// 渲染螺旋线
function renderSpiral(scene: THREE.Scene, step: any) {
  const points = step.data.map((p: any) => new THREE.Vector3(p.x, p.y, p.z));
  
  // 使用彩色管道
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.12, 8, false);
  
  // 创建彩虹渐变色
  const colors = [];
  const positions = tubeGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const t = i / positions.count;
    const color = new THREE.Color().setHSL(t * 0.8, 1, 0.6);
    colors.push(color.r, color.g, color.b);
  }
  tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const tubeMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0xffffff,
    emissiveIntensity: 0.3
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);
  
  // 添加起点和终点标记
  if (step.data.length > 0) {
    const startPoint = step.data[0];
    const endPoint = step.data[step.data.length - 1];
    
    [startPoint, endPoint].forEach((point, idx) => {
      const markerGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0x00ff00 : 0xff0000,
        emissive: idx === 0 ? 0x00ff00 : 0xff0000,
        emissiveIntensity: 1.5,
        metalness: 0.8
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(point.x, point.y, point.z);
      scene.add(marker);
    });
  }
}

// 渲染曼德博集合
function renderMandelbrot(scene: THREE.Scene, step: any) {
  // 使用实例化网格提高性能
  const boxGeometry = new THREE.BoxGeometry(0.28, 1, 0.28);
  
  step.data.forEach((p: any) => {
    if (p.y > 0.2) {
      const height = p.y;
      const hue = p.color * 0.7 + 0.15;
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.6,
        roughness: 0.3
      });
      
      const cube = new THREE.Mesh(boxGeometry, material);
      cube.position.set(p.x, height / 2, p.z);
      cube.scale.y = height;
      cube.castShadow = true;
      scene.add(cube);
      
      // 添加顶部发光点
      if (p.color > 0.8) {
        const topGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const topMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.set(p.x, height + 0.2, p.z);
        scene.add(top);
      }
    }
  });
}

// 渲染洛伦兹吸引子
function renderLorenz(scene: THREE.Scene, step: any) {
  if (step.data.length < 2) return;
  
  const points = step.data.map((p: any) => new THREE.Vector3(p.x, p.y, p.z));
  
  // 使用彩色管道
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeometry = new THREE.TubeGeometry(curve, Math.min(points.length * 2, 500), 0.08, 8, false);
  
  // 创建渐变色
  const colors = [];
  const positions = tubeGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const t = i / positions.count;
    const color = new THREE.Color().setHSL(0.6 - t * 0.4, 1, 0.5);
    colors.push(color.r, color.g, color.b);
  }
  tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const tubeMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xffffff,
    emissiveIntensity: 0.4
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);

  // 添加运动的轨迹球
  if (step.data.length > 0) {
    const lastPoint = step.data[step.data.length - 1];
    const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 1.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(lastPoint.x, lastPoint.y, lastPoint.z);
    scene.add(sphere);
    
    // 添加光晕
    const glowGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(lastPoint.x, lastPoint.y, lastPoint.z);
    scene.add(glow);
  }
}

// 渲染 3D 波浪
function renderWave3D(scene: THREE.Scene, step: any) {
  const size = Math.sqrt(step.data.length);
  
  for (let i = 0; i < step.data.length; i++) {
    const p = step.data[i];
    
    const height = Math.abs(p.y) + 0.3;
    const geometry = new THREE.CylinderGeometry(0.18, 0.18, height, 16);
    
    const hue = (p.y + 2.5) / 5;
    const color = new THREE.Color().setHSL(hue * 0.6 + 0.15, 1, 0.5);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.3
    });
    
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(p.x, p.y, p.z);
    cylinder.castShadow = true;
    scene.add(cylinder);
    
    // 添加顶部发光球
    if (Math.abs(p.y) > 1.5) {
      const topGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const topMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.set(p.x, p.y + height / 2 + 0.15, p.z);
      scene.add(top);
    }
  }
}

// 渲染环面
function renderTorus(scene: THREE.Scene, step: any) {
  const points = step.data.map((p: any) => new THREE.Vector3(p.x, p.y, p.z));
  
  // 使用点云和连接线
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  // 创建彩虹色
  const colors = [];
  for (let i = 0; i < points.length; i++) {
    const t = (i % 41) / 41;
    const color = new THREE.Color().setHSL(t * 0.8 + 0.15, 1, 0.6);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.2,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });
  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
  
  // 添加发光效果
  const glowMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.35,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true
  });
  const glowCloud = new THREE.Points(geometry.clone(), glowMaterial);
  scene.add(glowCloud);
}

// 渲染克莱因瓶
function renderKlein(scene: THREE.Scene, step: any) {
  const points = step.data.map((p: any) => new THREE.Vector3(p.x, p.y, p.z));
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  const colors = [];
  for (let i = 0; i < points.length; i++) {
    const t = (i % 41) / 41;
    const s = Math.floor(i / 41) / 41;
    const color = new THREE.Color().setHSL(t * 0.5 + s * 0.3, 1, 0.6);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.25,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true
  });
  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
  
  // 添加发光层
  const glowMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.4,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true
  });
  const glowCloud = new THREE.Points(geometry.clone(), glowMaterial);
  scene.add(glowCloud);
}



// ==================== 机器学习算法生成函数 ====================

// K-Means 聚类
function generateKMeansSteps() {
  const steps = [];
  const numPoints = 60;
  const k = 3;
  
  // 生成随机数据点
  const points = Array.from({ length: numPoints }, () => ({
    x: (Math.random() - 0.5) * 15,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 15,
    cluster: -1
  }));
  
  // 随机初始化质心
  const centroids = Array.from({ length: k }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 10
  }));
  
  steps.push({
    title: 'K-Means 聚类初始化',
    description: `随机初始化 ${k} 个聚类中心`,
    type: 'kmeans',
    points: points.map(p => ({ ...p })),
    centroids: centroids.map(c => ({ ...c }))
  });
  
  // 迭代 10 次
  for (let iter = 0; iter < 10; iter++) {
    // 分配点到最近的质心
    points.forEach(point => {
      let minDist = Infinity;
      let closestCluster = 0;
      
      centroids.forEach((centroid, i) => {
        const dist = Math.sqrt(
          Math.pow(point.x - centroid.x, 2) +
          Math.pow(point.y - centroid.y, 2) +
          Math.pow(point.z - centroid.z, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          closestCluster = i;
        }
      });
      
      point.cluster = closestCluster;
    });
    
    steps.push({
      title: `迭代 ${iter + 1}: 分配点到聚类`,
      description: '每个点分配到最近的聚类中心',
      type: 'kmeans',
      points: points.map(p => ({ ...p })),
      centroids: centroids.map(c => ({ ...c }))
    });
    
    // 更新质心
    for (let i = 0; i < k; i++) {
      const clusterPoints = points.filter(p => p.cluster === i);
      if (clusterPoints.length > 0) {
        centroids[i].x = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        centroids[i].y = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        centroids[i].z = clusterPoints.reduce((sum, p) => sum + p.z, 0) / clusterPoints.length;
      }
    }
    
    steps.push({
      title: `迭代 ${iter + 1}: 更新质心`,
      description: '重新计算每个聚类的中心点',
      type: 'kmeans',
      points: points.map(p => ({ ...p })),
      centroids: centroids.map(c => ({ ...c }))
    });
  }
  
  return steps;
}

// 线性回归
function generateLinearRegressionSteps() {
  const steps = [];
  const numPoints = 30;
  
  // 生成带噪声的线性数据
  const trueSlope = 2;
  const trueIntercept = 1;
  const points = Array.from({ length: numPoints }, (_, i) => {
    const x = (i / numPoints) * 10 - 5;
    const y = trueSlope * x + trueIntercept + (Math.random() - 0.5) * 3;
    return { x, y, z: 0 };
  });
  
  // 梯度下降拟合
  let slope = 0;
  let intercept = 0;
  const learningRate = 0.01;
  
  for (let iter = 0; iter <= 50; iter++) {
    // 计算预测线
    const linePoints = [];
    for (let x = -5; x <= 5; x += 0.5) {
      const y = slope * x + intercept;
      linePoints.push({ x, y, z: 0 });
    }
    
    // 计算损失
    const loss = points.reduce((sum, p) => {
      const pred = slope * p.x + intercept;
      return sum + Math.pow(p.y - pred, 2);
    }, 0) / numPoints;
    
    steps.push({
      title: `线性回归 - 迭代 ${iter}`,
      description: `斜率: ${slope.toFixed(2)}, 截距: ${intercept.toFixed(2)}, 损失: ${loss.toFixed(2)}`,
      type: 'linear-regression',
      points,
      linePoints,
      slope,
      intercept
    });
    
    // 梯度下降更新
    let slopeGrad = 0;
    let interceptGrad = 0;
    
    points.forEach(p => {
      const pred = slope * p.x + intercept;
      const error = pred - p.y;
      slopeGrad += error * p.x;
      interceptGrad += error;
    });
    
    slope -= learningRate * (slopeGrad / numPoints);
    intercept -= learningRate * (interceptGrad / numPoints);
  }
  
  return steps;
}

// 神经网络
function generateNeuralNetworkSteps() {
  const steps = [];
  
  // 简单的 3 层网络：2-4-1
  const layers = [
    { neurons: 2, positions: [] as any[] },
    { neurons: 4, positions: [] as any[] },
    { neurons: 1, positions: [] as any[] }
  ];
  
  // 计算神经元位置
  layers.forEach((layer, layerIdx) => {
    const x = (layerIdx - 1) * 6;
    for (let i = 0; i < layer.neurons; i++) {
      const y = (i - (layer.neurons - 1) / 2) * 3;
      layer.positions.push({ x, y, z: 0 });
    }
  });
  
  // 前向传播动画
  for (let frame = 0; frame <= 30; frame++) {
    const activeLayer = Math.floor((frame / 30) * 3);
    const activeNeuron = Math.floor(((frame / 30) * 3 - activeLayer) * 
      (layers[Math.min(activeLayer, 2)]?.neurons || 1));
    
    steps.push({
      title: '神经网络前向传播',
      description: `激活层 ${activeLayer + 1}`,
      type: 'neural-network',
      layers,
      activeLayer,
      activeNeuron,
      frame
    });
  }
  
  return steps;
}

// 梯度下降
function generateGradientDescentSteps() {
  const steps = [];
  
  // 创建一个简单的损失函数曲面 z = x^2 + y^2
  const createSurface = () => {
    const surface = [];
    for (let i = -5; i <= 5; i += 0.5) {
      for (let j = -5; j <= 5; j += 0.5) {
        const z = i * i + j * j;
        surface.push({ x: i, y: z * 0.2, z: j });
      }
    }
    return surface;
  };
  
  const surface = createSurface();
  
  // 梯度下降路径
  let x = 4, y = 4;
  const learningRate = 0.1;
  const path = [{ x, y, z: (x * x + y * y) * 0.2 }];
  
  for (let iter = 0; iter <= 40; iter++) {
    steps.push({
      title: '梯度下降优化',
      description: `位置: (${x.toFixed(2)}, ${y.toFixed(2)}), 损失: ${(x * x + y * y).toFixed(2)}`,
      type: 'gradient-descent',
      surface,
      path: [...path],
      current: { x, y, z: (x * x + y * y) * 0.2 }
    });
    
    // 计算梯度并更新
    const gradX = 2 * x;
    const gradY = 2 * y;
    
    x -= learningRate * gradX;
    y -= learningRate * gradY;
    
    path.push({ x, y, z: (x * x + y * y) * 0.2 });
  }
  
  return steps;
}

// 决策树
function generateDecisionTreeSteps() {
  const steps = [];
  
  // 创建决策树结构
  const tree = {
    root: { x: 0, y: 5, z: 0, label: 'Root' },
    nodes: [
      { x: -4, y: 2, z: 0, label: 'Left', parent: 0 },
      { x: 4, y: 2, z: 0, label: 'Right', parent: 0 },
      { x: -6, y: -1, z: 0, label: 'LL', parent: 1 },
      { x: -2, y: -1, z: 0, label: 'LR', parent: 1 },
      { x: 2, y: -1, z: 0, label: 'RL', parent: 2 },
      { x: 6, y: -1, z: 0, label: 'RR', parent: 2 },
    ]
  };
  
  // 逐步构建树
  for (let depth = 0; depth <= tree.nodes.length; depth++) {
    const visibleNodes = tree.nodes.slice(0, depth);
    
    steps.push({
      title: '决策树构建',
      description: `深度 ${Math.floor(Math.log2(depth + 2))}, 节点数: ${depth + 1}`,
      type: 'decision-tree',
      root: tree.root,
      nodes: visibleNodes,
      activeNode: depth - 1
    });
  }
  
  // 决策路径动画
  const paths = [
    [0, 1, 3], // Root -> Left -> LL
    [0, 1, 4], // Root -> Left -> LR
    [0, 2, 5], // Root -> Right -> RL
    [0, 2, 6], // Root -> Right -> RR
  ];
  
  paths.forEach((path, pathIdx) => {
    path.forEach((nodeIdx, step) => {
      steps.push({
        title: `决策路径 ${pathIdx + 1}`,
        description: `遍历节点 ${step + 1}/${path.length}`,
        type: 'decision-tree',
        root: tree.root,
        nodes: tree.nodes,
        activePath: path.slice(0, step + 1)
      });
    });
  });
  
  return steps;
}

// ==================== 机器学习算法渲染函数 ====================

// K-Means 聚类渲染
function renderKMeans(scene: THREE.Scene, step: any) {
  const colors = [
    { main: 0xff3366, glow: 0xff6699 },
    { main: 0x33ff66, glow: 0x66ff99 },
    { main: 0x3366ff, glow: 0x6699ff },
    { main: 0xffff33, glow: 0xffff66 },
    { main: 0xff33ff, glow: 0xff66ff }
  ];
  
  // 渲染数据点
  step.points.forEach((point: any) => {
    const geometry = new THREE.SphereGeometry(0.25, 16, 16);
    const colorSet = point.cluster >= 0 ? colors[point.cluster] : { main: 0x888888, glow: 0xaaaaaa };
    const material = new THREE.MeshStandardMaterial({
      color: colorSet.main,
      emissive: colorSet.main,
      emissiveIntensity: 0.5,
      metalness: 0.6,
      roughness: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point.x, point.y, point.z);
    scene.add(sphere);
    
    // 添加光晕
    const glowGeometry = new THREE.SphereGeometry(0.35, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: colorSet.glow,
      transparent: true,
      opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(point.x, point.y, point.z);
    scene.add(glow);
  });
  
  // 渲染质心
  step.centroids.forEach((centroid: any, i: number) => {
    const colorSet = colors[i];
    
    // 主质心球
    const geometry = new THREE.SphereGeometry(0.6, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: colorSet.main,
      emissive: colorSet.main,
      emissiveIntensity: 1.2,
      metalness: 0.9,
      roughness: 0.1
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(centroid.x, centroid.y, centroid.z);
    scene.add(sphere);
    
    // 三层光环
    for (let j = 0; j < 3; j++) {
      const ringGeometry = new THREE.TorusGeometry(0.9 + j * 0.3, 0.08, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: colorSet.glow,
        transparent: true,
        opacity: 0.6 - j * 0.15
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(centroid.x, centroid.y, centroid.z);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    }
  });
}

// 线性回归渲染
function renderLinearRegression(scene: THREE.Scene, step: any) {
  // 渲染数据点（更大更亮）
  step.points.forEach((point: any) => {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(point.x, point.y, 0);
    scene.add(sphere);
    
    // 添加光晕
    const glowGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(point.x, point.y, 0);
    scene.add(glow);
  });
  
  // 渲染回归线（使用管道）
  const linePoints = step.linePoints.map((p: any) => new THREE.Vector3(p.x, p.y, 0));
  const curve = new THREE.CatmullRomCurve3(linePoints);
  const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.12, 8, false);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3366,
    emissive: 0xff3366,
    emissiveIntensity: 1.0,
    metalness: 0.8,
    roughness: 0.2
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);
  
  // 渲染误差线（更细更透明）
  step.points.forEach((point: any) => {
    const predY = step.slope * point.x + step.intercept;
    const errorPoints = [
      new THREE.Vector3(point.x, point.y, 0),
      new THREE.Vector3(point.x, predY, 0)
    ];
    const errorGeometry = new THREE.BufferGeometry().setFromPoints(errorPoints);
    const errorMaterial = new THREE.LineBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.4
    });
    const errorLine = new THREE.Line(errorGeometry, errorMaterial);
    scene.add(errorLine);
  });
}

// 神经网络渲染
function renderNeuralNetwork(scene: THREE.Scene, step: any) {
  const layerColors = [
    { main: 0x00ffff, glow: 0x66ffff },
    { main: 0xff00ff, glow: 0xff66ff },
    { main: 0xffff00, glow: 0xffff66 }
  ];
  
  // 渲染连接（先渲染，这样神经元会在上层）
  step.layers.forEach((layer: any, layerIdx: number) => {
    if (layerIdx < step.layers.length - 1) {
      const nextLayer = step.layers[layerIdx + 1];
      layer.positions.forEach((pos1: any, idx1: number) => {
        nextLayer.positions.forEach((pos2: any, idx2: number) => {
          const isActive = layerIdx === step.activeLayer && idx1 === step.activeNeuron;
          const points = [
            new THREE.Vector3(pos1.x, pos1.y, pos1.z),
            new THREE.Vector3(pos2.x, pos2.y, pos2.z)
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: isActive ? layerColors[layerIdx].main : 0x444444,
            transparent: true,
            opacity: isActive ? 0.8 : 0.2
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        });
      });
    }
  });
  
  // 渲染神经元
  step.layers.forEach((layer: any, layerIdx: number) => {
    const colorSet = layerColors[layerIdx] || layerColors[0];
    layer.positions.forEach((pos: any, neuronIdx: number) => {
      const isActive = layerIdx === step.activeLayer && neuronIdx === step.activeNeuron;
      const size = isActive ? 0.6 : 0.35;
      
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: colorSet.main,
        emissive: colorSet.main,
        emissiveIntensity: isActive ? 1.5 : 0.4,
        metalness: 0.8,
        roughness: 0.2
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y, pos.z);
      scene.add(sphere);
      
      // 激活神经元添加脉冲光环
      if (isActive) {
        for (let i = 0; i < 2; i++) {
          const ringGeometry = new THREE.TorusGeometry(size + 0.2 + i * 0.2, 0.05, 16, 100);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: colorSet.glow,
            transparent: true,
            opacity: 0.6 - i * 0.2
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.position.set(pos.x, pos.y, pos.z);
          ring.rotation.x = Math.PI / 2;
          scene.add(ring);
        }
      }
    });
  });
}

// 梯度下降渲染
function renderGradientDescent(scene: THREE.Scene, step: any) {
  // 渲染损失曲面（更漂亮的渐变色）
  step.surface.forEach((point: any) => {
    const geometry = new THREE.BoxGeometry(0.45, 0.12, 0.45);
    const hue = Math.min(point.y / 12, 1);
    const color = new THREE.Color().setHSL(0.65 - hue * 0.5, 1, 0.5);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
      metalness: 0.5,
      roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(point.x, point.y, point.z);
    scene.add(cube);
  });
  
  // 渲染下降路径（使用发光管道）
  if (step.path.length > 1) {
    const pathPoints = step.path.map((p: any) => new THREE.Vector3(p.x, p.z, p.y));
    const curve = new THREE.CatmullRomCurve3(pathPoints);
    const tubeGeometry = new THREE.TubeGeometry(curve, step.path.length * 2, 0.15, 8, false);
    
    // 创建渐变色
    const colors = [];
    const positions = tubeGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const t = i / positions.count;
      const color = new THREE.Color().setHSL(0.1 + t * 0.5, 1, 0.5);
      colors.push(color.r, color.g, color.b);
    }
    tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const tubeMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
  }
  
  // 渲染当前位置（更大更亮）
  const currentGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const currentMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 1.5,
    metalness: 0.9,
    roughness: 0.1
  });
  const currentSphere = new THREE.Mesh(currentGeometry, currentMaterial);
  currentSphere.position.set(step.current.x, step.current.z, step.current.y);
  scene.add(currentSphere);
  
  // 添加脉冲光环
  for (let i = 0; i < 3; i++) {
    const ringGeometry = new THREE.TorusGeometry(0.7 + i * 0.3, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      transparent: true,
      opacity: 0.5 - i * 0.15
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(step.current.x, step.current.z, step.current.y);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
  }
}

// 决策树渲染
function renderDecisionTree(scene: THREE.Scene, step: any) {
  // 渲染根节点
  const rootGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const rootMaterial = new THREE.MeshStandardMaterial({
    color: 0xff3366,
    emissive: 0xff3366,
    emissiveIntensity: 1.0,
    metalness: 0.8,
    roughness: 0.2
  });
  const rootSphere = new THREE.Mesh(rootGeometry, rootMaterial);
  rootSphere.position.set(step.root.x, step.root.y, step.root.z);
  scene.add(rootSphere);
  
  // 根节点光环
  for (let i = 0; i < 2; i++) {
    const ringGeometry = new THREE.TorusGeometry(0.8 + i * 0.3, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6699,
      transparent: true,
      opacity: 0.5 - i * 0.15
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(step.root.x, step.root.y, step.root.z);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
  }
  
  // 渲染子节点和连接
  step.nodes.forEach((node: any, idx: number) => {
    const isActive = step.activeNode === idx || 
      (step.activePath && step.activePath.includes(idx + 1));
    
    // 渲染连接线（使用管道）
    const parentPos = idx === 0 || idx === 1 ? step.root : step.nodes[node.parent - 1];
    const points = [
      new THREE.Vector3(parentPos.x, parentPos.y, parentPos.z),
      new THREE.Vector3(node.x, node.y, node.z)
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, isActive ? 0.12 : 0.06, 8, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: isActive ? 0x00ff88 : 0x666666,
      emissive: isActive ? 0x00ff88 : 0x333333,
      emissiveIntensity: isActive ? 0.8 : 0.2,
      metalness: 0.7,
      roughness: 0.3
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    
    // 渲染节点
    const nodeSize = isActive ? 0.5 : 0.35;
    const nodeGeometry = new THREE.SphereGeometry(nodeSize, 32, 32);
    const nodeColor = isActive ? 0x00ff88 : 0x3399ff;
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: nodeColor,
      emissive: nodeColor,
      emissiveIntensity: isActive ? 1.2 : 0.5,
      metalness: 0.8,
      roughness: 0.2
    });
    const nodeSphere = new THREE.Mesh(nodeGeometry, nodeMaterial);
    nodeSphere.position.set(node.x, node.y, node.z);
    scene.add(nodeSphere);
    
    // 激活节点添加光环
    if (isActive) {
      const ringGeometry = new THREE.TorusGeometry(nodeSize + 0.2, 0.06, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x66ffaa,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(node.x, node.y, node.z);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    }
  });
}
