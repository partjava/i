'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@/app/components/ui/book/BookContent'
import { CameraOutlined, SoundOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '多媒体与传感器',
  chapterNumber: 6,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '数据存储与网络', href: '/study/se/android/data-network' },
  nextChapter: { label: '高级特性与性能优化', href: '/study/se/android/advanced' },
  theme: THEMES.software,
}

const SENSOR_CODE = `SensorManager sm = (SensorManager) getSystemService(SENSOR_SERVICE);
Sensor sensor = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

SensorEventListener listener = new SensorEventListener() {
    @Override
    public void onSensorChanged(SensorEvent event) {
        float x = event.values[0];
        float y = event.values[1];
        float z = event.values[2];
        // 处理传感器数据
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}
};

sm.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_NORMAL);`

const SPREADS = [
  // ===== 跨页 1: 图片与音频 =====
  {
    label: '多媒体',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<SoundOutlined />}>图片加载（Glide）</PageTitle>
        <BookParagraph>
          Glide 是 Google 官方推荐的图片加载库，支持图片缓存、缩略图、GIF 播放等特性。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 基本使用
Glide.with(context)
    .load(url)
    .placeholder(R.drawable.placeholder)
    .error(R.drawable.error)
    .into(imageView);

// 圆形裁剪
Glide.with(context)
    .load(url)
    .circleCrop()
    .into(imageView);

// 指定尺寸
Glide.with(context)
    .load(url)
    .override(300, 200)
    .into(imageView);`}
        />
        <BookAlert type="info" message="Glide 需要添加依赖：implementation 'com.github.bumptech.glide:glide:4.15.1'" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<SoundOutlined />}>音频播放（MediaPlayer）</PageTitle>
        <BookParagraph>
          MediaPlayer 支持播放本地和网络音频文件，支持播放控制与状态管理。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 创建并启动播放
MediaPlayer player = MediaPlayer.create(context, R.raw.music);
player.start();

// 暂停
player.pause();

// 停止并释放资源
player.stop();
player.release();
player = null;

// 播放网络音频
MediaPlayer networkPlayer = new MediaPlayer();
networkPlayer.setDataSource("https://example.com/audio.mp3");
networkPlayer.prepareAsync();
networkPlayer.setOnPreparedListener(MediaPlayer::start);`}
        />
        <BookDivider />
        <PageTitle icon={<SoundOutlined />}>MediaPlayer 生命周期</PageTitle>
        <BookList items={[
          'Idle —— 初始状态或 reset() 后',
          'Initialized —— setDataSource() 后',
          'Preparing —— prepareAsync() 异步准备中',
          'Prepared —— 准备完成，可调用 start()',
          'Started —— 正在播放',
          'Paused —— 暂停',
          'Stopped —— 停止',
          'End —— 播放完成',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 相机与传感器 =====
  {
    label: '传感器',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<CameraOutlined />}>相机调用</PageTitle>
        <BookParagraph>
          通过 Intent 调用系统相机，或使用 CameraX API 实现自定义相机功能。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// 方式一：Intent 调用系统相机
Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);

// 处理返回
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
        Bitmap thumbnail = (Bitmap) data.getExtras().get("data");
        imageView.setImageBitmap(thumbnail);
    }
}`}
        />
        <BookDivider />
        <PageTitle icon={<CameraOutlined />}>CameraX API</PageTitle>
        <BookParagraph>
          CameraX 是 Jetpack 中的相机库，简化了相机功能的开发：
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// CameraX 预览用例
ProcessCameraProvider.getInstance(this).listenFuture(
    (provider, error) -> {
        Preview preview = new Preview.Builder().build();
        preview.setSurfaceProvider(previewView.getSurfaceProvider());

        ImageCapture imageCapture = new ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
            .build();

        provider.bindToLifecycle(this, CameraSelector.DEFAULT_BACK_CAMERA,
            preview, imageCapture);
    }, ContextCompat.getMainExecutor(this));`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CameraOutlined />}>传感器使用</PageTitle>
        <BookParagraph>
          Android 设备内置多种传感器，通过 SensorManager 获取传感器数据。常用传感器包括加速度计、陀螺仪、磁力计等。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={SENSOR_CODE}
        />
        <BookDivider />
        <PageTitle icon={<CameraOutlined />}>常用传感器类型</PageTitle>
        <BookList items={[
          'TYPE_ACCELEROMETER —— 加速度传感器，检测设备运动',
          'TYPE_GYROSCOPE —— 陀螺仪，检测设备旋转',
          'TYPE_MAGNETIC_FIELD —— 磁场传感器，电子罗盘',
          'TYPE_LIGHT —— 光线传感器，自动调节屏幕亮度',
          'TYPE_PROXIMITY —— 距离传感器，通话时关闭屏幕',
          'TYPE_PRESSURE —— 气压传感器，海拔高度测量',
        ]} />
        <BookAlert type="warning" message="传感器数据密集时需注意功耗，在 onPause() 中取消注册监听器" />
      </div>
    ),
  },
]

export default function MediaSensorPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
