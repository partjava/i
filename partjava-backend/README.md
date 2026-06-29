# PartJava Backend (Spring Boot 重构版)

本项目是 PartJava 智能学习平台后端的 Java 重构版本。采用 **Java 21** 运行环境与 **Spring Boot 3.3.x** 架构，核心目的在于将原有的 Next.js BFF 接口完整迁移至高性能的 Spring Boot 体系，并使用 Docker 安全评测沙箱提升编程挑战宇宙的防御能力。

> [!IMPORTANT]
> **⚠️ 迁移开发注意事项**：
> 在用户（liming）明确表示测试验证通过、没问题之前，**绝对不能删除或修改原前端项目中的 Next.js BFF 接口代码**。新旧后端采用双轨并行方式运行，保证系统稳定过渡。

---

## 🛠️ 技术选型与运行环境

* **运行环境**：JDK 21 (启用 Virtual Threads 虚拟线程支持高并发 SSE 长连接)
* **核心框架**：Spring Boot 3.3.1
* **数据持久化**：MySQL 8.0 + MyBatis-Plus 3.5.7
* **缓存与打卡机制**：Redis 7.x (打卡使用 Redis Bitmap 位图优化)
* **安全拦截与鉴权**：Spring Security 6.x + JJWT 0.12.5 (无状态 Token 验证)
* **接口文档**：Springdoc-openapi (Swagger 3)

---

## 📂 项目目录布局

```
partjava-backend/
├── pom.xml                                   # Maven 依赖声明文件
├── README.md                                 # 本说明文档
├── docx/                                     # 核心设计与迁移文档
│   ├── backend_design_proposal.md            # 后端核心业务设计规格说明书
│   └── migration_guide.md                    # Next.js BFF 到 Spring Boot 映射指南
└── src/
    ├── main/
    │   ├── java/com/partjava/
    │   │   ├── PartJavaApplication.java      # Spring Boot 启动类
    │   │   ├── common/                       # 公共类库
    │   │   │   ├── api/ApiResponse.java      # 统一响应包装体
    │   │   │   └── exception/GlobalException # 全局异常处理器
    │   │   └── config/                       # 配置包
    │   │       ├── MyBatisPlusConfig.java    # MyBatis-Plus 插件配置
    │   │       ├── RedisConfig.java          # RedisTemplate 序列化配置
    │   │       └── SecurityConfig.java       # Spring Security 核心配置
    │   └── resources/
    │       └── application.yml               # 全局环境属性配置文件
    └── test/                                 # 单元测试包
```

---

## 🚀 编译与运行指南

### 1. 本地环境要求
* **JDK**: Java 21 或以上
* **Maven**: 3.6.x 或以上
* **MySQL**: 8.0 运行中
* **Redis**: 运行中

### 2. 编译项目
在当前 `partjava-backend` 目录下，使用 Maven 编译拉取依赖并进行代码校验：
```bash
mvn clean compile
```

### 3. 启动应用
运行 Spring Boot 应用（启动后默认监听 **`8080` 端口**，API 统一前缀为 `/api`）：
```bash
mvn spring-boot:run
```

---

## 🌐 接口文档访问
应用启动后，可以在浏览器中直接访问自动生成的 Swagger API 接口调试文档：
* **Swagger 3 UI**: `http://localhost:8080/api/swagger-ui.html`
* **OpenAPI 3 JSON Docs**: `http://localhost:8080/api/v3/api-docs`
