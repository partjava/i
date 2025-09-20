'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'servlet_rest', label: 'Servlet与REST' },
  { key: 'jaxws', label: 'JAX-WS (SOAP)' },
  { key: 'jaxrs', label: 'JAX-RS (RESTful)' },
  { key: 'data', label: 'JSON与XML' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEWebServicePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">Web服务</h1>

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
            <h2 className="text-2xl font-bold mb-4">Web服务概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Jakarta EE Web服务简介</h3>
              <p className="text-gray-700 leading-relaxed">
                Jakarta EE提供了全面的Web服务支持，使开发者能够构建跨平台、跨语言的分布式应用。
                主要包括基于SOAP协议的JAX-WS规范和基于REST架构的JAX-RS规范，支持多种数据格式（如JSON、XML）的处理。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">核心技术栈</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• JAX-WS: 基于SOAP的Web服务标准</li>
                  <li>• JAX-RS: 基于REST的轻量级Web服务</li>
                  <li>• JSON-B: JSON绑定API</li>
                  <li>• JAXB: XML绑定技术</li>
                  <li>• CDI: 上下文和依赖注入</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">典型应用场景</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 企业系统集成(ESB)</li>
                  <li>• 微服务架构通信</li>
                  <li>• 移动应用后端API</li>
                  <li>• B2B数据交换平台</li>
                  <li>• 云服务接口</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'servlet_rest' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Servlet与REST API</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">使用Servlet实现REST风格API</h3>
              <p className="text-gray-700 mb-4">
                虽然Servlet不是专门为REST设计的，但可以通过它实现基本的REST API，处理HTTP方法和返回JSON/XML数据。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet("/api/users")
public class UserApiServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        resp.setContentType("application/json;charset=UTF-8");
        
        // 模拟获取用户列表
        List<User> users = userService.getAllUsers();
        
        // 使用Jackson转换为JSON
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(resp.getOutputStream(), users);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        // 解析JSON请求体
        ObjectMapper mapper = new ObjectMapper();
        User user = mapper.readValue(req.getInputStream(), User.class);
        
        // 处理新增用户
        User createdUser = userService.createUser(user);
        
        resp.setStatus(HttpServletResponse.SC_CREATED);
        resp.setContentType("application/json;charset=UTF-8");
        mapper.writeValue(resp.getOutputStream(), createdUser);
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'jaxws' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JAX-WS（SOAP Web Service）</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JAX-WS服务端实现</h3>
              <p className="text-gray-700 mb-4">
                JAX-WS是Jakarta EE中实现SOAP Web服务的标准API，通过简单的注解即可发布功能完备的Web服务。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebService(endpointInterface = "com.example.HelloService")
public class HelloServiceImpl implements HelloService {
    
    @Override
    public String sayHello(String name) {
        return "Hello, " + name + "!";
    }
    
    @Override
    public User getUser(String username) {
        return userService.findByUsername(username);
    }
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">服务端点发布</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class ServicePublisher {
    public static void main(String[] args) {
        HelloService service = new HelloServiceImpl();
        String address = "http://localhost:8080/hello";
        Endpoint.publish(address, service);
        System.out.println("Web Service published at: " + address);
    }
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">JAX-WS客户端调用</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class ServiceClient {
    public static void main(String[] args) {
        // 从WSDL生成客户端代码后调用
        HelloServiceService service = new HelloServiceService();
        HelloService port = service.getHelloServicePort();
        
        // 调用远程方法
        String result = port.sayHello("World");
        System.out.println("Response: " + result);
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'jaxrs' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JAX-RS（RESTful Web Service）</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JAX-RS资源类示例</h3>
              <p className="text-gray-700 mb-4">
                JAX-RS是Jakarta EE中实现RESTful服务的标准API，通过简洁的注解定义资源和操作。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @GET
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @GET
    @Path("/{id}")
    public Response getUser(@PathParam("id") Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return Response.ok(user).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    @POST
    public Response createUser(User user) {
        User createdUser = userService.createUser(user);
        return Response.status(Response.Status.CREATED)
            .entity(createdUser)
            .build();
    }
    
    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return Response.ok(updatedUser).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JAX-RS客户端调用</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class JaxRsClient {
    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();
        
        // 调用GET方法
        WebTarget target = client.target("http://localhost:8080/api/users");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        
        if (response.getStatus() == 200) {
            List<User> users = response.readEntity(new GenericType<List<User>>(){});
            users.forEach(user -> System.out.println(user.getName()));
        }
        
        // 调用POST方法
        User newUser = new User("Alice", "alice@example.com");
        Response postResponse = target.request()
            .post(Entity.entity(newUser, MediaType.APPLICATION_JSON));
            
        if (postResponse.getStatus() == 201) {
            User createdUser = postResponse.readEntity(User.class);
            System.out.println("Created user ID: " + createdUser.getId());
        }
        
        client.close();
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JSON与XML数据处理</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JSON处理（Jakarta JSON-P & JSON-B）</h3>
              <p className="text-gray-700 mb-4">
                Jakarta EE提供了标准的JSON处理API，包括JSON-P（解析与生成）和JSON-B（对象绑定）。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 使用JSON-P构建JSON对象
JsonObject json = Json.createObjectBuilder()
    .add("name", "John")
    .add("age", 30)
    .add("email", "john@example.com")
    .build();
    
// 使用JSON-B进行对象序列化/反序列化
Jsonb jsonb = JsonbBuilder.create();
String jsonString = jsonb.toJson(user); // 对象转JSON
User user = jsonb.fromJson(jsonString, User.class); // JSON转对象`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">XML处理（JAXB）</h3>
              <p className="text-gray-700 mb-4">
                JAXB（Java Architecture for XML Binding）是Jakarta EE中处理XML数据的标准API。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// JAXB注解示例
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.FIELD)
public class User {
    private String name;
    private int age;
    private String email;
    
    // 构造函数、getter和setter方法
}

// XML序列化
JAXBContext context = JAXBContext.newInstance(User.class);
Marshaller marshaller = context.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
marshaller.marshal(user, System.out);

// XML反序列化
Unmarshaller unmarshaller = context.createUnmarshaller();
User user = (User) unmarshaller.unmarshal(new File("user.xml"));`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">JSON vs XML对比</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JSON</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XML</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">格式</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">轻量级、基于文本</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">重量级、基于标记</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">可读性</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">高</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">中</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">数据大小</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">小</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">大</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">适用场景</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Web API、移动应用</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">企业集成、配置文件</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：完整的RESTful API</h3>
              <p className="text-gray-700 mb-4">
                以下示例展示了一个完整的JAX-RS资源类，包含CRUD操作、异常处理和HATEOAS支持。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {
    
    @Inject
    private ProductService productService;
    
    @GET
    public Response getAllProducts() {
        List<Product> products = productService.getAll();
        return Response.ok(products).build();
    }
    
    @GET
    @Path("/{id}")
    public Response getProduct(@PathParam("id") Long id) {
        Product product = productService.getById(id)
            .orElseThrow(() -> new NotFoundException("Product not found"));
        
        // 添加HATEOAS链接
        Link self = Link.fromUriBuilder(uriInfo.getAbsolutePathBuilder())
            .rel("self").build();
        Link update = Link.fromUriBuilder(uriInfo.getAbsolutePathBuilder())
            .rel("update").build();
        Link delete = Link.fromUriBuilder(uriInfo.getAbsolutePathBuilder())
            .rel("delete").build();
            
        product.addLink(self);
        product.addLink(update);
        product.addLink(delete);
        
        return Response.ok(product).build();
    }
    
    @POST
    public Response createProduct(Product product) {
        Product created = productService.create(product);
        URI location = uriInfo.getAbsolutePathBuilder().path(created.getId().toString()).build();
        return Response.created(location).entity(created).build();
    }
    
    @PUT
    @Path("/{id}")
    public Response updateProduct(@PathParam("id") Long id, Product product) {
        Product updated = productService.update(id, product)
            .orElseThrow(() -> new NotFoundException("Product not found"));
        return Response.ok(updated).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response deleteProduct(@PathParam("id") Long id) {
        boolean deleted = productService.delete(id);
        if (!deleted) {
            throw new NotFoundException("Product not found");
        }
        return Response.noContent().build();
    }
    
    @ExceptionHandler(NotFoundException.class)
    public Response handleNotFound(Exception ex) {
        return Response.status(Response.Status.NOT_FOUND)
            .entity(new ErrorMessage(ex.getMessage()))
            .build();
    }
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">跨域资源共享(CORS)支持</h3>
              <p className="text-gray-700 mb-4">
                在JAX-RS中实现CORS过滤器，允许跨域访问API。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Provider
@Priority(Priorities.HEADER_DECORATOR)
public class CorsFilter implements ContainerResponseFilter {
    
    @Override
    public void filter(ContainerRequestContext requestContext, 
                      ContainerResponseContext responseContext) {
        
        MultivaluedMap<String, Object> headers = responseContext.getHeaders();
        
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        headers.add("Access-Control-Max-Age", "3600");
    }
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">异步处理</h3>
              <p className="text-gray-700 mb-4">
                使用JAX-RS的异步处理机制，避免长时间操作阻塞服务器线程。
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Path("/async")
public class AsyncResource {
    
    @GET
    @Path("/long")
    public void longRunningOperation(@Suspended final AsyncResponse asyncResponse) {
        
        // 在后台线程执行耗时操作
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            try {
                // 模拟长时间操作
                Thread.sleep(5000);
                String result = "Operation completed";
                asyncResponse.resume(result);
            } catch (InterruptedException e) {
                asyncResponse.resume(Response.status(Response.Status.INTERNAL_SERVER_ERROR).build());
            }
        });
        executor.shutdown();
    }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 安全与权限管理
        </a>
        <a
          href="/study/se/javaee/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          JavaEE框架 →
        </a>
      </div>
    </div>
  );
}