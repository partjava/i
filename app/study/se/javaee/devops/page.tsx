'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'cicd', label: 'CI/CD基础' },
  { key: 'jenkins', label: 'Jenkins实战' },
  { key: 'gitlab', label: 'GitLab CI' },
  { key: 'test', label: '自动化测试' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEDevOpsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">DevOps与CI/CD</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">DevOps与CI/CD概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">DevOps核心理念</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 持续集成（CI）</li>
                <li>• 持续交付（CD）</li>
                <li>• 自动化部署</li>
                <li>• 自动化测试</li>
                <li>• 监控与反馈</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">主流工具链</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Jenkins：CI/CD服务器</li>
                <li>• GitLab CI：代码托管与CI/CD</li>
                <li>• Maven/Gradle：构建工具</li>
                <li>• SonarQube：代码质量</li>
                <li>• JUnit/TestNG：单元测试</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'cicd' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">CI/CD基础</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">CI/CD流程</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 代码提交触发构建</li>
                <li>• 自动化测试执行</li>
                <li>• 代码质量检查</li>
                <li>• 构建Docker镜像</li>
                <li>• 部署到测试环境</li>
                <li>• 自动化验收测试</li>
                <li>• 生产环境部署</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">最佳实践</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 版本控制规范</li>
                <li>• 分支管理策略</li>
                <li>• 自动化测试覆盖</li>
                <li>• 环境一致性</li>
                <li>• 回滚机制</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'jenkins' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jenkins实战</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Jenkinsfile示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`pipeline {
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
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Jenkins配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# jenkins.yaml
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
              - "admin"`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'gitlab' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">GitLab CI</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">.gitlab-ci.yml示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`stages:
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
    - kubectl set image deployment/myapp myapp=myapp:$CI_COMMIT_SHA`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">GitLab Runner配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# config.toml
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
    shm_size = 0`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">自动化测试</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JUnit测试示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@SpringBootTest
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
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">集成测试配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@SpringBootTest
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
               .content("{\"username\":\"test\",\"email\":\"test@example.com\"}"))
               .andExpect(status().isCreated());
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">完整CI/CD流程</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 1. 代码提交
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
# 必要时执行回滚`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">自动化脚本</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#!/bin/bash

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
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/cloud" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 容器化与云服务
        </a>
        <a
          href="/study/se/javaee/trend"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          前沿技术趋势 →
        </a>
      </div>
    </div>
  );
} 