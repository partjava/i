'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '文件基础操作' },
  { key: 'dir', label: '目录操作' },
  { key: 'perm', label: '文件权限' },
  { key: 'watch', label: '文件监控' },
  { key: 'compress', label: '文件压缩' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoFileIOPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言文件操作</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件基础操作</h2>
            <p>使用os、io、bufio等包进行文件读写操作。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "os"
    "io"
    "bufio"
)

// 读取文件
func readFile(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close()
    
    // 使用bufio提高性能
    reader := bufio.NewReader(f)
    content, err := io.ReadAll(reader)
    if err != nil {
        return "", err
    }
    return string(content), nil
}

// 写入文件
func writeFile(path, content string) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()
    
    writer := bufio.NewWriter(f)
    if _, err := writer.WriteString(content); err != nil {
        return err
    }
    return writer.Flush()
}

// 追加写入
func appendFile(path, content string) error {
    f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return err
    }
    defer f.Close()
    
    if _, err := f.WriteString(content); err != nil {
        return err
    }
    return nil
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>os.Open：打开文件，只读模式。</li>
              <li>os.Create：创建文件，如果存在则清空。</li>
              <li>bufio：带缓冲的I/O，提高性能。</li>
            </ul>
          </div>
        )}
        {activeTab === 'dir' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">目录操作</h2>
            <p>使用os包进行目录创建、遍历等操作。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "os"
    "path/filepath"
)

// 创建目录
func createDir(path string) error {
    return os.MkdirAll(path, 0755)
}

// 遍历目录
func walkDir(root string) error {
    return filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        if !info.IsDir() {
            fmt.Println("文件:", path)
        }
        return nil
    })
}

// 获取当前目录
func getCurrentDir() (string, error) {
    return os.Getwd()
}

// 切换目录
func changeDir(path string) error {
    return os.Chdir(path)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>os.Mkdir：创建单级目录。</li>
              <li>os.MkdirAll：创建多级目录。</li>
              <li>filepath.Walk：递归遍历目录。</li>
            </ul>
          </div>
        )}
        {activeTab === 'perm' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件权限</h2>
            <p>使用os包管理文件权限和属性。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "os"
    "time"
)

// 修改文件权限
func chmod(path string, mode os.FileMode) error {
    return os.Chmod(path, mode)
}

// 修改文件所有者
func chown(path string, uid, gid int) error {
    return os.Chown(path, uid, gid)
}

// 获取文件信息
func getFileInfo(path string) (os.FileInfo, error) {
    return os.Stat(path)
}

// 修改文件时间
func setFileTime(path string, atime, mtime time.Time) error {
    return os.Chtimes(path, atime, mtime)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>os.FileMode：文件权限模式。</li>
              <li>os.Stat：获取文件信息。</li>
              <li>os.Chmod：修改文件权限。</li>
            </ul>
          </div>
        )}
        {activeTab === 'watch' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件监控</h2>
            <p>使用fsnotify包监控文件变化。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "github.com/fsnotify/fsnotify"
    "log"
)

func watchFile(path string) {
    watcher, err := fsnotify.NewWatcher()
    if err != nil {
        log.Fatal(err)
    }
    defer watcher.Close()
    
    // 添加监控路径
    err = watcher.Add(path)
    if err != nil {
        log.Fatal(err)
    }
    
    // 处理事件
    for {
        select {
        case event, ok := <-watcher.Events:
            if !ok {
                return
            }
            switch {
            case event.Op&fsnotify.Create == fsnotify.Create:
                log.Println("创建文件:", event.Name)
            case event.Op&fsnotify.Write == fsnotify.Write:
                log.Println("修改文件:", event.Name)
            case event.Op&fsnotify.Remove == fsnotify.Remove:
                log.Println("删除文件:", event.Name)
            }
        case err, ok := <-watcher.Errors:
            if !ok {
                return
            }
            log.Println("错误:", err)
        }
    }
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>fsnotify：跨平台文件监控。</li>
              <li>支持创建、修改、删除等事件。</li>
              <li>可用于热重载、日志监控等场景。</li>
            </ul>
          </div>
        )}
        {activeTab === 'compress' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件压缩</h2>
            <p>使用archive包进行文件压缩和解压。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "archive/zip"
    "archive/tar"
    "compress/gzip"
    "io"
    "os"
)

// 创建zip文件
func createZip(output string, files []string) error {
    f, err := os.Create(output)
    if err != nil {
        return err
    }
    defer f.Close()
    
    writer := zip.NewWriter(f)
    defer writer.Close()
    
    for _, file := range files {
        w, err := writer.Create(file)
        if err != nil {
            return err
        }
        data, err := os.ReadFile(file)
        if err != nil {
            return err
        }
        if _, err := w.Write(data); err != nil {
            return err
        }
    }
    return nil
}

// 解压zip文件
func extractZip(zipFile, dest string) error {
    r, err := zip.OpenReader(zipFile)
    if err != nil {
        return err
    }
    defer r.Close()
    
    for _, f := range r.File {
        rc, err := f.Open()
        if err != nil {
            return err
        }
        defer rc.Close()
        
        path := filepath.Join(dest, f.Name)
        if f.FileInfo().IsDir() {
            os.MkdirAll(path, f.Mode())
        } else {
            os.MkdirAll(filepath.Dir(path), f.Mode())
            f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
            if err != nil {
                return err
            }
            defer f.Close()
            
            if _, err := io.Copy(f, rc); err != nil {
                return err
            }
        }
    }
    return nil
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>archive/zip：ZIP格式压缩。</li>
              <li>archive/tar：TAR格式打包。</li>
              <li>compress/gzip：GZIP压缩。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现文件内容搜索</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func searchInFile(path, keyword string) ([]string, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    
    var lines []string
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        line := scanner.Text()
        if strings.Contains(line, keyword) {
            lines = append(lines, line)
        }
    }
    return lines, scanner.Err()
}`}
            </pre>
            <p className="mb-2 font-semibold">例题2：实现文件复制</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func copyFile(src, dst string) error {
    source, err := os.Open(src)
    if err != nil {
        return err
    }
    defer source.Close()
    
    destination, err := os.Create(dst)
    if err != nil {
        return err
    }
    defer destination.Close()
    
    _, err = io.Copy(destination, source)
    return err
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现日志文件轮转</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func rotateLogFile(path string, maxSize int64) error {
    info, err := os.Stat(path)
    if err != nil {
        return err
    }
    
    if info.Size() < maxSize {
        return nil
    }
    
    // 重命名旧文件
    timestamp := time.Now().Format("20060102150405")
    backupPath := path + "." + timestamp
    if err := os.Rename(path, backupPath); err != nil {
        return err
    }
    
    // 创建新文件
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    return f.Close()
}`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 如何高效读取大文件？</b><br />
                A: 使用bufio.Reader分块读取，避免一次性加载。
              </li>
              <li>
                <b>Q: 文件操作如何保证原子性？</b><br />
                A: 使用临时文件+重命名，或文件锁。
              </li>
              <li>
                <b>Q: 如何处理文件路径？</b><br />
                A: 使用path/filepath包，避免直接拼接字符串。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/stdlib"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：标准库使用
          </a>
          <a
            href="/study/go/networking"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：网络编程
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}