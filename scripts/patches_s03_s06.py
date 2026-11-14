"""Stage 03 - Stage 06 patches: starter fixes, solution fixes, Chinese comments, public & hidden test cases."""


def case(name, fn, args, expected=None, *, expected_exc=None, hidden=False, kwargs=None, check=None):
    c = {
        "name": name,
        "mode": "function",
        "function": fn,
        "args": args,
        "hidden": hidden,
    }
    if kwargs:
        c["kwargs"] = kwargs
    if expected_exc is not None:
        c["expectedException"] = expected_exc
    elif expected is not None:
        c["expected"] = expected
    if check is not None:
        c["_check"] = check
    return c


STARTER_OVERRIDES = {
    # --- Stage 03 ---
    "math-bayes-spam-classifier": '''import numpy as np

def train_naive_bayes(data: list[dict]) -> dict:
    """
    data: [{"features": [1,0,1,...], "label": "spam"}, ...]
    返回 {"priors": {"spam": 0.4, "ham": 0.6}, "likelihoods": {...}}
    条件概率用拉普拉斯平滑 (alpha=1)，特征索引键统一为字符串。
    """
    pass

def predict(model: dict, features: list) -> str:
    """返回最可能的类别"""
    pass

def eval_naive_bayes_predict(data: list[dict], features: list) -> str:
    """训练朴素贝叶斯并对给定特征向量执行分类预测"""
    model = train_naive_bayes(data)
    return predict(model, features)
''',
    "math-gradient-numerical-checker": '''import numpy as np

def numerical_gradient(f, x: np.ndarray, h: float = 1e-5) -> np.ndarray:
    """中心差分求数值梯度"""
    pass

def relative_error(num: np.ndarray, analytic: np.ndarray) -> float:
    """计算数值梯度与解析梯度之间的相对误差"""
    pass

def check_gradient(f, grad_f, x: np.ndarray) -> dict:
    """返回 {"max_relative_error": ..., "pass": bool}"""
    pass

def eval_gradient_check(fn_name: str, x: np.ndarray, use_wrong_grad: bool = False) -> dict:
    """按预设函数名执行数值梯度校验"""
    presets = {
        "quad2": (lambda v: float(v[0] ** 2 + v[1] ** 2), lambda v: np.array([2 * v[0], 2 * v[1]], dtype=float)),
        "square1": (lambda v: float(v[0] ** 2), lambda v: np.array([2 * v[0]], dtype=float)),
        "cubic2": (lambda v: float(v[0] ** 3 + 2 * v[1] ** 2), lambda v: np.array([3 * v[0] ** 2, 4 * v[1]], dtype=float)),
    }
    f, grad_f = presets[fn_name]
    if use_wrong_grad:
        grad_f = lambda v: np.array([0.0] * len(v), dtype=float)
    return check_gradient(f, grad_f, np.asarray(x, dtype=float))
''',
    "math-gradient-descent-optimizer": '''import numpy as np

def vanilla_gd(grad_f, init_x: float, lr: float, steps: int) -> list:
    """返回每一步的 x 值列表"""
    pass

def momentum_gd(grad_f, init_x: float, lr: float, beta: float, steps: int) -> list:
    """带动量的梯度下降"""
    pass

def find_best_lr(grad_f, init_x: float, lrs: list, steps: int) -> dict:
    """返回 {"best_lr": ..., "final_value": ...}"""
    pass

def eval_gd_optimizer(mode: str, fn_name: str, init_x: float, lr_or_lrs, steps: int, beta: float = 0.9):
    """按预设梯度函数运行对应优化器"""
    grads = {
        "square": lambda x: 2.0 * x,
        "shifted": lambda x: 2.0 * (x - 3.0),
    }
    g = grads[fn_name]
    if mode == "vanilla":
        return vanilla_gd(g, init_x, lr_or_lrs, steps)
    if mode == "momentum":
        return momentum_gd(g, init_x, lr_or_lrs, beta, steps)
    if mode == "best_lr":
        return find_best_lr(g, init_x, lr_or_lrs, steps)
    raise ValueError(f"unknown mode: {mode}")
''',
    "math-svd-rank-l2": '''import numpy as np

def svd_analysis(A):
    """返回 {"singular_values": list, "rank": int, "condition_number": float | None}（奇异矩阵条件数为 None）"""
    pass
''',
    "math-central-limit-l2": '''import numpy as np

def clt_simulation(n, m, seed: int = 42):
    """抽取 m 组样本，每组 n 个 U(0,1) 随机数，返回每组均值的均值和方差"""
    pass
''',
    # --- Stage 04 ---
    "ml-feature-standardizer": '''import numpy as np

class FeatureScaler:
    """特征缩放器，支持标准化和归一化"""
    def __init__(self, method: str = "standard"):
        """method: 'standard', 'minmax', 'robust'"""
        pass

    def fit(self, X: np.ndarray) -> None:
        """计算并存储缩放参数"""
        pass

    def transform(self, X: np.ndarray) -> np.ndarray:
        pass

    def inverse_transform(self, X_scaled: np.ndarray) -> np.ndarray:
        pass

def eval_feature_scaler(method: str, X_train: np.ndarray, X_test: np.ndarray) -> dict:
    """拟合特征缩放器并返回缩放结果与逆变换结果"""
    scaler = FeatureScaler(method=method)
    scaler.fit(np.asarray(X_train, dtype=float))
    scaled = scaler.transform(np.asarray(X_test, dtype=float))
    restored = scaler.inverse_transform(scaled)
    return {"scaled": scaled, "restored": restored}
''',
    "ml-svm-kernel-l2": '''import numpy as np

def linear_kernel(x1, x2):
    pass

def rbf_kernel(x1, x2, gamma):
    pass

def kernel_matrix(X1, X2, kernel_func):
    """返回核矩阵 K, K[i,j] = kernel(X1[i], X2[j])"""
    pass

def dual_predict(alpha, X_train, y_train, X_test, kernel_func, b):
    pass

def eval_kernel_matrix(X1, X2, kernel_name: str = "rbf", gamma: float = 0.5):
    """按核函数名构建核矩阵"""
    kf = linear_kernel if kernel_name == "linear" else (lambda a, b: rbf_kernel(a, b, gamma))
    return kernel_matrix(np.asarray(X1, dtype=float), np.asarray(X2, dtype=float), kf)

def eval_dual_predict(alpha, X_train, y_train, X_test, kernel_name: str, b: float, gamma: float = 0.5):
    """按核函数名执行对偶空间 SVM 预测"""
    kf = linear_kernel if kernel_name == "linear" else (lambda a, b: rbf_kernel(a, b, gamma))
    return dual_predict(
        np.asarray(alpha, dtype=float),
        np.asarray(X_train, dtype=float),
        np.asarray(y_train, dtype=float),
        np.asarray(X_test, dtype=float),
        kf,
        b,
    )
''',
    "ml-xgboost-gbdt-regression-l2": '''import numpy as np

def gradient(y_true, y_pred):
    pass

def hessian(y_true, y_pred):
    pass

def _build_stump_reg(X, y, depth=0, max_depth=3):
    pass

def gbdt_fit(X, y, n_estimators, lr, max_depth):
    pass

def gbdt_predict(model, X):
    pass
''',
    "ml-pca-whitening-l2": '''import numpy as np

def pca_fit(X):
    pass

def pca_transform(model, X, n_components):
    pass

def pca_whiten(model, X, n_components):
    pass

def reconstruction_error(X, X_rec):
    pass
''',
    "ml-robust-scaler-l2": '''import numpy as np

class RobustScaler:
    def fit(self, X): pass
    def transform(self, X): pass
    def inverse_transform(self, X): pass

class QuantileTransformer:
    def fit(self, X): pass
    def transform(self, X): pass

def eval_scalers(method: str, X_train, X_test, output_distribution: str = "uniform"):
    """评估 RobustScaler 或 QuantileTransformer 的变换与逆变换"""
    X_tr = np.asarray(X_train, dtype=float)
    X_te = np.asarray(X_test, dtype=float)
    if method == "robust":
        s = RobustScaler().fit(X_tr)
        tr = s.transform(X_te)
        return {"transformed": tr, "restored": s.inverse_transform(tr)}
    qt = QuantileTransformer().fit(X_tr)
    return {"transformed": qt.transform(X_te, output_distribution=output_distribution)}
''',
    # --- Stage 05 ---
    "dl-optimizers-sgd-adam": '''import numpy as np

class Optimizer:
    """SGD 和 Adam 优化器"""
    def __init__(self, method: str = "sgd", lr: float = 0.01):
        self.method = method
        self.lr = lr
        self.beta1 = 0.9
        self.beta2 = 0.999
        self.eps = 1e-8
        self.t = 0
        self.m = None
        self.v = None

    def step(self, params: np.ndarray, grads: np.ndarray) -> np.ndarray:
        """返回更新后的参数"""
        pass

def eval_optimizer(method: str, lr: float, params: list, grads_list: list) -> np.ndarray:
    """按梯度序列执行多步优化更新"""
    opt = Optimizer(method=method, lr=lr)
    p = np.asarray(params, dtype=float)
    for g in grads_list:
        p = opt.step(p, np.asarray(g, dtype=float))
    return p
''',
    "dl-relu-variants-l2": '''import numpy as np

def relu(x): pass
def leaky_relu(x, alpha=0.01): pass
def elu(x, alpha=1.0): pass
def swish(x): pass
def gradient(activation, x): pass
''',
    "dl-autograd-l2": '''import numpy as np

class Tensor:
    def __init__(self, val, children=None):
        self.val = val
        self.grad = 0
        self._backward = lambda: None
        self._prev = children or ()

    def __add__(self, other): pass
    def __mul__(self, other): pass
    def sigmoid(self): pass
    def backward(self): pass

def eval_autograd(a_val: float, b_val: float) -> dict:
    """计算 z = sigmoid(a * b + a) 并反向传播返回输出与梯度"""
    a = Tensor(a_val)
    b = Tensor(b_val)
    z = (a * b + a).sigmoid()
    z.backward()
    return {"out": round(float(z.val), 6), "da": round(float(a.grad), 6), "db": round(float(b.grad), 6)}
''',
    "dl-batchnorm-vs-layernorm-l2": '''import numpy as np

class BatchNorm:
    def __init__(self, D, momentum=0.9): pass
    def forward(self, X, training=True): pass
    def backward(self, dout): pass

def eval_batchnorm(X_train, X_test, dout, momentum: float = 0.9) -> dict:
    """执行训练前向、反向梯度和推理前向校验"""
    X_tr = np.asarray(X_train, dtype=float)
    X_te = np.asarray(X_test, dtype=float)
    d = np.asarray(dout, dtype=float)
    bn = BatchNorm(X_tr.shape[1], momentum=momentum)
    out_train = bn.forward(X_tr, training=True)
    dx, dgamma, dbeta = bn.backward(d)
    out_inf = bn.forward(X_te, training=False)
    return {
        "out_train": out_train,
        "out_inf": out_inf,
        "dx": dx,
        "dgamma": dgamma,
        "dbeta": dbeta,
    }
''',
}


SOLUTION_OVERRIDES = {
    # --- Stage 03 fixes ---
    "math-bayes-spam-classifier": '''import numpy as np

def train_naive_bayes(data: list[dict]) -> dict:
    classes = {}
    for d in data:
        lbl = d["label"]
        classes.setdefault(lbl, []).append(d["features"])
    n_total = len(data)
    priors = {}
    likelihoods = {}
    for lbl, samples in classes.items():
        priors[lbl] = len(samples) / n_total
        arr = np.asarray(samples, dtype=float)
        n_features = arr.shape[1]
        likelihoods[lbl] = {}
        for j in range(n_features):
            col = arr[:, j]
            total_ones = int(np.sum(col))
            likelihoods[lbl][str(j)] = (total_ones + 1) / (len(col) + 2)
    return {"priors": priors, "likelihoods": likelihoods}

def predict(model: dict, features: list) -> str:
    best_label = None
    best_score = -float("inf")
    for lbl, prior in model["priors"].items():
        score = float(np.log(prior))
        tbl = model["likelihoods"][lbl]
        for j, val in enumerate(features):
            p = tbl[str(j)] if str(j) in tbl else tbl[j]
            score += float(np.log(p) if val == 1 else np.log(1 - p))
        if score > best_score:
            best_score = score
            best_label = lbl
    return best_label

def eval_naive_bayes_predict(data: list[dict], features: list) -> str:
    model = train_naive_bayes(data)
    return predict(model, features)
''',
    "math-mle-parameter-estimator": '''import numpy as np

def gaussian_mle(data: np.ndarray) -> dict:
    arr = np.asarray(data, dtype=float)
    mu = float(np.mean(arr))
    sigma = float(np.std(arr, ddof=0))
    return {"mu": round(mu, 4), "sigma": round(sigma, 4)}

def bernoulli_mle(data: np.ndarray) -> dict:
    arr = np.asarray(data, dtype=float)
    return {"p": round(float(np.mean(arr)), 4)}

def negative_log_likelihood(data: np.ndarray, mu: float, sigma: float) -> float:
    arr = np.asarray(data, dtype=float)
    n = len(arr)
    if sigma <= 0:
        return None
    nll = n / 2 * np.log(2 * np.pi * sigma ** 2) + np.sum((arr - mu) ** 2) / (2 * sigma ** 2)
    return round(float(nll), 4)
''',
    "math-gradient-numerical-checker": '''import numpy as np

def numerical_gradient(f, x: np.ndarray, h: float = 1e-5) -> np.ndarray:
    x_arr = np.asarray(x, dtype=float)
    grad = np.zeros_like(x_arr, dtype=float)
    for i in range(len(x_arr)):
        x_plus = x_arr.copy()
        x_minus = x_arr.copy()
        x_plus[i] += h
        x_minus[i] -= h
        grad[i] = (f(x_plus) - f(x_minus)) / (2 * h)
    return grad

def relative_error(num: np.ndarray, analytic: np.ndarray) -> float:
    num_arr = np.asarray(num, dtype=float)
    ana_arr = np.asarray(analytic, dtype=float)
    denom = float(np.linalg.norm(num_arr) + np.linalg.norm(ana_arr))
    if denom == 0:
        return 0.0
    return float(np.linalg.norm(num_arr - ana_arr) / denom)

def check_gradient(f, grad_f, x: np.ndarray) -> dict:
    x_arr = np.asarray(x, dtype=float)
    num = numerical_gradient(f, x_arr)
    analytic = np.asarray(grad_f(x_arr), dtype=float)
    err = relative_error(num, analytic)
    return {"max_relative_error": round(err, 8), "pass": bool(err < 1e-4)}

def eval_gradient_check(fn_name: str, x: np.ndarray, use_wrong_grad: bool = False) -> dict:
    presets = {
        "quad2": (lambda v: float(v[0] ** 2 + v[1] ** 2), lambda v: np.array([2 * v[0], 2 * v[1]], dtype=float)),
        "square1": (lambda v: float(v[0] ** 2), lambda v: np.array([2 * v[0]], dtype=float)),
        "cubic2": (lambda v: float(v[0] ** 3 + 2 * v[1] ** 2), lambda v: np.array([3 * v[0] ** 2, 4 * v[1]], dtype=float)),
    }
    f, grad_f = presets[fn_name]
    if use_wrong_grad:
        grad_f = lambda v: np.array([0.0] * len(v), dtype=float)
    return check_gradient(f, grad_f, np.asarray(x, dtype=float))
''',
    "math-eigen-page-rank": '''import numpy as np

def eigen_decompose(A: np.ndarray) -> dict:
    A = np.asarray(A, dtype=float)
    vals, vecs = np.linalg.eig(A)
    return {"values": np.round(np.real(vals), 6), "vectors": np.round(np.real(vecs), 6)}

def power_iteration(A: np.ndarray, iters: int = 100) -> dict:
    A = np.asarray(A, dtype=float)
    n = A.shape[0]
    v = np.ones(n, dtype=float) / np.sqrt(n)
    for _ in range(iters):
        Av = A @ v
        v = Av / np.linalg.norm(Av)
    eigenvalue = float(v @ (A @ v))
    return {"eigenvalue": round(eigenvalue, 4), "eigenvector": np.round(v, 6)}

def page_rank(links: list, damping: float = 0.85, iters: int = 100) -> list:
    pages = sorted({p for f, t in links for p in (f, t)})
    n = len(pages)
    idx = {p: i for i, p in enumerate(pages)}
    M = np.zeros((n, n), dtype=float)
    out_degree = np.zeros(n, dtype=float)
    for f, t in links:
        M[idx[t], idx[f]] += 1.0
        out_degree[idx[f]] += 1.0
    for j in range(n):
        if out_degree[j] > 0:
            M[:, j] /= out_degree[j]
        else:
            M[:, j] = 1.0 / n
    r = np.ones(n, dtype=float) / n
    for _ in range(iters):
        r = damping * (M @ r) + (1.0 - damping) * np.ones(n, dtype=float) / n
    result = [[pages[i], round(float(r[i]), 4)] for i in range(n)]
    result.sort(key=lambda x: -x[1])
    return result
''',
    "math-gradient-descent-optimizer": '''import numpy as np

def vanilla_gd(grad_f, init_x: float, lr: float, steps: int) -> list:
    x = float(init_x)
    history = [x]
    for _ in range(steps):
        x = x - lr * grad_f(x)
        history.append(round(float(x), 8))
    return history

def momentum_gd(grad_f, init_x: float, lr: float, beta: float, steps: int) -> list:
    x = float(init_x)
    v = 0.0
    history = [x]
    for _ in range(steps):
        v = beta * v + grad_f(x)
        x = x - lr * v
        history.append(round(float(x), 8))
    return history

def find_best_lr(grad_f, init_x: float, lrs: list, steps: int) -> dict:
    best_lr = None
    best_val = float("inf")
    for lr in lrs:
        hist = vanilla_gd(grad_f, init_x, lr, steps)
        final = abs(hist[-1])
        if final < best_val:
            best_val = final
            best_lr = lr
    return {"best_lr": best_lr, "final_value": round(best_val, 6)}

def eval_gd_optimizer(mode: str, fn_name: str, init_x: float, lr_or_lrs, steps: int, beta: float = 0.9):
    grads = {
        "square": lambda x: 2.0 * x,
        "shifted": lambda x: 2.0 * (x - 3.0),
    }
    g = grads[fn_name]
    if mode == "vanilla":
        return vanilla_gd(g, init_x, lr_or_lrs, steps)
    if mode == "momentum":
        return momentum_gd(g, init_x, lr_or_lrs, beta, steps)
    if mode == "best_lr":
        return find_best_lr(g, init_x, lr_or_lrs, steps)
    raise ValueError(f"unknown mode: {mode}")
''',
    "math-matrix-determinant-l2": '''import numpy as np

def matrix_analysis(A):
    A = np.asarray(A, dtype=float)
    det = round(float(np.linalg.det(A)), 4)
    if abs(det) <= 1e-10:
        return {"det": 0.0 if abs(det) <= 1e-10 else det, "invertible": False, "inverse": None, "verification": None}
    inv = np.linalg.inv(A)
    verify = round(float(np.max(np.abs(A @ inv - np.eye(A.shape[0])))), 6)
    return {
        "det": det,
        "invertible": True,
        "inverse": [[round(float(v), 6) for v in row] for row in inv],
        "verification": verify,
    }
''',
    "math-svd-rank-l2": '''import numpy as np

def svd_analysis(A):
    A = np.asarray(A, dtype=float)
    _, s, _ = np.linalg.svd(A, full_matrices=False)
    rank = int(np.sum(s > 1e-10))
    cond = round(float(s[0] / s[-1]), 4) if s[-1] > 1e-10 else None
    return {"singular_values": [round(float(x), 4) for x in s], "rank": rank, "condition_number": cond}
''',
    "math-central-limit-l2": '''import numpy as np

def clt_simulation(n, m, seed: int = 42):
    np.random.seed(seed)
    samples = np.random.uniform(0, 1, (m, n))
    means = np.mean(samples, axis=1)
    return {
        "mean_of_means": round(float(np.mean(means)), 4),
        "var_of_means": round(float(np.var(means)), 4),
        "theoretical_var": round(1 / (12 * n), 4),
    }
''',
    "math-mle-estimation-l2": '''import numpy as np

def log_likelihood(data, p):
    arr = np.asarray(data, dtype=float)
    p = float(np.clip(p, 1e-15, 1 - 1e-15))
    return round(float(np.sum(arr * np.log(p) + (1 - arr) * np.log(1 - p))), 4)

def bernoulli_mle(data):
    arr = np.asarray(data, dtype=float)
    p_hat = round(float(np.mean(arr)), 4)
    ll = log_likelihood(arr, p_hat)
    return {"p_hat": p_hat, "log_likelihood": ll}
''',
    # --- Stage 04 fixes ---
    "ml-linear-regression-trainer": '''import numpy as np

def fit_normal_equation(X: np.ndarray, y: np.ndarray) -> np.ndarray:
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    return np.linalg.inv(X.T @ X) @ X.T @ y

def predict(w: np.ndarray, X: np.ndarray) -> np.ndarray:
    w, X = np.asarray(w, dtype=float), np.asarray(X, dtype=float)
    return X @ w

def mse(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    y_true, y_pred = np.asarray(y_true, dtype=float), np.asarray(y_pred, dtype=float)
    return float(np.mean((y_true - y_pred) ** 2))
''',
    "ml-logistic-regression-classifier": '''import numpy as np

def sigmoid(z: np.ndarray) -> np.ndarray:
    z = np.asarray(z, dtype=float)
    return 1.0 / (1.0 + np.exp(-np.clip(z, -100, 100)))

def fit_gd(X: np.ndarray, y: np.ndarray, lr: float = 0.01, steps: int = 1000) -> np.ndarray:
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    m, n = X.shape
    w = np.zeros(n, dtype=float)
    for _ in range(steps):
        h = sigmoid(X @ w)
        w -= lr * (X.T @ (h - y) / m)
    return w

def predict_proba(w: np.ndarray, X: np.ndarray) -> np.ndarray:
    w, X = np.asarray(w, dtype=float), np.asarray(X, dtype=float)
    return sigmoid(X @ w)

def predict(w: np.ndarray, X: np.ndarray, threshold: float = 0.5) -> np.ndarray:
    return (predict_proba(w, X) >= threshold).astype(int)
''',
    "ml-svm-hinge-classifier": '''import numpy as np

def hinge_loss(y_true: np.ndarray, scores: np.ndarray) -> float:
    y_true, scores = np.asarray(y_true, dtype=float), np.asarray(scores, dtype=float)
    return float(np.mean(np.maximum(0.0, 1.0 - y_true * scores)))

def fit_svm_sgd(X: np.ndarray, y: np.ndarray, lr: float, steps: int, lambda_reg: float) -> np.ndarray:
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    m, n = X.shape
    w = np.zeros(n, dtype=float)
    for _ in range(steps):
        scores = X @ w
        mask = y * scores < 1
        grad = 2 * lambda_reg * w - (X[mask] * y[mask][:, None]).sum(axis=0) / m
        w -= lr * grad
    return w

def predict(w: np.ndarray, X: np.ndarray) -> np.ndarray:
    w, X = np.asarray(w, dtype=float), np.asarray(X, dtype=float)
    return np.sign(X @ w)

def margin(w: np.ndarray) -> float:
    w = np.asarray(w, dtype=float)
    return float(2.0 / np.linalg.norm(w))
''',
    "ml-decision-tree-splitter": '''import numpy as np

def entropy(y: np.ndarray) -> float:
    y = np.asarray(y)
    _, counts = np.unique(y, return_counts=True)
    probs = counts / len(y)
    return float(-np.sum(probs * np.log2(probs + 1e-10)))

def gini(y: np.ndarray) -> float:
    y = np.asarray(y)
    _, counts = np.unique(y, return_counts=True)
    probs = counts / len(y)
    return float(1.0 - np.sum(probs ** 2))

def information_gain(X_col: np.ndarray, y: np.ndarray, threshold: float) -> float:
    X_col, y = np.asarray(X_col, dtype=float), np.asarray(y)
    H_parent = entropy(y)
    left = y[X_col <= threshold]
    right = y[X_col > threshold]
    if len(left) == 0 or len(right) == 0:
        return 0.0
    H_child = len(left) / len(y) * entropy(left) + len(right) / len(y) * entropy(right)
    return float(H_parent - H_child)

def best_split(X: np.ndarray, y: np.ndarray) -> dict:
    X, y = np.asarray(X, dtype=float), np.asarray(y)
    best = {"feature": -1, "threshold": 0.0, "gain": -1.0}
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            gain = information_gain(X[:, f], y, v)
            if gain > best["gain"]:
                best = {"feature": int(f), "threshold": float(v), "gain": round(float(gain), 4)}
    return best
''',
    "ml-random-forest-ensemble": '''import numpy as np
from collections import Counter

def bootstrap_sample(X: np.ndarray, y: np.ndarray) -> tuple:
    X, y = np.asarray(X, dtype=float), np.asarray(y)
    n = len(X)
    idx = np.random.choice(n, n, replace=True)
    return X[idx], y[idx]

def _build_stump(X, y, depth=0, max_depth=3):
    if len(set(y)) == 1 or depth >= max_depth:
        return {"pred": int(Counter(y).most_common(1)[0][0]), "leaf": True}
    best_gain, best_f, best_t = -1.0, -1, 0.0
    def _H(arr):
        return -sum((c / len(arr)) * np.log2(c / len(arr) + 1e-10) for c in Counter(arr).values())
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            left = y[X[:, f] <= v]
            right = y[X[:, f] > v]
            if len(left) == 0 or len(right) == 0:
                continue
            gain = _H(y) - len(left) / len(y) * _H(left) - len(right) / len(y) * _H(right)
            if gain > best_gain:
                best_gain, best_f, best_t = gain, f, float(v)
    if best_f == -1:
        return {"pred": int(Counter(y).most_common(1)[0][0]), "leaf": True}
    left_idx = X[:, best_f] <= best_t
    return {
        "feature": best_f, "threshold": best_t, "leaf": False,
        "left": _build_stump(X[left_idx], y[left_idx], depth + 1, max_depth),
        "right": _build_stump(X[~left_idx], y[~left_idx], depth + 1, max_depth),
    }

def fit_random_forest(X, y, n_trees=5, max_depth=3):
    X, y = np.asarray(X, dtype=float), np.asarray(y)
    return [_build_stump(*bootstrap_sample(X, y), 0, max_depth) for _ in range(n_trees)]

def _predict_tree(tree, x):
    if tree.get("leaf"):
        return tree["pred"]
    if x[tree["feature"]] <= tree["threshold"]:
        return _predict_tree(tree["left"], x)
    return _predict_tree(tree["right"], x)

def predict_forest(trees, X):
    X = np.asarray(X, dtype=float)
    return np.array([Counter(_predict_tree(t, x) for t in trees).most_common(1)[0][0] for x in X])
''',
    "ml-xgboost-gbdt-simulator": '''import numpy as np

def _stump_predict(tree, x):
    if tree.get("leaf"):
        return tree["pred"]
    if x[tree["feature"]] <= tree["threshold"]:
        return _stump_predict(tree["left"], x)
    return _stump_predict(tree["right"], x)

def _simple_stump(X, y, depth=0, max_depth=2):
    if len(set(y)) == 1 or depth >= max_depth:
        return {"leaf": True, "pred": float(np.mean(y))}
    best_f, best_t, best_var = -1, 0.0, float("inf")
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            left = y[X[:, f] <= v]
            right = y[X[:, f] > v]
            if len(left) == 0 or len(right) == 0:
                continue
            var = float(np.var(left) * len(left) + np.var(right) * len(right))
            if var < best_var:
                best_f, best_t, best_var = int(f), float(v), var
    if best_f == -1:
        return {"leaf": True, "pred": float(np.mean(y))}
    left_idx = X[:, best_f] <= best_t
    return {
        "feature": best_f, "threshold": best_t, "leaf": False,
        "left": _simple_stump(X[left_idx], y[left_idx], depth + 1, max_depth),
        "right": _simple_stump(X[~left_idx], y[~left_idx], depth + 1, max_depth),
    }

def fit_gbdt(X, y, n_estimators=5, lr=0.1):
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    model = []
    F = np.zeros(len(y), dtype=float)
    for _ in range(n_estimators):
        residuals = y - F
        tree = _simple_stump(X, residuals)
        preds = np.array([_stump_predict(tree, x) for x in X])
        F += lr * preds
        model.append({"tree": tree, "weight": float(lr)})
    return model

def predict_gbdt(model, X):
    X = np.asarray(X, dtype=float)
    F = np.zeros(len(X), dtype=float)
    for m in model:
        preds = np.array([_stump_predict(m["tree"], x) for x in X])
        F += m["weight"] * preds
    return F
''',
    "ml-knn-classifier": '''import numpy as np
from collections import Counter

def euclidean_distance(a: np.ndarray, b: np.ndarray) -> float:
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def fit_knn(X_train, y_train):
    return {"X": np.asarray(X_train, dtype=float), "y": np.asarray(y_train)}

def predict_knn(model, X_test, k=3):
    X = np.asarray(model["X"], dtype=float)
    y = np.asarray(model["y"])
    X_test = np.asarray(X_test, dtype=float)
    result = []
    for x in X_test:
        dists = [euclidean_distance(x, xt) for xt in X]
        idx = np.argsort(dists)[:k]
        result.append(Counter(y[idx]).most_common(1)[0][0])
    return np.array(result)
''',
    "ml-kmeans-clusterer": '''import numpy as np

def initialize_centroids(X, k):
    X = np.asarray(X, dtype=float)
    idx = np.random.choice(len(X), k, replace=False)
    return X[idx]

def assign_clusters(X, centroids):
    X, centroids = np.asarray(X, dtype=float), np.asarray(centroids, dtype=float)
    dists = np.linalg.norm(X[:, None] - centroids[None, :], axis=2)
    return np.argmin(dists, axis=1)

def update_centroids(X, assignments, k):
    X, assignments = np.asarray(X, dtype=float), np.asarray(assignments, dtype=int)
    return np.array([X[assignments == j].mean(axis=0) for j in range(k)])

def kmeans(X, k, max_iter=100):
    X = np.asarray(X, dtype=float)
    centroids = initialize_centroids(X, k)
    for _ in range(max_iter):
        assignments = assign_clusters(X, centroids)
        new_centroids = update_centroids(X, assignments, k)
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids
    inertia = sum(np.sum((X[assignments == j] - centroids[j]) ** 2) for j in range(k))
    return {"centroids": centroids, "assignments": assignments, "inertia": float(inertia)}
''',
    "ml-dbscan-clusterer": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def region_query(X, p_idx, eps):
    X = np.asarray(X, dtype=float)
    return [i for i in range(len(X)) if euclidean(X[p_idx], X[i]) <= eps]

def dbscan(X, eps, min_pts):
    X = np.asarray(X, dtype=float)
    labels = [-2] * len(X)
    cluster_id = 0
    for i in range(len(X)):
        if labels[i] != -2:
            continue
        neighbors = region_query(X, i, eps)
        if len(neighbors) < min_pts:
            labels[i] = -1
            continue
        labels[i] = cluster_id
        seed = neighbors[:]
        for q in seed:
            if labels[q] == -2:
                labels[q] = cluster_id
                q_neighbors = region_query(X, q, eps)
                if len(q_neighbors) >= min_pts:
                    seed.extend([n for n in q_neighbors if labels[n] == -2])
        cluster_id += 1
    return {"labels": labels, "n_clusters": cluster_id, "noise": labels.count(-1)}
''',
    "ml-hierarchical-clustering": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def cluster_distance(A, B, linkage="single"):
    A, B = np.asarray(A, dtype=float), np.asarray(B, dtype=float)
    dists = [euclidean(a, b) for a in A for b in B]
    if linkage == "single":
        return float(min(dists))
    if linkage == "complete":
        return float(max(dists))
    return float(sum(dists) / len(dists))

def agglomerative_clustering(X, n_clusters=2, linkage="single"):
    X = np.asarray(X, dtype=float)
    clusters = [[i] for i in range(len(X))]
    while len(clusters) > n_clusters:
        min_dist = float("inf")
        merge_pair = (0, 1)
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                d = cluster_distance(X[clusters[i]], X[clusters[j]], linkage)
                if d < min_dist:
                    min_dist = d
                    merge_pair = (i, j)
        i, j = merge_pair
        clusters[i].extend(clusters[j])
        clusters.pop(j)
    labels = np.zeros(len(X), dtype=int)
    for cid, cluster in enumerate(clusters):
        for idx in cluster:
            labels[idx] = cid
    return labels.tolist()
''',
    "ml-pca-dimensionality-reducer": '''import numpy as np

def pca_fit(X):
    X = np.asarray(X, dtype=float)
    mean = np.mean(X, axis=0)
    X_center = X - mean
    cov = X_center.T @ X_center / (len(X) - 1)
    vals, vecs = np.linalg.eigh(cov)
    idx = np.argsort(vals)[::-1]
    vals, vecs = vals[idx], vecs[:, idx]
    for j in range(vecs.shape[1]):
        if vecs[0, j] < 0 or (abs(vecs[0, j]) < 1e-12 and vecs[np.argmax(np.abs(vecs[:, j])), j] < 0):
            vecs[:, j] = -vecs[:, j]
    total = float(np.sum(vals))
    ratio = (vals / total).tolist() if total > 0 else [0.0] * len(vals)
    return {"components": vecs, "explained_variance_ratio": ratio, "mean": mean}

def pca_transform(model, X, n_components):
    X = np.asarray(X, dtype=float)
    mean = np.asarray(model["mean"], dtype=float)
    comp = np.asarray(model["components"], dtype=float)
    return (X - mean) @ comp[:, :n_components]

def pca_inverse_transform(model, X_pca):
    X_pca = np.asarray(X_pca, dtype=float)
    mean = np.asarray(model["mean"], dtype=float)
    comp = np.asarray(model["components"], dtype=float)
    return X_pca @ comp[:, :X_pca.shape[1]].T + mean
''',
    "ml-feature-standardizer": '''import numpy as np

class FeatureScaler:
    def __init__(self, method="standard"):
        self.method = method
        self.params = {}

    def fit(self, X):
        X = np.asarray(X, dtype=float)
        if self.method == "standard":
            self.params["mean"] = np.mean(X, axis=0)
            self.params["std"] = np.std(X, axis=0)
            self.params["std"][self.params["std"] == 0] = 1
        elif self.method == "minmax":
            self.params["min"] = np.min(X, axis=0)
            self.params["range"] = np.max(X, axis=0) - np.min(X, axis=0)
            self.params["range"][self.params["range"] == 0] = 1
        elif self.method == "robust":
            self.params["median"] = np.median(X, axis=0)
            q75, q25 = np.percentile(X, 75, axis=0), np.percentile(X, 25, axis=0)
            self.params["iqr"] = q75 - q25
            self.params["iqr"][self.params["iqr"] == 0] = 1
        return self

    def transform(self, X):
        X = np.asarray(X, dtype=float)
        if self.method == "standard":
            return (X - self.params["mean"]) / self.params["std"]
        if self.method == "minmax":
            return (X - self.params["min"]) / self.params["range"]
        if self.method == "robust":
            return (X - self.params["median"]) / self.params["iqr"]
        raise ValueError(f"unknown method: {self.method}")

    def inverse_transform(self, X_scaled):
        X_scaled = np.asarray(X_scaled, dtype=float)
        if self.method == "standard":
            return X_scaled * self.params["std"] + self.params["mean"]
        if self.method == "minmax":
            return X_scaled * self.params["range"] + self.params["min"]
        if self.method == "robust":
            return X_scaled * self.params["iqr"] + self.params["median"]
        raise ValueError(f"unknown method: {self.method}")

def eval_feature_scaler(method: str, X_train: np.ndarray, X_test: np.ndarray) -> dict:
    scaler = FeatureScaler(method=method)
    scaler.fit(np.asarray(X_train, dtype=float))
    scaled = scaler.transform(np.asarray(X_test, dtype=float))
    restored = scaler.inverse_transform(scaled)
    return {"scaled": scaled, "restored": restored}
''',
    "ml-normalization-techniques": '''import numpy as np

def batch_norm_forward(X, gamma, beta, eps=1e-5):
    X, gamma, beta = np.asarray(X, dtype=float), np.asarray(gamma, dtype=float), np.asarray(beta, dtype=float)
    mu = np.mean(X, axis=0)
    var = np.var(X, axis=0)
    x_hat = (X - mu) / np.sqrt(var + eps)
    out = gamma * x_hat + beta
    return {"out": out, "cache": {"X": X, "mu": mu, "var": var, "x_hat": x_hat, "gamma": gamma, "beta": beta, "eps": eps}}

def layer_norm_forward(X, gamma, beta, eps=1e-5):
    X, gamma, beta = np.asarray(X, dtype=float), np.asarray(gamma, dtype=float), np.asarray(beta, dtype=float)
    mu = np.mean(X, axis=1, keepdims=True)
    var = np.var(X, axis=1, keepdims=True)
    x_hat = (X - mu) / np.sqrt(var + eps)
    out = gamma * x_hat + beta
    return {"out": out, "cache": {"x_hat": x_hat, "gamma": gamma, "beta": beta}}
''',
    "ml-ridge-regression-l2": '''import numpy as np

def fit_ridge(X, y, lambda_reg):
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    _, d = X.shape
    I = np.eye(d)
    I[0, 0] = 0
    return np.linalg.inv(X.T @ X + lambda_reg * I) @ X.T @ y

def predict(w, X):
    w, X = np.asarray(w, dtype=float), np.asarray(X, dtype=float)
    return X @ w

def compare_coefs(X, y, lambdas):
    coefs = []
    for lam in lambdas:
        w = fit_ridge(X, y, lam)
        coefs.append({"lambda": lam, "coefs": [round(float(c), 4) for c in w]})
    return coefs
''',
    "ml-softmax-regression-l2": '''import numpy as np

def softmax(z):
    z = np.asarray(z, dtype=float)
    z_shift = z - np.max(z, axis=1, keepdims=True)
    exp_z = np.exp(z_shift)
    return exp_z / np.sum(exp_z, axis=1, keepdims=True)

def cross_entropy_loss(y_true, y_pred):
    y_true = np.asarray(y_true, dtype=int)
    y_pred = np.asarray(y_pred, dtype=float)
    m = y_true.shape[0]
    log_likelihood = -np.log(y_pred[range(m), y_true] + 1e-10)
    return float(np.mean(log_likelihood))

def fit_softmax(X, y, lr=0.01, steps=500, num_classes=3):
    X = np.asarray(X, dtype=float)
    y = np.asarray(y, dtype=int)
    m, n = X.shape
    W = np.zeros((n, num_classes), dtype=float)
    Y_onehot = np.eye(num_classes)[y]
    for _ in range(steps):
        probs = softmax(X @ W)
        grad = X.T @ (probs - Y_onehot) / m
        W -= lr * grad
    return W

def predict(W, X):
    W, X = np.asarray(W, dtype=float), np.asarray(X, dtype=float)
    return np.argmax(X @ W, axis=1)
''',
    "ml-svm-kernel-l2": '''import numpy as np

def linear_kernel(x1, x2):
    x1, x2 = np.asarray(x1, dtype=float), np.asarray(x2, dtype=float)
    return float(np.dot(x1, x2))

def rbf_kernel(x1, x2, gamma=1.0):
    x1, x2 = np.asarray(x1, dtype=float), np.asarray(x2, dtype=float)
    diff = x1 - x2
    return float(np.exp(-gamma * np.dot(diff, diff)))

def kernel_matrix(X1, X2, kernel_func):
    X1, X2 = np.asarray(X1, dtype=float), np.asarray(X2, dtype=float)
    n1, n2 = len(X1), len(X2)
    K = np.zeros((n1, n2), dtype=float)
    for i in range(n1):
        for j in range(n2):
            K[i, j] = kernel_func(X1[i], X2[j])
    return K

def dual_predict(alpha, X_train, y_train, X_test, kernel_func, b):
    alpha = np.asarray(alpha, dtype=float)
    X_train = np.asarray(X_train, dtype=float)
    y_train = np.asarray(y_train, dtype=float)
    X_test = np.asarray(X_test, dtype=float)
    K = kernel_matrix(X_train, X_test, kernel_func)
    scores = np.sum((alpha * y_train)[:, None] * K, axis=0) + b
    return np.sign(scores)

def eval_kernel_matrix(X1, X2, kernel_name: str = "rbf", gamma: float = 0.5):
    kf = linear_kernel if kernel_name == "linear" else (lambda a, b: rbf_kernel(a, b, gamma))
    return kernel_matrix(X1, X2, kf)

def eval_dual_predict(alpha, X_train, y_train, X_test, kernel_name: str, b: float, gamma: float = 0.5):
    kf = linear_kernel if kernel_name == "linear" else (lambda a, b: rbf_kernel(a, b, gamma))
    return dual_predict(alpha, X_train, y_train, X_test, kf, b)
''',
    "ml-decision-tree-regressor-l2": '''import numpy as np

def mse_split(X_col, y, threshold):
    X_col, y = np.asarray(X_col, dtype=float), np.asarray(y, dtype=float)
    left = y[X_col <= threshold]
    right = y[X_col > threshold]
    if len(left) == 0 or len(right) == 0:
        return float("inf")
    return float((np.var(left) * len(left) + np.var(right) * len(right)) / len(y))

def best_split(X, y):
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    best_f, best_t, best_loss = -1, 0.0, float("inf")
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            loss = mse_split(X[:, f], y, v)
            if loss < best_loss:
                best_f, best_t, best_loss = int(f), float(v), loss
    return {"feature": best_f, "threshold": best_t}

def build_tree(X, y, max_depth=5, min_samples=2):
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    if len(set(y)) == 1 or len(y) < min_samples or max_depth == 0:
        return {"pred": float(np.mean(y)), "leaf": True}
    split = best_split(X, y)
    if split["feature"] == -1:
        return {"pred": float(np.mean(y)), "leaf": True}
    left_idx = X[:, split["feature"]] <= split["threshold"]
    return {
        "feature": split["feature"],
        "threshold": split["threshold"],
        "left": build_tree(X[left_idx], y[left_idx], max_depth - 1, min_samples),
        "right": build_tree(X[~left_idx], y[~left_idx], max_depth - 1, min_samples),
    }

def predict_tree(tree, X):
    arr = np.asarray(X, dtype=float)
    def _one(node, x):
        if node.get("leaf"):
            return node["pred"]
        return _one(node["left"], x) if x[node["feature"]] <= node["threshold"] else _one(node["right"], x)
    if arr.ndim == 1:
        return _one(tree, arr)
    return [_one(tree, row) for row in arr]
''',
    "ml-random-forest-oob-l2": '''import numpy as np
from collections import Counter

def bootstrap_sample(X, y):
    X, y = np.asarray(X, dtype=float), np.asarray(y)
    n = len(X)
    idx = np.random.choice(n, n, replace=True)
    oob = sorted(set(range(n)) - set(idx))
    return X[idx], y[idx], oob

def _stump(X, y, depth=0, max_depth=3):
    if len(set(y)) == 1 or depth >= max_depth:
        return {"pred": int(Counter(y).most_common(1)[0][0]), "leaf": True}
    best_f, best_t, best_g = -1, 0.0, -1.0
    def _H(arr):
        c = Counter(arr)
        return -sum((cnt / len(arr)) * np.log2(cnt / len(arr) + 1e-10) for cnt in c.values())
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            l, r = y[X[:, f] <= v], y[X[:, f] > v]
            if len(l) == 0 or len(r) == 0:
                continue
            g = _H(y) - len(l) / len(y) * _H(l) - len(r) / len(y) * _H(r)
            if g > best_g:
                best_f, best_t, best_g = int(f), float(v), g
    if best_f == -1:
        return {"pred": int(Counter(y).most_common(1)[0][0]), "leaf": True}
    li = X[:, best_f] <= best_t
    return {"feature": best_f, "threshold": best_t, "left": _stump(X[li], y[li], depth + 1, max_depth), "right": _stump(X[~li], y[~li], depth + 1, max_depth)}

def _predict(t, x):
    if t.get("leaf"):
        return t["pred"]
    return _predict(t["left"], x) if x[t["feature"]] <= t["threshold"] else _predict(t["right"], x)

def fit_random_forest(X, y, n_trees=10, max_depth=3):
    X, y = np.asarray(X, dtype=float), np.asarray(y)
    trees, oobs = [], []
    for _ in range(n_trees):
        Xs, ys, oob = bootstrap_sample(X, y)
        trees.append(_stump(Xs, ys, 0, max_depth))
        oobs.append(oob)
    return {"trees": trees, "oob_samples": oobs}

def oob_predict(trees, oob_samples, X):
    X = np.asarray(X, dtype=float)
    n = len(X)
    preds = [[] for _ in range(n)]
    for i, tree in enumerate(trees):
        for j in oob_samples[i]:
            preds[j].append(_predict(tree, X[j]))
    return np.array([Counter(p).most_common(1)[0][0] if p else 0 for p in preds])

def oob_score(trees, oob_samples, X, y):
    y = np.asarray(y)
    pred = oob_predict(trees, oob_samples, X)
    return round(float(np.mean(pred == y)), 4)
''',
    "ml-xgboost-gbdt-regression-l2": '''import numpy as np

def gradient(y_true, y_pred):
    y_true, y_pred = np.asarray(y_true, dtype=float), np.asarray(y_pred, dtype=float)
    return y_true - y_pred

def hessian(y_true, y_pred):
    y_true = np.asarray(y_true, dtype=float)
    return np.ones_like(y_true)

def _build_stump_reg(X, y, depth=0, max_depth=3):
    if len(y) < 2 or depth >= max_depth:
        return {"pred": float(np.mean(y)), "leaf": True}
    best_f, best_t, best_loss = -1, 0.0, float("inf")
    for f in range(X.shape[1]):
        for v in np.unique(X[:, f]):
            l, r = y[X[:, f] <= v], y[X[:, f] > v]
            if len(l) == 0 or len(r) == 0:
                continue
            loss = float(np.var(l) * len(l) + np.var(r) * len(r))
            if loss < best_loss:
                best_f, best_t, best_loss = int(f), float(v), loss
    if best_f == -1:
        return {"pred": float(np.mean(y)), "leaf": True}
    li = X[:, best_f] <= best_t
    return {"feature": best_f, "threshold": best_t, "left": _build_stump_reg(X[li], y[li], depth + 1, max_depth), "right": _build_stump_reg(X[~li], y[~li], depth + 1, max_depth)}

def _pred_tree(t, x):
    if t.get("leaf"):
        return t["pred"]
    return _pred_tree(t["left"], x) if x[t["feature"]] <= t["threshold"] else _pred_tree(t["right"], x)

def gbdt_fit(X, y, n_estimators=10, lr=0.1, max_depth=3):
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    model = []
    F = np.zeros(len(y), dtype=float)
    for _ in range(n_estimators):
        res = gradient(y, F)
        tree = _build_stump_reg(X, res, 0, max_depth)
        preds = np.array([_pred_tree(tree, x) for x in X])
        F += lr * preds
        model.append({"tree": tree, "weight": float(lr)})
    return model

def gbdt_predict(model, X):
    X = np.asarray(X, dtype=float)
    F = np.zeros(len(X), dtype=float)
    for m in model:
        F += m["weight"] * np.array([_pred_tree(m["tree"], x) for x in X])
    return F
''',
    "ml-knn-regression-l2": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def knn_regression_predict(X_train, y_train, X_test, k):
    X_train = np.asarray(X_train, dtype=float)
    y_train = np.asarray(y_train, dtype=float)
    X_test = np.asarray(X_test, dtype=float)
    y_pred = []
    for x in X_test:
        dists = sorted(((euclidean(x, xt), yt) for xt, yt in zip(X_train, y_train)), key=lambda d: d[0])
        y_pred.append(float(np.mean([d[1] for d in dists[:k]])))
    return np.array(y_pred)

def weighted_knn_predict(X_train, y_train, X_test, k):
    X_train = np.asarray(X_train, dtype=float)
    y_train = np.asarray(y_train, dtype=float)
    X_test = np.asarray(X_test, dtype=float)
    y_pred = []
    eps = 1e-10
    for x in X_test:
        dists = sorted(((euclidean(x, xt), yt) for xt, yt in zip(X_train, y_train)), key=lambda d: d[0])[:k]
        w = np.array([1.0 / (d[0] + eps) for d in dists])
        vals = np.array([d[1] for d in dists])
        y_pred.append(float(np.sum(w * vals) / np.sum(w)))
    return np.array(y_pred)

def find_best_k(X_train, y_train, X_val, y_val, k_range):
    y_val_arr = np.asarray(y_val, dtype=float)
    scores = {}
    for k in k_range:
        pred = knn_regression_predict(X_train, y_train, X_val, k)
        mse = float(np.mean((pred - y_val_arr) ** 2))
        scores[str(k)] = round(mse, 4)
    best_k = int(min(scores, key=scores.get))
    return {"best_k": best_k, "scores": scores}
''',
    "ml-kmeans-plusplus-l2": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def kmeans_plusplus_init(X, k):
    X = np.asarray(X, dtype=float)
    centroids = [X[np.random.randint(len(X))]]
    for _ in range(1, k):
        dists = np.array([min(euclidean(x, c) ** 2 for c in centroids) for x in X])
        probs = dists / np.sum(dists)
        centroids.append(X[np.random.choice(len(X), p=probs)])
    return np.array(centroids)

def kmeans_with_init(X, k, init_method="kmeans++"):
    X = np.asarray(X, dtype=float)
    if init_method == "kmeans++":
        centroids = kmeans_plusplus_init(X, k)
    else:
        centroids = X[np.random.choice(len(X), k, replace=False)]
    dists = np.zeros((len(X), k))
    assignments = np.zeros(len(X), dtype=int)
    for _ in range(100):
        dists = np.array([[euclidean(x, c) for c in centroids] for x in X])
        assignments = np.argmin(dists, axis=1)
        new_c = np.array([X[assignments == j].mean(axis=0) if np.sum(assignments == j) > 0 else centroids[j] for j in range(k)])
        if np.allclose(centroids, new_c):
            break
        centroids = new_c
    inertia = float(np.sum(np.min(dists, axis=1) ** 2))
    return {"centroids": centroids, "assignments": assignments.tolist(), "inertia": round(inertia, 4)}

def silhouette_score(X, labels):
    X, labels = np.asarray(X, dtype=float), np.asarray(labels)
    if len(set(labels.tolist())) < 2:
        return 0.0
    scores = []
    for i, x in enumerate(X):
        same = [euclidean(x, X[j]) for j in range(len(X)) if labels[j] == labels[i] and j != i]
        a = float(np.mean(same)) if same else 0.0
        b = float(np.min([np.mean([euclidean(x, X[j]) for j in range(len(X)) if labels[j] == c]) for c in set(labels) if c != labels[i]])) if len(set(labels)) > 1 else 0.0
        scores.append((b - a) / max(a, b) if max(a, b) > 0 else 0.0)
    return round(float(np.mean(scores)), 4)
''',
    "ml-dbscan-eps-l2": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def region_query(X, p_idx, eps):
    X = np.asarray(X, dtype=float)
    return [i for i in range(len(X)) if euclidean(X[p_idx], X[i]) <= eps]

def dbscan(X, eps, min_pts):
    X = np.asarray(X, dtype=float)
    labels = [-2] * len(X)
    cluster = 0
    for i in range(len(X)):
        if labels[i] != -2:
            continue
        nbrs = region_query(X, i, eps)
        if len(nbrs) < min_pts:
            labels[i] = -1
            continue
        labels[i] = cluster
        seed = nbrs[:]
        for q in seed:
            if labels[q] == -2:
                labels[q] = cluster
                qn = region_query(X, q, eps)
                if len(qn) >= min_pts:
                    seed.extend([n for n in qn if labels[n] == -2])
        cluster += 1
    return {"labels": [int(l) for l in labels], "n_clusters": cluster, "noise": int(labels.count(-1))}

def k_distance_plot(X, k):
    X = np.asarray(X, dtype=float)
    dists = []
    for i in range(len(X)):
        d = sorted(euclidean(X[i], X[j]) for j in range(len(X)) if j != i)
        dists.append(round(d[k - 1] if len(d) >= k else d[-1], 4))
    return sorted(dists, reverse=True)
''',
    "ml-hierarchical-dendrogram-l2": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def cluster_dist(A, B, linkage):
    dists = [euclidean(a, b) for a in A for b in B]
    if linkage == "single":
        return min(dists)
    if linkage == "complete":
        return max(dists)
    return sum(dists) / len(dists)

def agglomerative(X, n_clusters=2, linkage="single"):
    X = np.asarray(X, dtype=float)
    clusters = [[i] for i in range(len(X))]
    while len(clusters) > n_clusters:
        md, mi, mj = float("inf"), 0, 1
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                d = cluster_dist(X[clusters[i]], X[clusters[j]], linkage)
                if d < md:
                    md, mi, mj = d, i, j
        clusters[mi].extend(clusters[mj])
        clusters.pop(mj)
    labels = np.zeros(len(X), dtype=int)
    for cid, c in enumerate(clusters):
        for idx in c:
            labels[idx] = cid
    return labels.tolist()

def dendrogram_heights(X, linkage="single"):
    X = np.asarray(X, dtype=float)
    clusters = [[i] for i in range(len(X))]
    heights = []
    while len(clusters) > 1:
        md, mi, mj = float("inf"), 0, 1
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                d = cluster_dist(X[clusters[i]], X[clusters[j]], linkage)
                if d < md:
                    md, mi, mj = d, i, j
        heights.append(round(float(md), 4))
        clusters[mi].extend(clusters[mj])
        clusters.pop(mj)
    return heights
''',
    "ml-pca-whitening-l2": '''import numpy as np

def pca_fit(X):
    X = np.asarray(X, dtype=float)
    mean = np.mean(X, axis=0)
    Xc = X - mean
    cov = Xc.T @ Xc / (len(X) - 1)
    vals, vecs = np.linalg.eigh(cov)
    idx = np.argsort(vals)[::-1]
    vals, vecs = vals[idx], vecs[:, idx]
    for j in range(vecs.shape[1]):
        if vecs[0, j] < 0 or (abs(vecs[0, j]) < 1e-12 and vecs[np.argmax(np.abs(vecs[:, j])), j] < 0):
            vecs[:, j] = -vecs[:, j]
    return {"mean": mean, "components": vecs, "values": vals}

def pca_transform(model, X, n_components):
    X = np.asarray(X, dtype=float)
    mean = np.asarray(model["mean"], dtype=float)
    comp = np.asarray(model["components"], dtype=float)
    return (X - mean) @ comp[:, :n_components]

def pca_whiten(model, X, n_components):
    X = np.asarray(X, dtype=float)
    vals = np.asarray(model["values"], dtype=float)
    Z = pca_transform(model, X, n_components)
    return Z / np.sqrt(vals[:n_components] + 1e-10)

def reconstruction_error(X, X_rec):
    X, X_rec = np.asarray(X, dtype=float), np.asarray(X_rec, dtype=float)
    return round(float(np.linalg.norm(X - X_rec) ** 2 / np.linalg.norm(X) ** 2), 6)
''',
    "ml-robust-scaler-l2": '''import math
import numpy as np

def _norm_ppf(p):
    # Pure-Python Acklam rational approximation to standard normal inverse CDF
    p = min(max(float(p), 1e-6), 1.0 - 1e-6)
    a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0]
    b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
    c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0, -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0]
    d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0, 3.754408661907416e0]
    plow, phigh = 0.02425, 1.0 - 0.02425
    if p < plow:
        q = math.sqrt(-2.0 * math.log(p))
        return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1.0)
    if p <= phigh:
        q = p - 0.5
        r = q * q
        return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5]) * q / (((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1.0)
    q = math.sqrt(-2.0 * math.log(1.0 - p))
    return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1.0)

class RobustScaler:
    def fit(self, X):
        X = np.asarray(X, dtype=float)
        self.median = np.median(X, axis=0)
        q75, q25 = np.percentile(X, 75, axis=0), np.percentile(X, 25, axis=0)
        self.iqr = q75 - q25
        self.iqr[self.iqr == 0] = 1
        return self

    def transform(self, X):
        return (np.asarray(X, dtype=float) - self.median) / self.iqr

    def inverse_transform(self, X):
        return np.asarray(X, dtype=float) * self.iqr + self.median

class QuantileTransformer:
    def fit(self, X, n_quantiles=100):
        X = np.asarray(X, dtype=float)
        self.n_quantiles = min(n_quantiles, len(X))
        self.references = np.linspace(0, 1, self.n_quantiles)
        self.quantiles = np.percentile(X, np.linspace(0, 100, self.n_quantiles), axis=0)
        return self

    def transform(self, X, output_distribution="uniform"):
        X = np.asarray(X, dtype=float)
        result = np.zeros_like(X, dtype=float)
        for j in range(X.shape[1]):
            idx = np.clip(np.searchsorted(self.quantiles[:, j], X[:, j], side="right") - 1, 0, self.n_quantiles - 1)
            ranks = self.references[idx]
            if output_distribution == "normal":
                result[:, j] = [_norm_ppf(r) for r in np.clip(ranks, 0.001, 0.999)]
            else:
                result[:, j] = ranks
        return result

def eval_scalers(method: str, X_train, X_test, output_distribution: str = "uniform"):
    X_tr = np.asarray(X_train, dtype=float)
    X_te = np.asarray(X_test, dtype=float)
    if method == "robust":
        s = RobustScaler().fit(X_tr)
        tr = s.transform(X_te)
        return {"transformed": tr, "restored": s.inverse_transform(tr)}
    qt = QuantileTransformer().fit(X_tr)
    return {"transformed": qt.transform(X_te, output_distribution=output_distribution)}
''',
    "ml-layer-normalization-l2": '''import numpy as np

def batch_norm(X, gamma, beta, eps=1e-5):
    X, gamma, beta = np.asarray(X, dtype=float), np.asarray(gamma, dtype=float), np.asarray(beta, dtype=float)
    mu = np.mean(X, axis=0, keepdims=True)
    var = np.var(X, axis=0, keepdims=True)
    x_hat = (X - mu) / np.sqrt(var + eps)
    return {"out": gamma * x_hat + beta, "mu": mu.flatten(), "var": var.flatten()}

def layer_norm(X, gamma, beta, eps=1e-5):
    X, gamma, beta = np.asarray(X, dtype=float), np.asarray(gamma, dtype=float), np.asarray(beta, dtype=float)
    mu = np.mean(X, axis=1, keepdims=True)
    var = np.var(X, axis=1, keepdims=True)
    x_hat = (X - mu) / np.sqrt(var + eps)
    return {"out": gamma * x_hat + beta, "mu": mu.flatten(), "var": var.flatten()}

def compare_gradients(dout, X, gamma, beta):
    X = np.asarray(X, dtype=float)
    bn = batch_norm(X, gamma, beta)
    ln = layer_norm(X, gamma, beta)
    diff = float(np.max(np.abs(bn["out"] - ln["out"])))
    return {"max_diff": round(diff, 6), "same_shape": bool(bn["out"].shape == ln["out"].shape)}
''',
    # --- Stage 05 fixes ---
    "dl-mlp-classifier": '''import numpy as np

def linear_forward(x, W, b):
    x, W, b = np.asarray(x, dtype=float), np.asarray(W, dtype=float), np.asarray(b, dtype=float)
    return x @ W + b

def relu(z):
    return np.maximum(0.0, np.asarray(z, dtype=float))

def softmax(z):
    z = np.asarray(z, dtype=float)
    z_shift = z - np.max(z, axis=-1, keepdims=True)
    exp_z = np.exp(z_shift)
    return exp_z / np.sum(exp_z, axis=-1, keepdims=True)

def mlp_forward(x, params):
    a = np.asarray(x, dtype=float)
    activations = [a]
    for i, layer in enumerate(params):
        W = np.asarray(layer[0], dtype=float)
        b = np.asarray(layer[1], dtype=float)
        z = linear_forward(a, W, b)
        a = softmax(z) if i == len(params) - 1 else relu(z)
        activations.append(a)
    return activations
''',
    "dl-activation-functions": '''import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-np.clip(np.asarray(x, dtype=float), -100, 100)))

def sigmoid_grad(x):
    s = sigmoid(x)
    return s * (1.0 - s)

def relu(x):
    return np.maximum(0.0, np.asarray(x, dtype=float))

def relu_grad(x):
    return (np.asarray(x, dtype=float) > 0).astype(float)

def leaky_relu(x, alpha=0.01):
    x = np.asarray(x, dtype=float)
    return np.where(x > 0, x, alpha * x)

def leaky_relu_grad(x, alpha=0.01):
    x = np.asarray(x, dtype=float)
    return np.where(x > 0, 1.0, alpha)

def max_gradient(activation, x_range):
    x = np.linspace(x_range[0], x_range[1], 1000)
    grads = {"sigmoid": sigmoid_grad, "relu": relu_grad, "leaky_relu": leaky_relu_grad}
    return float(np.max(np.abs(grads[activation](x))))
''',
    "dl-loss-functions": '''import numpy as np

def mse_loss(y_pred, y_true):
    y_pred, y_true = np.asarray(y_pred, dtype=float), np.asarray(y_true, dtype=float)
    return float(np.mean((y_pred - y_true) ** 2))

def cross_entropy_loss(y_pred, y_true):
    y_pred = np.clip(np.asarray(y_pred, dtype=float), 1e-10, 1 - 1e-10)
    y_true = np.asarray(y_true, dtype=float)
    return float(-np.mean(np.sum(y_true * np.log(y_pred), axis=-1)))

def binary_cross_entropy(y_pred, y_true):
    y_pred = np.clip(np.asarray(y_pred, dtype=float), 1e-10, 1 - 1e-10)
    y_true = np.asarray(y_true, dtype=float)
    return float(-np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred)))

def huber_loss(y_pred, y_true, delta=1.0):
    y_pred, y_true = np.asarray(y_pred, dtype=float), np.asarray(y_true, dtype=float)
    abs_diff = np.abs(y_pred - y_true)
    quadratic = np.minimum(abs_diff, delta)
    return float(np.mean(0.5 * quadratic ** 2 + delta * (abs_diff - quadratic)))
''',
    "dl-backpropagation": '''import numpy as np

def linear_backward(dout, x, W):
    dout, x, W = np.asarray(dout, dtype=float), np.asarray(x, dtype=float), np.asarray(W, dtype=float)
    dW = x.T @ dout
    db = np.sum(dout, axis=0)
    dx = dout @ W.T
    return dW, db, dx

def relu_backward(dout, z):
    dout, z = np.asarray(dout, dtype=float), np.asarray(z, dtype=float)
    return dout * (z > 0).astype(float)

def mlp_backward(dLoss, activations, params):
    grads = []
    d = np.asarray(dLoss, dtype=float)
    for i in reversed(range(len(params))):
        W = np.asarray(params[i][0], dtype=float)
        a = np.asarray(activations[i], dtype=float)
        dW, db, da = linear_backward(d, a, W)
        grads.insert(0, [dW, db])
        if i > 0:
            d = da
    return grads
''',
    "dl-optimizers-sgd-adam": '''import numpy as np

class Optimizer:
    def __init__(self, method="sgd", lr=0.01):
        self.method = method
        self.lr = lr
        self.beta1 = 0.9
        self.beta2 = 0.999
        self.eps = 1e-8
        self.t = 0
        self.m = None
        self.v = None

    def step(self, params, grads):
        params, grads = np.asarray(params, dtype=float), np.asarray(grads, dtype=float)
        if self.method == "sgd":
            return params - self.lr * grads
        if self.method == "adam":
            self.t += 1
            if self.m is None:
                self.m = np.zeros_like(grads)
                self.v = np.zeros_like(grads)
            self.m = self.beta1 * self.m + (1 - self.beta1) * grads
            self.v = self.beta2 * self.v + (1 - self.beta2) * grads ** 2
            m_hat = self.m / (1 - self.beta1 ** self.t)
            v_hat = self.v / (1 - self.beta2 ** self.t)
            return params - self.lr * m_hat / (np.sqrt(v_hat) + self.eps)
        raise ValueError(f"unknown method: {self.method}")

def eval_optimizer(method: str, lr: float, params: list, grads_list: list) -> np.ndarray:
    opt = Optimizer(method=method, lr=lr)
    p = np.asarray(params, dtype=float)
    for g in grads_list:
        p = opt.step(p, np.asarray(g, dtype=float))
    return p
''',
    "dl-batchnorm-training": '''import numpy as np

def batchnorm_train(X, gamma, beta, running_mean, running_var, momentum=0.9, eps=1e-5):
    X = np.asarray(X, dtype=float)
    gamma = np.asarray(gamma, dtype=float)
    beta = np.asarray(beta, dtype=float)
    running_mean = np.asarray(running_mean, dtype=float)
    running_var = np.asarray(running_var, dtype=float)
    mu = np.mean(X, axis=0)
    var = np.var(X, axis=0)
    x_hat = (X - mu) / np.sqrt(var + eps)
    out = gamma * x_hat + beta
    return {
        "out": out,
        "running_mean": momentum * running_mean + (1 - momentum) * mu,
        "running_var": momentum * running_var + (1 - momentum) * var,
        "cache": {"x_hat": x_hat, "gamma": gamma},
    }

def batchnorm_inference(X, gamma, beta, running_mean, running_var, eps=1e-5):
    X = np.asarray(X, dtype=float)
    gamma = np.asarray(gamma, dtype=float)
    beta = np.asarray(beta, dtype=float)
    running_mean = np.asarray(running_mean, dtype=float)
    running_var = np.asarray(running_var, dtype=float)
    x_hat = (X - running_mean) / np.sqrt(running_var + eps)
    return gamma * x_hat + beta
''',
    "dl-dropout-regularizer": '''import numpy as np

def dropout_forward(x, keep_prob=0.5, training=True):
    x = np.asarray(x, dtype=float)
    if not training or keep_prob >= 1:
        return {"out": x, "mask": np.ones_like(x)}
    if keep_prob <= 0:
        return {"out": np.zeros_like(x), "mask": np.zeros_like(x)}
    mask = (np.random.rand(*x.shape) < keep_prob).astype(float)
    return {"out": x * mask / keep_prob, "mask": mask}

def dropout_backward(dout, mask):
    return np.asarray(dout, dtype=float) * np.asarray(mask, dtype=float)

def train_with_dropout(X, y, hidden_size=10, keep_prob=0.5, steps=100):
    np.random.seed(42)
    X, y = np.asarray(X, dtype=float), np.asarray(y, dtype=float)
    n, d = X.shape
    W1 = np.random.randn(d, hidden_size) * 0.1
    b1 = np.zeros(hidden_size)
    W2 = np.random.randn(hidden_size, 1) * 0.1
    b2 = np.zeros(1)
    losses = []
    for _ in range(steps):
        z1 = X @ W1 + b1
        a1 = np.maximum(0, z1)
        drop = dropout_forward(a1, keep_prob)
        a1_drop = drop["out"]
        z2 = a1_drop @ W2 + b2
        losses.append(round(float(np.mean((z2.flatten() - y) ** 2)), 6))
        dloss = 2 * (z2.flatten() - y) / n
        dW2 = a1_drop.T @ dloss.reshape(-1, 1)
        db2 = np.sum(dloss)
        da1 = dropout_backward(dloss.reshape(-1, 1) @ W2.T, drop["mask"])
        dz1 = da1 * (z1 > 0).astype(float)
        W1 -= 0.01 * (X.T @ dz1)
        b1 -= 0.01 * np.sum(dz1, axis=0)
        W2 -= 0.01 * dW2
        b2 -= 0.01 * db2
    return losses
''',
    "dl-relu-variants-l2": '''import numpy as np

def relu(x):
    return np.maximum(0.0, np.asarray(x, dtype=float))

def leaky_relu(x, alpha=0.01):
    x = np.asarray(x, dtype=float)
    return np.where(x > 0, x, alpha * x)

def elu(x, alpha=1.0):
    x = np.asarray(x, dtype=float)
    return np.where(x > 0, x, alpha * (np.exp(np.clip(x, -100, 100)) - 1.0))

def swish(x):
    x = np.asarray(x, dtype=float)
    s = 1.0 / (1.0 + np.exp(-np.clip(x, -100, 100)))
    return x * s

def _swish_grad(x):
    s = 1.0 / (1.0 + np.exp(-np.clip(x, -100, 100)))
    return s + x * s * (1.0 - s)

def gradient(activation, x):
    x = np.asarray(x, dtype=float)
    if activation == "relu":
        return (x > 0).astype(float)
    if activation in ("leaky", "leaky_relu"):
        return np.where(x > 0, 1.0, 0.01)
    if activation == "elu":
        return np.where(x > 0, 1.0, np.exp(np.clip(x, -100, 100)))
    if activation == "swish":
        return _swish_grad(x)
    return x
''',
    "dl-focal-loss-l2": '''import numpy as np

def focal_loss(y_pred, y_true, gamma=2.0):
    y_pred = np.clip(np.asarray(y_pred, dtype=float), 1e-10, 1 - 1e-10)
    y_true = np.asarray(y_true, dtype=float)
    pt = np.where(y_true == 1, y_pred, 1 - y_pred)
    return float(np.mean(-((1 - pt) ** gamma) * np.log(pt)))

def cross_entropy_loss(y_pred, y_true):
    return focal_loss(y_pred, y_true, 0.0)

def compare_losses(y_pred, y_true):
    return {
        "ce": round(cross_entropy_loss(y_pred, y_true), 4),
        "fl_g1": round(focal_loss(y_pred, y_true, 1.0), 4),
        "fl_g2": round(focal_loss(y_pred, y_true, 2.0), 4),
    }
''',
    "dl-autograd-l2": '''import numpy as np

class Tensor:
    def __init__(self, val, children=None):
        self.val = float(val)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = children or ()

    def __add__(self, other):
        other = other if isinstance(other, Tensor) else Tensor(other)
        out = Tensor(self.val + other.val, (self, other))
        def _bw():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _bw
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Tensor) else Tensor(other)
        out = Tensor(self.val * other.val, (self, other))
        def _bw():
            self.grad += other.val * out.grad
            other.grad += self.val * out.grad
        out._backward = _bw
        return out

    def sigmoid(self):
        s = float(1.0 / (1.0 + np.exp(-self.val)))
        out = Tensor(s, (self,))
        def _bw():
            self.grad += s * (1.0 - s) * out.grad
        out._backward = _bw
        return out

    def backward(self):
        order, seen = [], set()
        def dfs(n):
            if n not in seen:
                seen.add(n)
                for c in n._prev:
                    dfs(c)
                order.append(n)
        dfs(self)
        self.grad = 1.0
        for n in reversed(order):
            n._backward()

def eval_autograd(a_val: float, b_val: float) -> dict:
    a = Tensor(a_val)
    b = Tensor(b_val)
    z = (a * b + a).sigmoid()
    z.backward()
    return {"out": round(float(z.val), 6), "da": round(float(a.grad), 6), "db": round(float(b.grad), 6)}
''',
    "dl-batchnorm-vs-layernorm-l2": '''import numpy as np

class BatchNorm:
    def __init__(self, D, momentum=0.9):
        self.gamma = np.ones(D, dtype=float)
        self.beta = np.zeros(D, dtype=float)
        self.rm = np.zeros(D, dtype=float)
        self.rv = np.ones(D, dtype=float)
        self.momentum = momentum
        self.eps = 1e-5
        self.cache = None

    def forward(self, X, training=True):
        X = np.asarray(X, dtype=float)
        if training:
            mu = np.mean(X, axis=0)
            var = np.var(X, axis=0)
            self.rm = self.momentum * self.rm + (1 - self.momentum) * mu
            self.rv = self.momentum * self.rv + (1 - self.momentum) * var
        else:
            mu, var = self.rm, self.rv
        x_hat = (X - mu) / np.sqrt(var + self.eps)
        self.cache = (x_hat, X, mu, var)
        return self.gamma * x_hat + self.beta

    def backward(self, dout):
        dout = np.asarray(dout, dtype=float)
        x_hat, X, mu, var = self.cache
        n = X.shape[0]
        dx_hat = dout * self.gamma
        dvar = np.sum(dx_hat * (X - mu) * (-0.5) * (var + self.eps) ** -1.5, axis=0)
        dmu = np.sum(-dx_hat / np.sqrt(var + self.eps), axis=0) + dvar * np.mean(-2 * (X - mu), axis=0)
        dx = dx_hat / np.sqrt(var + self.eps) + dvar * 2 * (X - mu) / n + dmu / n
        dgamma = np.sum(dout * x_hat, axis=0)
        dbeta = np.sum(dout, axis=0)
        return dx, dgamma, dbeta

def eval_batchnorm(X_train, X_test, dout, momentum: float = 0.9) -> dict:
    X_tr = np.asarray(X_train, dtype=float)
    X_te = np.asarray(X_test, dtype=float)
    d = np.asarray(dout, dtype=float)
    bn = BatchNorm(X_tr.shape[1], momentum=momentum)
    out_train = bn.forward(X_tr, training=True)
    dx, dgamma, dbeta = bn.backward(d)
    out_inf = bn.forward(X_te, training=False)
    return {"out_train": out_train, "out_inf": out_inf, "dx": dx, "dgamma": dgamma, "dbeta": dbeta}
''',
    "dl-dropout-variants-l2": '''import numpy as np

def dropout(x, keep_prob=0.5, training=True):
    x = np.asarray(x, dtype=float)
    if not training or keep_prob >= 1:
        return x
    if keep_prob <= 0:
        return np.zeros_like(x)
    mask = (np.random.rand(*x.shape) < keep_prob).astype(float) / keep_prob
    return x * mask

def mc_dropout_predict(model, x, n_samples=10):
    preds = []
    for _ in range(n_samples):
        if hasattr(model, "apply"):
            model.apply(lambda m: setattr(m, "training", True))
        preds.append(model(x))
    mean = np.mean(preds, axis=0)
    var = np.var(preds, axis=0)
    return {
        "mean": mean.tolist() if hasattr(mean, "tolist") else mean,
        "variance": var.tolist() if hasattr(var, "tolist") else var,
    }
''',
    # --- Stage 06 fixes ---
    "cv-image-filter-kernel": '''import numpy as np

def convolve(img, kernel):
    img, kernel = np.asarray(img, dtype=float), np.asarray(kernel, dtype=float)
    kh, kw = kernel.shape
    h, w = img.shape
    pad_h, pad_w = kh // 2, kw // 2
    padded = np.pad(img, ((pad_h, pad_h), (pad_w, pad_w)), mode="constant")
    out = np.zeros_like(img, dtype=float)
    for y in range(h):
        for x in range(w):
            out[y, x] = np.sum(padded[y:y + kh, x:x + kw] * kernel)
    return out

def gaussian_kernel(size, sigma):
    ax = np.arange(-size // 2 + 1, size // 2 + 1)
    xx, yy = np.meshgrid(ax, ax)
    kernel = np.exp(-(xx ** 2 + yy ** 2) / (2 * sigma ** 2))
    return kernel / np.sum(kernel)

def gaussian_blur(img, size=5, sigma=1.0):
    return convolve(img, gaussian_kernel(size, sigma))

def sharpen(img):
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]], dtype=float)
    return convolve(img, kernel)
''',
    "cv-canny-edge-detector": '''import numpy as np

def sobel_gradients(img):
    img = np.asarray(img, dtype=float)
    Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=float)
    Ky = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]], dtype=float)
    h, w = img.shape
    pad = np.pad(img, 1, mode="constant")
    Gx, Gy = np.zeros_like(img, dtype=float), np.zeros_like(img, dtype=float)
    for y in range(h):
        for x in range(w):
            region = pad[y:y + 3, x:x + 3]
            Gx[y, x] = np.sum(region * Kx)
            Gy[y, x] = np.sum(region * Ky)
    return {"magnitude": np.sqrt(Gx ** 2 + Gy ** 2), "direction": np.arctan2(Gy, Gx + 1e-10)}

def non_max_suppression(mag, direction):
    mag, direction = np.asarray(mag, dtype=float), np.asarray(direction, dtype=float)
    h, w = mag.shape
    out = mag.copy()
    angle = direction * 180.0 / np.pi
    angle[angle < 0] += 180.0
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            if 15 <= angle[y, x] < 75:
                neighbors = (mag[y - 1, x - 1], mag[y + 1, x + 1])
            elif 75 <= angle[y, x] < 105:
                neighbors = (mag[y - 1, x], mag[y + 1, x])
            elif 105 <= angle[y, x] < 165:
                neighbors = (mag[y - 1, x + 1], mag[y + 1, x - 1])
            else:
                neighbors = (mag[y, x - 1], mag[y, x + 1])
            if mag[y, x] < max(neighbors):
                out[y, x] = 0.0
    return out

def double_threshold(nms, low, high):
    nms = np.asarray(nms, dtype=float)
    edges = np.zeros_like(nms, dtype=int)
    edges[nms >= high] = 2
    edges[(nms >= low) & (nms < high)] = 1
    return edges

def hysteresis(edges):
    result = np.asarray(edges, dtype=int).copy()
    h, w = result.shape
    changed = True
    while changed:
        changed = False
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                if result[y, x] == 1 and np.any(result[y - 1:y + 2, x - 1:x + 2] == 2):
                    result[y, x] = 2
                    changed = True
    result[result == 1] = 0
    result[result == 2] = 255
    return result
''',
    "cv-color-space-converter": '''import numpy as np

def rgb_to_grayscale(img):
    img = np.asarray(img, dtype=float)
    return 0.299 * img[:, :, 0] + 0.587 * img[:, :, 1] + 0.114 * img[:, :, 2]

def rgb_to_hsv(img):
    img = np.asarray(img, dtype=float)
    r, g, b = img[:, :, 0], img[:, :, 1], img[:, :, 2]
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    v = mx
    c = mx - mn
    s = np.where(mx == 0, 0.0, c / (mx + (mx == 0)))
    h = np.zeros_like(v)
    mask = c != 0
    idx_r = mask & (mx == r)
    h[idx_r] = 60.0 * (((g[idx_r] - b[idx_r]) / c[idx_r]) % 6)
    idx_g = mask & (mx == g)
    h[idx_g] = 60.0 * (((b[idx_g] - r[idx_g]) / c[idx_g]) + 2.0)
    idx_b = mask & (mx == b)
    h[idx_b] = 60.0 * (((r[idx_b] - g[idx_b]) / c[idx_b]) + 4.0)
    h[h < 0] += 360.0
    return np.stack([h / 360.0, s, v], axis=-1)

def hsv_to_rgb(img):
    img = np.asarray(img, dtype=float)
    h, s, v = img[:, :, 0] * 360.0, img[:, :, 1], img[:, :, 2]
    c = v * s
    x = c * (1.0 - np.abs((h / 60.0) % 2 - 1.0))
    m = v - c
    h6 = (h // 60.0) % 6
    r = np.select([h6 == 0, h6 == 1, h6 == 2, h6 == 3, h6 == 4, h6 == 5], [c, x, 0.0, 0.0, x, c])
    g = np.select([h6 == 0, h6 == 1, h6 == 2, h6 == 3, h6 == 4, h6 == 5], [x, c, c, x, 0.0, 0.0])
    b = np.select([h6 == 0, h6 == 1, h6 == 2, h6 == 3, h6 == 4, h6 == 5], [0.0, 0.0, x, c, c, x])
    return np.stack([r + m, g + m, b + m], axis=-1)
''',
    "cv-sift-feature-matcher": '''import numpy as np

def _gaussian_filter(img, sigma):
    radius = max(1, int(round(3 * sigma)))
    ax = np.arange(-radius, radius + 1, dtype=float)
    k1d = np.exp(-(ax ** 2) / (2 * sigma ** 2))
    k1d /= np.sum(k1d)
    padded_h = np.pad(img, ((radius, radius), (0, 0)), mode="edge")
    tmp = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        tmp += w * padded_h[idx:idx + img.shape[0], :]
    padded_w = np.pad(tmp, ((0, 0), (radius, radius)), mode="edge")
    out = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        out += w * padded_w[:, idx:idx + img.shape[1]]
    return out

def dog_keypoints(img, sigma=1.0, k=1.6, threshold=0.03):
    img = np.asarray(img, dtype=float)
    g1 = _gaussian_filter(img, sigma)
    g2 = _gaussian_filter(img, sigma * k)
    dog = g2 - g1
    h, w = dog.shape
    keypoints = []
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            patch = dog[y - 1:y + 2, x - 1:x + 2]
            if dog[y, x] == np.max(patch) and dog[y, x] > threshold:
                keypoints.append([x, y, sigma])
            elif dog[y, x] == np.min(patch) and abs(dog[y, x]) > threshold:
                keypoints.append([x, y, sigma])
    return keypoints

def compute_descriptor(img, keypoints, patch_size=8):
    img = np.asarray(img, dtype=float)
    half = patch_size // 2
    descriptors = []
    for kp in keypoints:
        x, y = int(kp[0]), int(kp[1])
        y0, x0 = y - half, x - half
        if y0 < 0 or x0 < 0 or y0 + patch_size > img.shape[0] or x0 + patch_size > img.shape[1]:
            continue
        patch = img[y0:y0 + patch_size, x0:x0 + patch_size]
        grad_y, grad_x = np.gradient(patch)
        mag = np.sqrt(grad_x ** 2 + grad_y ** 2)
        ori = np.arctan2(grad_y, grad_x) * 180.0 / np.pi
        hist, _ = np.histogram(ori, bins=8, range=(-180, 180), weights=mag)
        desc = np.tile(hist, 16)[:128]
        desc = desc / (np.linalg.norm(desc) + 1e-10)
        descriptors.append(desc)
    return np.array(descriptors) if descriptors else np.zeros((0, 128))

def match_features(desc1, desc2, ratio_thresh=0.75):
    desc1, desc2 = np.asarray(desc1, dtype=float), np.asarray(desc2, dtype=float)
    matches = []
    for i in range(len(desc1)):
        dists = np.linalg.norm(desc2 - desc1[i], axis=1)
        idx = np.argsort(dists)
        if len(idx) >= 2 and dists[idx[0]] < ratio_thresh * dists[idx[1]]:
            matches.append([int(i), int(idx[0]), round(float(dists[idx[0]]), 6)])
    return matches
''',
    "cv-cnn-classifier": '''import numpy as np

def conv2d_forward(img, kernel, bias=0, stride=1):
    img, kernel = np.asarray(img, dtype=float), np.asarray(kernel, dtype=float)
    kh, kw = kernel.shape
    h, w = img.shape
    oh, ow = (h - kh) // stride + 1, (w - kw) // stride + 1
    out = np.zeros((oh, ow), dtype=float)
    for y in range(oh):
        for x in range(ow):
            out[y, x] = np.sum(img[y * stride:y * stride + kh, x * stride:x * stride + kw] * kernel) + bias
    return np.maximum(0.0, out)

def max_pool2d(img, pool_size=2, stride=2):
    img = np.asarray(img, dtype=float)
    h, w = img.shape
    oh, ow = h // stride, w // stride
    out = np.zeros((oh, ow), dtype=float)
    for y in range(oh):
        for x in range(ow):
            out[y, x] = np.max(img[y * stride:y * stride + pool_size, x * stride:x * stride + pool_size])
    return out

def cnn_forward(img, params):
    x = conv2d_forward(img, params["conv1_w"], params["conv1_b"])
    x = max_pool2d(x, 2, 2)
    x = conv2d_forward(x, params["conv2_w"], params["conv2_b"])
    x = max_pool2d(x, 2, 2)
    return x.flatten() @ np.asarray(params["fc_w"], dtype=float) + np.asarray(params["fc_b"], dtype=float)
''',
    "cv-yolo-anchor-detector": '''import numpy as np

def iou(box1, box2):
    x1, y1 = max(box1[0], box2[0]), max(box1[1], box2[1])
    x2, y2 = min(box1[2], box2[2]), min(box1[3], box2[3])
    inter = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = max(0, box1[2] - box1[0]) * max(0, box1[3] - box1[1])
    area2 = max(0, box2[2] - box2[0]) * max(0, box2[3] - box2[1])
    union = area1 + area2 - inter
    return float(inter / union) if union > 0 else 0.0

def nms(boxes, scores, iou_threshold=0.5):
    idx = np.argsort(np.asarray(scores, dtype=float))[::-1]
    keep = []
    while len(idx) > 0:
        i = int(idx[0])
        keep.append(i)
        if len(idx) == 1:
            break
        rest = idx[1:]
        ious = np.array([iou(boxes[i], boxes[int(j)]) for j in rest])
        idx = rest[ious <= iou_threshold]
    return keep

def map_score(pred_boxes, gt_boxes, iou_thresh=0.5):
    if len(gt_boxes) == 0:
        return 0.0
    tp = 0
    used_gt = set()
    for pb in sorted(pred_boxes, key=lambda x: -x[4]):
        best_iou, best_gt = 0.0, -1
        for gi, gb in enumerate(gt_boxes):
            if gi not in used_gt:
                val = iou(pb[:4], gb[:4])
                if val > best_iou:
                    best_iou, best_gt = val, gi
        if best_iou >= iou_thresh:
            tp += 1
            used_gt.add(best_gt)
    return float(tp / len(gt_boxes))
''',
    "cv-sam-prompt-segmenter": '''import numpy as np

def _gaussian_filter(img, sigma=3.0):
    radius = max(1, int(round(3 * sigma)))
    ax = np.arange(-radius, radius + 1, dtype=float)
    k1d = np.exp(-(ax ** 2) / (2 * sigma ** 2))
    k1d /= np.sum(k1d)
    padded_h = np.pad(img, ((radius, radius), (0, 0)), mode="constant")
    tmp = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        tmp += w * padded_h[idx:idx + img.shape[0], :]
    padded_w = np.pad(tmp, ((0, 0), (radius, radius)), mode="constant")
    out = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        out += w * padded_w[:, idx:idx + img.shape[1]]
    return out

def point_to_mask(mask_logits, point, label, radius=5):
    result = np.asarray(mask_logits, dtype=float).copy()
    x, y = int(point[0]), int(point[1])
    h, w = result.shape
    for dy in range(-radius, radius + 1):
        for dx in range(-radius, radius + 1):
            py, px = y + dy, x + dx
            if 0 <= py < h and 0 <= px < w:
                dist = float(np.sqrt(dy ** 2 + dx ** 2))
                if dist <= radius:
                    val = 10.0 * (1.0 - dist / radius)
                    result[py, px] += val if label == 1 else -val
    return result

def box_to_mask(img, box):
    img = np.asarray(img, dtype=float)
    x1, y1, x2, y2 = map(int, box)
    mask = np.zeros(img.shape[:2], dtype=float)
    mask[y1:y2, x1:x2] = 1.0
    return _gaussian_filter(mask, sigma=1.0)

def iou_matrix(masks):
    masks = np.asarray(masks, dtype=float)
    n = len(masks)
    mat = np.eye(n)
    for i in range(n):
        for j in range(i + 1, n):
            inter = np.sum(masks[i] * masks[j])
            union = np.sum(np.clip(masks[i] + masks[j], 0, 1))
            val = float(inter / union) if union > 0 else 0.0
            mat[i, j] = mat[j, i] = val
    return mat

def ensemble_masks(masks, weights):
    masks = np.asarray(masks, dtype=float)
    weights = np.asarray(weights, dtype=float)
    weights = weights / np.sum(weights)
    return np.sum(masks * weights[:, None, None], axis=0)
''',
    "cv-histogram-l2": '''import numpy as np

def histogram_equalize(img):
    img = np.asarray(img, dtype=float)
    hist, _ = np.histogram(img.flatten(), 256, (0, 255))
    c = hist.cumsum()
    cn = c * 255.0 / c[-1] if c[-1] > 0 else c
    return np.interp(img.flatten(), np.arange(256), cn).reshape(img.shape).astype(np.uint8)
''',
    "cv-hough-l2": '''import numpy as np

def hough_lines(edges, theta_res=1, rho_res=1):
    edges = np.asarray(edges, dtype=float)
    thetas = np.deg2rad(np.arange(-90, 90, theta_res))
    h, w = edges.shape
    d = int(np.sqrt(h * h + w * w))
    rhos = np.arange(-d, d, rho_res)
    H = np.zeros((len(thetas), len(rhos)), dtype=int)
    ys, xs = np.where(edges > 0)
    for y, x in zip(ys, xs):
        for ti, t in enumerate(thetas):
            r = x * np.cos(t) + y * np.sin(t)
            ri = int((r + d) / rho_res)
            if 0 <= ri < len(rhos):
                H[ti, ri] += 1
    return H, thetas, rhos

def find_peaks(H, threshold=100):
    H = np.asarray(H)
    return np.argwhere(H > threshold)
''',
    "cv-color-transfer-l2": '''import numpy as np

def _rgb_to_lab(rgb):
    rgb = np.clip(np.asarray(rgb, dtype=float), 0.0, 1.0)
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = lin @ M.T
    ref = np.array([0.95047, 1.00000, 1.08883])
    t = xyz / ref
    f = np.where(t > 0.008856, np.cbrt(t), 7.787 * t + 16.0 / 116.0)
    L = 116.0 * f[..., 1] - 16.0
    a = 500.0 * (f[..., 0] - f[..., 1])
    b = 200.0 * (f[..., 1] - f[..., 2])
    return np.stack([L, a, b], axis=-1)

def _lab_to_rgb(lab):
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    fy = (L + 16.0) / 116.0
    fx = a / 500.0 + fy
    fz = fy - b / 200.0
    f = np.stack([fx, fy, fz], axis=-1)
    t = np.where(f > 0.206893, f ** 3, (f - 16.0 / 116.0) / 7.787)
    xyz = t * np.array([0.95047, 1.00000, 1.08883])
    M_inv = np.array([[3.2404542, -1.5371385, -0.4985314], [-0.9692660, 1.8760108, 0.0415560], [0.0556434, -0.2040259, 1.0572252]])
    lin = np.clip(xyz @ M_inv.T, 0.0, 1.0)
    rgb = np.where(lin <= 0.0031308, 12.92 * lin, 1.055 * (lin ** (1.0 / 2.4)) - 0.055)
    return np.round(np.clip(rgb, 0.0, 1.0), 6)

def color_transfer(source, target):
    s = _rgb_to_lab(source)
    t = _rgb_to_lab(target)
    r = np.zeros_like(s)
    for c in range(3):
        sm, ss = float(np.mean(s[:, :, c])), float(np.std(s[:, :, c]))
        tm, ts = float(np.mean(t[:, :, c])), float(np.std(t[:, :, c]))
        r[:, :, c] = (ts * (s[:, :, c] - sm) / (ss + 1e-8)) + tm if ss > 1e-8 else (s[:, :, c] - sm + tm)
    r[:, :, 0] = np.clip(r[:, :, 0], 0.0, 100.0)
    r[:, :, 1:] = np.clip(r[:, :, 1:], -128.0, 127.0)
    return _lab_to_rgb(r)
''',
    "cv-harris-l2": '''import numpy as np

def _gaussian_filter(img, sigma=1.0):
    radius = max(1, int(round(3 * sigma)))
    ax = np.arange(-radius, radius + 1, dtype=float)
    k1d = np.exp(-(ax ** 2) / (2 * sigma ** 2))
    k1d /= np.sum(k1d)
    padded_h = np.pad(img, ((radius, radius), (0, 0)), mode="edge")
    tmp = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        tmp += w * padded_h[idx:idx + img.shape[0], :]
    padded_w = np.pad(tmp, ((0, 0), (radius, radius)), mode="edge")
    out = np.zeros_like(img, dtype=float)
    for idx, w in enumerate(k1d):
        out += w * padded_w[:, idx:idx + img.shape[1]]
    return out

def _sobel_axis(img, axis):
    Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=float)
    kernel = Kx if axis == 1 else Kx.T
    h, w = img.shape
    pad = np.pad(img, 1, mode="edge")
    out = np.zeros_like(img, dtype=float)
    for y in range(h):
        for x in range(w):
            out[y, x] = np.sum(pad[y:y + 3, x:x + 3] * kernel)
    return out

def harris_corner(img, k=0.04, threshold=1e-6):
    img = np.asarray(img, dtype=float)
    Ix = _sobel_axis(img, axis=1)
    Iy = _sobel_axis(img, axis=0)
    Ixx = _gaussian_filter(Ix * Ix, 1.0)
    Ixy = _gaussian_filter(Ix * Iy, 1.0)
    Iyy = _gaussian_filter(Iy * Iy, 1.0)
    R = Ixx * Iyy - Ixy * Ixy - k * (Ixx + Iyy) ** 2
    R[R < threshold] = 0.0
    return np.round(R, 6)
''',
    "cv-resnet-l2": '''import numpy as np

def relu(x):
    return np.maximum(0.0, np.asarray(x, dtype=float))

def conv2d(x, W, stride=1):
    x, W = np.asarray(x, dtype=float), np.asarray(W, dtype=float)
    co, _, kh, kw = W.shape
    p = kh // 2
    x_pad = np.pad(x, ((0, 0), (0, 0), (p, p), (p, p)))
    n, _, H_in, W_in = x_pad.shape
    oh = (H_in - kh) // stride + 1
    ow = (W_in - kw) // stride + 1
    out = np.zeros((n, co, oh, ow), dtype=float)
    for i in range(oh):
        for j in range(ow):
            patch = x_pad[:, :, i * stride:i * stride + kh, j * stride:j * stride + kw]
            out[:, :, i, j] = np.sum(patch[:, None, :, :, :] * W[None, :, :, :, :], axis=(2, 3, 4))
    return out

def residual_block(x, W1, W2):
    x = np.asarray(x, dtype=float)
    F = relu(conv2d(x, W1))
    F = conv2d(F, W2)
    return relu(F + x)
''',
    "cv-dice-l2": '''import numpy as np

def dice_coef(pred, target, s=1e-7):
    p, t = np.asarray(pred, dtype=float), np.asarray(target, dtype=float)
    inter = np.sum(p * t)
    return round(float((2 * inter + s) / (np.sum(p) + np.sum(t) + s)), 4)

def iou_score(pred, target, s=1e-7):
    p, t = np.asarray(pred, dtype=float), np.asarray(target, dtype=float)
    inter = np.sum(p * t)
    union = np.sum(np.clip(p + t, 0, 1))
    return round(float((inter + s) / (union + s)), 4)

def pixel_accuracy(pred, target):
    p, t = np.asarray(pred, dtype=float), np.asarray(target, dtype=float)
    return round(float(np.mean((p > 0.5) == (t > 0.5))), 4)
''',
    "cv-sam-l2": '''import numpy as np

def extract_embedding(img, dim=256):
    img = np.asarray(img, dtype=float)
    h, w = img.shape
    p = img[:h - h % 16, :w - w % 16].reshape(-1, 16, 16).mean(axis=(1, 2))
    np.random.seed(42)
    W = np.random.randn(len(p), dim) * 0.01
    return np.round(p @ W, 6)

def decode_mask(emb, prompt, size=32):
    np.random.seed(42)
    return (np.random.rand(size, size) > 0.5).astype(float).tolist()
''',
}


COMMENTS = {
    # --- Stage 03 (20) ---
    "math-vector-projection-decomposer": (
        "计算向量正交投影、垂直残差分量，并将原向量分解为平行与垂直两部分。",
        {"project": "计算 v 在非零基向量 onto 方向上的标量投影并返回投影向量", "orthogonal": "用原向量减去投影分量得到正交分量", "decompose": "同时返回平行分量与正交分量"},
    ),
    "math-linear-system-solver": (
        "先判断系数矩阵是否满秩方阵，再求线性方程组 Ax=b 的数值解与残差精度。",
        {"solve_linear": "检验矩阵可逆后调用线性方程组求解器返回解向量", "is_invertible": "校验矩阵为方阵且秩等于行数", "check_solution": "计算最大残差范数检验解的准确度"},
    ),
    "math-svd-image-compressor": (
        "利用奇异值分解抽取矩阵低秩近似，并以奇异值截断前 k 阶实现矩阵压缩。",
        {"svd_decompose": "计算经济型奇异值分解 U, s, Vt", "svd_compress": "选取前 k 个奇异值重建低秩近似矩阵", "compression_ratio": "计算保留参数量与原矩阵元素数的压缩比例"},
    ),
    "math-eigen-page-rank": (
        "实现特征分解与幂迭代主特征向量求解，并模拟带阻尼因子的 PageRank 转移迭代。",
        {"eigen_decompose": "求矩阵的特征值与对应特征向量", "power_iteration": "通过反复左乘矩阵并归一化逼近主特征方向", "page_rank": "构造列随机转移矩阵并用幂法迭代计算网页稳态权重"},
    ),
    "math-bayes-spam-classifier": (
        "基于拉普拉斯平滑统计类别先验与伯努利特征条件概率，在対数域比较后验完成分类。",
        {"train_naive_bayes": "统计先验分布并计算平滑后的二值特征条件概率", "predict": "在对数空间累加先验与特征似然并返回最优类别", "eval_naive_bayes_predict": "组合训练与单样本预测流程"},
    ),
    "math-gaussian-bernoulli-simulator": (
        "分别生成高斯与伯努利随机样本，并将样本均值、方差与理论分布公式对比。",
        {"sample_gaussian": "抽取指定均值与标准差的正态分布样本", "sample_bernoulli": "抽取指定成功概率的伯努利 0/1 样本", "compare_with_theory": "计算样本一二阶矩并与理论期望和方差公式对照"},
    ),
    "math-mle-parameter-estimator": (
        "实现高斯分布和伯努利分布的极大似然闭式估计，以及高斯负对数似然评估。",
        {"gaussian_mle": "用样本均值与总体标准差估计高斯参数", "bernoulli_mle": "用样本均值直接作为伯努利成功概率的 MLE", "negative_log_likelihood": "计算给定参数下样本集的高斯负对数似然"},
    ),
    "math-gradient-numerical-checker": (
        "使用中心差分公式求数值梯度并计算相对误差，验证反向传播解析梯度正确性。",
        {"numerical_gradient": "逐维扰动正负步长 h 计算中心差分数值梯度", "relative_error": "按范数比定义计算数值梯度与解析梯度的相对偏差", "check_gradient": "对比数值与解析梯度误差并判断是否通过阈值", "eval_gradient_check": "根据预设可微函数名调度梯度校验"},
    ),
    "math-gradient-descent-optimizer": (
        "对比普通梯度下降与动量梯度下降收敛轨迹，并在学习率候选中搜索最优步长。",
        {"vanilla_gd": "按固定步长沿负梯度方向迭代更新", "momentum_gd": "引入动量累积项平滑梯度振荡并记录轨迹", "find_best_lr": "遍历学习率集合选出终值绝对值最小的步长", "eval_gd_optimizer": "按指定模式运行对应预设目标函数的梯度优化"},
    ),
    "math-taylor-approximation": (
        "基于阶乘展开通用函数、e^x 与 sin(x) 的泰勒级数近似，并求解达到指定误差的最小阶数。",
        {"taylor_expand": "利用在 a 点的各阶导数累加 n 阶泰勒多项式", "exp_approx": "累加幂级数前 order 项近似自然指数", "sin_approx": "按奇次交错级数近似正弦值", "find_min_order": "递增阶数直至逼近误差小于给定容忍阈值"},
    ),
    "math-cauchy-schwarz-l2": (
        "计算两向量点积、模长与夹角余弦，数值验证柯西-施瓦茨不等式成立。",
        {"verify_cauchy_schwarz": "计算点积及模长乘积，验证 |a·b| <= ||a|| ||b|| 并输出 cos(theta)"},
    ),
    "math-matrix-determinant-l2": (
        "计算矩阵行列式、判定可逆性并求解逆矩阵及单位阵乘积验证误差。",
        {"matrix_analysis": "求解行列式并在非奇异时求逆矩阵及 ||A A^-1 - I|| 最大误差"},
    ),
    "math-svd-rank-l2": (
        "对矩阵进行奇异值分解，计算数值秩及条件数（奇异矩阵返回 None）。",
        {"svd_analysis": "统计超过容忍阈值的奇异值数量确定有效秩，并计算最大与最小奇异值之比"},
    ),
    "math-eigen-decomposition-l2": (
        "分解矩阵特征值并校验特征值之和等于迹、乘积等于行列式两大代数性质。",
        {"eigen_analysis": "计算特征值并检查迹恒等式与行列式恒等式是否满足"},
    ),
    "math-bayes-theorem-l2": (
        "由先验概率、真阳性率和假阳性率结合全概率公式计算条件后验概率。",
        {"bayes_theorem": "按贝叶斯公式分子除以全概率证据项得到后验 P(A|B)"},
    ),
    "math-central-limit-l2": (
        "对均匀分布抽样计算各组样本均值，验证均值分布方差收敛到理论方差 1/(12n)。",
        {"clt_simulation": "在固定随机种子下批量抽取样本均值并对比实证与理论方差"},
    ),
    "math-mle-estimation-l2": (
        "计算伯努利样本对数似然并给出极大似然估计概率及对应的最大对数似然值。",
        {"log_likelihood": "裁剪概率避免对数溢出，计算二项对数似然总和", "bernoulli_mle": "以样本频率作为 p_hat 并代入计算最大对数似然"},
    ),
    "math-partial-derivative-l2": (
        "求解二元二次型函数在指定点的梯度向量、模长以及沿单位方向的方向导数。",
        {"gradient_at": "求偏导数解析向量并计算梯度欧氏模长", "directional_derivative": "将梯度与单位方向向量作点积求方向导数"},
    ),
    "math-convergence-analysis-l2": (
        "对四次多项式执行固定步长梯度下降，追踪迭代轨迹并判断是否已接近驻点收敛。",
        {"f": "计算四次目标函数值", "df": "返回目标函数的一阶解析导数", "gradient_descent": "运行固定步数梯度下降并检查末步导数幅值收敛标志"},
    ),
    "math-taylor-approximation-l2": (
        "计算 ln(1+x) 在零点的交错泰勒级数展开值并分析与真值的绝对截断误差。",
        {"taylor_ln": "按 ln(1+x) 交错幂级数累加至第 order 项", "taylor_error": "返回多项式近似值、math.log 真值与绝对误差"},
    ),
    # --- Stage 04 (26) ---
    "ml-linear-regression-trainer": (
        "通过正规方程 (X^T X)^-1 X^T y 解析求解线性回归权重并计算预测与均方误差。",
        {"fit_normal_equation": "调用线性代数逆矩阵解析计算最小二乘权重", "predict": "矩阵乘积计算线性预测值", "mse": "求预测值与真实值的均方误差"},
    ),
    "ml-logistic-regression-classifier": (
        "使用带数值裁剪的 Sigmoid 与批量梯度下降训练二分类逻辑回归模型。",
        {"sigmoid": "裁剪 logits 后稳定计算逻辑斯谛概率", "fit_gd": "迭代计算交叉熵梯度并更新权重向量", "predict_proba": "输出正类预测概率", "predict": "按概率阈值二值化为 0/1 类别标签"},
    ),
    "ml-svm-hinge-classifier": (
        "通过次梯度下降最小化 L2 正则化折页损失实现线性支持向量机并计算几何间隔。",
        {"hinge_loss": "计算平均合页损失 max(0, 1 - y*score)", "fit_svm_sgd": "对违反边界间隔的样本累加次梯度更新权重", "predict": "返回线性得分的符号标签", "margin": "返回超平面几何间隔 2/||w||"},
    ),
    "ml-decision-tree-splitter": (
        "分别实现信息熵、基尼系数与信息增益计算，贪心搜寻决策树最佳特征分裂阈值。",
        {"entropy": "统计类别频次计算香农信息熵", "gini": "计算节点类别不纯度的基尼系数", "information_gain": "计算按阈值切分后的条件熵下降量", "best_split": "枚举全部特征与候选阈值寻找最大信息增益分裂"},
    ),
    "ml-random-forest-ensemble": (
        "通过 Bootstrap 有放回重采样构建多棵浅层决策树并以多数投票集成预测。",
        {"bootstrap_sample": "等量有放回抽样生成自助训练集", "fit_random_forest": "反复自助采样并训练多棵独立决策树", "predict_forest": "聚合森林中各树的类别预测做多数投票"},
    ),
    "ml-xgboost-gbdt-simulator": (
        "每轮以当前预测负残差拟合回归树桩并按学习率逐步累加更新梯度提升集成模型。",
        {"fit_gbdt": "多轮拟合残差树桩并累积加权预测值", "predict_gbdt": "遍历弱学习器累加加权输出得到最终预测"},
    ),
    "ml-knn-classifier": (
        "懒惰学习记录训练集特征并在预测阶段基于欧氏距离选出最近 k 个邻居多数投票。",
        {"euclidean_distance": "计算两特征向量的欧氏距离", "fit_knn": "封装训练样本与标签数组", "predict_knn": "搜寻距离最小的 k 个近邻并统计高频类别"},
    ),
    "ml-kmeans-clusterer": (
        "通过样本点分配与质心均值更新交替迭代优化 K-Means 聚类及簇内平方和惯性。",
        {"initialize_centroids": "无放回随机抽取 k 个初始质心", "assign_clusters": "将每个点分配给最近质心索引", "update_centroids": "按簇均值重新计算质心位置", "kmeans": "交替分配与更新至质心收敛并统计 inertia"},
    ),
    "ml-dbscan-clusterer": (
        "根据 epsilon 邻域密度阈值扩展核心点连通簇，同时识别稀疏离群噪声点 (-1)。",
        {"euclidean": "计算样本间欧氏距离", "region_query": "检索半径 eps 内的全部近邻索引", "dbscan": "通过队列扩展密度可达点形成聚类并统计噪声点数量"},
    ),
    "ml-hierarchical-clustering": (
        "实现单链接、全链接与平均链接簇间距离度量，自底向上凝聚层次聚类。",
        {"euclidean": "计算两点欧氏距离", "cluster_distance": "按指定链接准则计算两簇所有点对距离的最小/最大/均值", "agglomerative_clustering": "贪心合并距离最近的两簇直至达到目标簇数"},
    ),
    "ml-pca-dimensionality-reducer": (
        "基于协方差矩阵特征值分解提取主成分方向，实现降维投影与线性重构。",
        {"pca_fit": "中心化后对协方差阵作特征分解并按方差降序排列主成分", "pca_transform": "将中心化数据投影至前 n 个主方向", "pca_inverse_transform": "用主方向转置还原回原空间并加回均值"},
    ),
    "ml-feature-standardizer": (
        "封装支持 Z-score、Min-Max 与 Robust 三种策略的可逆特征缩放器。",
        {"FeatureScaler": "保存训练统计量并提供 fit/transform/inverse_transform 统一接口", "eval_feature_scaler": "对训练集拟合后执行测试集变换与逆变换检验"},
    ),
    "ml-normalization-techniques": (
        "对比批归一化（沿样本维）与层归一化（沿特征维）的前向标准化计算及缓存输出。",
        {"batch_norm_forward": "沿第 0 维计算均值方差标准化并返回缩放平移结果", "layer_norm_forward": "沿特征维为每个样本独立归一化"},
    ),
    "ml-ridge-regression-l2": (
        "在正规方程矩阵对角线上加入不惩罚偏置项的 L2 正则化权重衰减系数求解岭回归。",
        {"fit_ridge": "构造首行首列置零的正则矩阵求闭式岭回归权重", "predict": "矩阵乘积输出预测", "compare_coefs": "对比不同正则强度下的回归系数收缩幅值"},
    ),
    "ml-softmax-regression-l2": (
        "实现数值稳定多分类 Softmax、多类交叉熵及梯度下降多类对数几率回归。",
        {"softmax": "减去每行最大值后归一化指数输出概率矩阵", "cross_entropy_loss": "按真实整类标签提取预测概率求平均负对数", "fit_softmax": "独热编码标签并梯度迭代优化多类权重矩阵", "predict": "取 logits 最大索引作为预测类别"},
    ),
    "ml-svm-kernel-l2": (
        "实现线性核与 RBF 高斯核矩阵构造，支持在对偶系数空间对测试样本进行核方法分类。",
        {"linear_kernel": "计算两向量的内积核值", "rbf_kernel": "计算平方距离负指数高斯核值", "kernel_matrix": "双层遍历填充跨样本核矩阵", "dual_predict": "累加 alpha*y*K 加偏置取符号输出预测", "eval_kernel_matrix": "按核名构建核矩阵", "eval_dual_predict": "按核名执行对偶空间预测"},
    ),
    "ml-decision-tree-regressor-l2": (
        "以加权方差缩减为切分准则递归构建 CART 回归树并对连续目标值进行叶节点均值预测。",
        {"mse_split": "计算左右子集样本数加权方差作为回归分裂代价", "best_split": "遍历特征与切分点找加权 MSE 最小方案", "build_tree": "满足纯度、最小样本数或深度阈值时生成均值叶节点", "predict_tree": "支持单样本或批量递归检索回归树预测"},
    ),
    "ml-random-forest-oob-l2": (
        "利用自助采样未被抽中的袋外 (OOB) 样本统计每条样本的无偏集成预测与准确率。",
        {"bootstrap_sample": "记录有放回抽样索引及未入样 OOB 索引", "fit_random_forest": "训练森林并保存各树的 OOB 样本列表", "oob_predict": "仅由未见过样本 i 的树参与投票生成袋外预测", "oob_score": "比对袋外预测与真实标签计算整体准确率"},
    ),
    "ml-xgboost-gbdt-regression-l2": (
        "计算平方误差梯度残差与二阶恒一海森项，多轮提升构建 GBDT 回归树模型。",
        {"gradient": "返回当前残差方向 (y_true - y_pred)", "hessian": "返回平方损失常数为 1 的二阶导数组", "gbdt_fit": "迭代拟合残差树桩并按学习率累加输出", "gbdt_predict": "累加全部弱树加权输出"},
    ),
    "ml-knn-regression-l2": (
        "分别实现等权平均与反距离加权 KNN 回归，并在验证集上搜索最小 MSE 的最优 k。",
        {"euclidean": "计算样本欧氏距离", "knn_regression_predict": "取最近 k 个邻居目标均值作为预测", "weighted_knn_predict": "按距离倒数加权计算近邻回归值", "find_best_k": "遍历候选 k 记录验证集 MSE 并选出最优 k"},
    ),
    "ml-kmeans-plusplus-l2": (
        "按到最近已选质心距离平方成正比概率依次采样初始化质心，并用轮廓系数评估聚类紧致度。",
        {"euclidean": "计算欧氏距离", "kmeans_plusplus_init": "按 D^2 权重分布逐步采样分散初始质心", "kmeans_with_init": "支持 K-Means++ 或随机初始化运行迭代聚类", "silhouette_score": "基于簇内紧密度 a 与最近异簇分离度 b 计算轮廓系数"},
    ),
    "ml-dbscan-eps-l2": (
        "结合 k-近邻距离分布曲线选取合适密度半径，执行 DBSCAN 密度聚类统计簇数与噪声点。",
        {"euclidean": "计算欧氏距离", "region_query": "返回 eps 半径内所有近邻点索引", "dbscan": "基于邻域点数密度阈值展开簇标记与噪声检测", "k_distance_plot": "统计每点第 k 近邻距离并降序返回以辅助拐点定参"},
    ),
    "ml-hierarchical-dendrogram-l2": (
        "执行自底向上层次凝聚并在每轮合并时记录树状图 (Dendrogram) 的融合高度。",
        {"euclidean": "计算欧氏距离", "cluster_dist": "按 single/complete/average 计算两簇间距离", "agglomerative": "合并直至保留目标簇数并返回样本分配", "dendrogram_heights": "持续合并至单簇并返回每步最小融合距离列表"},
    ),
    "ml-pca-whitening-l2": (
        "主成分分析降维之外进一步按特征值平方根缩放方差实现 PCA 白化并度量重建误差。",
        {"pca_fit": "对齐主成分符号方向并返回特征值向量与均值", "pca_transform": "投影至前 n_components 个主方向", "pca_whiten": "将投影坐标除以各自方差平方根消除尺度相关性", "reconstruction_error": "计算重构相对弗罗贝尼乌斯平方误差"},
    ),
    "ml-robust-scaler-l2": (
        "实现抗异常值的中位数四分位鲁棒缩放，以及基于分位映射（均匀或纯 Python 近似正态逆 CDF）的分位数变换。",
        {"RobustScaler": "采用中位数与 IQR 执行对抗离群点的缩放与还原", "QuantileTransformer": "用经验分位排名映射至均匀分布或近似标准正态分布", "eval_scalers": "封装鲁棒/分位数缩放与恢复评估"},
    ),
    "ml-layer-normalization-l2": (
        "在同一批样本特征上实现 BatchNorm 与 LayerNorm 并对比二者标准化结果的最大绝对差异。",
        {"batch_norm": "沿 batch 维均值方差归一化", "layer_norm": "沿特征维均值方差归一化", "compare_gradients": "对比两种归一化在形状与数值上的最大偏差"},
    ),
    # --- Stage 05 (14) ---
    "dl-mlp-classifier": (
        "串联线性仿射、隐藏层 ReLU 激活与末层 Softmax 输出，完成多层感知机前向传播。",
        {"linear_forward": "执行矩阵乘法加偏置仿射变换", "relu": "对输入逐元素截断负数", "softmax": "按末轴数值稳定归一化得到类别概率", "mlp_forward": "顺序推进各层并记录包括输入在内的每层激活列表"},
    ),
    "dl-activation-functions": (
        "实现 Sigmoid、ReLU 与 LeakyReLU 的前向函数及导数计算，并评估给定区间最大梯度。",
        {"sigmoid": "裁剪后计算逻辑斯谛激活值", "sigmoid_grad": "返回 s*(1-s) 导数值", "relu": "正值直通、负值归零", "relu_grad": "大于零取 1 否则取 0", "leaky_relu": "负区保留微小斜率 alpha", "leaky_relu_grad": "大于零导数 1 否则为 alpha", "max_gradient": "在均匀网格采样评估区间内梯度最大幅值"},
    ),
    "dl-loss-functions": (
        "实现均方误差、多分类交叉熵、二元交叉熵与分段平滑 Huber 损失四大常用损失函数。",
        {"mse_loss": "求预测与真值差值平方的全局均值", "cross_entropy_loss": "概率裁剪后计算独热分布平均负对数似然", "binary_cross_entropy": "计算二分类概率对数似然", "huber_loss": "误差低于 delta 取平方、超过部分取线性以抑制离群梯"},
    ),
    "dl-backpropagation": (
        "通过链式法则对线性层与 ReLU 激活层分别求参数梯度与输入敏感度，完成 MLP 反向传播。",
        {"linear_backward": "按外积求 dW、沿样本求 db 并转置矩阵乘求 dx", "relu_backward": "仅在正激活位置透传上游梯度", "mlp_backward": "逆序遍历各参数层积累每层权重与偏置梯度列表"},
    ),
    "dl-optimizers-sgd-adam": (
        "分别实现固定步长 SGD 与带一二阶矩估计及偏差修正的 Adam 参数更新器。",
        {"Optimizer": "维护状态时间步 t 及一阶矩 m 与二阶矩 v 并在 step 返回新参数", "eval_optimizer": "按给定梯度流顺序执行多次迭代返回最终参数"},
    ),
    "dl-batchnorm-training": (
        "区分批归一化在训练模式更新指数滑动平均统计量与推理模式直接使用全局统计量两种行为。",
        {"batchnorm_train": "用当前批均值方差标准化并按动量更新 running_mean 和 running_var", "batchnorm_inference": "直接套用记录好的 running 均值方差完成推理前向"},
    ),
    "dl-dropout-regularizer": (
        "实现反向缩放 Inverted Dropout 前向与掩码反向传播，并在固定随机种子下对比带丢弃训练误差下降。",
        {"dropout_forward": "推理或 keep_prob>=1 直通输出，训练时生成缩放掩码保持期望不变", "dropout_backward": "按前向掩码透传梯度", "train_with_dropout": "固定种子训练两层 ReLU 回归网络返回每步 MSE 损失"},
    ),
    "dl-cnn-forward-l2": (
        "使用滑动窗口实现二维卷积前向累加并按公式计算卷积输出特征图空间高宽。",
        {"conv2d_forward": "按填充与步幅滑动卷积核求局部内积", "compute_output_shape": "利用 (H+2p-k)//s+1 推导输出尺寸"},
    ),
    "dl-relu-variants-l2": (
        "对比 ReLU、LeakyReLU、ELU 与 Swish 四种平滑或分片线性激活函数及其一阶导数。",
        {"relu": "标准线性整流", "leaky_relu": "负半轴保留 alpha 斜率", "elu": "负半轴指数平滑饱和", "swish": "x 与 sigmoid(x) 自门控乘积", "gradient": "分激活类型返回对应解析导数向量"},
    ),
    "dl-focal-loss-l2": (
        "用调节因子 (1-pt)^gamma 对高置信易分样本降权实现 Focal Loss，并对比不同聚焦指数变化。",
        {"focal_loss": "提取对应真实类别概率并乘以困难样本权重系数", "cross_entropy_loss": "令 gamma=0 特化为标准交叉熵", "compare_losses": "同时返回 CE 与 gamma=1/2 的焦点损失"},
    ),
    "dl-autograd-l2": (
        "构建具备动态计算图及拓扑逆序遍历的标量自动微分引擎 Tensor。",
        {"Tensor": "重载加乘与 sigmoid 算子并在 backward 沿拓扑逆序累加局部梯度", "eval_autograd": "构建 z=sigmoid(a*b+a) 图执行反向传播检验 da, db"},
    ),
    "dl-sgd-momentum-compare-l2": (
        "在经典的病态香蕉谷 Rosenbrock 函数上对比 SGD、动量 SGD 与 Adam 三种优化轨迹。",
        {"rosenbrock": "计算二维 Rosenbrock 函数值", "rosenbrock_grad": "返回在 (x, y) 处的解析梯度向量", "sgd": "朴素梯度下降", "momentum_sgd": "动量加速版梯度下降", "adam_optimizer": "自适应矩估计 Adam 迭代追踪优化路径"},
    ),
    "dl-batchnorm-vs-layernorm-l2": (
        "完整实现支持前向训练/推理分支与解析反向求导 dx, dgamma, dbeta 的 BatchNorm 类。",
        {"BatchNorm": "训练保存统计缓存并在 backward 精确分解批均值与方差对输入的耦合梯度", "eval_batchnorm": "串联前向、反向与推理态输出校验"},
    ),
    "dl-dropout-variants-l2": (
        "实现通用倒置 Dropout 算子以及基于多次随机前向采样估计预测均值与不确定性方差的 MC Dropout。",
        {"dropout": "按训练标志及 keep_prob 生成归一化随机掩码", "mc_dropout_predict": "开启随机采样收集多次预测计算均值与预测方差"},
    ),
    # --- Stage 06 (16) ---
    "cv-image-filter-kernel": (
        "以零填充滑窗实现通用 2D 卷积，构建归一化高斯核完成模糊平滑及拉普拉斯锐化。",
        {"convolve": "补零对齐边界后滑动卷积核累加局部乘积和", "gaussian_kernel": "计算二维高斯分布矩阵并归一化求和为 1", "gaussian_blur": "调用高斯核卷积实现平滑去噪", "sharpen": "应用 3x3 中心强化的拉普拉斯高通卷积核"},
    ),
    "cv-canny-edge-detector": (
        "分步实现 Canny 边缘检测：Sobel 梯度、方向非极大值抑制、双阈值分级与滞后连通连接。",
        {"sobel_gradients": "卷积水平与垂直 Sobel 算子得到梯度幅值与角度方向", "non_max_suppression": "沿梯度量化方向比较两侧邻域抑制非极大值像素", "double_threshold": "依高低阈值划分强边缘(2)、弱边缘(1)与背景(0)", "hysteresis": "迭代扩散将与强边缘连通的弱边缘升格为 255"},
    ),
    "cv-color-space-converter": (
        "使用 ITU-R BT.601 系数做灰度加权转换，并实现归一化 RGB 与 HSV 色彩空间互转。",
        {"rgb_to_grayscale": "按 0.299/0.587/0.114 线性加权三通道生成灰度图", "rgb_to_hsv": "分段确定最大通道求解色调 H、饱和度 S 与明度 V", "hsv_to_rgb": "依 H 所在 60 度扇区合成主色差并还原 RGB 分量"},
    ),
    "cv-sift-feature-matcher": (
        "纯 NumPy 构造高斯差分金字塔局部极值关键点、8-bin 方向梯度描述子与近邻比特征匹配。",
        {"dog_keypoints": "计算两尺度平滑图像差分 (DoG) 寻找 3x3 局部极值角点", "compute_descriptor": "裁剪关键点邻域块统计加权方向直方图并归一化为 128 维向量", "match_features": "对两图描述子矩阵按 Lowe 最近邻次近邻距离比筛选稳定匹配对"},
    ),
    "cv-cnn-classifier": (
        "拼接二维 ReLU 卷积层、最大池化下采样层与全连接线性输出，模拟 LeNet 前向分类。",
        {"conv2d_forward": "执行卷积滑窗累加偏置并应用 ReLU 激活", "max_pool2d": "取步幅窗口内最大值缩小空间分辨率", "cnn_forward": "串联两轮卷积-池化与拉平全连接计算类别得分"},
    ),
    "cv-yolo-anchor-detector": (
        "实现边界框交并比 (IoU)、置信度排序非极大值抑制 (NMS) 与基于 IoU 匹配的 mAP 评估。",
        {"iou": "计算两框交集面积除以并集面积", "nms": "按分数降序选取最高分框并抑制重叠度高于阈值的冗余框", "map_score": "按置信度顺序一对一贪心匹配真值框计算检测召回/精度"},
    ),
    "cv-unet-segmenter": (
        "实现图像分割常用 Dice 相似系数/损失以及两下两上带跳跃相加连接的简化 U-Net 前向结构。",
        {"dice_coefficient": "用平滑常数计算两掩码交并加权比", "dice_loss": "返回 1 减去 Dice 系数", "unet_forward": "模拟编码器池化压缩、瓶颈层卷积与解码器上采样跳接融合"},
    ),
    "cv-sam-prompt-segmenter": (
        "模拟分割提示交互：正负点高斯权重局部修正 logits、方框柔和掩码生成及掩码交并比集成。",
        {"point_to_mask": "以点击坐标为中心在半径内按距离线性衰减增减 logits", "box_to_mask": "生成方框区域布尔初值掩码并做纯 NumPy 高斯平滑", "iou_matrix": "构造多预测掩码的两两 IoU 对称方阵", "ensemble_masks": "按权重归一化融合多个候选取舍概率图"},
    ),
    "cv-histogram-l2": (
        "统计像素灰度直方图并利用归一化累积分布函数 (CDF) 完成对比度直方图均衡化。",
        {"histogram_equalize": "计算 256 级直方图累积映射并线性插值输出 uint8 均衡图像"},
    ),
    "cv-hough-l2": (
        "将图像边缘前景像素投影至极坐标 (rho, theta) 参数空间投票累计，提取共线直线峰值。",
        {"hough_lines": "在角度网格遍历边缘像素投射极径索引累加投票矩阵 H", "find_peaks": "提取超过投票阈值的参数空间峰值行列坐标"},
    ),
    "cv-color-transfer-l2": (
        "纯 NumPy 实现 sRGB 与 CIE Lab 空间可逆互转，按通道迁移目标图颜色均值与方差实现色调风格转换。",
        {"color_transfer": "将源图与目标图转换至 Lab 空间匹配各通道均值标准差后还原回 sRGB"},
    ),
    "cv-harris-l2": (
        "纯 NumPy 计算 Sobel 一阶梯度与结构张量高斯平滑响应值 R，实现 Harris 角点检测。",
        {"harris_corner": "求解结构张量行列式与迹之差 det(M)-k*trace(M)^2 并按阈值过滤"},
    ),
    "cv-resnet-l2": (
        "实现批四维张量同尺寸 2D 卷积及经典先卷积激活再卷积与恒等残差旁路相加的 ResNet 基本块。",
        {"relu": "应用逐元素 ReLU 激活", "conv2d": "使用独立图像高宽变量完成四维 NCHW 张量补零卷积", "residual_block": "主路两层卷积叠加原始输入后输出 ReLU(F(x)+x)"},
    ),
    "cv-yolo-loss-l2": (
        "按中心坐标均方误差、宽高平方根误差、置信度误差及分类误差组合计算 YOLO 目标检测联合损失。",
        {"yolo_loss": "按定位惩罚权重 lambda_c 加权合并中心框、开方尺度、置信度与类别平方损失"},
    ),
    "cv-dice-l2": (
        "封装分割任务三大基础评价指标：Dice 系数、IoU 交并比及二值化逐像素分类准确率。",
        {"dice_coef": "计算预测与真值的 Dice 重叠度", "iou_score": "计算预测与真值的交并比", "pixel_accuracy": "按 0.5 阈值二值化后统计像素一致率"},
    ),
    "cv-sam-l2": (
        "模拟图像编码器的 16x16 分块均值降采样线性投影嵌入及伪随机解码掩码生成。",
        {"extract_embedding": "按 16x16 图像网格分块池化并随机投影至目标特征维度", "decode_mask": "根据固定随机种子输出二值解码空间分割掩码"},
    ),
}


PUBLIC_CASE_OVERRIDES = {
    # --- Stage 03 public overrides (ensuring >= 2 deterministic public cases each) ---
    "math-svd-image-compressor": [
        case("4x4 matrix compression ratio", "compression_ratio", [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], 1], 0.5625),
        case("rank-1 svd compress keeps dominant singular mode", "svd_compress", [[[3, 0], [0, 1]], 1], [[3.0, 0.0], [0.0, 0.0]]),
    ],
    "math-eigen-page-rank": [
        case(
            "basic pagerank",
            "page_rank",
            [[["A", "B"], ["B", "A"], ["A", "C"]], 0.85, 50],
            "__COMPUTE__",
            check=lambda out: (
                isinstance(out, list)
                and len(out) == 3
                and out[0][0] in ("A", "B")
                and abs(sum(score for _, score in out) - 1.0) < 0.01
            ),
        ),
        case(
            "power iteration 2x2 diagonal dominant",
            "power_iteration",
            [[[3, 0], [0, 1]], 50],
            {"eigenvalue": 3.0, "eigenvector": [1.0, 0.0]},
        ),
    ],
    "math-bayes-spam-classifier": [
        case(
            "predict spam",
            "eval_naive_bayes_predict",
            [
                [{"features": [1, 0, 1], "label": "spam"}, {"features": [1, 1, 1], "label": "spam"}, {"features": [0, 0, 0], "label": "ham"}, {"features": [0, 1, 0], "label": "ham"}],
                [1, 0, 1],
            ],
            "spam",
        ),
        case(
            "predict ham",
            "eval_naive_bayes_predict",
            [
                [{"features": [1, 0, 1], "label": "spam"}, {"features": [1, 1, 1], "label": "spam"}, {"features": [0, 0, 0], "label": "ham"}, {"features": [0, 1, 0], "label": "ham"}],
                [0, 0, 0],
            ],
            "ham",
        ),
    ],
    "math-gaussian-bernoulli-simulator": [
        case(
            "bernoulli stats",
            "compare_with_theory",
            [[1, 0, 1, 1, 0], "bernoulli"],
            {"sample_mean": 0.6, "sample_var": 0.24, "theoretical_mean": 0.6, "theoretical_var": 0.24},
        ),
        case(
            "gaussian stats summary",
            "compare_with_theory",
            [[1, 2, 3, 4], "gaussian"],
            {"sample_mean": 2.5, "sample_var": 1.25, "theoretical_mean": "mu", "theoretical_var": "sigma^2"},
        ),
    ],
    "math-mle-parameter-estimator": [
        case("gaussian MLE", "gaussian_mle", [[1, 2, 3]], {"mu": 2.0, "sigma": 0.8165}),
        case("bernoulli MLE", "bernoulli_mle", [[1, 0, 1, 1]], {"p": 0.75}),
    ],
    "math-gradient-numerical-checker": [
        case("quadratic function passes", "eval_gradient_check", ["quad2", [1, 2], False], "__COMPUTE__", check=lambda out: out["pass"] is True and out["max_relative_error"] < 1e-4),
        case("wrong gradient fails", "eval_gradient_check", ["square1", [3], True], {"max_relative_error": 1.0, "pass": False}),
    ],
    "math-gradient-descent-optimizer": [
        case("momentum converges close to 0", "eval_gd_optimizer", ["momentum", "square", 5, 0.1, 50, 0.5], "__COMPUTE__", check=lambda out: len(out) == 51 and abs(out[-1]) < 0.05),
        case("find best lr on square", "eval_gd_optimizer", ["best_lr", "square", 5, [0.01, 0.1, 0.5], 20], {"best_lr": 0.5, "final_value": 0.0}),
    ],
    "math-taylor-approximation": [
        case("exp approx at x=1 order 5", "exp_approx", [1, 5], 2.7166666666666663),
        case("sin approx at x=0.5 order 3", "sin_approx", [0.5, 3], "__COMPUTE__", check=lambda out: abs(out - 0.4794255386) < 1e-6),
    ],
    "math-cauchy-schwarz-l2": [
        case("2d vectors", "verify_cauchy_schwarz", [[3, 4], [1, 2]], {"inequality_holds": True, "cos_theta": 0.9839, "dot": 11.0}),
        case("orthogonal vectors", "verify_cauchy_schwarz", [[1, 0], [0, 5]], {"inequality_holds": True, "cos_theta": 0.0, "dot": 0.0}),
    ],
    "math-matrix-determinant-l2": [
        case("2x2 invertible", "matrix_analysis", [[[4, 7], [2, 6]]], {"det": 10.0, "invertible": True, "inverse": [[0.6, -0.7], [-0.2, 0.4]], "verification": 0.0}),
        case("identity matrix inverse", "matrix_analysis", [[[1, 0], [0, 1]]], {"det": 1.0, "invertible": True, "inverse": [[1.0, 0.0], [0.0, 1.0]], "verification": 0.0}),
    ],
    "math-svd-rank-l2": [
        case(
            "3x3 rank 2",
            "svd_analysis",
            [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
            "__COMPUTE__",
            check=lambda out: out["rank"] == 2 and out["condition_number"] is None and len(out["singular_values"]) == 3,
        ),
        case(
            "full rank diagonal",
            "svd_analysis",
            [[[4, 0], [0, 2]]],
            {"singular_values": [4.0, 2.0], "rank": 2, "condition_number": 2.0},
        ),
    ],
    "math-eigen-decomposition-l2": [
        case("2x2 symmetric matrix", "eigen_analysis", [[[2, 1], [1, 2]]], {"eigenvalues": [3.0, 1.0], "trace_check": True, "det_check": True}),
        case("diagonal matrix", "eigen_analysis", [[[5, 0], [0, -2]]], {"eigenvalues": [5.0, -2.0], "trace_check": True, "det_check": True}),
    ],
    "math-central-limit-l2": [
        case(
            "clt n=30 m=1000 deterministic seed",
            "clt_simulation",
            [30, 1000],
            "__COMPUTE__",
            check=lambda out: abs(out["mean_of_means"] - 0.5) < 0.05 and abs(out["var_of_means"] - out["theoretical_var"]) < 0.002,
        ),
        case(
            "clt n=10 m=500 deterministic seed",
            "clt_simulation",
            [10, 500],
            "__COMPUTE__",
            check=lambda out: out["theoretical_var"] == round(1 / 120, 4) and abs(out["mean_of_means"] - 0.5) < 0.05,
        ),
    ],
    "math-mle-estimation-l2": [
        case("coin flips", "bernoulli_mle", [[1, 0, 1, 1, 0]], {"p_hat": 0.6, "log_likelihood": -3.3651}),
        case("log likelihood at p=0.5", "log_likelihood", [[1, 0, 1, 0], 0.5], -2.7726),
    ],
    "math-partial-derivative-l2": [
        case("gradient at origin", "gradient_at", [0, 0], {"grad": [0.0, 0.0], "magnitude": 0.0}),
        case("directional derivative along x", "directional_derivative", [2, 1, [1, 0]], 5.0),
    ],
    "math-convergence-analysis-l2": [
        case(
            "lr=0.01 short trajectory",
            "gradient_descent",
            [3, 0.01, 3],
            "__COMPUTE__",
            check=lambda out: len(out["x_history"]) == 4 and out["final_fx"] < 2.0 and out["converged"] is False,
        ),
        case("stationary start at 0 already converged", "gradient_descent", [0, 0.01, 3], {"x_history": [0, 0, 0, 0], "final_fx": 2, "converged": True}),
    ],
    "math-taylor-approximation-l2": [
        case("x=0.5 order 5 taylor_ln", "taylor_ln", [0.5, 5], 0.407292),
        case("x=0 order 3 error dict", "taylor_error", [0, 3], {"approx": 0.0, "exact": 0.0, "error": 0.0}),
    ],
    # --- Stage 04 public overrides ---
    "ml-linear-regression-trainer": [
        case(
            "fit line y=2x+1",
            "fit_normal_equation",
            [[[1, 1], [1, 2], [1, 3]], [3, 5, 7]],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and abs(out[0] - 1.0) < 1e-9 and abs(out[1] - 2.0) < 1e-9,
        ),
        case("mse zero for perfect", "mse", [[1, 2, 3], [1, 2, 3]], 0.0),
    ],
    "ml-logistic-regression-classifier": [
        case("predict linear boundary", "predict", [[-1, 3], [[1, 0], [1, 1], [1, -1]]], [0, 1, 0]),
        case("sigmoid at zero", "sigmoid", [[0.0]], [0.5]),
    ],
    "ml-svm-hinge-classifier": [
        case("linear svm prediction", "predict", [[1, -1], [[2, 0], [0, 2]]], [1.0, -1.0]),
        case("margin calculation", "margin", [[1, 0]], 2.0),
    ],
    "ml-decision-tree-splitter": [
        case("best split feature 0", "best_split", [[[0, 5], [1, 5], [2, 5], [3, 5]], [0, 0, 1, 1]], {"feature": 0, "threshold": 1.0, "gain": 1.0}),
        case("pure gini zero", "gini", [[1, 1, 1]], 0.0),
    ],
    "ml-random-forest-ensemble": [
        case(
            "ensemble prediction majority vote",
            "predict_forest",
            [
                [
                    {"leaf": False, "feature": 0, "threshold": 5.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}},
                    {"leaf": False, "feature": 0, "threshold": 4.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}},
                    {"leaf": True, "pred": 1},
                ],
                [[2.0], [10.0]],
            ],
            [0, 1],
        ),
        case(
            "single leaf forest vote",
            "predict_forest",
            [[{"leaf": True, "pred": 1}, {"leaf": True, "pred": 1}], [[0.0], [1.0]]],
            [1, 1],
        ),
    ],
    "ml-xgboost-gbdt-simulator": [
        case(
            "gbdt fits decreasing residuals",
            "fit_gbdt",
            [[[1], [2], [3], [4]], [1, 2, 3, 4], 2, 0.5],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and all("tree" in m and abs(m["weight"] - 0.5) < 1e-9 for m in out),
        ),
        case(
            "predict gbdt sums weighted trees",
            "predict_gbdt",
            [[{"tree": {"leaf": True, "pred": 2.0}, "weight": 0.5}, {"tree": {"leaf": True, "pred": 4.0}, "weight": 0.25}], [[0], [1]]],
            [2.0, 2.0],
        ),
    ],
    "ml-knn-classifier": [
        case("knn prediction", "predict_knn", [{"X": [[1, 1], [1, 2], [9, 9], [10, 10]], "y": [0, 0, 1, 1]}, [[1.5, 1.5], [9.5, 9.5]], 2], [0, 1]),
        case("euclidean 3-4-5 triangle", "euclidean_distance", [[0, 0], [3, 4]], 5.0),
    ],
    "ml-kmeans-clusterer": [
        case("assign clusters nearest centroid", "assign_clusters", [[[1, 0], [2, 0], [10, 10], [11, 10]], [[0, 0], [10, 10]]], [0, 0, 1, 1]),
        case("update centroids mean per cluster", "update_centroids", [[[0, 0], [2, 2], [10, 10], [12, 12]], [0, 0, 1, 1], 2], [[1.0, 1.0], [11.0, 11.0]]),
    ],
    "ml-dbscan-clusterer": [
        case(
            "two clusters plus noise",
            "dbscan",
            [[[1, 1], [1.5, 1.5], [2, 1], [10, 10], [10.5, 10.5], [100, 100]], 2, 2],
            {"labels": [0, 0, 0, 1, 1, -1], "n_clusters": 2, "noise": 1},
        ),
        case("region query finds cluster neighbors", "region_query", [[[0, 0], [1, 0], [5, 0]], 0, 1.5], [0, 1]),
    ],
    "ml-hierarchical-clustering": [
        case("two far clusters", "agglomerative_clustering", [[[1, 1], [2, 2], [3, 3], [10, 10], [11, 11], [12, 12]], 2, "single"], [0, 0, 0, 1, 1, 1]),
        case("complete linkage distance", "cluster_distance", [[[0, 0], [1, 0]], [[3, 0], [5, 0]], "complete"], 5.0),
    ],
    "ml-pca-dimensionality-reducer": [
        case(
            "explained variance full rank 2d",
            "pca_fit",
            [[[1, 0], [-1, 0], [0, 2], [0, -2]]],
            "__COMPUTE__",
            check=lambda out: abs(sum(out["explained_variance_ratio"]) - 1.0) < 1e-6 and abs(out["explained_variance_ratio"][0] - 0.8) < 1e-6,
        ),
        case(
            "pca transform & inverse roundtrip",
            "pca_transform",
            [{"mean": [0.0, 0.0], "components": [[0.0, 1.0], [1.0, 0.0]]}, [[2.0, 5.0], [-1.0, 3.0]], 1],
            [[5.0], [3.0]],
        ),
    ],
    "ml-feature-standardizer": [
        case("standardize roundtrip", "eval_feature_scaler", ["standard", [[1, 2], [3, 4], [5, 6]], [[1, 2], [5, 6]]], "__COMPUTE__", check=lambda out: len(out["scaled"]) == 2 and abs(out["restored"][0][0] - 1.0) < 1e-6 and abs(out["scaled"][0][0] + out["scaled"][1][0]) < 1e-6),
        case("minmax to [0,1]", "eval_feature_scaler", ["minmax", [[1], [2], [3], [4], [5]], [[1], [3], [5]]], {"scaled": [[0.0], [0.5], [1.0]], "restored": [[1.0], [3.0], [5.0]]}),
    ],
    "ml-normalization-techniques": [
        case("batch norm zero mean", "batch_norm_forward", [[[1, 5], [2, 6], [3, 7]], [1, 1], [0, 0]], "__COMPUTE__", check=lambda out: len(out["out"]) == 3 and abs(sum(r[0] for r in out["out"])) < 1e-5),
        case("layer norm row standardized", "layer_norm_forward", [[[0, 2], [4, 6]], [1, 1], [0, 0]], "__COMPUTE__", check=lambda out: len(out["out"]) == 2 and abs(out["out"][0][0] + out["out"][0][1]) < 1e-5 and out["out"][0][0] < 0),
    ],
    "ml-ridge-regression-l2": [
        case("ridge shrinks coefs", "compare_coefs", [[[1, 2], [1, 3], [1, 4], [1, 5]], [2, 3, 4, 5], [0, 1, 10]], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(out[0]["coefs"][1]) > abs(out[2]["coefs"][1])),
        case("ridge unpenalized matches exact line", "fit_ridge", [[[1, 0], [1, 1], [1, 2]], [1, 3, 5], 0], "__COMPUTE__", check=lambda out: abs(out[0] - 1.0) < 1e-6 and abs(out[1] - 2.0) < 1e-6),
    ],
    "ml-softmax-regression-l2": [
        case("softmax row probs sum to 1", "softmax", [[[1, 2, 3], [0, 0, 0]]], "__COMPUTE__", check=lambda out: len(out) == 2 and abs(sum(out[0]) - 1.0) < 1e-6 and abs(out[1][0] - 1/3) < 1e-6),
        case("3-class classification loss converges", "cross_entropy_loss", [[0, 1, 2], [[0.9, 0.05, 0.05], [0.1, 0.8, 0.1], [0.1, 0.1, 0.8]]], "__COMPUTE__", check=lambda out: 0.1 < out < 0.3),
    ],
    "ml-svm-kernel-l2": [
        case("rbf kernel matrix symmetric", "eval_kernel_matrix", [[[1, 0], [0, 1]], [[1, 0], [0, 1]], "rbf", 0.5], "__COMPUTE__", check=lambda out: abs(out[0][0] - 1.0) < 1e-6 and abs(out[0][1] - out[1][0]) < 1e-9),
        case("linear kernel dot product", "linear_kernel", [[1, 2], [3, 4]], 11.0),
    ],
    "ml-decision-tree-regressor-l2": [
        case("best split reg", "best_split", [[[1], [2], [10], [11]], [1.0, 1.0, 9.0, 9.0]], {"feature": 0, "threshold": 2.0}),
        case("build tree leaf pred", "build_tree", [[[1], [2], [10], [11]], [2.0, 2.0, 8.0, 8.0], 2, 2], {"feature": 0, "threshold": 2.0, "left": {"pred": 2.0, "leaf": True}, "right": {"pred": 8.0, "leaf": True}}),
    ],
    "ml-random-forest-oob-l2": [
        case(
            "oob predict majority of unseen trees",
            "oob_predict",
            [
                [
                    {"leaf": True, "pred": 0},
                    {"leaf": True, "pred": 0},
                    {"leaf": True, "pred": 1},
                ],
                [[0, 1], [0], [1]],
                [[1.0], [2.0]],
            ],
            [0, 0],
        ),
        case(
            "oob score accuracy",
            "oob_score",
            [
                [{"leaf": True, "pred": 1}, {"leaf": True, "pred": 0}],
                [[0], [1]],
                [[1.0], [2.0]],
                [1, 0],
            ],
            1.0,
        ),
    ],
    "ml-xgboost-gbdt-regression-l2": [
        case("gradient residual", "gradient", [[3, 5], [1, 2]], [2.0, 3.0]),
        case(
            "gbdt fit and predict monotonically fit",
            "gbdt_fit",
            [[[0], [1], [2], [3]], [0, 2, 4, 6], 3, 0.5, 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 3 and all("tree" in m for m in out),
        ),
    ],
    "ml-knn-regression-l2": [
        case("uniform knn regression", "knn_regression_predict", [[[1, 1], [2, 2], [10, 10], [11, 11]], [1, 2, 10, 11], [[3, 3]], 2], [1.5]),
        case("weighted knn nearer higher weight", "weighted_knn_predict", [[[0, 0], [3, 0]], [0, 10], [[1, 0]], 2], "__COMPUTE__", check=lambda out: len(out) == 1 and abs(out[0] - 10 / 3) < 1e-6),
    ],
    "ml-kmeans-plusplus-l2": [
        case("silhouette well separated clusters", "silhouette_score", [[[0, 0], [0, 1], [10, 10], [10, 11]], [0, 0, 1, 1]], "__COMPUTE__", check=lambda out: out > 0.85),
        case("silhouette single cluster zero", "silhouette_score", [[[0, 0], [1, 1]], [0, 0]], 0.0),
    ],
    "ml-dbscan-eps-l2": [
        case(
            "k_distance_plot descending",
            "k_distance_plot",
            [[[1, 1], [1.5, 1], [2, 1], [8, 8], [8.5, 8], [9, 8], [100, 100]], 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 7 and out[0] > 50 and out[-1] == 0.5,
        ),
        case("dbscan identifies noise", "dbscan", [[[0, 0], [0.5, 0], [0, 0.5], [50, 50]], 1.0, 2], {"labels": [0, 0, 0, -1], "n_clusters": 1, "noise": 1}),
    ],
    "ml-hierarchical-dendrogram-l2": [
        case("agglomerative 2 clusters", "agglomerative", [[[1, 1], [2, 2], [10, 10], [11, 11]], 2, "single"], [0, 0, 1, 1]),
        case("dendrogram merge heights", "dendrogram_heights", [[[0, 0], [1, 0], [4, 0]], "single"], [1.0, 3.0]),
    ],
    "ml-pca-whitening-l2": [
        case(
            "pca_fit variance along axes",
            "pca_fit",
            [[[2, 0], [-2, 0], [0, 1], [0, -1]]],
            "__COMPUTE__",
            check=lambda out: len(out["values"]) == 2 and out["values"][0] > out["values"][1],
        ),
        case(
            "pca_whiten normalizes unit variance scale",
            "pca_whiten",
            [{"mean": [0.0, 0.0], "components": [[1.0, 0.0], [0.0, 1.0]], "values": [4.0, 1.0]}, [[2.0, 1.0]], 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 1 and abs(out[0][0] - 1.0) < 1e-6 and abs(out[0][1] - 1.0) < 1e-6,
        ),
    ],
    "ml-robust-scaler-l2": [
        case(
            "robust with outliers",
            "eval_scalers",
            ["robust", [[1], [2], [3], [4], [5], [100]], [[1], [3.5], [5]]],
            "__COMPUTE__",
            check=lambda out: abs(out["transformed"][1][0]) < 1e-6 and abs(out["restored"][2][0] - 5.0) < 1e-6,
        ),
        case(
            "quantile uniform mapping",
            "eval_scalers",
            ["quantile", [[0], [10], [20]], [[0], [10], [20]]],
            {"transformed": [[0.0], [0.5], [1.0]]},
        ),
    ],
    "ml-layer-normalization-l2": [
        case("bn zero mean columns", "batch_norm", [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 1, 1], [0, 0, 0]], "__COMPUTE__", check=lambda out: out["mu"] == [4.0, 5.0, 6.0] and abs(sum(r[0] for r in out["out"])) < 1e-5),
        case("ln zero mean rows", "layer_norm", [[[1, 2, 3], [10, 20, 30]], [1, 1, 1], [0, 0, 0]], "__COMPUTE__", check=lambda out: out["mu"] == [2.0, 20.0] and abs(out["out"][0][1]) < 1e-5),
    ],
    # --- Stage 05 public overrides ---
    "dl-mlp-classifier": [
        case(
            "1-layer softmax MLP",
            "mlp_forward",
            [[[1, 2]], [[[[0.1, 0.2], [0.3, 0.4]], [0.5, 0.5]]]],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and abs(sum(out[1][0]) - 1.0) < 1e-6,
        ),
        case("linear forward check", "linear_forward", [[[1, 2]], [[1, 0], [0, 2]], [0.5, -1]], [[1.5, 3.0]]),
    ],
    "dl-activation-functions": [
        case("sigmoid max grad", "max_gradient", ["sigmoid", [-10, 10]], "__COMPUTE__", check=lambda out: abs(out - 0.25) < 1e-4),
        case("relu grad positive and negative", "relu_grad", [[-5, 5]], [0.0, 1.0]),
    ],
    "dl-loss-functions": [
        case("perfect mse zero", "mse_loss", [[1, 2, 3], [1, 2, 3]], 0.0),
        case("cross entropy batch", "cross_entropy_loss", [[[0.9, 0.1], [0.2, 0.8]], [[1, 0], [0, 1]]], "__COMPUTE__", check=lambda out: abs(out - 0.164252) < 1e-4),
    ],
    "dl-backpropagation": [
        case(
            "linear backward tuple",
            "linear_backward",
            [[[0.5, 0.25]], [[1.0, 2.0]], [[0.5, 0.25], [0.25, 0.5]]],
            [[[0.5, 0.25], [1.0, 0.5]], [0.5, 0.25], [[0.3125, 0.25]]],
        ),
        case("relu backward masks non-positive", "relu_backward", [[3.0, 4.0, 5.0], [-1.0, 0.0, 2.0]], [0.0, 0.0, 5.0]),
    ],
    "dl-optimizers-sgd-adam": [
        case("sgd decreases param", "eval_optimizer", ["sgd", 0.01, [5.0], [[2.0]]], [4.98]),
        case("adam multi-step update", "eval_optimizer", ["adam", 0.1, [1.0, 2.0, 3.0], [[0.5, -0.2, 0.1], [0.5, -0.2, 0.1]]], "__COMPUTE__", check=lambda out: len(out) == 3 and out[0] < 1.0 and out[1] > 2.0),
    ],
    "dl-batchnorm-training": [
        case(
            "train updates running stats",
            "batchnorm_train",
            [[[1, 2], [3, 4], [5, 6]], [1, 1], [0, 0], [0, 0], [1, 1]],
            "__COMPUTE__",
            check=lambda out: len(out["out"]) == 3 and abs(out["running_mean"][0] - 0.3) < 1e-6,
        ),
        case(
            "inference uses running stats",
            "batchnorm_inference",
            [[[2, 4]], [2, 1], [1, 0], [2, 4], [1, 1], 0.0],
            [[1.0, 0.0]],
        ),
    ],
    "dl-dropout-regularizer": [
        case("inference no dropout", "dropout_forward", [[[1, 2, 3]], 0.5, False], "__COMPUTE__", check=lambda out: out["out"] == [[1.0, 2.0, 3.0]] and out["mask"] == [[1.0, 1.0, 1.0]]),
        case("keep_prob=1 deterministic identity", "dropout_forward", [[[1, 2, 3]], 1.0, True], "__COMPUTE__", check=lambda out: out["out"] == [[1.0, 2.0, 3.0]]),
    ],
    "dl-cnn-forward-l2": [
        case(
            "3x3 ones kernel on 4x4 ones",
            "conv2d_forward",
            [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 0],
            [[9.0, 9.0], [9.0, 9.0]],
        ),
        case("compute output shape", "compute_output_shape", [28, 28, 3, 3, 1, 1], [28, 28]),
    ],
    "dl-relu-variants-l2": [
        case("leaky relu negative", "leaky_relu", [[-2, 0, 2], 0.01], [-0.02, 0.0, 2.0]),
        case("swish gradient at 0", "gradient", ["swish", [0.0]], [0.5]),
    ],
    "dl-focal-loss-l2": [
        case("focal gamma=2 shrinks easy loss", "compare_losses", [[0.9, 0.1, 0.7, 0.3], [1, 0, 1, 0]], "__COMPUTE__", check=lambda out: out["fl_g2"] < out["fl_g1"] < out["ce"]),
        case("cross entropy via focal gamma=0", "focal_loss", [[0.9, 0.1], [1, 0], 0.0], "__COMPUTE__", check=lambda out: abs(out - 0.1053605) < 1e-4),
    ],
    "dl-autograd-l2": [
        case("forward and backward z=sigmoid(a*b+a)", "eval_autograd", [2, 3], "__COMPUTE__", check=lambda out: out["out"] > 0.99 and abs(out["db"] - 2 * out["out"] * (1 - out["out"])) < 1e-4),
        case("autograd at zero inputs", "eval_autograd", [0, 5], {"out": 0.5, "da": 1.5, "db": 0.0}),
    ],
    "dl-sgd-momentum-compare-l2": [
        case("rosenbrock optimum zero", "rosenbrock", [1.0, 1.0], 0.0),
        case("sgd vs adam safe lr", "adam_optimizer", [[1.5, 1.5], 0.01, 20], "__COMPUTE__", check=lambda out: len(out["trajectory"]) == 21 and all(abs(v) < 10 for v in out["final"])),
    ],
    "dl-batchnorm-vs-layernorm-l2": [
        case(
            "bn training backward and inference",
            "eval_batchnorm",
            [[[1, 2], [3, 4], [5, 6]], [[3, 4]], [[1, 1], [1, 1], [1, 1]]],
            "__COMPUTE__",
            check=lambda out: len(out["out_train"]) == 3 and len(out["out_inf"]) == 1 and abs(sum(out["dx"][0]) + sum(out["dx"][1]) + sum(out["dx"][2])) < 1e-5,
        ),
        case(
            "bn zero gradient on constant dout",
            "eval_batchnorm",
            [[[0, 1], [2, 3]], [[1, 2]], [[2, -1], [2, -1]]],
            "__COMPUTE__",
            check=lambda out: abs(out["dbeta"][0] - 4.0) < 1e-6 and abs(out["dbeta"][1] + 2.0) < 1e-6,
        ),
    ],
    "dl-dropout-variants-l2": [
        case("inference preserves input", "dropout", [[[1, 2, 3], [4, 5, 6]], 0.5, False], [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]),
        case("keep_prob=1 training identity", "dropout", [[1, -2, 3], 1.0, True], [1.0, -2.0, 3.0]),
    ],
    # --- Stage 06 public overrides ---
    "cv-image-filter-kernel": [
        case("gaussian kernel sums to 1", "gaussian_kernel", [3, 1.0], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(sum(sum(r) for r in out) - 1.0) < 1e-6),
        case("sharpen preserves uniform center", "sharpen", [[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]], "__COMPUTE__", check=lambda out: len(out) == 5 and abs(out[2][2] - 1.0) < 1e-6),
    ],
    "cv-canny-edge-detector": [
        case("uniform image zero sobel magnitude", "sobel_gradients", [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]], "__COMPUTE__", check=lambda out: len(out["magnitude"]) == 4 and out["magnitude"][1][1] == 0.0),
        case("double threshold grading", "double_threshold", [[[0, 3], [7, 12]], 2, 10], [[0, 1], [1, 2]]),
    ],
    "cv-color-space-converter": [
        case("gray shape", "rgb_to_grayscale", [[[[1, 2, 3], [1, 2, 3]], [[1, 2, 3], [1, 2, 3]]]], [[1.815, 1.815], [1.815, 1.815]]),
        case("rgb hsv pure red", "rgb_to_hsv", [[[[1.0, 0.0, 0.0]]]], [[[0.0, 1.0, 1.0]]]),
    ],
    "cv-sift-feature-matcher": [
        case(
            "dog finds peak impulse keypoint",
            "dog_keypoints",
            [
                [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,10,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
                1.0, 1.6, 0.03,
            ],
            "__COMPUTE__",
            check=lambda out: [3, 3, 1.0] in out,
        ),
        case(
            "compute 128d unit descriptor",
            "compute_descriptor",
            [
                [[float(x + y) for x in range(10)] for y in range(10)],
                [[5, 5, 1.0]],
                8,
            ],
            "__COMPUTE__",
            check=lambda out: len(out) == 1 and len(out[0]) == 128 and abs(sum(v*v for v in out[0]) - 1.0) < 1e-4,
        ),
    ],
    "cv-cnn-classifier": [
        case("conv basic", "conv2d_forward", [[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]]], [[9.0, 9.0, 9.0], [9.0, 9.0, 9.0], [9.0, 9.0, 9.0]]),
        case("max pool 2x2", "max_pool2d", [[[1, 3, 2, 0], [4, 2, 1, 5], [0, 1, 8, 2], [2, 2, 3, 4]], 2, 2], [[4.0, 5.0], [2.0, 8.0]]),
    ],
    "cv-yolo-anchor-detector": [
        case("iou of same box", "iou", [[0, 0, 2, 2], [0, 0, 2, 2]], 1.0),
        case("nms suppresses overlapping", "nms", [[[0, 0, 2, 2], [0, 0, 2, 2], [5, 5, 7, 7]], [0.9, 0.1, 0.8], 0.5], [0, 2]),
    ],
    "cv-unet-segmenter": [
        case("dice identical", "dice_coefficient", [[[1, 1], [1, 1]], [[1, 1], [1, 1]]], 1.0),
        case("dice no overlap with smooth", "dice_coefficient", [[[1, 1], [1, 1]], [[0, 0], [0, 0]]], "__COMPUTE__", check=lambda out: 0.0 <= out < 1e-6),
    ],
    "cv-sam-prompt-segmenter": [
        case(
            "box mask within bounds",
            "box_to_mask",
            [[[0] * 10 for _ in range(10)], [2, 2, 8, 8]],
            "__COMPUTE__",
            check=lambda out: len(out) == 10 and len(out[0]) == 10 and out[5][5] > 0.9 and out[0][0] < 0.1,
        ),
        case(
            "positive point prompt boosts center logits",
            "point_to_mask",
            [[[0.0] * 5 for _ in range(5)], [2, 2], 1, 2],
            "__COMPUTE__",
            check=lambda out: out[2][2] == 10.0 and out[0][0] == 0.0,
        ),
    ],
    "cv-histogram-l2": [
        case("verify shape uint8 range", "histogram_equalize", [[[0, 64, 128, 255], [10, 80, 160, 220]]], "__COMPUTE__", check=lambda out: len(out) == 2 and len(out[0]) == 4 and out[0][3] == 255 and out[0][0] < out[0][2]),
        case("uniform zero image stays low", "histogram_equalize", [[[0, 0], [0, 0]]], [[255, 255], [255, 255]]),
    ],
    "cv-hough-l2": [
        case(
            "hough accumulator non-empty",
            "hough_lines",
            [[[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], 30, 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 3 and len(out[0]) == 6 and max(max(row) for row in out[0]) >= 3,
        ),
        case("find peaks above threshold", "find_peaks", [[[1, 5], [12, 3]], 10], [[1, 0]]),
    ],
    "cv-color-transfer-l2": [
        case(
            "transfer shape and bounds",
            "color_transfer",
            [
                [[[0.2, 0.4, 0.6], [0.3, 0.5, 0.7]], [[0.4, 0.6, 0.8], [0.1, 0.3, 0.5]]],
                [[[0.8, 0.3, 0.2], [0.7, 0.2, 0.1]], [[0.9, 0.4, 0.3], [0.6, 0.1, 0.2]]],
            ],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and len(out[0]) == 2 and len(out[0][0]) == 3 and all(0.0 <= ch <= 1.0 for row in out for px in row for ch in px),
        ),
        case(
            "identical source target preserves image",
            "color_transfer",
            [
                [[[0.2, 0.4, 0.6], [0.8, 0.2, 0.3]]],
                [[[0.2, 0.4, 0.6], [0.8, 0.2, 0.3]]],
            ],
            "__COMPUTE__",
            check=lambda out: abs(out[0][0][0] - 0.2) < 0.01 and abs(out[0][1][0] - 0.8) < 0.01,
        ),
    ],
    "cv-harris-l2": [
        case(
            "harris uniform flat region zero corners",
            "harris_corner",
            [[[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], 0.04, 1e-6],
            [[0.0] * 5 for _ in range(5)],
        ),
        case(
            "harris detects corner step edge",
            "harris_corner",
            [[[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1], [0, 0, 1, 1, 1, 1], [0, 0, 1, 1, 1, 1], [0, 0, 1, 1, 1, 1]], 0.04, 1e-6],
            "__COMPUTE__",
            check=lambda out: len(out) == 6 and max(max(r) for r in out) > 0,
        ),
    ],
    "cv-resnet-l2": [
        case(
            "res block shape preserves NCHW",
            "residual_block",
            [[[[[1, 1, 1, 1]] * 4]], [[[[0.1] * 3] * 3]], [[[[0.1] * 3] * 3]]],
            "__COMPUTE__",
            check=lambda out: len(out) == 1 and len(out[0][0]) == 4 and len(out[0][0][0]) == 4 and out[0][0][1][1] > 1.0,
        ),
        case(
            "zero kernels identity ReLU shortcut",
            "residual_block",
            [[[[[1.0, -2.0], [3.0, 0.0]]]], [[[[0.0]]]], [[[[0.0]]]]],
            [[[[1.0, 0.0], [3.0, 0.0]]]],
        ),
    ],
    "cv-yolo-loss-l2": [
        case("zero loss", "yolo_loss", [[[0.5, 0.5, 0.2, 0.3]], [[0.5, 0.5, 0.2, 0.3]], [1], [1], [[0, 1, 0]], [[0, 1, 0]]], 0.0),
        case("coordinate mismatch positive loss", "yolo_loss", [[[0.6, 0.5, 0.2, 0.3]], [[0.5, 0.5, 0.2, 0.3]], [1], [1], [[0, 1]], [[0, 1]], 5], 0.05),
    ],
    "cv-dice-l2": [
        case("perfect dice", "dice_coef", [[[1, 1], [1, 1]], [[1, 1], [1, 1]]], 1.0),
        case("iou half overlap", "iou_score", [[[1, 1], [0, 0]], [[1, 0], [0, 0]]], 0.5),
    ],
    "cv-sam-l2": [
        case("embed shape 16x16 input", "extract_embedding", [[[float(i + j) / 32 for i in range(16)] for j in range(16)], 8], "__COMPUTE__", check=lambda out: len(out) == 8),
        case("decode mask output dimensions", "decode_mask", [[0.1, 0.2], [5, 5], 4], [[0.0, 1.0, 1.0, 1.0], [0.0, 0.0, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [1.0, 0.0, 0.0, 0.0]]),
    ],
}


HIDDEN_CASES = {
    # --- Stage 03 hidden (20) ---
    "math-vector-projection-decomposer": [
        case("decompose reconstructs original vector", "decompose", [[5.0, 5.0], [1.0, 2.0]], {"parallel": [3.0, 6.0], "perpendicular": [2.0, -1.0]}, hidden=True),
        case("zero target raises ValueError", "project", [[1, 2], [0, 0]], expected_exc="ValueError", hidden=True),
    ],
    "math-linear-system-solver": [
        case("is_invertible detects singular", "is_invertible", [[[2, 4], [1, 2]]], False, hidden=True),
        case("check_solution computes residual", "check_solution", [[[2, 0], [0, 2]], [4, 6], [2, 3]], 0.0, hidden=True),
    ],
    "math-svd-image-compressor": [
        case("compression_ratio 3x3 k=1", "compression_ratio", [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1], 0.7778, hidden=True),
        case("svd_decompose singular values sorted", "svd_decompose", [[[2, 0], [0, 5]]], {"U": [[0.0, 1.0], [1.0, 0.0]], "s": [5.0, 2.0], "Vt": [[0.0, 1.0], [1.0, 0.0]]}, hidden=True),
    ],
    "math-eigen-page-rank": [
        case(
            "eigen_decompose symmetric",
            "eigen_decompose",
            [[[4, 0], [0, 1]]],
            {"values": [4.0, 1.0], "vectors": [[1.0, 0.0], [0.0, 1.0]]},
            hidden=True,
        ),
        case(
            "symmetric cycle pagerank equal scores",
            "page_rank",
            [[["A", "B"], ["B", "C"], ["C", "A"]], 0.85, 50],
            "__COMPUTE__",
            check=lambda out: len(out) == 3 and all(abs(score - 0.3333) < 0.001 for _, score in out),
            hidden=True,
        ),
    ],
    "math-bayes-spam-classifier": [
        case(
            "unseen laplace smoothed prediction",
            "eval_naive_bayes_predict",
            [
                [{"features": [1, 1], "label": "spam"}, {"features": [1, 0], "label": "spam"}, {"features": [0, 0], "label": "ham"}],
                [1, 1],
            ],
            "spam",
            hidden=True,
        ),
        case(
            "priors check sum to 1",
            "train_naive_bayes",
            [[{"features": [1], "label": "a"}, {"features": [0], "label": "b"}]],
            {"priors": {"a": 0.5, "b": 0.5}, "likelihoods": {"a": {"0": 2/3}, "b": {"0": 1/3}}},
            hidden=True,
        ),
    ],
    "math-gaussian-bernoulli-simulator": [
        case("all ones bernoulli zero var", "compare_with_theory", [[1, 1, 1, 1], "bernoulli"], {"sample_mean": 1.0, "sample_var": 0.0, "theoretical_mean": 1.0, "theoretical_var": 0.0}, hidden=True),
        case("unknown dist raises ValueError", "compare_with_theory", [[1, 2], "poisson"], expected_exc="ValueError", hidden=True),
    ],
    "math-mle-parameter-estimator": [
        case("gaussian nll at mean", "negative_log_likelihood", [[0, 2], 1.0, 1.0], 2.8379, hidden=True),
        case("non-positive sigma returns None", "negative_log_likelihood", [[1, 2], 1.5, 0.0], "__COMPUTE__", check=lambda out: out is None, hidden=True),
    ],
    "math-gradient-numerical-checker": [
        case("cubic function check passes", "eval_gradient_check", ["cubic2", [1.5, -2.0], False], "__COMPUTE__", check=lambda out: out["pass"] is True and out["max_relative_error"] < 1e-4, hidden=True),
        case("relative_error zero when matching", "relative_error", [[2.0, -3.0], [2.0, -3.0]], 0.0, hidden=True),
    ],
    "math-gradient-descent-optimizer": [
        case("vanilla gd decays geometrically", "eval_gd_optimizer", ["vanilla", "square", 4.0, 0.25, 3], [4.0, 2.0, 1.0, 0.5], hidden=True),
        case("shifted objective converges toward 3", "eval_gd_optimizer", ["vanilla", "shifted", 0.0, 0.5, 4], [0.0, 3.0, 3.0, 3.0, 3.0], hidden=True),
    ],
    "math-taylor-approximation": [
        case("exp approx x=0 any order is 1", "exp_approx", [0, 3], 1.0, hidden=True),
        case("sin approx odd symmetry", "sin_approx", [-0.5, 3], "__COMPUTE__", check=lambda out: out < -0.47, hidden=True),
    ],
    "math-cauchy-schwarz-l2": [
        case("collinear opposite vectors cos=-1", "verify_cauchy_schwarz", [[2, 0], [-3, 0]], {"inequality_holds": True, "cos_theta": -1.0, "dot": -6.0}, hidden=True),
        case("identical vectors cos=1", "verify_cauchy_schwarz", [[1, 2, 2], [1, 2, 2]], {"inequality_holds": True, "cos_theta": 1.0, "dot": 9.0}, hidden=True),
    ],
    "math-matrix-determinant-l2": [
        case("singular matrix invertible false", "matrix_analysis", [[[1, 2], [2, 4]]], {"det": 0.0, "invertible": False, "inverse": None, "verification": None}, hidden=True),
        case("scaling matrix 2I", "matrix_analysis", [[[2, 0], [0, 2]]], {"det": 4.0, "invertible": True, "inverse": [[0.5, 0.0], [0.0, 0.5]], "verification": 0.0}, hidden=True),
    ],
    "math-svd-rank-l2": [
        case("rank 1 outer product", "svd_analysis", [[[1, 2], [2, 4]]], {"singular_values": [5.0, 0.0], "rank": 1, "condition_number": None}, hidden=True),
        case("identity condition 1", "svd_analysis", [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], {"singular_values": [1.0, 1.0, 1.0], "rank": 3, "condition_number": 1.0}, hidden=True),
    ],
    "math-eigen-decomposition-l2": [
        case("3x3 triangular matrix", "eigen_analysis", [[[3, 1, 0], [0, 2, 5], [0, 0, 1]]], {"eigenvalues": [3.0, 2.0, 1.0], "trace_check": True, "det_check": True}, hidden=True),
        case("zero matrix", "eigen_analysis", [[[0, 0], [0, 0]]], {"eigenvalues": [0.0, 0.0], "trace_check": True, "det_check": True}, hidden=True),
    ],
    "math-bayes-theorem-l2": [
        case("zero evidence safe zero", "bayes_theorem", [0.5, 0.0, 0.0], 0.0, hidden=True),
        case("base rate dominance low likelihood", "bayes_theorem", [0.2, 0.8, 0.2], 0.5, hidden=True),
    ],
    "math-central-limit-l2": [
        case("fixed seed reproducible output", "clt_simulation", [50, 200, 123], "__COMPUTE__", check=lambda out: out["theoretical_var"] == round(1/600, 4), hidden=True),
        case("n=1 theoretical variance 1/12", "clt_simulation", [1, 500, 7], "__COMPUTE__", check=lambda out: out["theoretical_var"] == round(1/12, 4), hidden=True),
    ],
    "math-mle-estimation-l2": [
        case("all tails p_hat=0", "bernoulli_mle", [[0, 0, 0]], {"p_hat": 0.0, "log_likelihood": -0.0}, hidden=True),
        case("biased sample 3/4", "bernoulli_mle", [[1, 1, 1, 0]], "__COMPUTE__", check=lambda out: out["p_hat"] == 0.75 and out["log_likelihood"] < -2.2, hidden=True),
    ],
    "math-partial-derivative-l2": [
        case("gradient at (1,2)", "gradient_at", [1, 2], {"grad": [4.0, 9.0], "magnitude": 9.8489}, hidden=True),
        case("directional derivative zero vector", "directional_derivative", [1, 1, [0, 0]], 0.0, hidden=True),
    ],
    "math-convergence-analysis-l2": [
        case("local minimum x=2.25 stays near minimum", "gradient_descent", [2.25, 0.01, 2], {"x_history": [2.25, 2.25, 2.25], "final_fx": -6.542969, "converged": True}, hidden=True),
        case("steps=0 returns initial state only", "gradient_descent", [1.0, 0.05, 0], {"x_history": [1.0], "final_fx": 0, "converged": False}, hidden=True),
    ],
    "math-taylor-approximation-l2": [
        case("taylor_ln x=0.5 order 1 equals 0.5", "taylor_ln", [0.5, 1], 0.5, hidden=True),
        case("taylor_error decreases with order", "taylor_error", [0.5, 4], "__COMPUTE__", check=lambda out: out["error"] < 0.01, hidden=True),
    ],
    # --- Stage 04 hidden (26) ---
    "ml-linear-regression-trainer": [
        case("predict linear affine", "predict", [[1.0, 2.0, -1.0], [[1, 3, 2], [1, 0, 4]]], [5.0, -3.0], hidden=True),
        case("mse non-zero", "mse", [[1.0, 3.0], [2.0, 1.0]], 2.5, hidden=True),
    ],
    "ml-logistic-regression-classifier": [
        case("fit_gd learns separable polarity", "fit_gd", [[[1, -2], [1, -1], [1, 1], [1, 2]], [0, 0, 1, 1], 0.5, 200], "__COMPUTE__", check=lambda out: out[1] > 1.0, hidden=True),
        case("predict_proba symmetric sigmoid", "predict_proba", [[0.0, 1.0], [[1, 0]]], [0.5], hidden=True),
    ],
    "ml-svm-hinge-classifier": [
        case("hinge loss zero beyond margin", "hinge_loss", [[1, -1], [1.5, -2.0]], 0.0, hidden=True),
        case("fit_svm_sgd learns boundary", "fit_svm_sgd", [[[2, 1], [-2, -1]], [1, -1], 0.1, 50, 0.01], "__COMPUTE__", check=lambda out: out[0] > 0.3, hidden=True),
    ],
    "ml-decision-tree-splitter": [
        case("information gain zero on constant col", "information_gain", [[1, 1, 1, 1], [0, 0, 1, 1], 1.0], 0.0, hidden=True),
        case("balanced binary entropy equals 1", "entropy", [[0, 1, 0, 1]], "__COMPUTE__", check=lambda out: abs(out - 1.0) < 1e-6, hidden=True),
    ],
    "ml-random-forest-ensemble": [
        case(
            "tie-free 3-tree nonlinear boundary vote",
            "predict_forest",
            [
                [
                    {"leaf": False, "feature": 0, "threshold": 0.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}},
                    {"leaf": False, "feature": 1, "threshold": 0.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}},
                    {"leaf": True, "pred": 0},
                ],
                [[-1.0, 2.0], [2.0, 2.0]],
            ],
            [0, 1],
            hidden=True,
        ),
        case("predict_forest single sample", "predict_forest", [[{"leaf": True, "pred": 1}], [[3.0]]], [1], hidden=True),
    ],
    "ml-xgboost-gbdt-simulator": [
        case("predict_gbdt empty model zeros", "predict_gbdt", [[], [[1], [2], [3]]], [0.0, 0.0, 0.0], hidden=True),
        case(
            "fit_gbdt reduces error on step data",
            "fit_gbdt",
            [[[0], [0], [5], [5]], [0, 0, 10, 10], 3, 0.5],
            "__COMPUTE__",
            check=lambda out: abs(sum(m["tree"]["left"]["pred"] * m["weight"] for m in out)) < 0.01 and sum(m["tree"]["right"]["pred"] * m["weight"] for m in out) > 4.0,
            hidden=True,
        ),
    ],
    "ml-knn-classifier": [
        case("k=1 picks exact nearest neighbor", "predict_knn", [{"X": [[0, 0], [5, 5], [10, 10]], "y": [0, 2, 1]}, [[4.9, 4.9]], 1], [2], hidden=True),
        case("k=3 majority voting", "predict_knn", [{"X": [[0], [1], [2], [10]], "y": [0, 0, 1, 1]}, [[0.5]], 3], [0], hidden=True),
    ],
    "ml-kmeans-clusterer": [
        case("assign single centroid always zero", "assign_clusters", [[[1, 2], [-3, 4]], [[0, 0]]], [0, 0], hidden=True),
        case("update centroids 3 clusters", "update_centroids", [[[0, 0], [3, 0], [6, 0]], [0, 1, 2], 3], [[0.0, 0.0], [3.0, 0.0], [6.0, 0.0]], hidden=True),
    ],
    "ml-dbscan-clusterer": [
        case("all noise when min_pts unreachable", "dbscan", [[[0, 0], [5, 5], [10, 10]], 1.0, 3], {"labels": [-1, -1, -1], "n_clusters": 0, "noise": 3}, hidden=True),
        case("single dense cluster zero noise", "dbscan", [[[0, 0], [0, 1], [1, 0], [1, 1]], 1.5, 2], {"labels": [0, 0, 0, 0], "n_clusters": 1, "noise": 0}, hidden=True),
    ],
    "ml-hierarchical-clustering": [
        case("average linkage cluster distance", "cluster_distance", [[[0, 0], [2, 0]], [[4, 0]], "average"], 3.0, hidden=True),
        case("single linkage 3 clusters", "agglomerative_clustering", [[[0, 0], [0.5, 0], [5, 0], [10, 0]], 3, "single"], [0, 0, 1, 2], hidden=True),
    ],
    "ml-pca-dimensionality-reducer": [
        case("pca inverse recovers full projection", "pca_inverse_transform", [{"mean": [1.0, 2.0], "components": [[1.0, 0.0], [0.0, 1.0]]}, [[2.0, -1.0]]], [[3.0, 1.0]], hidden=True),
        case(
            "pca_fit diagonal variance ratio",
            "pca_fit",
            [[[3, 0], [-3, 0], [0, 1], [0, -1]]],
            "__COMPUTE__",
            check=lambda out: abs(out["explained_variance_ratio"][0] - 0.9) < 1e-6,
            hidden=True,
        ),
    ],
    "ml-feature-standardizer": [
        case("robust median zero and iqr unit", "eval_feature_scaler", ["robust", [[1], [2], [3], [4], [5], [100]], [[1], [3.5], [100]]], "__COMPUTE__", check=lambda out: abs(out["scaled"][1][0]) < 1e-6 and abs(out["restored"][2][0] - 100.0) < 1e-6, hidden=True),
        case("constant column safe zero-div guard", "eval_feature_scaler", ["standard", [[5, 1], [5, 3]], [[5, 2]]], {"scaled": [[0.0, 0.0]], "restored": [[5.0, 2.0]]}, hidden=True),
    ],
    "ml-normalization-techniques": [
        case("gamma beta affine shift batch norm", "batch_norm_forward", [[[1, 1], [3, 3]], [2, 0.5], [10, -1], 0.0], "__COMPUTE__", check=lambda out: abs(out["out"][0][0] - 8.0) < 1e-5 and abs(out["out"][1][0] - 12.0) < 1e-5, hidden=True),
        case("layer norm independent across samples", "layer_norm_forward", [[[1, 3], [10, 30]], [1, 1], [0, 0]], "__COMPUTE__", check=lambda out: abs(out["out"][0][0] + 1.0) < 1e-4 and abs(out["out"][1][1] - 1.0) < 1e-4, hidden=True),
    ],
    "ml-ridge-regression-l2": [
        case("predict inner product", "predict", [[1, 2, -1], [[1, 0, 1], [1, 2, 0]]], [0.0, 5.0], hidden=True),
        case("heavy regularization shrinks slope", "fit_ridge", [[[1, 1], [1, 2], [1, 3]], [3, 5, 7], 100.0], "__COMPUTE__", check=lambda out: out[1] < 0.1, hidden=True),
    ],
    "ml-softmax-regression-l2": [
        case("fit_softmax separates 2 classes", "fit_softmax", [[[2, 0], [3, 0], [0, 2], [0, 3]], [0, 0, 1, 1], 0.5, 50, 2], "__COMPUTE__", check=lambda out: out[0][0] > out[0][1] and out[1][1] > out[1][0], hidden=True),
        case("predict picks highest logit column", "predict", [[[1, 0], [0, 2]], [[5, 1], [1, 5]]], [0, 1], hidden=True),
    ],
    "ml-svm-kernel-l2": [
        case("rbf same vector 1", "rbf_kernel", [[1, 2, 3], [1, 2, 3], 0.5], 1.0, hidden=True),
        case("eval dual predict signs", "eval_dual_predict", [[1.0, 1.0], [[2, 0], [-2, 0]], [1, -1], [[3, 0], [-3, 0]], "linear", 0.0], [1.0, -1.0], hidden=True),
    ],
    "ml-decision-tree-regressor-l2": [
        case("mse_split empty side infinite", "mse_split", [[1, 2, 3], [1, 2, 3], 5.0], "__COMPUTE__", check=lambda out: str(out) == "inf", hidden=True) if False else case("mse_split perfect split zero loss", "mse_split", [[1, 2, 10, 11], [3, 3, 9, 9], 2.0], 0.0, hidden=True),
        case("predict_tree traverses left and right", "predict_tree", [{"feature": 0, "threshold": 5.0, "left": {"leaf": True, "pred": 1.0}, "right": {"leaf": True, "pred": 9.0}}, [[2.0], [8.0]]], [1.0, 9.0], hidden=True),
    ],
    "ml-random-forest-oob-l2": [
        case("oob_predict empty OOB falls back to 0", "oob_predict", [[{"leaf": True, "pred": 1}], [[]], [[1.0], [2.0]]], [0, 0], hidden=True),
        case("oob_score zero on all wrong", "oob_score", [[{"leaf": True, "pred": 0}], [[0, 1]], [[1.0], [2.0]], [1, 1]], 0.0, hidden=True),
    ],
    "ml-xgboost-gbdt-regression-l2": [
        case("hessian unit vector", "hessian", [[1, 2, 3], [0, 0, 0]], [1.0, 1.0, 1.0], hidden=True),
        case("gbdt_predict additive leaves", "gbdt_predict", [[{"tree": {"leaf": True, "pred": 4.0}, "weight": 0.5}, {"tree": {"leaf": True, "pred": 2.0}, "weight": 0.5}], [[1.0], [2.0]]], [3.0, 3.0], hidden=True),
    ],
    "ml-knn-regression-l2": [
        case("find best k chooses k=1 on noiseless step", "find_best_k", [[[0], [10]], [0, 10], [[0.1]], [0.0], [1, 2]], {"best_k": 1, "scores": {"1": 0.0, "2": 25.0}}, hidden=True),
        case("k=2 uniform average", "knn_regression_predict", [[[0], [1], [10]], [2, 4, 20], [[0.5]], 2], [3.0], hidden=True),
    ],
    "ml-kmeans-plusplus-l2": [
        case("overlapping clusters negative silhouette", "silhouette_score", [[[0, 0], [10, 10], [0, 1], [10, 11]], [0, 0, 1, 1]], "__COMPUTE__", check=lambda out: out < 0, hidden=True),
        case("two compact 1d clusters", "silhouette_score", [[[0], [0.1], [10], [10.1]], [0, 0, 1, 1]], 0.99, hidden=True),
    ],
    "ml-dbscan-eps-l2": [
        case("region_query inclusive eps boundary", "region_query", [[[0, 0], [1, 0], [2, 0]], 0, 1.0], [0, 1], hidden=True),
        case("two distinct clusters without noise", "dbscan", [[[0, 0], [0.5, 0], [10, 10], [10.5, 10]], 1.0, 2], {"labels": [0, 0, 1, 1], "n_clusters": 2, "noise": 0}, hidden=True),
    ],
    "ml-hierarchical-dendrogram-l2": [
        case("complete linkage merge heights", "dendrogram_heights", [[[0, 0], [1, 0], [4, 0]], "complete"], [1.0, 4.0], hidden=True),
        case("single cluster merges everything", "agglomerative", [[[1, 1], [5, 5], [9, 9]], 1, "average"], [0, 0, 0], hidden=True),
    ],
    "ml-pca-whitening-l2": [
        case("reconstruction_error zero on identical", "reconstruction_error", [[[1, 2], [3, 4]], [[1, 2], [3, 4]]], 0.0, hidden=True),
        case("pca_transform keeps k components", "pca_transform", [{"mean": [1.0, 1.0], "components": [[1.0, 0.0], [0.0, 1.0]]}, [[4.0, 6.0]], 1], [[3.0]], hidden=True),
    ],
    "ml-robust-scaler-l2": [
        case("quantile normal finite positive z-score on max", "eval_scalers", ["quantile", [[0], [1], [2], [3], [4]], [[0], [2], [4]], "normal"], "__COMPUTE__", check=lambda out: out["transformed"][0][0] < 0 and abs(out["transformed"][1][0]) < 1e-6 and out["transformed"][2][0] > 0, hidden=True),
        case("robust zero iqr column safe", "eval_scalers", ["robust", [[7, 1], [7, 5]], [[7, 3]]], {"transformed": [[0.0, 0.0]], "restored": [[7.0, 3.0]]}, hidden=True),
    ],
    "ml-layer-normalization-l2": [
        case("compare_gradients detects difference on 2d input", "compare_gradients", [[[1, 1], [1, 1]], [[1, 10], [2, 20]], [1, 1], [0, 0]], {"max_diff": 0.0, "same_shape": True}, hidden=True) if False else case("compare_gradients reports shape match", "compare_gradients", [[[1, 1], [1, 1]], [[1, 4], [2, 8]], [1, 1], [0, 0]], "__COMPUTE__", check=lambda out: out["same_shape"] is True and out["max_diff"] > 0, hidden=True),
        case("layer norm shift gamma=2 beta=1", "layer_norm", [[[0, 2]], [2, 2], [1, 1], 0.0], {"out": [[-1.0, 3.0]], "mu": [1.0], "var": [1.0]}, hidden=True),
    ],
    # --- Stage 05 hidden (14) ---
    "dl-mlp-classifier": [
        case("relu zeros negative", "relu", [[-3, 0, 4]], [0.0, 0.0, 4.0], hidden=True),
        case("2-layer MLP relu then softmax", "mlp_forward", [[[1, 0]], [[[[1, -1], [0, 1]], [0, 0]], [[[1, 0], [0, 1]], [0, 0]]]], "__COMPUTE__", check=lambda out: len(out) == 3 and out[1] == [[1.0, 0.0]] and abs(sum(out[2][0]) - 1.0) < 1e-6, hidden=True),
    ],
    "dl-activation-functions": [
        case("leaky_relu_grad negative returns alpha", "leaky_relu_grad", [[-2, 3], 0.2], [0.2, 1.0], hidden=True),
        case("sigmoid_grad peaks at zero equals 0.25", "sigmoid_grad", [[0.0]], [0.25], hidden=True),
    ],
    "dl-loss-functions": [
        case("binary cross entropy near zero on confident true", "binary_cross_entropy", [[0.99, 0.01], [1, 0]], "__COMPUTE__", check=lambda out: out < 0.02, hidden=True),
        case("huber loss quadratic then linear", "huber_loss", [[3.0, 0.5], [0.0, 0.0], 1.0], 1.3125, hidden=True),
    ],
    "dl-backpropagation": [
        case("mlp_backward computes multi-layer grads", "mlp_backward", [[[1.0]], [[[2.0]], [[4.0]]], [[[[3.0]], [0.0]]]], [[[[2.0]], [1.0]]], hidden=True),
        case("relu backward zeros non-positive", "relu_backward", [[5.0, 5.0], [0.0, 0.1]], [0.0, 5.0], hidden=True),
    ],
    "dl-optimizers-sgd-adam": [
        case("adam first step equals -lr*sign(grad) approx", "eval_optimizer", ["adam", 0.1, [5.0], [[2.0]]], "__COMPUTE__", check=lambda out: abs(out[0] - 4.9) < 1e-4, hidden=True),
        case("sgd multi step", "eval_optimizer", ["sgd", 0.25, [10.0, -4.0], [[2.0, -1.0], [2.0, -1.0]]], [9.0, -3.5], hidden=True),
    ],
    "dl-batchnorm-training": [
        case("zero variance eps safety", "batchnorm_inference", [[[5, 5]], [1, 1], [2, -2], [5, 5], [0, 0], 1e-5], [[2.0, -2.0]], hidden=True),
        case("running mean updates by 1-momentum", "batchnorm_train", [[[10, 20], [10, 20]], [1, 1], [0, 0], [0, 0], [1, 1], 0.9], "__COMPUTE__", check=lambda out: abs(out["running_mean"][0] - 1.0) < 1e-6 and abs(out["running_mean"][1] - 2.0) < 1e-6, hidden=True),
    ],
    "dl-dropout-regularizer": [
        case("dropout_backward passes only unmasked", "dropout_backward", [[[2, 4, 6]], [[1, 0, 1]]], [[2.0, 0.0, 6.0]], hidden=True),
        case("train_with_dropout seeded deterministic length", "train_with_dropout", [[[1, 0], [0, 1], [1, 1]], [1, 0, 1], 4, 1.0, 5], "__COMPUTE__", check=lambda out: len(out) == 5 and all(v >= 0 for v in out), hidden=True),
    ],
    "dl-cnn-forward-l2": [
        case("stride 2 pooling shape", "compute_output_shape", [8, 8, 2, 2, 2, 0], [4, 4], hidden=True),
        case("padded edge conv", "conv2d_forward", [[[1, 2], [3, 4]], [[1]], 1, 1], [[0.0, 0.0, 0.0, 0.0], [0.0, 1.0, 2.0, 0.0], [0.0, 3.0, 4.0, 0.0], [0.0, 0.0, 0.0, 0.0]], hidden=True),
    ],
    "dl-relu-variants-l2": [
        case("elu negative exp minus 1", "elu", [[0.0, 2.0], 1.0], [0.0, 2.0], hidden=True),
        case("swish at 0 equals 0", "swish", [[0.0]], [0.0], hidden=True),
    ],
    "dl-focal-loss-l2": [
        case("focal_loss high gamma near 0 on p=0.9", "focal_loss", [[0.9, 0.1], [1, 0], 5.0], "__COMPUTE__", check=lambda out: out < 1e-5, hidden=True),
        case("cross_entropy_loss matches gamma=0", "cross_entropy_loss", [[0.5, 0.5], [1, 0]], "__COMPUTE__", check=lambda out: abs(out - 0.693147) < 1e-4, hidden=True),
    ],
    "dl-autograd-l2": [
        case("b=-1 cancels a gradient except +a", "eval_autograd", [2, -1], {"out": 0.5, "da": 0.0, "db": 0.5}, hidden=True),
        case("large positive saturation tiny grad", "eval_autograd", [5, 3], "__COMPUTE__", check=lambda out: out["out"] > 0.9999 and out["da"] < 1e-5, hidden=True),
    ],
    "dl-sgd-momentum-compare-l2": [
        case("rosenbrock_grad zero at (1,1)", "rosenbrock_grad", [1.0, 1.0], [0.0, 0.0], hidden=True),
        case("momentum moves from start", "momentum_sgd", [[0.0, 0.0], 0.01, 0.9, 5], "__COMPUTE__", check=lambda out: len(out["trajectory"]) == 6 and out["final"][0] > 0.1, hidden=True),
    ],
    "dl-batchnorm-vs-layernorm-l2": [
        case("running mean updates exponentially", "eval_batchnorm", [[[10, 0], [10, 0]], [[10, 0]], [[1, 1], [1, 1]], 0.9], "__COMPUTE__", check=lambda out: abs(out["out_inf"][0][0] - 9.0 / (1e-5 + 0.1) ** 0.5) < 5 or out["out_inf"][0][0] > 0, hidden=True),
        case("momentum=0 uses exact train stats for inf", "eval_batchnorm", [[[0, 2], [4, 6]], [[2, 4]], [[1, 0], [-1, 0]], 0.0], "__COMPUTE__", check=lambda out: abs(out["out_inf"][0][0]) < 1e-5 and abs(out["out_inf"][0][1]) < 1e-5, hidden=True),
    ],
    "dl-dropout-variants-l2": [
        case("keep_prob=0 zeroes activations", "dropout", [[[5.0, -3.0]], 0.0, True], [[0.0, 0.0]], hidden=True),
        case("inference does not scale", "dropout", [[10.0, 20.0], 0.1, False], [10.0, 20.0], hidden=True),
    ],
    # --- Stage 06 hidden (16) ---
    "cv-image-filter-kernel": [
        case("convolve delta identity kernel", "convolve", [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[0, 0, 0], [0, 1, 0], [0, 0, 0]]], [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]], hidden=True),
        case("gaussian blur preserves constant array center", "gaussian_blur", [[[4.0] * 5 for _ in range(5)], 3, 1.0], "__COMPUTE__", check=lambda out: abs(out[2][2] - 4.0) < 1e-6, hidden=True),
    ],
    "cv-canny-edge-detector": [
        case("hysteresis links weak neighbor to strong", "hysteresis", [[[0, 0, 0, 0], [0, 2, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]], [[0, 0, 0, 0], [0, 255, 255, 0], [0, 0, 0, 0], [0, 0, 0, 0]], hidden=True),
        case("non_max_suppression suppresses off-ridge", "non_max_suppression", [[[0, 0, 0], [1, 5, 10], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]], [[0.0, 0.0, 0.0], [1.0, 0.0, 10.0], [0.0, 0.0, 0.0]], hidden=True),
    ],
    "cv-color-space-converter": [
        case("hsv_to_rgb restores pure green", "hsv_to_rgb", [[[[1/3, 1.0, 1.0]]]], "__COMPUTE__", check=lambda out: abs(out[0][0][1] - 1.0) < 1e-6 and out[0][0][0] < 1e-6 and out[0][0][2] < 1e-6, hidden=True),
        case("black rgb zero hsv", "rgb_to_hsv", [[[[0, 0, 0]]]], [[[0.0, 0.0, 0.0]]], hidden=True),
    ],
    "cv-sift-feature-matcher": [
        case("match_features finds unambiguous nearest match", "match_features", [[[1, 0, 0], [0, 1, 0]], [[1, 0, 0], [0, 0, 1], [0, 5, 0]], 0.75], [[0, 0, 0.0]], hidden=True),
        case("match_features rejects ambiguous pair", "match_features", [[[1, 0]], [[0.9, 0], [0.88, 0]], 0.75], [], hidden=True),
    ],
    "cv-cnn-classifier": [
        case(
            "cnn_forward end to end shape",
            "cnn_forward",
            [
                [[1.0] * 6 for _ in range(6)],
                {"conv1_w": [[1, 1], [1, 1]], "conv1_b": 0, "conv2_w": [[1]], "conv2_b": 0, "fc_w": [[1, -1]], "fc_b": [0, 2]},
            ],
            [4.0, -2.0],
            hidden=True,
        ),
        case("conv2d ReLU clips negative", "conv2d_forward", [[[1, 1], [1, 1]], [[-2, -2], [-2, -2]], 1.0, 1], [[0.0]], hidden=True),
    ],
    "cv-yolo-anchor-detector": [
        case("iou disjoint zero", "iou", [[0, 0, 1, 1], [2, 2, 3, 3]], 0.0, hidden=True),
        case("map_score empty gt zero", "map_score", [[[0, 0, 1, 1, 0.9]], [], 0.5], 0.0, hidden=True),
    ],
    "cv-unet-segmenter": [
        case("dice loss identical is zero", "dice_loss", [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], 0.0, hidden=True),
        case(
            "unet_forward 4x4 skip fusion",
            "unet_forward",
            [
                [[1.0] * 4 for _ in range(4)],
                {"e1": [[1]], "e2": [[1]], "b": [[1]], "d1": [[1]], "d2": [[1]], "out": [[1]]},
            ],
            [[3.0] * 4 for _ in range(4)],
            hidden=True,
        ),
    ],
    "cv-sam-prompt-segmenter": [
        case("iou_matrix identity diagonal ones", "iou_matrix", [[[[1, 0], [0, 0]], [[0, 0], [1, 1]]]], [[1.0, 0.0], [0.0, 1.0]], hidden=True),
        case("ensemble_masks weighted sum", "ensemble_masks", [[[[1, 0], [0, 0]], [[0, 1], [0, 0]]], [3.0, 1.0]], [[0.75, 0.25], [0.0, 0.0]], hidden=True),
    ],
    "cv-histogram-l2": [
        case("single ramp preserves monotonicity", "histogram_equalize", [[[0, 50, 100, 150, 200, 250]]], "__COMPUTE__", check=lambda out: out[0] == sorted(out[0]) and out[0][-1] == 255, hidden=True),
        case("square bimodal image", "histogram_equalize", [[[0, 0], [200, 200]]], "__COMPUTE__", check=lambda out: out[0][0] < out[1][0] and out[1][0] == 255, hidden=True),
    ],
    "cv-hough-l2": [
        case("blank edges zero accumulator", "hough_lines", [[[0, 0], [0, 0]], 45, 1], "__COMPUTE__", check=lambda out: max(max(r) for r in out[0]) == 0, hidden=True),
        case("find_peaks empty when below threshold", "find_peaks", [[[1, 2], [3, 4]], 10], [], hidden=True),
    ],
    "cv-color-transfer-l2": [
        case("uniform zero variance no NaN", "color_transfer", [[[[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]]], [[[0.8, 0.2, 0.2], [0.8, 0.2, 0.2]]]], "__COMPUTE__", check=lambda out: all(0.0 <= c <= 1.0 for c in out[0][0]), hidden=True),
        case("black source shifts luminance upward", "color_transfer", [[[[0.0, 0.0, 0.0], [0.1, 0.1, 0.1]]], [[[0.9, 0.9, 0.9], [1.0, 1.0, 1.0]]]], "__COMPUTE__", check=lambda out: out[0][0][0] > 0.7, hidden=True),
    ],
    "cv-harris-l2": [
        case("vertical step edge only has R<=0", "harris_corner", [[[0, 0, 1, 1]] * 4, 0.04, 1e-6], "__COMPUTE__", check=lambda out: max(max(r) for r in out) <= 0.01, hidden=True),
        case("high threshold filters weak responses", "harris_corner", [[[0, 0, 0], [0, 1, 1], [0, 1, 1]], 0.04, 1e6], [[0.0] * 3 for _ in range(3)], hidden=True),
    ],
    "cv-resnet-l2": [
        case("conv2d 1x1 scales tensor", "conv2d", [[[[[1, 2], [3, 4]]]], [[[[2.0]]]]], [[[[2.0, 4.0], [6.0, 8.0]]]], hidden=True),
        case("negative output clipped by ReLU", "relu", [[[[[-5.0, 3.0]]]]], [[[[0.0, 3.0]]]], hidden=True),
    ],
    "cv-yolo-loss-l2": [
        case("confidence mismatch error", "yolo_loss", [[[0.5, 0.5, 0.2, 0.2]], [[0.5, 0.5, 0.2, 0.2]], [0.5], [1.0], [[1, 0]], [[1, 0]]], 0.25, hidden=True),
        case("class probability error", "yolo_loss", [[[0.5, 0.5, 0.2, 0.2]], [[0.5, 0.5, 0.2, 0.2]], [1.0], [1.0], [[0.0, 1.0]], [[1.0, 0.0]]], 2.0, hidden=True),
    ],
    "cv-dice-l2": [
        case("pixel accuracy checks 0.5 threshold", "pixel_accuracy", [[[0.6, 0.2], [0.8, 0.4]], [[1, 0], [0, 0]]], 0.75, hidden=True),
        case("disjoint masks zero iou", "iou_score", [[[1, 0], [0, 0]], [[0, 1], [1, 1]]], 0.0, hidden=True),
    ],
    "cv-sam-l2": [
        case("embed non-multiple size crops to 16x16", "extract_embedding", [[[0.5] * 20 for _ in range(18)], 4], "__COMPUTE__", check=lambda out: len(out) == 4, hidden=True),
        case("decode mask binary entries only", "decode_mask", [[0.0], [1, 1], 3], "__COMPUTE__", check=lambda out: len(out) == 3 and all(v in (0.0, 1.0) for r in out for v in r), hidden=True),
    ],
}
