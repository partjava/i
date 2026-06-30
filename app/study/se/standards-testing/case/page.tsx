'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实际项目案例',
  chapterNumber: 9,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '专项测试', href: '/study/se/standards-testing/special' },
  theme: THEMES.software,
}

const seleniumCode = `// 使用Selenium进行购物流程自动化测试
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

driver.quit()`

const financeCode = `// 使用Postman进行接口测试验证转账功能
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
// 响应体包含交易成功信息及交易ID`

const appiumCode = `// 使用Appium进行移动应用登录自动化测试
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

        // 验证登录成功
        driver.findElementById("home-screen-element").isDisplayed();

        driver.quit();
    }
}`

const saasCode = `-- 验证多租户数据隔离
-- 查询租户1的数据
SELECT * FROM data WHERE tenant_id = 1;

-- 尝试查询租户2的数据（期望无结果返回）
SELECT * FROM data WHERE tenant_id = 2
  AND user_id IN (SELECT user_id FROM data WHERE tenant_id = 1);`

const SPREADS = [
  {
    label: '电商平台测试案例',
    left: (
      <div className="space-y-4">
        <PageTitle>电商平台测试案例</PageTitle>
        <BookParagraph>本次测试针对某大型电商平台，重点解决多平台兼容性、高并发性能及交易流程正确性问题。</BookParagraph>
        <BookList items={['通过自动化与手动测试结合，确保系统在复杂业务场景下稳定运行。', '使用 Selenium 进行购物流程端到端自动化测试。', '覆盖商品浏览、加入购物车、结算、支付等核心流程。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>购物流程自动化测试</SectionTitle>
        <BookCode language="python" code={seleniumCode} />
      </div>
    ),
  },
  {
    label: '金融系统测试案例',
    left: (
      <div className="space-y-4">
        <PageTitle>金融系统测试案例</PageTitle>
        <BookParagraph>针对金融系统的测试，着重验证交易安全性、数据准确性及合规性要求。</BookParagraph>
        <BookList items={['运用静态代码分析、渗透测试等手段保障系统安全可靠。', '使用 Postman 进行接口测试验证转账功能。', '重点测试转账、账户查询、资金流水等核心业务。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>转账功能接口测试</SectionTitle>
        <BookCode language="json" code={financeCode} />
      </div>
    ),
  },
  {
    label: '移动应用测试案例',
    left: (
      <div className="space-y-4">
        <PageTitle>移动应用测试案例</PageTitle>
        <BookParagraph>对某移动社交应用进行测试，重点关注设备兼容性、性能优化及用户体验。</BookParagraph>
        <BookList items={['借助 Appium 实现自动化测试，提升测试效率与覆盖范围。', '覆盖 Android 和 iOS 双平台。', '包括登录注册、消息发送、动态发布等核心功能。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>登录功能自动化测试</SectionTitle>
        <BookCode language="java" code={appiumCode} />
      </div>
    ),
  },
  {
    label: 'SaaS系统测试案例',
    left: (
      <div className="space-y-4">
        <PageTitle>SaaS 系统测试案例</PageTitle>
        <BookParagraph>对 SaaS 项目管理系统进行测试，确保多租户数据隔离、功能定制化及系统稳定性。</BookParagraph>
        <BookList items={['采用数据驱动测试方法，覆盖不同租户场景需求。', '验证租户间数据完全隔离，互不可见。', '测试租户自定义配置功能。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>多租户数据隔离测试</SectionTitle>
        <BookCode language="sql" code={saasCode} />
      </div>
    ),
  },
]

export default function TestProjectCasePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
