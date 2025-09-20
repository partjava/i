"use client";
import { useState } from "react";
import Link from "next/link";

export default function AssemblyBasicPage() {
  const [activeTab, setActiveTab] = useState("concepts");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">汇编语言基础</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("concepts")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "concepts"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab("registers")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "registers"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          寄存器
        </button>
        <button
          onClick={() => setActiveTab("instructions")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "instructions"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          指令集
        </button>
        <button
          onClick={() => setActiveTab("memory")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "memory"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          内存操作
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "practice"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实战案例
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工具介绍
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "concepts" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">汇编语言基础概念</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是汇编语言</h4>
              <p className="mb-4">
                汇编语言是一种低级编程语言，它与机器语言有着一一对应的关系。汇编语言使用助记符（mnemonics）来表示机器指令，使程序员能够更容易地理解和编写程序。在逆向工程中，理解汇编语言是分析程序行为的基础。
              </p>

              <h4 className="font-semibold">2. 汇编语言的特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>直接操作硬件：汇编语言可以直接访问和操作CPU寄存器、内存等硬件资源</li>
                  <li>执行效率高：汇编程序经过汇编器转换后直接变成机器码，执行效率最高</li>
                  <li>可读性差：相比高级语言，汇编代码的可读性和维护性较差</li>
                  <li>平台相关：不同CPU架构的汇编语言指令集不同，不具有可移植性</li>
                  <li>调试困难：由于直接操作硬件，调试和错误定位相对困难</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 汇编语言的基本组成</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">指令格式</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 基本格式：操作码 操作数1, 操作数2
mov eax, 1234h    ; 将立即数1234h移动到eax寄存器
add ebx, ecx      ; 将ecx的值加到ebx中
sub eax, [esi]    ; 从eax中减去esi指向的内存值

; 注释使用分号(;)开始
; 标签用于标记代码位置
start:
    mov eax, 1
    jmp start     ; 跳转到start标签处`}</code>
                </pre>

                <h5 className="font-semibold mb-2">数据表示</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 十六进制数：以h结尾
mov eax, 0FFh     ; 255的十六进制表示

; 二进制数：以b结尾
mov ebx, 1010b    ; 10的二进制表示

; 字符串：用单引号或双引号括起来
db 'Hello'        ; 定义字符串
dw 'AB'           ; 定义字（2字节）
dd 'ABCD'         ; 定义双字（4字节）`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 汇编语言与高级语言的关系</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// C语言代码
int add(int a, int b) {
    return a + b;
}

// 对应的汇编代码
add:
    push ebp              ; 保存旧的基址指针
    mov ebp, esp          ; 设置新的基址指针
    mov eax, [ebp+8]      ; 获取第一个参数a
    add eax, [ebp+12]     ; 加上第二个参数b
    pop ebp               ; 恢复旧的基址指针
    ret                   ; 返回结果在eax中`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "registers" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">寄存器详解</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 通用寄存器</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">32位寄存器</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>EAX (累加器)：用于算术运算和函数返回值</li>
                  <li>EBX (基址寄存器)：用于存储数据段中的偏移地址</li>
                  <li>ECX (计数器)：用于循环计数和字符串操作</li>
                  <li>EDX (数据寄存器)：用于存储数据，常与EAX配合使用</li>
                  <li>ESI (源索引寄存器)：用于字符串操作的源地址</li>
                  <li>EDI (目标索引寄存器)：用于字符串操作的目标地址</li>
                  <li>EBP (基址指针)：用于访问栈帧中的局部变量</li>
                  <li>ESP (栈指针)：指向栈顶，用于管理栈操作</li>
                </ul>

                <h5 className="font-semibold mb-2">16位寄存器</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 32位寄存器的低16位
AX = EAX的低16位
BX = EBX的低16位
CX = ECX的低16位
DX = EDX的低16位
SI = ESI的低16位
DI = EDI的低16位
BP = EBP的低16位
SP = ESP的低16位`}</code>
                </pre>

                <h5 className="font-semibold mb-2">8位寄存器</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 16位寄存器的低8位和高8位
AL = AX的低8位
AH = AX的高8位
BL = BX的低8位
BH = BX的高8位
CL = CX的低8位
CH = CX的高8位
DL = DX的低8位
DH = DX的高8位`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 段寄存器</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>CS (代码段)：存储当前执行的代码段</li>
                  <li>DS (数据段)：存储程序数据</li>
                  <li>ES (附加段)：用于字符串操作的目标段</li>
                  <li>FS (附加段)：可用于存储线程局部存储</li>
                  <li>GS (附加段)：可用于存储操作系统特定数据</li>
                  <li>SS (栈段)：存储程序栈</li>
                </ul>

                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 段寄存器的使用示例
mov ax, [ds:bx]    ; 从数据段读取数据
mov [es:di], al    ; 写入附加段
push word [ss:sp]  ; 栈操作`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 控制寄存器</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>EIP (指令指针)：存储下一条要执行的指令地址</li>
                  <li>EFLAGS (标志寄存器)：存储CPU状态标志</li>
                </ul>

                <h5 className="font-semibold mb-2">EFLAGS重要标志位</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 常用标志位
CF (Carry Flag)     ; 进位标志
PF (Parity Flag)    ; 奇偶标志
AF (Auxiliary Flag) ; 辅助进位标志
ZF (Zero Flag)      ; 零标志
SF (Sign Flag)      ; 符号标志
OF (Overflow Flag)  ; 溢出标志

; 标志位使用示例
cmp eax, ebx        ; 比较eax和ebx
je label            ; 如果相等则跳转（ZF=1）
jg label            ; 如果大于则跳转（ZF=0且SF=OF）`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "instructions" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">指令集详解</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 数据传输指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; MOV指令：数据传送
mov eax, 1234h     ; 立即数传送到寄存器
mov ebx, eax       ; 寄存器间传送
mov [esi], al      ; 寄存器传送到内存
mov eax, [edi]     ; 内存传送到寄存器

; XCHG指令：数据交换
xchg eax, ebx      ; 交换eax和ebx的值
xchg [esi], al     ; 交换内存和寄存器的值

; PUSH/POP指令：栈操作
push eax           ; 将eax压入栈
pop ebx            ; 将栈顶数据弹出到ebx

; LEA指令：取有效地址
lea eax, [ebx+4]   ; 将ebx+4的地址存入eax`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 算术运算指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; ADD指令：加法
add eax, ebx       ; eax = eax + ebx
add [esi], 5       ; 内存值加5

; SUB指令：减法
sub eax, ebx       ; eax = eax - ebx
sub [esi], 5       ; 内存值减5

; MUL指令：无符号乘法
mul ebx            ; edx:eax = eax * ebx

; IMUL指令：有符号乘法
imul eax, ebx      ; eax = eax * ebx
imul eax, ebx, 5   ; eax = ebx * 5

; DIV指令：无符号除法
div ebx            ; eax = edx:eax / ebx
                  ; edx = edx:eax % ebx

; IDIV指令：有符号除法
idiv ebx           ; 有符号除法`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 逻辑运算指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; AND指令：按位与
and eax, ebx       ; eax = eax & ebx
and [esi], 0Fh     ; 内存值与0Fh相与

; OR指令：按位或
or eax, ebx        ; eax = eax | ebx
or [esi], 80h      ; 内存值与80h相或

; XOR指令：按位异或
xor eax, eax       ; 清零eax
xor [esi], 0FFh    ; 内存值取反

; NOT指令：按位取反
not eax            ; eax = ~eax
not [esi]          ; 内存值取反

; TEST指令：测试位
test eax, 1        ; 测试eax的最低位
jnz label          ; 如果不为0则跳转`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 移位指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; SHL指令：逻辑左移
shl eax, 1         ; eax左移1位
shl eax, cl        ; eax左移cl位

; SHR指令：逻辑右移
shr eax, 1         ; eax右移1位
shr eax, cl        ; eax右移cl位

; SAL指令：算术左移
sal eax, 1         ; 与SHL相同

; SAR指令：算术右移
sar eax, 1         ; 保持符号位的右移

; ROL指令：循环左移
rol eax, 1         ; 循环左移1位

; ROR指令：循环右移
ror eax, 1         ; 循环右移1位`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">5. 控制转移指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; JMP指令：无条件跳转
jmp label          ; 跳转到label
jmp eax            ; 跳转到eax中的地址

; 条件跳转指令
je label           ; 等于则跳转 (ZF=1)
jne label          ; 不等于则跳转 (ZF=0)
jg label           ; 大于则跳转 (ZF=0且SF=OF)
jge label          ; 大于等于则跳转 (SF=OF)
jl label           ; 小于则跳转 (SF≠OF)
jle label          ; 小于等于则跳转 (ZF=1或SF≠OF)

; 循环指令
loop label         ; ecx减1，不为0则跳转
loope label        ; ecx减1，不为0且ZF=1则跳转
loopne label       ; ecx减1，不为0且ZF=0则跳转

; 调用和返回
call label         ; 调用子程序
ret                ; 从子程序返回`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "memory" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">内存操作详解</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 内存寻址方式</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 直接寻址
mov eax, [1234h]   ; 访问地址1234h的内容

; 寄存器间接寻址
mov eax, [ebx]     ; 访问ebx指向的内存

; 基址寻址
mov eax, [ebx+4]   ; 访问ebx+4指向的内存

; 变址寻址
mov eax, [esi*4]   ; 访问esi*4指向的内存

; 基址变址寻址
mov eax, [ebx+esi*4] ; 访问ebx+esi*4指向的内存

; 带位移的基址变址寻址
mov eax, [ebx+esi*4+8] ; 访问ebx+esi*4+8指向的内存`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 内存操作指令</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 内存传送
mov byte [esi], al     ; 传送字节
mov word [esi], ax     ; 传送字
mov dword [esi], eax   ; 传送双字

; 内存比较
cmpsb                  ; 比较字节
cmpsw                  ; 比较字
cmpsd                  ; 比较双字

; 内存扫描
scasb                  ; 扫描字节
scasw                  ; 扫描字
scasd                  ; 扫描双字

; 内存移动
movsb                  ; 移动字节
movsw                  ; 移动字
movsd                  ; 移动双字

; 内存填充
stosb                  ; 填充字节
stosw                  ; 填充字
stosd                  ; 填充双字

; 内存加载
lodsb                  ; 加载字节
lodsw                  ; 加载字
lodsd                  ; 加载双字`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 栈操作</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 基本栈操作
push eax              ; 将eax压入栈
pop ebx               ; 将栈顶数据弹出到ebx

; 栈帧操作
push ebp              ; 保存旧的基址指针
mov ebp, esp          ; 设置新的基址指针
sub esp, 16           ; 分配16字节的局部变量空间

; 访问局部变量
mov [ebp-4], eax      ; 保存局部变量
mov eax, [ebp-4]      ; 读取局部变量

; 访问函数参数
mov eax, [ebp+8]      ; 第一个参数
mov ebx, [ebp+12]     ; 第二个参数

; 恢复栈帧
mov esp, ebp          ; 恢复栈指针
pop ebp               ; 恢复基址指针
ret                   ; 返回`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 简单函数分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; C语言函数
int add(int a, int b) {
    return a + b;
}

; 对应的汇编代码
add:
    push ebp              ; 保存旧的基址指针
    mov ebp, esp          ; 设置新的基址指针
    mov eax, [ebp+8]      ; 获取第一个参数a
    add eax, [ebp+12]     ; 加上第二个参数b
    pop ebp               ; 恢复旧的基址指针
    ret                   ; 返回结果在eax中

; 调用示例
push 5                   ; 第二个参数
push 3                   ; 第一个参数
call add                 ; 调用函数
add esp, 8               ; 清理栈`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 字符串操作</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 字符串复制函数
strcpy:
    push ebp
    mov ebp, esp
    push esi
    push edi
    
    mov edi, [ebp+8]      ; 目标字符串
    mov esi, [ebp+12]     ; 源字符串
    
copy_loop:
    mov al, [esi]         ; 读取源字符
    mov [edi], al         ; 写入目标
    test al, al           ; 检查是否结束
    jz done               ; 如果是0则结束
    inc esi               ; 源指针加1
    inc edi               ; 目标指针加1
    jmp copy_loop         ; 继续循环
    
done:
    pop edi
    pop esi
    pop ebp
    ret

; 字符串比较函数
strcmp:
    push ebp
    mov ebp, esp
    push esi
    push edi
    
    mov esi, [ebp+8]      ; 第一个字符串
    mov edi, [ebp+12]     ; 第二个字符串
    
cmp_loop:
    mov al, [esi]         ; 读取第一个字符
    mov bl, [edi]         ; 读取第二个字符
    cmp al, bl            ; 比较字符
    jne not_equal         ; 如果不相等则跳转
    test al, al           ; 检查是否结束
    jz equal              ; 如果是0则相等
    inc esi               ; 第一个指针加1
    inc edi               ; 第二个指针加1
    jmp cmp_loop          ; 继续循环
    
not_equal:
    mov eax, 1            ; 返回1表示不相等
    jmp done
    
equal:
    xor eax, eax          ; 返回0表示相等
    
done:
    pop edi
    pop esi
    pop ebp
    ret`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 循环结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 数组求和
array_sum:
    push ebp
    mov ebp, esp
    
    mov ecx, [ebp+12]     ; 数组长度
    mov esi, [ebp+8]      ; 数组指针
    xor eax, eax          ; 清零累加器
    
sum_loop:
    add eax, [esi]        ; 加上当前元素
    add esi, 4            ; 移动到下一个元素
    loop sum_loop         ; 循环直到ecx为0
    
    pop ebp
    ret

; 冒泡排序
bubble_sort:
    push ebp
    mov ebp, esp
    push esi
    push edi
    
    mov ecx, [ebp+12]     ; 数组长度
    dec ecx               ; 外循环次数 = 长度-1
    mov esi, [ebp+8]      ; 数组指针
    
outer_loop:
    push ecx              ; 保存外循环计数
    mov edi, esi          ; 内循环指针
    
inner_loop:
    mov eax, [edi]        ; 当前元素
    mov ebx, [edi+4]      ; 下一个元素
    cmp eax, ebx          ; 比较
    jle no_swap           ; 如果小于等于则不交换
    
    ; 交换元素
    mov [edi], ebx
    mov [edi+4], eax
    
no_swap:
    add edi, 4            ; 移动到下一个元素
    loop inner_loop       ; 内循环
    
    pop ecx               ; 恢复外循环计数
    loop outer_loop       ; 外循环
    
    pop edi
    pop esi
    pop ebp
    ret`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 条件分支</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; 最大值函数
max:
    push ebp
    mov ebp, esp
    
    mov eax, [ebp+8]      ; 第一个数
    mov ebx, [ebp+12]     ; 第二个数
    
    cmp eax, ebx          ; 比较两个数
    jge done              ; 如果eax >= ebx则跳转
    mov eax, ebx          ; 否则eax = ebx
    
done:
    pop ebp
    ret

; 阶乘函数
factorial:
    push ebp
    mov ebp, esp
    
    mov eax, [ebp+8]      ; 获取参数n
    cmp eax, 1            ; 比较n和1
    jle base_case         ; 如果n <= 1则跳转
    
    ; 递归调用
    dec eax               ; n-1
    push eax              ; 参数压栈
    call factorial        ; 递归调用
    add esp, 4            ; 清理栈
    
    mul dword [ebp+8]     ; 结果乘以n
    jmp done
    
base_case:
    mov eax, 1            ; 返回1
    
done:
    pop ebp
    ret`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">汇编语言工具介绍</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 汇编器（Assemblers）</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">NASM (Netwide Assembler)</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>特点：跨平台、开源、支持多种输出格式</li>
                  <li>语法简洁，易于学习</li>
                  <li>支持宏和条件汇编</li>
                  <li>广泛用于Linux和Windows平台</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`; NASM示例
section .data
    msg db 'Hello, World!', 0xa
    len equ $ - msg

section .text
    global _start
_start:
    mov eax, 4      ; sys_write
    mov ebx, 1      ; stdout
    mov ecx, msg    ; 消息地址
    mov edx, len    ; 消息长度
    int 0x80        ; 调用内核`}</code>
                </pre>

                <h5 className="font-semibold mb-2">MASM (Microsoft Macro Assembler)</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>微软官方汇编器</li>
                  <li>与Windows平台紧密集成</li>
                  <li>支持高级宏功能</li>
                  <li>提供丰富的库支持</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`.386
.model flat, stdcall
option casemap:none

.data
    msg db "Hello, World!", 0

.code
start:
    invoke MessageBox, 0, addr msg, 0, 0
    invoke ExitProcess, 0
end start`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 反汇编器（Disassemblers）</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">IDA Pro</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>功能最强大的交互式反汇编器</li>
                  <li>支持多种处理器架构</li>
                  <li>提供图形化界面</li>
                  <li>支持脚本扩展</li>
                  <li>具有强大的分析功能</li>
                </ul>

                <h5 className="font-semibold mb-2">Ghidra</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>NSA开发的开源反汇编器</li>
                  <li>支持多种文件格式</li>
                  <li>提供反编译功能</li>
                  <li>具有协作功能</li>
                  <li>支持脚本扩展</li>
                </ul>

                <h5 className="font-semibold mb-2">x64dbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>开源Windows调试器</li>
                  <li>支持32位和64位程序</li>
                  <li>提供反汇编和调试功能</li>
                  <li>支持插件扩展</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 调试器（Debuggers）</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">OllyDbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Windows平台下的32位调试器</li>
                  <li>界面友好，易于使用</li>
                  <li>支持插件扩展</li>
                  <li>提供反汇编和调试功能</li>
                </ul>

                <h5 className="font-semibold mb-2">GDB (GNU Debugger)</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>跨平台命令行调试器</li>
                  <li>支持多种处理器架构</li>
                  <li>提供丰富的调试命令</li>
                  <li>支持远程调试</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# GDB常用命令
gdb ./program          # 启动调试
break main             # 在main函数设置断点
run                    # 运行程序
next                   # 单步执行
step                   # 步入函数
continue              # 继续执行
info registers        # 查看寄存器
x/10x $esp           # 查看栈内容`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 开发环境（Development Environments）</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">Visual Studio</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>集成MASM汇编器</li>
                  <li>提供完整的调试功能</li>
                  <li>支持内联汇编</li>
                  <li>与Windows开发紧密集成</li>
                </ul>

                <h5 className="font-semibold mb-2">RadASM</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>专门的汇编语言IDE</li>
                  <li>支持多种汇编器</li>
                  <li>提供语法高亮</li>
                  <li>集成调试功能</li>
                </ul>

                <h5 className="font-semibold mb-2">SASM</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>跨平台汇编语言IDE</li>
                  <li>支持NASM、MASM、GAS</li>
                  <li>提供实时编译和运行</li>
                  <li>适合初学者使用</li>
                </ul>
              </div>

              <h4 className="font-semibold">5. 实用工具（Utility Tools）</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">PE Explorer</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>PE文件分析工具</li>
                  <li>查看资源、导入导出表</li>
                  <li>支持反汇编功能</li>
                  <li>提供十六进制编辑器</li>
                </ul>

                <h5 className="font-semibold mb-2">HxD</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>十六进制编辑器</li>
                  <li>支持大文件编辑</li>
                  <li>提供数据比较功能</li>
                  <li>支持磁盘编辑</li>
                </ul>

                <h5 className="font-semibold mb-2">Process Monitor</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>系统活动监控工具</li>
                  <li>跟踪文件系统活动</li>
                  <li>监控注册表访问</li>
                  <li>分析程序行为</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 逆向工程基础
        </Link>
        <Link
          href="/study/security/reverse/pe"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          PE文件分析 →
        </Link>
      </div>
    </div>
  );
} 