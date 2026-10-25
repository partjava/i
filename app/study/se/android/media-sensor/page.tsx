'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
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
<BookParagraph>{"图片、音频、CameraX与传感器代码需要真实Android宿主、依赖、资源及必要权限。CameraX异步获取使用官方ListenableFuture监听方式；系统相机旧回调例说明历史接入，缩略图不等于原图。"}</BookParagraph>
        <BookParagraph>
          Glide 是 Google 官方推荐的图片加载库，支持图片缓存、缩略图、GIF 播放等特性。
        </BookParagraph>
<BookParagraph>{"压缩文件大小不等于解码内存大小。列表只显示小缩略图时应按目标尺寸加载，并给复用View设置占位与失败状态；页面离开后请求也要与宿主关联。图片库能处理部分缓存和取消，不会自动替你决定用户切换后的隐私缓存规则。"}</BookParagraph>
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
<BookParagraph>{"播放器有状态前提：网络音频需要准备完成后才能启动，异步准备可能失败，退出页面也需明确是否继续播放。准备监听与错误监听应在启动异步准备前安装，释放后不能继续操作原实例，否则一次成功播放会掩盖后续状态错误。"}</BookParagraph>
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
{ label: "多媒体首先是资源与状态管理", left: (<div className="space-y-4">
<PageTitle>{"多媒体首先是资源与状态管理"}</PageTitle>
<BookParagraph>{"音频播放器、相机与传感器都连接稀缺硬件资源，界面能显示一次结果不代表资源使用正确。要为初始化、准备、运行、暂停、失败和释放分别规定可执行动作。页面离开后是否继续播放取决于产品需求；若只用于前台预览，就应随生命周期停止采集。对象引用置空只是失去访问入口，不等于底层相机或播放器已经释放，必须调用对应的释放或解绑流程。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：一张照片占多少内存"}</PageTitle>
<BookParagraph>{"一张四千乘三千像素的图片，若解码为每像素四字节，像素缓冲约四千八百万字节，远大于压缩后的JPEG文件。列表同时解码十张可能迅速耗尽预算。若显示区域只有四百乘三百，按目标尺寸采样解码会显著减少内存。下例仅用Python 3计算理论像素缓冲，预期打印48000000与480000；真实占用还受格式、行对齐、缓存及额外副本影响。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"for width, height in [(4000, 3000), (400, 300)]:\n    print(width * height * 4)"} />
</div>) },
{ label: "媒体操作不能越过状态前提", left: (<div className="space-y-4">
<PageTitle>{"媒体操作不能越过状态前提"}</PageTitle>
<BookParagraph>{"MediaPlayer在准备完成后才能安全启动，网络准备还可能失败，错误回调和释放路径都需安排。停止后再次播放不能总是直接调用start，可能要重新准备。CameraX把用例绑定到生命周期，以便与宿主状态协同；传感器监听需要显式注销。下表不是完整API状态机，而是帮助读者在每次调用前提出问题：资源当前在哪个状态，失败以后谁负责恢复，用户离开时谁负责清理。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"资源"}</th><th className="border-b p-2 text-left">{"使用前提"}</th><th className="border-b p-2 text-left">{"离开或失败后"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"MediaPlayer"}</td><td className="border-b p-2 align-top">{"准备成功且状态合法"}</td><td className="border-b p-2 align-top">{"释放或按需求交由服务管理"}</td></tr><tr><td className="border-b p-2 align-top">{"CameraX"}</td><td className="border-b p-2 align-top">{"权限与有效生命周期"}</td><td className="border-b p-2 align-top">{"解绑并处理失败"}</td></tr><tr><td className="border-b p-2 align-top">{"传感器"}</td><td className="border-b p-2 align-top">{"设备存在且监听已注册"}</td><td className="border-b p-2 align-top">{"注销监听"}</td></tr><tr><td className="border-b p-2 align-top">{"图片请求"}</td><td className="border-b p-2 align-top">{"目标尺寸与有效View"}</td><td className="border-b p-2 align-top">{"取消旧目标并控制缓存"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"传感器注册要能对称撤销"}</PageTitle>
<BookParagraph>{"下例为Activity内Java方法片段，成员sm与listener沿用原例，sensor在onCreate通过getDefaultSensor初始化，需导入android.hardware相关类。onResume发现设备不存在此传感器时应显示不支持；onPause注销，避免后台持续回调。预期是在页面恢复时收到事件，离开后不再更新。采样频率是请求值而非固定准确周期，算法必须依据事件时间戳计算时间差。"}</BookParagraph>
<BookCode language="java" showLineNumbers code={"@Override protected void onResume() {\n    super.onResume();\n    if (sensor != null) {\n        sm.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_NORMAL);\n    }\n}\n@Override protected void onPause() {\n    sm.unregisterListener(listener);\n    super.onPause();\n}"} />
</div>) },
{ label: "推演二：加速度不等于移动距离", left: (<div className="space-y-4">
<PageTitle>{"推演二：加速度不等于移动距离"}</PageTitle>
<BookParagraph>{"设备静止放在桌面时，加速度计通常仍包含重力分量，三个轴会随设备方向变化。把每次读数直接累加成速度再累加成距离，会放大噪声与采样时间误差，几秒后就可能严重漂移。摇一摇可使用加速度变化和阈值配合冷却时间，计步或姿态则需更合适的传感器融合。必须声明坐标系、单位、采样时间和过滤方法，不能把回调数字当成无需解释的业务量。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"相机与文件输出的流程"}</PageTitle>
<BookParagraph>{"缩略图回调只适合预览；要保存完整照片，应事先准备可访问的输出位置并用受控URI交给相机，返回后检查成功标志和实际文件。自行管理相机时还要处理权限被撤销、镜头不可用和绑定异常。成功拍照后只更新当前有效页面，不能继续引用已销毁的ImageView。保存文件和数据库记录若分两步完成，应安排失败清理，避免空记录或无人引用的图片长期堆积。"}</BookParagraph>
</div>) },
{ label: "练习：做一次资源生命周期审计", left: (<div className="space-y-4">
<PageTitle>{"练习：做一次资源生命周期审计"}</PageTitle>
<BookParagraph>{"实现一页图片预览与传感器读数，记录进入、旋转、退后台和返回时的注册与释放。验收：缺少硬件不崩溃，拒绝权限有可用说明，快速离开后没有旧页面更新，大图按展示尺寸加载。参考思路：把每个资源的获取者与释放者配成对，记录当前状态；再注入加载失败及页面切换，验证清理路径，而不是仅以一张图片成功显示作为验收。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"媒体示例的安全与版本边界"}</PageTitle>
<BookParagraph>{"网络媒体需访问许可和网络安全配置，自动播放还要考虑音频焦点、用户预期和其他应用。Glide是第三方图片库，不应被描述成系统自带能力；任何库的缓存仍要服从登录切换与隐私规则。CameraX依赖应按项目锁定版本核对官方API，不能混用来自不同版本或不存在的方法。传统MediaPlayer适合理解状态管理，复杂播放方案的选型需另行评估，原例不等于完整播放器。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/media/camera/camerax/preview" href="https://developer.android.com/media/camera/camerax/preview" target="_blank" rel="noopener noreferrer" className="underline">{"CameraX预览官方流程"}</a>]} />
</div>) },
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
com.google.common.util.concurrent.ListenableFuture<ProcessCameraProvider> future =
    ProcessCameraProvider.getInstance(this);
future.addListener(() -> {
    try {
        ProcessCameraProvider provider = future.get();
        Preview preview = new Preview.Builder().build();
        preview.setSurfaceProvider(previewView.getSurfaceProvider());
        ImageCapture imageCapture = new ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY).build();
        provider.bindToLifecycle(this, CameraSelector.DEFAULT_BACK_CAMERA,
            preview, imageCapture);
    } catch (java.util.concurrent.ExecutionException error) {
        android.util.Log.e("CameraPreview", "Camera provider unavailable", error);
    } catch (InterruptedException error) {
        Thread.currentThread().interrupt();
    }
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
