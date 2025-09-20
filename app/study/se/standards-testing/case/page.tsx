"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "ecommerceCase", label: "电商平台测试案例" },
  { key: "financeCase", label: "金融系统测试案例" },
  { key: "mobileAppCase", label: "移动应用测试案例" },
  { key: "saasCase", label: "SaaS系统测试案例" }
] as const;

type TabKey = typeof tabList[number]['key'];

interface TabContent {
  desc: string[];
  exampleTitle: string;
  example: React.ReactNode;
}

const tabContent: Record<TabKey, TabContent> = {
  ecommerceCase: {
    desc: [
      "本次测试针对某大型电商平台，重点解决多平台兼容性、高并发性能及交易流程正确性问题。",
      "通过自动化与手动测试结合，确保系统在复杂业务场景下稳定运行。"
    ],
    exampleTitle: "电商平台购物流程测试示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 使用Selenium进行购物流程自动化测试
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.example-ecommerce.com")

# 选择商品并加入购物车
product_link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.LINK_TEXT, "某商品名称"))
)
product_link.click()
add_to_cart_button = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "add-to-cart-btn"))
)
add_to_cart_button.click()

# 进入购物车结算
cart_link = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "cart-link"))
)
cart_link.click()
checkout_button = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "checkout-btn"))
)
checkout_button.click()

# 填写收货信息并提交订单
address_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "address-input"))
)
address_input.send_keys("详细收货地址")
submit_order_button = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "submit-order-btn"))
)
submit_order_button.click()

driver.quit()
`}
      </pre>
    )
  },
  financeCase: {
    desc: [
      "针对金融系统的测试，着重验证交易安全性、数据准确性及合规性要求。",
      "运用静态代码分析、渗透测试等手段保障系统安全可靠。"
    ],
    exampleTitle: "金融系统转账功能测试示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 使用Postman进行接口测试验证转账功能
// 配置请求URL
POST https://api.example-finance.com/transfer

// 请求头
Content-Type: application/json
Authorization: Bearer <token>

//请求体
{
    "fromAccount": "1234567890",
    "toAccount": "0987654321",
    "amount": 1000,
    "currency": "CNY"
}

// 预期响应状态码200
// 响应体包含交易成功信息及交易ID
`}
      </pre>
    )
  },
  mobileAppCase: {
    desc: [
      "对某移动社交应用进行测试，重点关注设备兼容性、性能优化及用户体验。",
      "借助Appium实现自动化测试，提升测试效率与覆盖范围。"
    ],
    exampleTitle: "移动应用登录功能测试示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 使用Appium进行移动应用登录自动化测试
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.net.URL;

public class MobileAppLoginTest {
    public static void main(String[] args) throws Exception {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("platformName", "Android");
        capabilities.setCapability("platformVersion", "11");
        capabilities.setCapability("deviceName", "Android Emulator");
        capabilities.setCapability("appPackage", "com.example.app");
        capabilities.setCapability("appActivity", ".MainActivity");

        AppiumDriver driver = new AndroidDriver<>(new URL("http://localhost:4723/wd/hub"), capabilities);

        // 输入用户名和密码
        driver.findElementById("username-input").sendKeys("testuser");
        driver.findElementById("password-input").sendKeys("testpass");

        // 点击登录按钮
        driver.findElementById("login-button").click();

        // 验证登录成功（假设登录成功后会出现特定元素）
        driver.findElementById("home-screen-element").isDisplayed();

        driver.quit();
    }
}
`}
      </pre>
    )
  },
  saasCase: {
    desc: [
      "对SaaS项目管理系统进行测试，确保多租户数据隔离、功能定制化及系统稳定性。",
      "采用数据驱动测试方法，覆盖不同租户场景需求。"
    ],
    exampleTitle: "SaaS系统多租户数据隔离测试示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// 使用SQL查询验证多租户数据隔离
-- 假设存在租户表tenants和数据记录表data
-- 查询租户1的数据
SELECT * FROM data WHERE tenant_id = 1;

-- 尝试查询租户2的数据（期望无结果返回）
SELECT * FROM data WHERE tenant_id = 2 AND user_id IN (SELECT user_id FROM data WHERE tenant_id = 1);
`}
      </pre>
    )
  }
};

export default function TestProjectCasePage() {
  const [currentTab, setCurrentTab] = useState<TabKey>("ecommerceCase");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">测试项目案例</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${currentTab === tab.key? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 主要内容 */}
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">{tabList.find(tab => tab.key === currentTab)?.label}</h2>
        {/* 描述部分 */}
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {tabContent[currentTab]?.desc.map((paragraph, index) => (
            <li key={index}>{paragraph}</li>
          ))}
        </ul>
        {/* 示例部分 */}
        <div>
          <h3 className="font-semibold mb-2">{tabContent[currentTab]?.exampleTitle}</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {tabContent[currentTab]?.example}
          </div>
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/special" className="px-4 py-2 text-blue-600 hover:text-blue-800">专项测试 →</Link>
        <Link href="/study/se/standards-testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">开发规范与测试 →</Link>
      </div>
    </div>
  );
}