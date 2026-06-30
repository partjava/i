'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '网络编程', chapterNumber: 9, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '多线程与并发', href: '/study/computer/java/thread' },
  nextChapter: { label: '项目实战', href: '/study/computer/java/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Socket 编程',
    left: (
      <div className="space-y-4">
        <PageTitle>TCP 通信</PageTitle>
        <BookParagraph>Socket 是实现网络通信的基础。Java 提供了 ServerSocket 和 Socket 类简化 TCP 编程。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`// 服务器
ServerSocket server = new ServerSocket(8080);
System.out.println("等待客户端连接...");

Socket client = server.accept();
BufferedReader in = new BufferedReader(
    new InputStreamReader(client.getInputStream()));
PrintWriter out = new PrintWriter(
    client.getOutputStream(), true);

String msg = in.readLine();
System.out.println("收到: " + msg);
out.println("已收到: " + msg);

client.close();
server.close();

// 客户端
Socket socket = new Socket("localhost", 8080);
PrintWriter out = new PrintWriter(
    socket.getOutputStream(), true);
BufferedReader in = new BufferedReader(
    new InputStreamReader(socket.getInputStream()));

out.println("Hello Server");
System.out.println(in.readLine());

socket.close();`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>UDP 通信</PageTitle>
        <BookCode language="java" showLineNumbers code={`// UDP 服务器
DatagramSocket server = new DatagramSocket(9090);
byte[] buf = new byte[1024];
DatagramPacket packet = new DatagramPacket(buf, buf.length);
server.receive(packet);
String msg = new String(packet.getData(), 0, packet.getLength());
System.out.println("收到: " + msg);

InetAddress addr = packet.getAddress();
int port = packet.getPort();
byte[] resp = "ACK".getBytes();
server.send(new DatagramPacket(resp, resp.length, addr, port));
server.close();

// UDP 客户端
DatagramSocket client = new DatagramSocket();
byte[] data = "Hello".getBytes();
client.send(new DatagramPacket(data, data.length,
    InetAddress.getByName("localhost"), 9090));

byte[] buf2 = new byte[1024];
DatagramPacket resp2 = new DatagramPacket(buf2, buf2.length);
client.receive(resp2);
System.out.println(new String(resp2.getData(), 0, resp2.getLength()));
client.close();`} />
      </div>
    ),
  },
  {
    label: 'HTTP 与 URL',
    left: (
      <div className="space-y-4">
        <PageTitle>HTTP 请求</PageTitle>
        <BookCode language="java" showLineNumbers code={`// HttpURLConnection
URL url = new URL("https://api.github.com");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
conn.setRequestProperty("Accept", "application/json");

int code = conn.getResponseCode();
BufferedReader reader = new BufferedReader(
    new InputStreamReader(conn.getInputStream()));
String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}

// HttpClient（Java 11+）
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.github.com"))
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络编程总结</PageTitle>
        <BookList items={[
          'TCP 面向连接可靠，适合要求完整性的场景',
          'UDP 无连接快速，适合实时性要求高的场景',
          'HTTP 是应用层协议，底层基于 TCP',
          'Java 11+ 的 HttpClient 简化了 HTTP 请求',
          '线程池搭配 Socket 实现高并发服务器',
          '注意处理网络异常和超时情况',
        ]} />
        <BookAlert type="info" message="生产环境推荐使用 Netty 或 Spring WebFlux 进行网络编程，比原生 Socket 更高效" />
        <TagGrid items={['Socket', 'TCP', 'UDP', 'HTTP', 'ServerSocket', 'URL']} />
      </div>
    ),
  },
]

export default function NetworkPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
