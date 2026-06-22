'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
  BookDivider,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全设计模式',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '安全编码规范', href: '/study/security/dev/coding' },
  nextChapter: { label: '安全测试方法', href: '/study/security/dev/testing' },
  theme: THEMES.security,
}

// ===== 代码常量（认证模式） =====

const SSO_CODE = `// SSO认证服务
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
}`

const MFA_CODE = `// MFA认证服务
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
}`

const OAUTH_CODE = `// OAuth 2.0认证服务
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
}`

// ===== 代码常量（授权模式） =====

const RBAC_CODE = `// RBAC授权服务
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
}`

const ABAC_CODE = `// ABAC授权服务
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
}`

// ===== 代码常量（数据安全模式） =====

const ENCRYPTION_CODE = `// 数据加密服务
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
}`

const MASKING_CODE = `// 数据脱敏服务
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
}`

const SECURE_STORAGE_CODE = `// 安全存储服务
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
}`

// ===== SPREADS =====

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全设计模式概述</PageTitle>
        <BookParagraph>安全设计模式是在软件架构层面解决常见安全问题的可重用解决方案。它们提供了经过验证的最佳实践，帮助开发人员构建更安全的系统。</BookParagraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">主要特点</h5>
            <BookList items={['可重用性', '经过验证', '标准化', '易于实现']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">应用场景</h5>
            <BookList items={['身份认证', '访问控制', '数据保护', '安全通信']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全设计模式</PageTitle>
        <div className="space-y-3">
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">认证模式</h5>
            <BookList items={['单点登录 (SSO)', '多因素认证 (MFA)', 'OAuth 2.0', 'OpenID Connect']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">授权模式</h5>
            <BookList items={['基于角色的访问控制 (RBAC)', '基于属性的访问控制 (ABAC)', '最小权限原则', '职责分离']} />
          </div>
          <div className="bg-paper-200/60 rounded-lg p-4 border border-paper-300/60">
            <h5 className="text-sm font-semibold text-ink mb-2">数据安全模式</h5>
            <BookList items={['数据加密', '数据脱敏', '安全存储', '安全传输']} />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '认证模式',
    left: (
      <div className="space-y-4">
        <PageTitle>单点登录 (SSO)</PageTitle>
        <BookParagraph>SSO 允许用户使用一组凭据登录多个独立系统，提升用户体验的同时集中管理认证安全。</BookParagraph>
        <BookCode language="java" code={SSO_CODE} />
        <BookAlert type="info" message="SSO 的核心是集中式认证服务和跨域令牌共享，JWT 是目前最主流的令牌格式" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>多因素认证 (MFA)</PageTitle>
        <BookParagraph>MFA 要求用户提供两种或以上不同类型的验证因素，显著提升账户安全性。</BookParagraph>
        <BookCode language="java" code={MFA_CODE} />
        <BookDivider />
        <PageTitle>OAuth 2.0</PageTitle>
        <BookParagraph>OAuth 2.0 是一个开放授权标准，允许第三方应用获取用户资源的有限访问权限。</BookParagraph>
        <BookCode language="java" code={OAUTH_CODE} />
      </div>
    ),
  },
  {
    label: '授权模式',
    left: (
      <div className="space-y-4">
        <PageTitle>基于角色的访问控制 (RBAC)</PageTitle>
        <BookParagraph>RBAC 通过角色将用户与权限解耦：为用户分配角色，为角色授予权限，简化权限管理。</BookParagraph>
        <BookCode language="java" code={RBAC_CODE} />
        <BookAlert type="info" message="RBAC 的优势在于易于理解和实施，适合组织结构相对稳定的企业系统" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>基于属性的访问控制 (ABAC)</PageTitle>
        <BookParagraph>ABAC 根据用户属性、资源属性和环境条件动态评估访问策略，提供更细粒度的控制。</BookParagraph>
        <BookCode language="java" code={ABAC_CODE} />
        <BookAlert type="info" message="ABAC 比 RBAC 更灵活，但策略管理复杂度更高，通常需要策略引擎支持" />
      </div>
    ),
  },
  {
    label: '数据安全模式',
    left: (
      <div className="space-y-4">
        <PageTitle>数据加密</PageTitle>
        <BookParagraph>数据加密通过算法将明文转换为密文，确保数据在存储或传输过程中即使被截获也无法解读。</BookParagraph>
        <BookCode language="java" code={ENCRYPTION_CODE} />
        <BookAlert type="warning" message="密钥管理是加密系统的核心挑战，应使用专门的密钥管理服务 (KMS) 来存储和轮换密钥" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据脱敏</PageTitle>
        <BookParagraph>数据脱敏在保留数据格式和可用性的前提下，对敏感信息进行变形处理，常用于测试环境或数据分析场景。</BookParagraph>
        <BookCode language="java" code={MASKING_CODE} />
        <BookDivider />
        <PageTitle>安全存储</PageTitle>
        <BookParagraph>安全存储结合加密、哈希和访问控制等手段，确保数据在持久化层面的机密性和完整性。</BookParagraph>
        <BookCode language="java" code={SECURE_STORAGE_CODE} />
      </div>
    ),
  },
]

export default function SecurityPatternsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
