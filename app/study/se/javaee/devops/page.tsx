'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'DevOps与CI/CD',
  chapterNumber: 15,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '容器化与云服务', href: '/study/se/javaee/cloud' },
  nextChapter: { label: '前沿技术趋势', href: '/study/se/javaee/trend' },
  theme: THEMES.software,
}

const JENKINSFILE = `pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker build -t myapp:$’{BUILD_NUMBER} .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}`

const JENKINS_CONFIG = `# jenkins.yaml
jenkins:
  systemMessage: "Jenkins configured automatically by Jenkins Configuration as Code plugin"
  numExecutors: 2
  scmCheckoutRetryCount: 3
  mode: NORMAL

  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "admin"

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
            assignments:
              - "admin"`

const GITLAB_CI = `stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository
    - target/

build:
  stage: build
  image: maven:3.8-openjdk-11
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths:
      - target/*.jar

test:
  stage: test
  image: maven:3.8-openjdk-11
  script:
    - mvn test

deploy:
  stage: deploy
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA
    - kubectl set image deployment/myapp myapp=myapp:$CI_COMMIT_SHA`

const RUNNER_CONFIG = `# config.toml
concurrent = 4

[[runners]]
  name = "java-runner"
  url = "https://gitlab.com"
  token = "your-token"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "maven:3.8-openjdk-11"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0`

const JUNIT_TEST = `@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setUsername("test");
        user.setEmail("test@example.com");

        User saved = userService.createUser(user);

        assertNotNull(saved.getId());
        assertEquals("test", saved.getUsername());
    }

    @Test
    public void testFindByUsername() {
        User user = userService.findByUsername("test");
        assertNotNull(user);
        assertEquals("test@example.com", user.getEmail());
    }
}`

const INTEGRATION_TEST = `@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetUser() throws Exception {
        mockMvc.perform(get("/api/users/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.username").value("test"));
    }

    @Test
    public void testCreateUser() throws Exception {
        mockMvc.perform(post("/api/users")
               .contentType(MediaType.APPLICATION_JSON)
               .content("{\\"username\\":\\"test\\",\\"email\\":\\"test@example.com\\"}"))
               .andExpect(status().isCreated());
    }
}`

const CI_CD_PROCESS = `# 1. 代码提交
git add .
git commit -m "feat: add new feature"
git push origin develop

# 2. CI/CD触发
# Jenkins自动拉取代码并执行构建
# 运行单元测试
# 代码质量检查
# 构建Docker镜像
# 部署到测试环境

# 3. 测试验证
# 运行集成测试
# 性能测试
# 安全扫描

# 4. 生产部署
# 合并到master分支
# 触发生产环境部署
# 执行数据库迁移
# 更新服务配置

# 5. 监控与回滚
# 监控服务健康状态
# 检查业务指标
# 必要时执行回滚`

const AUTO_SCRIPT = `#!/bin/bash

# 部署脚本
deploy() {
    echo "开始部署..."

    # 拉取最新代码
    git pull origin master

    # 构建项目
    mvn clean package -DskipTests

    # 构建Docker镜像
    docker build -t myapp:$‘{BUILD_NUMBER} .

    # 推送镜像
    docker push myapp:$‘{BUILD_NUMBER}

    # 更新K8s部署
    kubectl set image deployment/myapp myapp=myapp:$‘{BUILD_NUMBER}

    # 等待部署完成
    kubectl rollout status deployment/myapp

    echo "部署完成"
}

# 回滚脚本
rollback() {
    echo "开始回滚..."

    # 获取上一个版本
    PREV_VERSION=$(kubectl get deployment myapp -o jsonpath='{.spec.template.spec.containers[0].image}' | cut -d':' -f2)

    # 回滚到上一个版本
    kubectl set image deployment/myapp myapp=myapp:$‘{PREV_VERSION}

    # 等待回滚完成
    kubectl rollout status deployment/myapp

    echo "回滚完成"
}`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>DevOps与CI/CD概述</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">DevOps核心理念</h3>
        <BookList items={[
          '持续集成（CI）',
          '持续交付（CD）',
          '自动化部署',
          '自动化测试',
          '监控与反馈',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">主流工具链</h3>
        <BookList items={[
          'Jenkins：CI/CD服务器',
          'GitLab CI：代码托管与CI/CD',
          'Maven/Gradle：构建工具',
          'SonarQube：代码质量',
          'JUnit/TestNG：单元测试',
        ]} />
        <TagGrid items={['DevOps', 'CI/CD', 'Jenkins', 'GitLab CI', '自动化']} />
      </div>
    ),
  },
  {
    label: 'CI/CD基础',
    left: (
      <div className="space-y-4">
        <PageTitle>CI/CD基础</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">CI/CD流程</h3>
        <BookList items={[
          '代码提交触发构建',
          '自动化测试执行',
          '代码质量检查',
          '构建Docker镜像',
          '部署到测试环境',
          '自动化验收测试',
          '生产环境部署',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">最佳实践</h3>
        <BookList items={[
          '版本控制规范',
          '分支管理策略',
          '自动化测试覆盖',
          '环境一致性',
          '回滚机制',
        ]} />
        <BookAlert type="info" message="CI/CD的核心目标是尽早发现和修复问题，确保软件随时可以可靠地发布到生产环境。" />
        <TagGrid items={['CI流程', 'CD流程', '自动化', '版本控制', '分支管理']} />
      </div>
    ),
  },
  {
    label: 'Jenkins实战',
    left: (
      <div className="space-y-4">
        <PageTitle>Jenkins实战</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">Jenkinsfile示例</h3>
        <BookCode language="groovy" code={JENKINSFILE} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Jenkins配置</h3>
        <BookCode language="yaml" code={JENKINS_CONFIG} />
        <TagGrid items={['Jenkinsfile', 'Pipeline', '构建', '部署', 'CI/CD']} />
      </div>
    ),
  },
  {
    label: 'GitLab CI',
    left: (
      <div className="space-y-4">
        <PageTitle>GitLab CI</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">.gitlab-ci.yml示例</h3>
        <BookCode language="yaml" code={GITLAB_CI} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">GitLab Runner配置</h3>
        <BookCode language="toml" code={RUNNER_CONFIG} />
        <BookAlert type="info" message="GitLab CI 与代码仓库深度集成，支持 Merge Request 触发流水线，配合 GitLab Runner 实现分布式构建。" />
        <TagGrid items={['GitLab CI', 'Runner', '流水线', '构建', '持续集成']} />
      </div>
    ),
  },
  {
    label: '自动化测试',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化测试</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">JUnit测试示例</h3>
        <BookCode language="java" code={JUNIT_TEST} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">集成测试配置</h3>
        <BookCode language="java" code={INTEGRATION_TEST} />
        <TagGrid items={['JUnit', 'MockMvc', '单元测试', '集成测试', 'Spring Boot']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>实用示例</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">完整CI/CD流程</h3>
        <BookCode language="bash" code={CI_CD_PROCESS} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">自动化脚本</h3>
        <BookCode language="bash" code={AUTO_SCRIPT} />
        <BookAlert type="success" message="完善的CI/CD流程包括构建、测试、部署、监控和回滚五个环节，确保软件交付的质量和效率。" />
        <TagGrid items={['部署脚本', '回滚', '自动化', '流水线', '持续交付']} />
      </div>
    ),
  },
]

export default function JavaEEDevOpsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
