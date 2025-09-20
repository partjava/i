"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Tabs, Divider } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const IoTCommunicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('短距离通信');
  const router = useRouter();

  const tabs = [
    '短距离通信',
    '长距离通信',
    '应用层协议'
  ];

  const tabItems = [
    {
      key: '1',
      label: '短距离通信技术',
      children: (
        <Card>
          <Paragraph>
            短距离通信技术适用于设备间近距离数据传输，具有低功耗、低成本的特点。
          </Paragraph>
          <ul>
            <li>蓝牙（Bluetooth）：
              <ul>
                <li>工作频段：2.4GHz</li>
                <li>传输距离：10-100米</li>
                <li>特点：低功耗、点对点通信</li>
                <li>应用：智能家居、可穿戴设备</li>
              </ul>
            </li>
            <li>Zigbee：
              <ul>
                <li>工作频段：2.4GHz/868MHz/915MHz</li>
                <li>传输距离：10-100米</li>
                <li>特点：低功耗、网状网络</li>
                <li>应用：工业控制、智能家居</li>
              </ul>
            </li>
            <li>WiFi：
              <ul>
                <li>工作频段：2.4GHz/5GHz</li>
                <li>传输距离：50-100米</li>
                <li>特点：高速率、高功耗</li>
                <li>应用：视频监控、智能家居</li>
              </ul>
            </li>
          </ul>
        </Card>
      ),
    },
    {
      key: '2',
      label: '长距离通信技术',
      children: (
        <Card>
          <Paragraph>
            长距离通信技术适用于广域覆盖场景，支持远距离数据传输。
          </Paragraph>
          <ul>
            <li>LoRa：
              <ul>
                <li>工作频段：433MHz/868MHz/915MHz</li>
                <li>传输距离：2-15公里</li>
                <li>特点：超低功耗、远距离</li>
                <li>应用：智慧城市、农业监测</li>
              </ul>
            </li>
            <li>NB-IoT：
              <ul>
                <li>工作频段：授权频段</li>
                <li>传输距离：覆盖广</li>
                <li>特点：低功耗、广覆盖</li>
                <li>应用：智能抄表、环境监测</li>
              </ul>
            </li>
            <li>4G/5G：
              <ul>
                <li>工作频段：授权频段</li>
                <li>传输距离：覆盖广</li>
                <li>特点：高速率、低时延</li>
                <li>应用：视频监控、车联网</li>
              </ul>
            </li>
          </ul>
        </Card>
      ),
    },
    {
      key: '3',
      label: '应用层协议',
      children: (
        <Card>
          <Paragraph>
            应用层协议定义了物联网设备之间的通信规则和数据格式。
          </Paragraph>
          <ul>
            <li>MQTT：
              <ul>
                <li>特点：轻量级、发布/订阅模式</li>
                <li>适用场景：低带宽、不稳定网络</li>
                <li>优势：低功耗、小数据包</li>
              </ul>
            </li>
            <li>CoAP：
              <ul>
                <li>特点：RESTful风格、UDP基础</li>
                <li>适用场景：资源受限设备</li>
                <li>优势：低开销、简单实现</li>
              </ul>
            </li>
            <li>HTTP/HTTPS：
              <ul>
                <li>特点：通用、安全</li>
                <li>适用场景：需要安全传输</li>
                <li>优势：广泛支持、安全性高</li>
              </ul>
            </li>
          </ul>
        </Card>
      ),
    },
  ];

  const prevHref = "/study/iot/intro";
  const nextHref = "/study/iot/sensors";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">物联网通信技术</h1>

      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '短距离通信' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">短距离通信技术</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 蓝牙（Bluetooth）</h3>
                <p className="text-gray-700">
                  - 工作频段：2.4GHz ISM频段<br/>
                  - 传输距离：经典蓝牙10-100米，BLE约50米<br/>
                  - 特点：低功耗、点对点通信<br/>
                  - 应用：智能家居、可穿戴设备<br/>
                  - 特点：低功耗设计，适合电池供电设备<br/>
                  - 应用：智能家居、可穿戴设备<br/>
                  - 应用：音频设备：无线耳机、音箱
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. Zigbee</h3>
                <p className="text-gray-700">
                  - 工作频段：2.4GHz（全球通用），868MHz（欧洲），915MHz（美国）<br/>
                  - 传输距离：室内10-20米，室外可达100米<br/>
                  - 特点：超低功耗，电池寿命可达数年，支持网状网络，自组网能力强，安全性高，支持AES-128加密<br/>
                  - 应用：工业自动化：设备监控、过程控制，智能家居：安防系统、环境监测，农业物联网：温室监控、灌溉控制
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. WiFi</h3>
                <p className="text-gray-700">
                  - 工作频段：2.4GHz：覆盖范围广，穿透性强，5GHz：速率高，干扰少<br/>
                  - 传输距离：室内50-100米<br/>
                  - 特点：高速率，支持视频传输，高功耗，需要持续供电，支持大量设备连接<br/>
                  - 应用：视频监控：高清摄像头，智能家居：智能电视、智能音箱，工业物联网：设备远程控制
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '长距离通信' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">长距离通信技术</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. LoRa</h3>
                <p className="text-gray-700">
                  - 工作频段：433MHz（亚洲），868MHz（欧洲），915MHz（美洲）<br/>
                  - 传输距离：城市2-5公里，郊区可达15公里<br/>
                  - 特点：超低功耗，电池寿命可达10年，远距离传输，穿透性强，抗干扰能力强<br/>
                  - 应用：智慧城市：路灯控制、环境监测，农业监测：土壤监测、气象站，资产追踪：物流追踪、设备定位
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. NB-IoT</h3>
                <p className="text-gray-700">
                  - 工作频段：授权频段（运营商频段）<br/>
                  - 传输距离：覆盖范围与4G基站相同<br/>
                  - 特点：低功耗，支持深度睡眠，广覆盖，室内穿透性强，大连接，单基站支持10万设备<br/>
                  - 应用：智能抄表：水表、电表、气表，环境监测：空气质量、水质监测，智慧停车：车位监测、停车管理
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 4G/5G</h3>
                <p className="text-gray-700">
                  - 工作频段：授权频段<br/>
                  - 传输距离：覆盖广<br/>
                  - 特点：高速率、低时延<br/>
                  - 应用：视频监控、车联网
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '应用层协议' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">应用层协议</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. MQTT</h3>
                <p className="text-gray-700">
                  - 特点：轻量级、发布/订阅模式<br/>
                  - 适用场景：低带宽、不稳定网络<br/>
                  - 优势：低功耗、小数据包
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. CoAP</h3>
                <p className="text-gray-700">
                  - 特点：RESTful风格、UDP基础<br/>
                  - 适用场景：资源受限设备<br/>
                  - 优势：低开销、简单实现
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. HTTP/HTTPS</h3>
                <p className="text-gray-700">
                  - 特点：通用、安全<br/>
                  - 适用场景：需要安全传输<br/>
                  - 优势：广泛支持、安全性高
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push('/study/iot/intro')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          上一页：物联网基础
        </button>
        <button
          onClick={() => router.push('/study/iot/sensors')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：传感器技术
        </button>
      </div>
    </div>
  );
};

export default IoTCommunicationPage; 