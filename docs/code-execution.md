# 代码执行服务

## 最终分工

- 挑战页：OnlineCompiler 原生 API。
- 编程页和独立编辑器：继续使用 Judge0，未切换服务商。
- 两条路径都不使用模拟输出冒充执行成功，不在应用服务器直接执行用户代码。

## 挑战页两种操作

- **运行样例**：`POST /api/challenges/{id}/run`，最多选择前两个公开样例，不读取隐藏用例，不写通关进度。
- **提交判题**：`POST /api/challenges/{id}/submit`，检查全部公开和隐藏用例，全部通过后仅为已登录账号记录通关。
- 没有测试用例时只真实执行代码，结果为 `EXECUTED`，不会标为通关。
- 用户修改代码后，界面会提示结果属于上次提交；切题和停止等待后忽略旧请求。

## 后端配置

参考 `partjava-backend/onlinecompiler.env.example`。将以下变量设置在 **Java 后端进程环境**，重启后生效：

```dotenv
ONLINECOMPILER_API_KEY=申请得到的密钥
ONLINECOMPILER_BASE_URL=https://api.onlinecompiler.io
ONLINECOMPILER_COMPILER=python-3.14
ONLINECOMPILER_BATCH_SIZE=8
```

示例文件本身不会被 Spring Boot 自动加载。真实密钥统一放在同级数据目录：
`../partjavadata/secrets/onlinecompiler.env`（权限 600，并已加入 partjavadata 的 Git 忽略规则）。
后端从 i 项目根目录或 partjava-backend 目录启动时会自动读取该 properties 格式文件，环境变量仍可覆盖配置。
`partjavadata/sync.sh back` 或 `all` 会将该文件同步至服务器同级的 partjavadata/secrets，再重启服务。
该文件仅供后端读取，不会进入前端构建产物。
不要使用 `NEXT_PUBLIC_` 前缀，不要把真实 Key 写到前端、仓库或提交说明。
未配置 Key 时返回 `SERVICE_UNAVAILABLE`，不会回退为模拟执行、Docker 或宿主机 Python。
Judge0 仍使用原有 `judge0.*` 配置，OnlineCompiler 变量不影响它。

## 调用、限流和失败

- 有测试用例时调用 `/api/run-tests/`；无用例时调用 `/api/run-code-sync/`。
- 默认每批最多 8 个用例，由提供方在免费套餐下最多同时运行 2 个；不是同时发 8 个请求。
- 超过一批时顺序提交下一批；前一批失败就停止，不以部分通过计为通关。
- 每批最多等待 70 秒，少量样例最多 60 秒，整次判题最多 180 秒；网络超时不冒充学生程序超时。
- 同一后端实例同一时刻只发一组判题请求，繁忙时返回 `SYSTEM_BUSY`。多实例部署需额外共用配额协调。
- 不自动重试，避免重复执行和重复消耗额度。停止浏览器等待不保证提供方的任务已经终止。
- 官方套餐按每个测试用例计一次运行，并限制并发和待运行数量；当前上限应以提供方控制台为准。
- 返回数量不全、跳过、未完成、状态矛盾或返回格式异常均不判通过。隐藏样例不向学生返回输出和诊断。

官方接口：
- https://onlinecompiler.io/docs/run-code
- https://onlinecompiler.io/docs/run-tests

## 函数适配

保留现有 Python 编辑器。函数题通过适配层读取明确的 `function/entryPoint`、`args/kwargs`，
把返回值序列化后交给提供方判题。多入口不猜“最后一个函数”，不会 `eval` 输入或把展示字符串当成正确值。
支持标准输入模式和明确的 `expectedException`。代码不超过 64 KiB，适配后不超过提供方 100 KB 限制。
本次按用户要求暂停题库排查，不修改题库或线上数据库。

## 验证

```bash
npm test
cd partjava-backend
mvn clean test
python3 -m unittest discover -s src/test/python
```

上述测试使用模拟服务和仓库内固定片段，不调用真实服务，不消耗账号运行额度。
拿到 Key 后再执行可选真实联调：

```bash
PARTJAVA_RUN_ONLINECOMPILER_TESTS=true mvn -Dtest=SandboxServiceTest test
```

真实联调会向提供方提交固定测试程序，消耗少量运行额度。未启用时集成测试明确显示 skipped。
