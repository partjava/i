"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityPatternsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全设计模式</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab("authentication")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "authentication"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          认证模式
        </button>
        <button
          onClick={() => setActiveTab("authorization")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "authorization"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          授权模式
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "data"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          数据安全模式
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全设计模式概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是安全设计模式</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  安全设计模式是在软件架构层面解决常见安全问题的可重用解决方案。它们提供了经过验证的最佳实践，帮助开发人员构建更安全的系统。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">主要特点</h5>
                    <ul className="list-disc pl-6">
                      <li>可重用性</li>
                      <li>经过验证</li>
                      <li>标准化</li>
                      <li>易于实现</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">应用场景</h5>
                    <ul className="list-disc pl-6">
                      <li>身份认证</li>
                      <li>访问控制</li>
                      <li>数据保护</li>
                      <li>安全通信</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 常见安全设计模式</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">认证模式</h5>
                    <ul className="list-disc pl-6">
                      <li>单点登录 (SSO)</li>
                      <li>多因素认证 (MFA)</li>
                      <li>OAuth 2.0</li>
                      <li>OpenID Connect</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">授权模式</h5>
                    <ul className="list-disc pl-6">
                      <li>基于角色的访问控制 (RBAC)</li>
                      <li>基于属性的访问控制 (ABAC)</li>
                      <li>最小权限原则</li>
                      <li>职责分离</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">数据安全模式</h5>
                    <ul className="list-disc pl-6">
                      <li>数据加密</li>
                      <li>数据脱敏</li>
                      <li>安全存储</li>
                      <li>安全传输</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "authentication" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">认证模式</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 单点登录 (SSO)</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// SSO认证服务
class SSOAuthenticationService {
  private final TokenService tokenService;
  private final UserService userService;
  
  public String authenticate(String username, String password) {
    // 1. 验证用户凭据
    User user = userService.validateCredentials(username, password);
    if (user == null) {
      throw new AuthenticationException("Invalid credentials");
    }
    
    // 2. 生成JWT令牌
    String token = tokenService.generateToken(user);
    
    // 3. 存储会话信息
    sessionManager.createSession(user.getId(), token);
    
    return token;
  }
  
  public User validateToken(String token) {
    // 1. 验证令牌
    if (!tokenService.validateToken(token)) {
      throw new AuthenticationException("Invalid token");
    }
    
    // 2. 获取用户信息
    String userId = tokenService.getUserIdFromToken(token);
    return userService.getUserById(userId);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 多因素认证 (MFA)</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// MFA认证服务
class MFAAuthenticationService {
  private final UserService userService;
  private final TOTPService totpService;
  private final SMSService smsService;
  
  public void initiateMFA(String username) {
    User user = userService.getUserByUsername(username);
    
    // 1. 生成TOTP密钥
    String totpSecret = totpService.generateSecret();
    user.setTotpSecret(totpSecret);
    
    // 2. 发送验证码
    String verificationCode = smsService.sendVerificationCode(user.getPhone());
    user.setVerificationCode(verificationCode);
    
    userService.updateUser(user);
  }
  
  public boolean verifyMFA(String username, String totpCode, String smsCode) {
    User user = userService.getUserByUsername(username);
    
    // 1. 验证TOTP码
    boolean totpValid = totpService.verifyCode(user.getTotpSecret(), totpCode);
    
    // 2. 验证短信码
    boolean smsValid = user.getVerificationCode().equals(smsCode);
    
    return totpValid && smsValid;
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. OAuth 2.0</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// OAuth 2.0认证服务
class OAuth2Service {
  private final ClientService clientService;
  private final TokenService tokenService;
  
  public String authorize(String clientId, String redirectUri, String scope) {
    // 1. 验证客户端
    Client client = clientService.validateClient(clientId, redirectUri);
    if (client == null) {
      throw new OAuth2Exception("Invalid client");
    }
    
    // 2. 生成授权码
    String authCode = generateAuthCode(client, scope);
    
    // 3. 重定向到客户端
    return redirectUri + "?code=" + authCode;
  }
  
  public TokenResponse getToken(String clientId, String clientSecret, String authCode) {
    // 1. 验证客户端凭据
    Client client = clientService.validateCredentials(clientId, clientSecret);
    if (client == null) {
      throw new OAuth2Exception("Invalid client credentials");
    }
    
    // 2. 验证授权码
    if (!validateAuthCode(authCode, client)) {
      throw new OAuth2Exception("Invalid authorization code");
    }
    
    // 3. 生成访问令牌
    String accessToken = tokenService.generateAccessToken(client);
    String refreshToken = tokenService.generateRefreshToken(client);
    
    return new TokenResponse(accessToken, refreshToken);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "authorization" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">授权模式</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基于角色的访问控制 (RBAC)</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// RBAC授权服务
class RBACAuthorizationService {
  private final RoleService roleService;
  private final PermissionService permissionService;
  
  public boolean checkPermission(String userId, String resource, String action) {
    // 1. 获取用户角色
    Set<Role> roles = roleService.getUserRoles(userId);
    
    // 2. 获取角色权限
    Set<Permission> permissions = new HashSet<>();
    for (Role role : roles) {
      permissions.addAll(permissionService.getRolePermissions(role));
    }
    
    // 3. 检查权限
    return permissions.stream()
      .anyMatch(p -> p.getResource().equals(resource) && 
                    p.getAction().equals(action));
  }
  
  public void assignRole(String userId, String roleId) {
    // 1. 验证角色是否存在
    Role role = roleService.getRole(roleId);
    if (role == null) {
      throw new AuthorizationException("Invalid role");
    }
    
    // 2. 分配角色
    roleService.assignRoleToUser(userId, role);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 基于属性的访问控制 (ABAC)</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// ABAC授权服务
class ABACAuthorizationService {
  private final PolicyService policyService;
  private final AttributeService attributeService;
  
  public boolean evaluatePolicy(String userId, String resource, String action) {
    // 1. 获取用户属性
    Map<String, Object> userAttributes = attributeService.getUserAttributes(userId);
    
    // 2. 获取资源属性
    Map<String, Object> resourceAttributes = attributeService.getResourceAttributes(resource);
    
    // 3. 获取环境属性
    Map<String, Object> environmentAttributes = attributeService.getEnvironmentAttributes();
    
    // 4. 评估策略
    Policy policy = policyService.getPolicy(resource, action);
    return policy.evaluate(userAttributes, resourceAttributes, environmentAttributes);
  }
  
  public void updatePolicy(String resource, String action, Policy policy) {
    // 1. 验证策略
    if (!policy.isValid()) {
      throw new AuthorizationException("Invalid policy");
    }
    
    // 2. 更新策略
    policyService.updatePolicy(resource, action, policy);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">数据安全模式</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 数据加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 数据加密服务
class DataEncryptionService {
  private final KeyService keyService;
  private final EncryptionAlgorithm algorithm;
  
  public String encryptData(String data, String keyId) {
    // 1. 获取加密密钥
    Key key = keyService.getKey(keyId);
    
    // 2. 生成初始化向量
    byte[] iv = generateIV();
    
    // 3. 加密数据
    byte[] encryptedData = algorithm.encrypt(data.getBytes(), key, iv);
    
    // 4. 组合IV和密文
    return Base64.getEncoder().encodeToString(
      ByteBuffer.allocate(iv.length + encryptedData.length)
        .put(iv)
        .put(encryptedData)
        .array()
    );
  }
  
  public String decryptData(String encryptedData, String keyId) {
    // 1. 获取解密密钥
    Key key = keyService.getKey(keyId);
    
    // 2. 分离IV和密文
    byte[] data = Base64.getDecoder().decode(encryptedData);
    byte[] iv = Arrays.copyOfRange(data, 0, 16);
    byte[] ciphertext = Arrays.copyOfRange(data, 16, data.length);
    
    // 3. 解密数据
    byte[] decryptedData = algorithm.decrypt(ciphertext, key, iv);
    
    return new String(decryptedData);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 数据脱敏</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 数据脱敏服务
class DataMaskingService {
  private final MaskingRuleService ruleService;
  
  public String maskData(String data, String dataType) {
    // 1. 获取脱敏规则
    MaskingRule rule = ruleService.getRule(dataType);
    
    // 2. 应用脱敏规则
    return rule.apply(data);
  }
  
  public Map<String, String> maskObject(Map<String, String> data) {
    Map<String, String> maskedData = new HashMap<>();
    
    // 1. 遍历对象属性
    for (Map.Entry<String, String> entry : data.entrySet()) {
      String field = entry.getKey();
      String value = entry.getValue();
      
      // 2. 获取字段类型
      String dataType = getFieldType(field);
      
      // 3. 应用脱敏
      maskedData.put(field, maskData(value, dataType));
    }
    
    return maskedData;
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 安全存储</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">实现示例</h5>
                    <pre className="bg-gray-200 p-2 rounded">
                      <code>{`// 安全存储服务
class SecureStorageService {
  private final EncryptionService encryptionService;
  private final StorageService storageService;
  
  public void storeData(String data, String key) {
    // 1. 加密数据
    String encryptedData = encryptionService.encrypt(data);
    
    // 2. 生成安全路径
    String securePath = generateSecurePath(key);
    
    // 3. 存储数据
    storageService.store(securePath, encryptedData);
  }
  
  public String retrieveData(String key) {
    // 1. 获取安全路径
    String securePath = generateSecurePath(key);
    
    // 2. 获取加密数据
    String encryptedData = storageService.retrieve(securePath);
    
    // 3. 解密数据
    return encryptionService.decrypt(encryptedData);
  }
  
  private String generateSecurePath(String key) {
    // 1. 生成哈希
    String hash = hash(key);
    
    // 2. 构建安全路径
    return String.format("%s/%s/%s",
      hash.substring(0, 2),
      hash.substring(2, 4),
      hash
    );
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/coding"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全编码规范
        </Link>
        <Link
          href="/study/security/dev/testing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全测试方法 →
        </Link>
      </div>
    </div>
  );
} 