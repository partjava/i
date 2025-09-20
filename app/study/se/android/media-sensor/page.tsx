'use client';
export default function AndroidMediaSensorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">多媒体与传感器</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">图片加载（Glide）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`Glide.with(context).load(url).into(imageView);`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">音频播放（MediaPlayer）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`MediaPlayer player = MediaPlayer.create(context, R.raw.music);
player.start();`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">相机调用</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
startActivityForResult(intent, 1);`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">传感器使用（加速度）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`SensorManager sm = (SensorManager) getSystemService(SENSOR_SERVICE);
Sensor sensor = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
SensorEventListener listener = new SensorEventListener() {
    @Override
    public void onSensorChanged(SensorEvent event) {
        float x = event.values[0];
    }
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {}
};
sm.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_NORMAL);`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/data-network" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 数据存储与网络
        </a>
        <a href="/study/se/android/advanced" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          高级特性与性能优化 →
        </a>
      </div>
    </div>
  );
} 