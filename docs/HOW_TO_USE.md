# 在线代码编辑器使用说明

## 功能介绍

这是一个集成在学习平台中的在线代码编辑器，支持多种编程语言的在线编译和运行。

## 如何访问

### 方法1：通过导航栏
1. 登录你的账户
2. 点击顶部导航栏的"代码"按钮
3. 进入在线代码编辑器页面

### 方法2：直接访问
访问：`https://你的域名.com/code`

## 使用步骤

### 1. 选择编程语言
- 点击左上角的语言下拉菜单
- 选择你要使用的编程语言
- 系统会自动检测服务器支持的语言并显示状态

### 2. 编写代码
- 在左侧的代码编辑器中输入你的代码
- 编辑器支持语法高亮
- 可以使用常见的编程快捷键

### 3. 输入测试数据（可选）
- 如果你的程序需要输入数据，在右侧"输入数据"区域输入
- 支持多行输入
- 程序运行时会自动读取这些数据

### 4. 运行代码
- 点击"运行代码"按钮
- 系统会编译并执行你的代码
- 结果会显示在右侧的"运行结果"区域

## 支持的编程语言

根据服务器环境，可能支持以下语言：

- **Python** - 支持 Python 3.x
- **JavaScript** - Node.js 运行环境
- **Java** - JDK 编译和运行
- **C++** - GCC 编译器
- **C** - GCC 编译器
- **Go** - Go 编译器
- **PHP** - PHP 解释器

> **注意**：实际可用的语言取决于服务器环境配置。编辑器会自动检测并显示当前可用的语言。

## 使用限制

- **执行时间**：代码执行有10秒超时限制
- **内存限制**：避免使用过多内存的程序
- **文件操作**：不支持文件读写操作
- **网络访问**：不支持网络请求
- **安全限制**：在安全沙箱中执行，无法访问系统资源

## 代码示例

### Python 示例
```python
# 简单的计算器
def calculator():
    a = float(input("请输入第一个数字: "))
    b = float(input("请输入第二个数字: "))
    op = input("请输入运算符 (+, -, *, /): ")
    
    if op == '+':
        result = a + b
    elif op == '-':
        result = a - b
    elif op == '*':
        result = a * b
    elif op == '/':
        result = a / b if b != 0 else "除数不能为零"
    else:
        result = "无效的运算符"
    
    print(f"结果: {result}")

calculator()
```

**输入数据示例：**
```
10
5
+
```

### C++ 示例
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "请输入您的姓名: ";
    cin >> name;
    cout << "请输入您的年龄: ";
    cin >> age;
    
    cout << "您好，" << name << "！您今年" << age << "岁。" << endl;
    
    if (age >= 18) {
        cout << "您已成年！" << endl;
    } else {
        cout << "您还未成年，还有" << (18 - age) << "年成年。" << endl;
    }
    
    return 0;
}
```

**输入数据示例：**
```
张三
20
```

### Java 示例
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("请输入一个数字: ");
        int n = scanner.nextInt();
        
        System.out.println("斐波那契数列前" + n + "项:");
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        
        scanner.close();
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```

**输入数据示例：**
```
8
```

## 常见问题

### Q: 为什么某些语言显示为不可用？
A: 这表示服务器环境中没有安装相应的编程语言运行环境。请联系管理员安装所需的语言环境。

### Q: 代码执行失败怎么办？
A: 请检查：
- 代码语法是否正确
- 是否选择了正确的编程语言
- 输入数据格式是否正确
- 是否超出了执行时间限制

### Q: 可以保存代码吗？
A: 目前版本不支持代码保存功能。建议在本地备份重要代码。

### Q: 支持调试功能吗？
A: 目前不支持断点调试，但可以通过添加打印语句来调试代码。

## 技术支持

如果遇到问题，可以：
1. 检查网络连接
2. 刷新页面重试
3. 联系系统管理员

---

享受编程的乐趣！ 🚀 