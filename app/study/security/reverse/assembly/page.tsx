'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '汇编语言基础',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: '逆向工程基础', href: '/study/security/reverse/basic' },
  nextChapter: { label: 'PE文件分析', href: '/study/security/reverse/pe' },
  theme: THEMES.security,
}

const formatCode = `; 基本格式：操作码 操作数1, 操作数2
mov eax, 1234h    ; 将立即数1234h移动到eax寄存器
add ebx, ecx      ; 将ecx的值加到ebx中
sub eax, [esi]    ; 从eax中减去esi指向的内存值

; 注释使用分号(;)开始
start:
    mov eax, 1
    jmp start     ; 跳转到start标签处`

const dataCode = `; 十六进制数：以h结尾
mov eax, 0FFh     ; 255的十六进制表示
; 二进制数：以b结尾
mov ebx, 1010b    ; 10的二进制表示
; 字符串
db 'Hello'        ; 定义字符串
dw 'AB'           ; 定义字（2字节）
dd 'ABCD'         ; 定义双字（4字节）`

const hlCompare = `// C语言代码
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
    ret                   ; 返回结果在eax中`

const regCode = `; 32位寄存器：EAX(累加器) EBX(基址) ECX(计数器) EDX(数据)
; ESI(源索引) EDI(目标索引) EBP(基址指针) ESP(栈指针)
; 16位：AX BX CX DX SI DI BP SP
; 8位：AL AH BL BH CL CH DL DH

; EFLAGS重要标志位
CF (Carry Flag)     ; 进位标志
ZF (Zero Flag)      ; 零标志
SF (Sign Flag)      ; 符号标志
OF (Overflow Flag)  ; 溢出标志

cmp eax, ebx        ; 比较eax和ebx
je label            ; 如果相等则跳转（ZF=1）`

const dataTransferCode = `; MOV指令：数据传送
mov eax, 1234h     ; 立即数传送到寄存器
mov ebx, eax       ; 寄存器间传送
mov [esi], al      ; 寄存器传送到内存
mov eax, [edi]     ; 内存传送到寄存器

; XCHG指令：数据交换
xchg eax, ebx      ; 交换eax和ebx的值

; PUSH/POP指令：栈操作
push eax           ; 将eax压入栈
pop ebx            ; 将栈顶数据弹出到ebx

; LEA指令：取有效地址
lea eax, [ebx+4]   ; 将ebx+4的地址存入eax`

const arithmeticCode = `; ADD/SUB
add eax, ebx       ; eax = eax + ebx
sub eax, ebx       ; eax = eax - ebx

; MUL/IMUL
mul ebx            ; edx:eax = eax * ebx
imul eax, ebx, 5   ; eax = ebx * 5

; DIV/IDIV
div ebx            ; eax = edx:eax / ebx, edx = 余数`

const logicCode = `; AND/OR/XOR
and eax, ebx       ; eax = eax & ebx
or eax, ebx        ; eax = eax | ebx
xor eax, eax       ; 清零eax

; TEST
test eax, 1        ; 测试eax的最低位
jnz label          ; 如果不为0则跳转

; SHL/SHR移位
shl eax, 1         ; eax左移1位
shr eax, 1         ; eax右移1位`

const jumpCode = `; JMP无条件跳转
jmp label          ; 跳转到label

; 条件跳转
je/jne             ; 等于/不等于则跳转
jg/jge             ; 大于/大于等于
jl/jle             ; 小于/小于等于

; LOOP循环
loop label         ; ecx减1，不为0则跳转

; CALL/RET
call label         ; 调用子程序
ret                ; 从子程序返回`

const memoryCode = `; 直接寻址
mov eax, [1234h]   ; 访问地址1234h的内容
; 寄存器间接寻址
mov eax, [ebx]     ; 访问ebx指向的内存
; 基址寻址
mov eax, [ebx+4]   ; 访问ebx+4指向的内存
; 基址变址寻址
mov eax, [ebx+esi*4+8] ; 基址变址+位移

; 栈帧操作
push ebp
mov ebp, esp
sub esp, 16        ; 分配局部变量空间
mov [ebp-4], eax   ; 保存局部变量
mov eax, [ebp+8]   ; 第一个参数
mov eax, [ebp+12]  ; 第二个参数
mov esp, ebp
pop ebp
ret`

const funcCode = `; 函数调用分析
push 5             ; 第二个参数
push 3             ; 第一个参数
call add           ; 调用函数
add esp, 8         ; 清理栈

; 字符串复制
strcpy:
    push ebp
    mov ebp, esp
    push esi
    push edi
    mov edi, [ebp+8]   ; 目标
    mov esi, [ebp+12]  ; 源
copy_loop:
    mov al, [esi]
    mov [edi], al
    test al, al
    jz done
    inc esi
    inc edi
    jmp copy_loop
done:
    pop edi
    pop esi
    pop ebp
    ret`

const loopCode = `; 数组求和
array_sum:
    push ebp
    mov ebp, esp
    mov ecx, [ebp+12]  ; 数组长度
    mov esi, [ebp+8]   ; 数组指针
    xor eax, eax
sum_loop:
    add eax, [esi]
    add esi, 4
    loop sum_loop
    pop ebp
    ret

; 阶乘（递归）
factorial:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8]
    cmp eax, 1
    jle base_case
    dec eax
    push eax
    call factorial
    add esp, 4
    mul dword [ebp+8]
    jmp done
base_case:
    mov eax, 1
done:
    pop ebp
    ret`

const gdbCode = `# GDB常用命令
gdb ./program          # 启动调试
break main             # 在main函数设置断点
run                    # 运行程序
next                   # 单步执行
step                   # 步入函数
continue              # 继续执行
info registers        # 查看寄存器
x/10x $esp           # 查看栈内容`

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>汇编语言基础概念</PageTitle>
        <BookParagraph>
          汇编语言是一种低级编程语言，它与机器语言有着一一对应的关系。汇编语言使用助记符来表示机器指令，使程序员能够更容易地理解和编写程序。在逆向工程中，理解汇编语言是分析程序行为的基础。
        </BookParagraph>
        <SectionTitle>汇编语言的特点</SectionTitle>
        <BookList items={['直接操作硬件：可直接访问和操作CPU寄存器、内存等硬件资源', '执行效率高：汇编程序经过汇编器转换后直接变成机器码', '可读性差：相比高级语言，汇编代码的可读性和维护性较差', '平台相关：不同CPU架构的汇编语言指令集不同']} />
        <SectionTitle>基本组成</SectionTitle>
        <BookCode language="asm" code={formatCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数据表示</SectionTitle>
        <BookCode language="asm" code={dataCode} />
        <SectionTitle>汇编与高级语言的关系</SectionTitle>
        <BookCode language="asm" code={hlCompare} />
      </div>
    ),
  },
  {
    label: '寄存器与指令集',
    left: (
      <div className="space-y-4">
        <PageTitle>寄存器详解</PageTitle>
        <BookCode language="asm" code={regCode} />
        <BookList items={['段寄存器：CS(代码段) DS(数据段) ES SS FS GS', '控制寄存器：EIP(指令指针) EFLAGS(标志寄存器)']} />
        <SectionTitle>数据传输指令</SectionTitle>
        <BookCode language="asm" code={dataTransferCode} />
        <SectionTitle>算术运算指令</SectionTitle>
        <BookCode language="asm" code={arithmeticCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>逻辑运算与移位指令</SectionTitle>
        <BookCode language="asm" code={logicCode} />
        <SectionTitle>控制转移指令</SectionTitle>
        <BookCode language="asm" code={jumpCode} />
      </div>
    ),
  },
  {
    label: '内存操作',
    left: (
      <div className="space-y-4">
        <PageTitle>内存操作详解</PageTitle>
        <SectionTitle>寻址方式与栈操作</SectionTitle>
        <BookCode language="asm" code={memoryCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <SectionTitle>函数分析与字符串操作</SectionTitle>
        <BookCode language="asm" code={funcCode} />
        <SectionTitle>循环与递归</SectionTitle>
        <BookCode language="asm" code={loopCode} />
      </div>
    ),
  },
  {
    label: '工具介绍',
    left: (
      <div className="space-y-4">
        <PageTitle>汇编语言工具</PageTitle>
        <SectionTitle>汇编器</SectionTitle>
        <BookList items={['NASM：跨平台开源，语法简洁，广泛用于Linux/Windows', 'MASM：微软官方汇编器，与Windows紧密集成']} />
        <SectionTitle>反汇编器</SectionTitle>
        <BookList items={['IDA Pro：功能最强大的交互式反汇编器', 'Ghidra：NSA开发的开源反汇编器，支持反编译', 'x64dbg：开源Windows调试器']} />
        <SectionTitle>调试器</SectionTitle>
        <BookList items={['OllyDbg：Windows 32位调试器，适合初学者', 'GDB：跨平台命令行调试器']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="bash" code={gdbCode} />
        <SectionTitle>开发环境</SectionTitle>
        <BookList items={['Visual Studio：集成MASM汇编器', 'RadASM：专门的汇编语言IDE', 'SASM：跨平台汇编语言IDE，适合初学者']} />
        <SectionTitle>实用工具</SectionTitle>
        <BookList items={['PE Explorer：PE文件分析', 'HxD：十六进制编辑器', 'Process Monitor：系统活动监控']} />
      </div>
    ),
  },
]

export default function AssemblyBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
