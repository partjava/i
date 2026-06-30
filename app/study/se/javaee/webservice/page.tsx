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
  chapterTitle: 'Web服务',
  chapterNumber: 7,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '安全与权限管理', href: '/study/se/javaee/security' },
  nextChapter: { label: 'JavaEE框架', href: '/study/se/javaee/frameworks' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>Web服务概述</PageTitle>
        <BookParagraph>Jakarta EE提供了全面的Web服务支持，使开发者能够构建跨平台、跨语言的分布式应用。主要包括基于SOAP协议的JAX-WS规范和基于REST架构的JAX-RS规范，支持多种数据格式（如JSON、XML）的处理。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">核心技术栈</h3>
        <BookList items={[
          'JAX-WS：基于SOAP的Web服务标准',
          'JAX-RS：基于REST的轻量级Web服务',
          'JSON-B：JSON绑定API',
          'JAXB：XML绑定技术',
          'CDI：上下文和依赖注入',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">典型应用场景</h3>
        <BookList items={[
          '企业系统集成(ESB)',
          '微服务架构通信',
          '移动应用后端API',
          'B2B数据交换平台',
          '云服务接口',
        ]} />
        <BookAlert type="info" message="SOAP适用于企业级系统集成和需要严格契约的场景；REST适用于移动端和轻量级API，目前是主流选择。" />
        <TagGrid items={['SOAP', 'REST', 'JAX-WS', 'JAX-RS', 'Web服务']} />
      </div>
    ),
  },
  {
    label: 'Servlet与REST',
    left: (
      <div className="space-y-4">
        <PageTitle>Servlet实现REST API</PageTitle>
        <BookParagraph>虽然Servlet不是专门为REST设计的，但可以通过它实现基本的REST API，处理HTTP方法和返回JSON/XML数据。</BookParagraph>
        <BookCode language="java" code={`@WebServlet("/api/users")
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="使用Servlet实现REST API时，需要手动处理HTTP方法和内容协商。对于复杂的REST API，推荐使用JAX-RS或Spring MVC。" />
        <TagGrid items={['Servlet', 'REST API', 'Jackson', 'JSON', 'HTTP方法']} />
      </div>
    ),
  },
  {
    label: 'JAX-WS',
    left: (
      <div className="space-y-4">
        <PageTitle>JAX-WS（SOAP Web Service）</PageTitle>
        <BookParagraph>JAX-WS是Jakarta EE中实现SOAP Web服务的标准API，通过简单的注解即可发布功能完备的Web服务。</BookParagraph>
        <BookCode language="java" code={`@WebService(endpointInterface = "com.example.HelloService")
public class HelloServiceImpl implements HelloService {

    @Override
    public String sayHello(String name) {
        return "Hello, " + name + "!";
    }

    @Override
    public User getUser(String username) {
        return userService.findByUsername(username);
    }
}`} />
        <BookCode language="java" code={`public class ServicePublisher {
    public static void main(String[] args) {
        HelloService service = new HelloServiceImpl();
        String address = "http://localhost:8080/hello";
        Endpoint.publish(address, service);
        System.out.println("Web Service published at: " + address);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">客户端调用</h3>
        <BookCode language="java" code={`public class ServiceClient {
    public static void main(String[] args) {
        // 从WSDL生成客户端代码后调用
        HelloServiceService service = new HelloServiceService();
        HelloService port = service.getHelloServicePort();

        // 调用远程方法
        String result = port.sayHello("World");
        System.out.println("Response: " + result);
    }
}`} />
        <BookAlert type="info" message="JAX-WS基于WSDL（Web Services Description Language）定义服务契约，支持SOAP 1.1和SOAP 1.2协议。适用于需要严格契约和安全保证的企业集成场景。" />
        <TagGrid items={['@WebService', 'SOAP', 'WSDL', 'Endpoint', '服务发布']} />
      </div>
    ),
  },
  {
    label: 'JAX-RS',
    left: (
      <div className="space-y-4">
        <PageTitle>JAX-RS（RESTful Web Service）</PageTitle>
        <BookParagraph>JAX-RS是Jakarta EE中实现RESTful服务的标准API，通过简洁的注解定义资源和操作。</BookParagraph>
        <BookCode language="java" code={`@Path("/users")
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
            .entity(createdUser).build();
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">JAX-RS客户端调用</h3>
        <BookCode language="java" code={`public class JaxRsClient {
    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target("http://localhost:8080/api/users");
        Response response = target.request(MediaType.APPLICATION_JSON).get();

        if (response.getStatus() == 200) {
            List<User> users = response.readEntity(new GenericType<List<User>>(){});
            users.forEach(user -> System.out.println(user.getName()));
        }

        client.close();
    }
}`} />
        <BookAlert type="success" message="JAX-RS 2.0+ 支持异步处理、过滤器拦截器、Bean Validation等高级特性。RESTful服务是目前微服务架构中服务间通信的主流方式。" />
        <TagGrid items={['@Path', '@GET', '@POST', '@PathParam', '@Produces']} />
      </div>
    ),
  },
  {
    label: '数据格式',
    left: (
      <div className="space-y-4">
        <PageTitle>JSON与XML数据处理</PageTitle>
        <BookParagraph>Jakarta EE提供了标准的JSON处理API，包括JSON-P（解析与生成）和JSON-B（对象绑定）。</BookParagraph>
        <BookCode language="java" code={`// 使用JSON-P构建JSON对象
JsonObject json = Json.createObjectBuilder()
    .add("name", "John")
    .add("age", 30)
    .add("email", "john@example.com")
    .build();

// 使用JSON-B进行对象序列化/反序列化
Jsonb jsonb = JsonbBuilder.create();
String jsonString = jsonb.toJson(user); // 对象转JSON
User user = jsonb.fromJson(jsonString, User.class); // JSON转对象`} />
        <h3 className="text-sm font-medium text-ink mt-4">XML处理（JAXB）</h3>
        <BookCode language="java" code={`// JAXB注解
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.FIELD)
public class User {
    private String name;
    private int age;
    // ...
}

// XML序列化
JAXBContext context = JAXBContext.newInstance(User.class);
Marshaller marshaller = context.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
marshaller.marshal(user, System.out);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">JSON vs XML对比</h3>
        <BookCode language="text" code={`特性        | JSON          | XML
格式        | 轻量级、基于文本 | 重量级、基于标记
可读性      | 高             | 中
数据大小    | 小             | 大
适用场景    | Web API、移动端 | 企业集成、配置文件`} />
        <BookAlert type="info" message="JSON-B简化了Java对象与JSON的互相转换。XML方面，JAXB仍然是主流选择，但Jakarta EE 10中JAXB已被标记为可选模块。" />
        <TagGrid items={['JSON-P', 'JSON-B', 'JAXB', '序列化', '数据格式']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>完整RESTful API示例</PageTitle>
        <BookParagraph>以下示例展示了一个完整的JAX-RS资源类，包含CRUD操作、异常处理和HATEOAS支持。</BookParagraph>
        <BookCode language="java" code={`@Path("/api/products")
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
        return Response.ok(product).build();
    }

    @POST
    public Response createProduct(Product product) {
        Product created = productService.create(product);
        URI location = uriInfo.getAbsolutePathBuilder()
            .path(created.getId().toString()).build();
        return Response.created(location).entity(created).build();
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">CORS支持</h3>
        <BookCode language="java" code={`@Provider
@Priority(Priorities.HEADER_DECORATOR)
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                      ContainerResponseContext responseContext) {

        MultivaluedMap<String, Object> headers = responseContext.getHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        headers.add("Access-Control-Max-Age", "3600");
    }
}`} />
        <BookAlert type="success" message="RESTful API的最佳实践包括：使用名词而非动词命名资源、正确使用HTTP状态码、提供分页和排序支持、实施API版本管理等。" />
        <TagGrid items={['CRUD', 'HATEOAS', 'CORS', 'REST最佳实践', '异常处理']} />
      </div>
    ),
  },
]

export default function JavaEEWebServicePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
