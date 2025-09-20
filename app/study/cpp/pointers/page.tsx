'use client';

import React from 'react';
import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  AimOutlined,
  CodeOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

const PointersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">指针</h1>
              <p className="text-gray-600 mt-2">
                C++ / 指针
              </p>
            </div>
            <Progress type="circle" percent={40} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <AimOutlined />
                  指针基础
                </span>
              } 
              key="1"
            >
              <Card title="指针的基本概念" className="mb-6">
                <p className="mb-4">指针是 C++ 中非常重要的概念，它是一个变量，其值为另一个变量的内存地址。</p>
                <CodeBlock language="cpp">{`// 指针声明和初始化
int num = 42;
int* ptr = &num;       // 指针指向num的地址
int* nullPtr = nullptr; // 空指针

// 指针操作
cout << ptr;          // 输出地址
cout << *ptr;         // 解引用，输出42
*ptr = 100;           // 通过指针修改值

// 指针与数组
int arr[5] = {10, 20, 30, 40, 50};
int* arrPtr = arr;    // 指向数组第一个元素
cout << *arrPtr;      // 输出10
cout << *(arrPtr + 2); // 输出30

// void指针
void* vptr = &num;
// 使用前需要转换类型
int* iptr = static_cast<int*>(vptr);`}</CodeBlock>
                <Alert
                  className="mt-4"
                  message="指针注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>使用前一定要初始化指针</li>
                      <li>解引用空指针或无效指针会导致程序崩溃</li>
                      <li>释放后的指针应立即设为nullptr</li>
                      <li>指针运算要小心边界问题</li>
                    </ul>
                  }
                  type="warning"
                  showIcon
                />
              </Card>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CodeOutlined />
                  指针与内存
                </span>
              } 
              key="2"
            >
              <Card title="动态内存分配" className="mb-6">
                <CodeBlock language="cpp">{`// 使用new分配单个对象
int* p1 = new int;      // 分配未初始化的int
*p1 = 10;               // 赋值
delete p1;              // 释放内存

// 分配并初始化
int* p2 = new int(42);  // 分配并初始化为42
delete p2;              // 释放内存

// 分配数组
int* arr = new int[10]; // 分配包含10个int的数组
arr[0] = 1;             // 使用数组语法
*(arr + 1) = 2;         // 使用指针语法
delete[] arr;           // 释放数组内存，注意使用delete[]

// 分配二维数组
int** matrix = new int*[3];
for (int i = 0; i < 3; i++) {
    matrix[i] = new int[4];
}

// 释放二维数组
for (int i = 0; i < 3; i++) {
    delete[] matrix[i];
}
delete[] matrix;`}</CodeBlock>
              </Card>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="3"
            >
              <Card title="例题1：图像处理中的指针应用" className="mb-6">
                <p className="mb-3">这个例题展示了在图像处理中使用指针高效遍历和修改图像数据的方法。</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <vector>
using namespace std;

// 模拟图像结构
struct Image {
    int width;
    int height;
    unsigned char* data; // 图像数据，一维数组表示二维图像
    
    // 构造函数
    Image(int w, int h) : width(w), height(h) {
        data = new unsigned char[width * height];
        // 初始化为灰色(128)
        for (int i = 0; i < width * height; i++) {
            data[i] = 128;
        }
    }
    
    // 析构函数
    ~Image() {
        delete[] data;
    }
    
    // 获取像素值
    unsigned char getPixel(int x, int y) const {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            return data[y * width + x];
        }
        return 0; // 越界返回黑色
    }
    
    // 设置像素值
    void setPixel(int x, int y, unsigned char value) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
            data[y * width + x] = value;
        }
    }
};

// 使用指针实现高效的图像处理函数
void invertImage(Image& img) {
    int size = img.width * img.height;
    unsigned char* ptr = img.data;
    
    // 使用指针直接遍历和修改图像数据，比用索引更高效
    for (int i = 0; i < size; i++) {
        *ptr = 255 - *ptr; // 反转颜色
        ptr++; // 移动到下一个像素
    }
}

// 使用指针实现图像卷积操作的一部分
void applyThreshold(Image& img, unsigned char threshold) {
    unsigned char* ptr = img.data;
    unsigned char* end = ptr + img.width * img.height;
    
    // 使用指针范围迭代
    while (ptr < end) {
        // 二值化：大于阈值设为255(白)，否则设为0(黑)
        *ptr = (*ptr > threshold) ? 255 : 0;
        ptr++;
    }
}

int main() {
    // 创建100x100的图像
    Image img(100, 100);
    
    // 在图像中绘制一个简单的图案
    for (int y = 25; y < 75; y++) {
        for (int x = 25; x < 75; x++) {
            img.setPixel(x, y, 200); // 浅灰色方块
        }
    }
    
    cout << "原始图像创建完成，包含100x100像素\n";
    
    // 应用图像处理
    invertImage(img);
    cout << "图像反相处理完成\n";
    
    applyThreshold(img, 128);
    cout << "图像二值化处理完成（阈值128）\n";
    
    // 检查处理结果
    cout << "中心点(50,50)的像素值: " << (int)img.getPixel(50, 50) << endl;
    cout << "角落点(0,0)的像素值: " << (int)img.getPixel(0, 0) << endl;
    
    return 0;
}`}</CodeBlock>
                <p className="mt-3 text-gray-600">这个例子展示了在图像处理中使用指针的实际应用，包括直接内存访问、高效遍历和优化技术。</p>
              </Card>
              
              <Card title="例题2：内存池实现" className="mb-6">
                <p className="mb-3">这个例题展示了如何使用指针实现一个简单的内存池，提高内存分配效率。</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <vector>
using namespace std;

// 一个简单的内存池实现
class MemoryPool {
private:
    struct Block {
        char* memory;      // 内存块起始位置
        size_t blockSize;  // 块大小
        bool* used;        // 标记哪些单元已被使用
        size_t unitSize;   // 每个分配单元的大小
        size_t unitCount;  // 单元数量
    };
    
    vector<Block> blocks;  // 内存块列表
    size_t unitSize;       // 分配单元大小
    size_t unitsPerBlock;  // 每个块中的单元数量
    
public:
    // 构造函数
    MemoryPool(size_t unitSize = 64, size_t unitsPerBlock = 1024) 
        : unitSize(unitSize), unitsPerBlock(unitsPerBlock) {
        // 创建第一个内存块
        allocateNewBlock();
    }
    
    // 析构函数 - 释放所有内存
    ~MemoryPool() {
        for (auto& block : blocks) {
            delete[] block.memory;
            delete[] block.used;
        }
    }
    
    // 分配一个内存单元
    void* allocate() {
        // 查找可用内存单元
        for (auto& block : blocks) {
            for (size_t i = 0; i < block.unitCount; i++) {
                if (!block.used[i]) {
                    block.used[i] = true;
                    return block.memory + (i * block.unitSize);
                }
            }
        }
        
        // 没有找到可用单元，创建新块
        allocateNewBlock();
        
        // 使用新块的第一个单元
        blocks.back().used[0] = true;
        return blocks.back().memory;
    }
    
    // 释放一个内存单元
    void deallocate(void* ptr) {
        // 查找包含该指针的块
        for (auto& block : blocks) {
            if (ptr >= block.memory && 
                ptr < block.memory + block.blockSize) {
                
                // 计算单元索引
                size_t index = ((char*)ptr - block.memory) / block.unitSize;
                
                // 标记为未使用
                if (index < block.unitCount) {
                    block.used[index] = false;
                }
                
                return;
            }
        }
    }
    
private:
    // 分配新的内存块
    void allocateNewBlock() {
        Block block;
        block.unitSize = unitSize;
        block.unitCount = unitsPerBlock;
        block.blockSize = unitSize * unitsPerBlock;
        block.memory = new char[block.blockSize];
        block.used = new bool[unitsPerBlock]();  // 初始化为false
        
        blocks.push_back(block);
    }
};

// 使用内存池的结构体例子
struct MyObject {
    int id;
    string name;
    double value;
    
    MyObject(int i, string n, double v) : id(i), name(n), value(v) {}
    
    void print() {
        cout << "Object " << id << ": " << name << " = " << value << endl;
    }
};

// 重载new和delete操作符，使用我们的内存池
static MemoryPool objectPool(sizeof(MyObject), 100);

void* operator new(size_t size) {
    if (size == sizeof(MyObject)) {
        return objectPool.allocate();
    }
    return ::operator new(size);
}

void operator delete(void* ptr) noexcept {
    if (ptr) {
        objectPool.deallocate(ptr);
    }
}

int main() {
    cout << "创建对象...\n";
    
    // 创建一些对象
    vector<MyObject*> objects;
    for (int i = 0; i < 10; i++) {
        // 使用内存池分配内存
        MyObject* obj = new MyObject(i, "Object-" + to_string(i), i * 1.5);
        objects.push_back(obj);
    }
    
    // 使用对象
    for (auto obj : objects) {
        obj->print();
    }
    
    cout << "\n释放一些对象...\n";
    
    // 释放一部分对象
    for (int i = 0; i < 5; i++) {
        delete objects[i];
        objects[i] = nullptr;
    }
    
    cout << "\n创建更多对象...\n";
    
    // 创建更多对象(将重用已释放的内存)
    for (int i = 10; i < 15; i++) {
        MyObject* obj = new MyObject(i, "Object-" + to_string(i), i * 1.5);
        objects.push_back(obj);
    }
    
    // 清理所有剩余对象
    for (auto obj : objects) {
        if (obj) {
            obj->print();
            delete obj;
        }
    }
    
    return 0;
}`}</CodeBlock>
                <p className="mt-3 text-gray-600">这个例子展示了如何使用指针实现内存池，解决频繁小内存分配的性能问题。内存池在游戏开发、图形处理和高性能计算中非常常见。</p>
              </Card>
              
              <Card title="例题3：智能文件处理器" className="mb-6">
                <p className="mb-3">这个例题展示了用指针实现一个文件处理系统，包括内存管理和缓冲区控制。</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <fstream>
#include <string>
#include <memory>
using namespace std;

// 文件缓冲区类
class FileBuffer {
private:
    char* buffer;
    size_t size;
    size_t position;
    
public:
    // 构造函数 - 创建指定大小的缓冲区
    FileBuffer(size_t bufferSize = 4096) : size(bufferSize), position(0) {
        buffer = new char[size];
    }
    
    // 析构函数 - 释放缓冲区
    ~FileBuffer() {
        delete[] buffer;
    }
    
    // 清空缓冲区
    void clear() {
        position = 0;
    }
    
    // 添加数据到缓冲区
    bool write(const char* data, size_t dataSize) {
        if (position + dataSize > size) {
            return false;  // 缓冲区空间不足
        }
        
        // 使用指针复制数据
        char* dest = buffer + position;
        const char* src = data;
        for (size_t i = 0; i < dataSize; i++) {
            *dest++ = *src++;
        }
        
        position += dataSize;
        return true;
    }
    
    // 获取缓冲区内容
    const char* getData() const {
        return buffer;
    }
    
    // 获取当前使用量
    size_t getUsed() const {
        return position;
    }
    
    // 获取总容量
    size_t getCapacity() const {
        return size;
    }
};

// 文件处理类
class FileProcessor {
private:
    string inputFilename;
    string outputFilename;
    unique_ptr<FileBuffer> buffer;  // 使用智能指针管理缓冲区
    
public:
    FileProcessor(const string& inFile, const string& outFile, size_t bufferSize = 4096)
        : inputFilename(inFile), outputFilename(outFile) {
        buffer = make_unique<FileBuffer>(bufferSize);
    }
    
    // 处理文件（例如：转换大写）
    bool processFile() {
        ifstream inFile(inputFilename, ios::binary);
        if (!inFile) {
            cerr << "无法打开输入文件: " << inputFilename << endl;
            return false;
        }
        
        ofstream outFile(outputFilename, ios::binary);
        if (!outFile) {
            cerr << "无法打开输出文件: " << outputFilename << endl;
            return false;
        }
        
        const size_t readChunk = 1024;  // 每次读取的字节数
        char* readBuffer = new char[readChunk];
        
        while (inFile) {
            // 读取数据
            inFile.read(readBuffer, readChunk);
            size_t bytesRead = inFile.gcount();
            
            if (bytesRead == 0) break;
            
            // 处理数据（转换为大写）
            for (size_t i = 0; i < bytesRead; i++) {
                if (readBuffer[i] >= 'a' && readBuffer[i] <= 'z') {
                    readBuffer[i] = readBuffer[i] - 'a' + 'A';
                }
            }
            
            // 写入处理后的数据到缓冲区
            if (!buffer->write(readBuffer, bytesRead)) {
                // 缓冲区满，写入文件并清空
                outFile.write(buffer->getData(), buffer->getUsed());
                buffer->clear();
                
                // 重新尝试写入当前块
                buffer->write(readBuffer, bytesRead);
            }
        }
        
        // 写入剩余的缓冲区数据
        if (buffer->getUsed() > 0) {
            outFile.write(buffer->getData(), buffer->getUsed());
        }
        
        delete[] readBuffer;
        return true;
    }
};

int main() {
    // 创建测试文件
    {
        ofstream testFile("test_input.txt");
        testFile << "This is a test file.\n";
        testFile << "It contains some lowercase and UPPERCASE letters.\n";
        testFile << "We will convert all text to uppercase using our FileProcessor.\n";
    }
    
    // 处理文件
    FileProcessor processor("test_input.txt", "test_output.txt");
    if (processor.processFile()) {
        cout << "文件处理成功！\n";
        
        // 显示处理结果
        ifstream resultFile("test_output.txt");
        string line;
        cout << "\n处理后的文件内容:\n";
        while (getline(resultFile, line)) {
            cout << line << endl;
        }
    } else {
        cout << "文件处理失败。\n";
    }
    
    return 0;
}`}</CodeBlock>
                <p className="mt-3 text-gray-600">这个例子演示了在文件处理中使用指针进行内存管理、缓冲区操作和数据转换的实际应用。这类技术在文件系统、数据处理和流媒体应用中经常使用。</p>
              </Card>
            </TabPane>
          </Tabs>
          
          <div className="flex justify-between mt-8">
            <Link 
              href="/study/cpp/arrays" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：数组和字符串
            </Link>
            <Link 
              href="/study/cpp/references" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：引用
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointersPage; 