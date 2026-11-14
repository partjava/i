"""Stage 07 - Stage 11 patches: starter fixes, solution fixes, Chinese comments, public & hidden test cases."""


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
    # --- Stage 07 ---
    "nlp-tokenizer-pos-tagger": '''def fmm_segment(text: str, vocab: list[str], max_len: int = 5) -> list[str]:
    """正向最大匹配中文分词，未登录词按单字切分"""
    pass

def pos_tag(tokens: list[str], pos_dict: dict) -> list[dict]:
    """为分词序列标注词性，返回 [{"word": ..., "pos": ...}, ...]"""
    pass
''',
    "nlp-bpe-tokenizer-l2": '''def get_stats(vocab: dict) -> dict:
    """统计词表中相邻符号对频次"""
    pass

def bpe_tokenize(word: str, merges: dict, n: int) -> list[str]:
    """执行 n 轮 BPE 合并并返回子词切分结果"""
    pass
''',
    "nlp-beam-search-l2": '''import numpy as np

def beam_search(init_logits, decoder, beam: int = 3, max_len: int = 10, end_id: int = 2) -> list[int]:
    """束搜索解码，返回对数概率最高的 token 序列"""
    pass

def eval_beam_search(init_logits: list[float], preferred_token: int, beam: int = 2, max_len: int = 4, end_id: int = 2) -> list[int]:
    """使用确定性解码打分器评估 beam_search 解码路径"""
    def _decoder(seq):
        logits = np.full(len(init_logits), -5.0, dtype=float)
        if len(seq) >= max_len - 1:
            logits[end_id] = 5.0
        else:
            logits[preferred_token] = 5.0
        return logits
    return beam_search(init_logits, _decoder, beam, max_len, end_id)
''',
    # --- Stage 08 ---
    "llm-react-agent": '''def think(state: dict, tools: dict) -> str:
    """根据当前步骤决定下一步动作或回答"""
    pass

def act(action: str, tools: dict) -> str:
    """调用指定工具或返回未知动作提示"""
    pass

def react_agent(task: str, tools: dict, max_steps: int = 5) -> dict:
    """执行 Think -> Act 循环直到获得 result 或达到最大步数"""
    pass

def eval_react_agent(task: str, tool_mode: str = "ok", max_steps: int = 5) -> dict:
    """构造测试工具集并运行 ReAct Agent"""
    tools = {"search": (lambda: "result:晴天 25C")} if tool_mode == "ok" else {}
    return react_agent(task, tools, max_steps)
''',
    "llm-langchain-workflow": '''class LLMChain:
    def __init__(self, prompt_template, llm): pass
    def run(self, inputs): pass

class SequentialChain:
    def __init__(self, chains): pass
    def run(self, inputs): pass

class Agent:
    def __init__(self, name, tools, role): pass
    def run(self, task): pass

def eval_langchain(templates: list[str], inputs: dict, task: str) -> dict:
    """串联 SequentialChain 与 Agent 完成多步提示词调用评估"""
    chains = [LLMChain(tpl, lambda p: p.upper()) for tpl in templates]
    seq_out = SequentialChain(chains).run(inputs)
    agent_out = Agent("Bot", [], "助手").run(task)
    return {"chain_out": seq_out, "agent_out": agent_out}
''',
    "llm-tool-plan-l2": '''def execute_tool(name: str, args: dict, tools: dict) -> str:
    pass

def react_step(state: dict, tool_registry: dict) -> dict:
    pass

def eval_tool_plan(action: str, args: dict, thought: str = "") -> dict:
    """在内置加减工具注册表上执行一步 ReAct 工具规划"""
    registry = {
        "add": (lambda a, b: a + b),
        "echo": (lambda msg: msg),
    }
    return react_step({"thought": thought, "action": action, "args": args}, registry)
''',
    "llm-agent-memory-l2": '''class AgentMemory:
    def __init__(self, window: int = 10): pass
    def add(self, message: str): pass
    def get_context(self) -> list[str]: pass
    def summarize(self) -> str: pass

def eval_agent_memory(messages: list[str], window: int = 2) -> dict:
    """依次写入对话历史并返回滑动窗口上下文与摘要"""
    mem = AgentMemory(window)
    for m in messages:
        mem.add(m)
    return {"context": mem.get_context(), "summary": mem.summarize()}
''',
    # --- Stage 09 ---
    "rl-dqn": '''import numpy as np

class ReplayBuffer:
    def __init__(self, capacity): pass
    def push(self, s, a, r, s_next, done): pass
    def sample(self, batch_size): pass

def compute_td_loss(batch, online, target, gamma): pass

def eval_replay_buffer(capacity: int, pushes: list) -> dict:
    """向循环经验回放缓冲区写入经验并返回容量、指针位置及缓冲内容"""
    rb = ReplayBuffer(capacity)
    for s, a, r, s2, d in pushes:
        rb.push(s, a, r, s2, d)
    return {"size": len(rb.buf), "pos": rb.pos, "buf": [list(item) for item in rb.buf]}
''',
    # --- Stage 11 ---
    "project-multi-agent": '''class SchedulerAgent:
    def __init__(self, calendar): pass
    def find_slots(self, participants, duration): pass

class NotifierAgent:
    def notify(self, participants, meeting): pass

class ConflictResolverAgent:
    def resolve(self, schedules): pass

class MeetingOrchestrator:
    def __init__(self, scheduler, notifier, resolver): pass
    def arrange_meeting(self, request): pass

def eval_meeting_orchestrator(calendar: dict, request: dict) -> dict:
    """组装日程查找、冲突消解与通知智能体完成会议编排"""
    orch = MeetingOrchestrator(SchedulerAgent(calendar), NotifierAgent(), ConflictResolverAgent())
    return orch.arrange_meeting(request)
''',
}


SOLUTION_OVERRIDES = {
    # --- Stage 07 fixes ---
    "nlp-word2vec-embedding": '''import numpy as np

def build_vocab(sentences):
    words = set()
    for s in sentences:
        words.update(s)
    return {w: i for i, w in enumerate(sorted(words))}

def one_hot(idx, size):
    v = np.zeros(size, dtype=float)
    v[idx] = 1.0
    return v

def cosine_similarity(v1, v2):
    v1, v2 = np.asarray(v1, dtype=float), np.asarray(v2, dtype=float)
    d = float(np.linalg.norm(v1) * np.linalg.norm(v2))
    return float(np.dot(v1, v2) / d) if d > 0 else 0.0
''',
    "nlp-bert-pretraining": '''import numpy as np

def mask_tokens(tokens, mask_id, mask_prob=0.15):
    masked = list(tokens)
    labels = [-100] * len(tokens)
    for i in range(len(tokens)):
        if mask_prob >= 1.0 or (mask_prob > 0.0 and np.random.random() < mask_prob):
            labels[i] = tokens[i]
            masked[i] = mask_id
    return {"masked": masked, "labels": labels}

def mlm_loss(logits, target_ids):
    logits = np.asarray(logits, dtype=float)
    loss, n = 0.0, 0
    for logit, tid in zip(logits, target_ids):
        if tid < 0:
            continue
        exp = np.exp(logit - np.max(logit))
        probs = exp / np.sum(exp)
        loss += -float(np.log(probs[tid] + 1e-10))
        n += 1
    return round(float(loss / n), 4) if n else 0.0
''',
    "nlp-lstm-sequence-model": '''import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-np.clip(np.asarray(x, dtype=float), -100, 100)))

def lstm_cell(x, h_prev, c_prev, p):
    x = np.asarray(x, dtype=float)
    h_prev, c_prev = np.asarray(h_prev, dtype=float), np.asarray(c_prev, dtype=float)
    Wf, Uf, bf = np.asarray(p["Wf"], dtype=float), np.asarray(p["Uf"], dtype=float), np.asarray(p["bf"], dtype=float)
    Wi, Ui, bi = np.asarray(p["Wi"], dtype=float), np.asarray(p["Ui"], dtype=float), np.asarray(p["bi"], dtype=float)
    Wo, Uo, bo = np.asarray(p["Wo"], dtype=float), np.asarray(p["Uo"], dtype=float), np.asarray(p["bo"], dtype=float)
    Wc, Uc, bc = np.asarray(p["Wc"], dtype=float), np.asarray(p["Uc"], dtype=float), np.asarray(p["bc"], dtype=float)
    f = sigmoid(x @ Wf + h_prev @ Uf + bf)
    i = sigmoid(x @ Wi + h_prev @ Ui + bi)
    o = sigmoid(x @ Wo + h_prev @ Uo + bo)
    cc = np.tanh(x @ Wc + h_prev @ Uc + bc)
    c = f * c_prev + i * cc
    h = o * np.tanh(c)
    return h, c

def lstm_forward(X, p):
    X = np.asarray(X, dtype=float)
    Wf = np.asarray(p["Wf"], dtype=float)
    h = np.zeros(Wf.shape[1], dtype=float)
    c = np.zeros_like(h)
    hs = []
    for x in X:
        h, c = lstm_cell(x, h, c, p)
        hs.append(h)
    return hs
''',
    "nlp-self-attention": '''import numpy as np

def scaled_dot_product_attention(Q, K, V):
    Q, K, V = np.asarray(Q, dtype=float), np.asarray(K, dtype=float), np.asarray(V, dtype=float)
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)
    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    return {"output": weights @ V, "weights": weights}

def self_attention(X, W_q, W_k, W_v):
    X = np.asarray(X, dtype=float)
    W_q, W_k, W_v = np.asarray(W_q, dtype=float), np.asarray(W_k, dtype=float), np.asarray(W_v, dtype=float)
    return scaled_dot_product_attention(X @ W_q, X @ W_k, X @ W_v)
''',
    "nlp-multi-head-attention": '''import numpy as np

def split_heads(X, h):
    X = np.asarray(X, dtype=float)
    n, d = X.shape
    return X.reshape(n, h, d // h).transpose(1, 0, 2)

def concat_heads(heads):
    heads = np.asarray(heads, dtype=float)
    h, n, dh = heads.shape
    return heads.transpose(1, 0, 2).reshape(n, h * dh)

def multi_head_attention(X, p, h):
    X = np.asarray(X, dtype=float)
    Q = X @ np.asarray(p["Wq"], dtype=float)
    K = X @ np.asarray(p["Wk"], dtype=float)
    V = X @ np.asarray(p["Wv"], dtype=float)
    Q_h, K_h, V_h = split_heads(Q, h), split_heads(K, h), split_heads(V, h)
    heads = []
    for i in range(h):
        qi, ki, vi = Q_h[i], K_h[i], V_h[i]
        scores = qi @ ki.T / np.sqrt(qi.shape[-1])
        exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
        attn = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
        heads.append(attn @ vi)
    cat = concat_heads(np.array(heads))
    return {"output": cat @ np.asarray(p["Wo"], dtype=float), "heads": heads}
''',
    "nlp-encoder-decoder": '''import numpy as np

def encoder_forward(tokens, W_emb, W_enc):
    W_emb, W_enc = np.asarray(W_emb, dtype=float), np.asarray(W_enc, dtype=float)
    h = np.zeros(W_enc.shape[1], dtype=float)
    for t in tokens:
        h = np.tanh(W_emb[t] @ W_enc + h)
    return h

def decoder_step(y_t, h_prev, W_emb, W_dec, W_out):
    h_prev = np.asarray(h_prev, dtype=float)
    W_emb = np.asarray(W_emb, dtype=float)
    W_dec = np.asarray(W_dec, dtype=float)
    W_out = np.asarray(W_out, dtype=float)
    h = np.tanh(W_emb[y_t] @ W_dec + h_prev)
    return h, h @ W_out

def greedy_decode(enc_h, start_id, end_id, max_len, p):
    y, h, result = start_id, np.asarray(enc_h, dtype=float), []
    for _ in range(max_len):
        h, logits = decoder_step(y, h, p["W_emb"], p["W_dec"], p["W_out"])
        y = int(np.argmax(logits))
        if y == end_id:
            break
        result.append(y)
    return result
''',
    "nlp-skipgram-l2": '''import numpy as np

def softmax(z):
    z = np.asarray(z, dtype=float)
    zs = z - np.max(z, axis=-1, keepdims=True)
    e = np.exp(zs)
    return e / np.sum(e, axis=-1, keepdims=True)

def skipgram_forward(center, W_in, W_out):
    W_in, W_out = np.asarray(W_in, dtype=float), np.asarray(W_out, dtype=float)
    return softmax(W_in[center] @ W_out.T)

def skipgram_loss(probs, target):
    probs = np.asarray(probs, dtype=float)
    return float(-np.log(probs[target] + 1e-10))
''',
    "nlp-bert-pretrain-l2": '''import numpy as np

def ce(logits, target):
    logits = np.atleast_2d(np.asarray(logits, dtype=float))
    target = np.asarray(target, dtype=int)
    s = logits - np.max(logits, axis=-1, keepdims=True)
    p = np.exp(s) / np.sum(np.exp(s), axis=-1, keepdims=True)
    return -np.log(p[range(len(target)), target] + 1e-10)

def mlm_loss(logits, target_ids, mask):
    mask = np.asarray(mask)
    logits = np.asarray(logits, dtype=float)
    total = 0.0
    cnt = int(np.sum(mask))
    for i in range(len(mask)):
        if mask[i]:
            total += float(ce(logits[i], [target_ids[i]])[0])
    return round(float(total / cnt), 4) if cnt else 0.0

def nsp_loss(seq_logits, is_next):
    return round(float(np.mean(ce(seq_logits, is_next))), 4)
''',
    "nlp-gru-l2": '''import collections
import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-np.clip(np.asarray(x, dtype=float), -100, 100)))

def gru_cell(x, h, p):
    if isinstance(p, dict):
        p = collections.namedtuple("P", p.keys())(**p)
    x, h = np.asarray(x, dtype=float), np.asarray(h, dtype=float)
    z = sigmoid(x @ np.asarray(p.Wz, dtype=float) + h @ np.asarray(p.Uz, dtype=float) + np.asarray(p.bz, dtype=float))
    r = sigmoid(x @ np.asarray(p.Wr, dtype=float) + h @ np.asarray(p.Ur, dtype=float) + np.asarray(p.br, dtype=float))
    n = np.tanh(x @ np.asarray(p.Wh, dtype=float) + (r * h) @ np.asarray(p.Uh, dtype=float) + np.asarray(p.bh, dtype=float))
    return (1.0 - z) * n + z * h

def gru_forward(X, p):
    X = np.asarray(X, dtype=float)
    if isinstance(p, dict):
        p = collections.namedtuple("P", p.keys())(**p)
    Wz = np.asarray(p.Wz, dtype=float)
    h = np.zeros(Wz.shape[1], dtype=float)
    hs = []
    for x in X:
        h = gru_cell(x, h, p)
        hs.append(h)
    return hs
''',
    "nlp-cross-attention-l2": '''import numpy as np

def softmax(x):
    x = np.asarray(x, dtype=float)
    xm = x - np.max(x, axis=-1, keepdims=True)
    e = np.exp(xm)
    return e / np.sum(e, axis=-1, keepdims=True)

def cross_attention(Q, K, V):
    Q, K, V = np.asarray(Q, dtype=float), np.asarray(K, dtype=float), np.asarray(V, dtype=float)
    d = Q.shape[-1]
    return softmax(Q @ K.T / np.sqrt(d)) @ V

def cross_attention_forward(Xd, Xe, Wq, Wk, Wv):
    Xd, Xe = np.asarray(Xd, dtype=float), np.asarray(Xe, dtype=float)
    Wq, Wk, Wv = np.asarray(Wq, dtype=float), np.asarray(Wk, dtype=float), np.asarray(Wv, dtype=float)
    return cross_attention(Xd @ Wq, Xe @ Wk, Xe @ Wv)
''',
    "nlp-mha-l2": '''import numpy as np

def softmax(x):
    x = np.asarray(x, dtype=float)
    xm = x - np.max(x, axis=-1, keepdims=True)
    e = np.exp(xm)
    return e / np.sum(e, axis=-1, keepdims=True)

def multihead_attention(X, Wq, Wk, Wv, Wo, h=2):
    X = np.asarray(X, dtype=float)
    Q = X @ np.asarray(Wq, dtype=float)
    K = X @ np.asarray(Wk, dtype=float)
    V = X @ np.asarray(Wv, dtype=float)
    dk = X.shape[1] // h
    heads = []
    for i in range(h):
        qi, ki, vi = Q[:, i * dk:(i + 1) * dk], K[:, i * dk:(i + 1) * dk], V[:, i * dk:(i + 1) * dk]
        w = softmax(qi @ ki.T / np.sqrt(dk))
        heads.append(w @ vi)
    return np.concatenate(heads, axis=1) @ np.asarray(Wo, dtype=float)

def get_weights(X, Wq, Wk, h=2):
    X = np.asarray(X, dtype=float)
    Q = X @ np.asarray(Wq, dtype=float)
    K = X @ np.asarray(Wk, dtype=float)
    dk = X.shape[1] // h
    return [softmax(Q[:, i * dk:(i + 1) * dk] @ K[:, i * dk:(i + 1) * dk].T / np.sqrt(dk)) for i in range(h)]
''',
    "nlp-beam-search-l2": '''import numpy as np

def beam_search(init_logits, decoder, beam=3, max_len=10, end_id=2):
    init_logits = np.asarray(init_logits, dtype=float)
    probs = np.exp(init_logits - np.max(init_logits))
    probs /= np.sum(probs)
    cand = sorted([(float(np.log(probs[i] + 1e-12)), [i]) for i in range(len(probs))], key=lambda x: -x[0])[:beam]
    for _ in range(max_len):
        nw = []
        for sc, seq in cand:
            if seq[-1] == end_id:
                nw.append((sc, seq))
                continue
            logits = np.asarray(decoder(seq), dtype=float)
            p = np.exp(logits - np.max(logits))
            p /= np.sum(p)
            for i in np.argsort(-p)[:min(beam, len(p))]:
                nw.append((sc + float(np.log(p[i] + 1e-12)), seq + [int(i)]))
        nw.sort(key=lambda x: -x[0])
        cand = nw[:beam]
    return cand[0][1]

def eval_beam_search(init_logits: list[float], preferred_token: int, beam: int = 2, max_len: int = 4, end_id: int = 2) -> list[int]:
    def _decoder(seq):
        logits = np.full(len(init_logits), -5.0, dtype=float)
        if len(seq) >= max_len - 1:
            logits[end_id] = 5.0
        else:
            logits[preferred_token] = 5.0
        return logits
    return beam_search(init_logits, _decoder, beam, max_len, end_id)
''',
    # --- Stage 08 fixes ---
    "llm-few-shot-prompting": '''import numpy as np

def cosine_sim(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    d = float(np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / d) if d > 0 else 0.0

def select_examples(query, examples, k=3):
    scored = [(cosine_sim(query, e["emb"]), i, e) for i, e in enumerate(examples)]
    scored.sort(key=lambda x: (-x[0], x[1]))
    return [e for _, _, e in scored[:k]]
''',
    "llm-react-agent": '''def think(state, tools):
    if not state["steps"]:
        return "search"
    return "answer" if "result:" in state["steps"][-1] else "search"

def act(action, tools):
    if action in tools:
        return tools[action]()
    return f"unknown action: {action}"

def react_agent(task, tools, max_steps=5):
    state = {"task": task, "steps": []}
    for _ in range(max_steps):
        action = think(state, tools)
        if action == "answer":
            return {"answer": state["steps"][-1], "steps": state["steps"]}
        obs = act(action, tools)
        state["steps"].append(f"{action} -> {obs}")
    return {"answer": "max steps reached", "steps": state["steps"]}

def eval_react_agent(task: str, tool_mode: str = "ok", max_steps: int = 5) -> dict:
    tools = {"search": (lambda: "result:晴天 25C")} if tool_mode == "ok" else {}
    return react_agent(task, tools, max_steps)
''',
    "llm-lora-finetuning": '''import numpy as np

def lora_forward(x, W, A, B):
    x, W = np.asarray(x, dtype=float), np.asarray(W, dtype=float)
    A, B = np.asarray(A, dtype=float), np.asarray(B, dtype=float)
    return x @ W.T + (x @ A.T) @ B.T

def count_trainable_params(d, rank):
    return 2 * d * rank

def compression_ratio(d, rank):
    return round((2 * d * rank) / (d * d), 4)
''',
    "llm-rlhf-alignment": '''import numpy as np

def compute_log_prob(logits, token):
    logits = np.asarray(logits, dtype=float)
    shifted = logits - np.max(logits)
    probs = np.exp(shifted) / np.sum(np.exp(shifted))
    return float(np.log(probs[token] + 1e-10))

def kl_divergence(p, q):
    p, q = np.asarray(p, dtype=float), np.asarray(q, dtype=float)
    p_sft = np.exp(p - np.max(p))
    p_sft /= np.sum(p_sft)
    q_sft = np.exp(q - np.max(q))
    q_sft /= np.sum(q_sft)
    return float(np.sum(p_sft * np.log(p_sft / (q_sft + 1e-12) + 1e-12)))

def ppo_clip_loss(new_prob, old_prob, advantage, eps=0.2):
    ratio = new_prob / old_prob if old_prob != 0 else 0.0
    clipped = float(np.clip(ratio, 1 - eps, 1 + eps))
    return float(-min(ratio * advantage, clipped * advantage))
''',
    "llm-embedding": '''import numpy as np

def tokenize(text, vocab):
    return [vocab.get(w, 0) for w in text.split() if w in vocab]

def embed_text(text, vocab, emb_matrix):
    emb_matrix = np.asarray(emb_matrix, dtype=float)
    ids = tokenize(text, vocab)
    if not ids:
        return np.zeros(emb_matrix.shape[1], dtype=float)
    return np.mean(emb_matrix[ids], axis=0)

def similarity_search(query_emb, embeddings, texts, k=3):
    query_emb, embeddings = np.asarray(query_emb, dtype=float), np.asarray(embeddings, dtype=float)
    scores = embeddings @ query_emb
    norms = np.linalg.norm(embeddings, axis=1) * np.linalg.norm(query_emb)
    scores = scores / (norms + 1e-10)
    idx = np.argsort(scores)[::-1][:k]
    return [{"text": texts[i], "score": round(float(scores[i]), 4)} for i in idx]
''',
    "llm-vector-db-retrieval": '''import numpy as np

def train_ivf(embeddings, n_centroids):
    embeddings = np.asarray(embeddings, dtype=float)
    idx = np.random.choice(len(embeddings), n_centroids, replace=False)
    return embeddings[idx]

def brute_force_search(query, embeddings, ids, top_k=3):
    query, embeddings = np.asarray(query, dtype=float), np.asarray(embeddings, dtype=float)
    scores = embeddings @ query
    idx = np.argsort(scores)[::-1][:top_k]
    return [[int(ids[i]), float(scores[i])] for i in idx]

def ivf_search(query, centroids, embeddings, ids, n_probe=2, top_k=3):
    query = np.asarray(query, dtype=float)
    centroids = np.asarray(centroids, dtype=float)
    embeddings = np.asarray(embeddings, dtype=float)
    dists = np.linalg.norm(centroids - query, axis=1)
    nearest = np.argsort(dists)[:n_probe]
    cluster_assign = np.argmin(np.linalg.norm(embeddings[:, None] - centroids[None, :], axis=2), axis=1)
    candidates = []
    for c in nearest:
        for i in np.where(cluster_assign == c)[0]:
            candidates.append([int(ids[i]), float(embeddings[i] @ query)])
    candidates.sort(key=lambda x: -x[1])
    return candidates[:top_k]
''',
    "llm-function-calling": '''import json

def execute_function_call(func_call, registry):
    name = func_call.get("name") if isinstance(func_call, dict) else func_call["name"]
    args = func_call.get("arguments", {}) if isinstance(func_call, dict) else func_call["arguments"]
    fn = registry.get(name)
    if not fn:
        return f"unknown function: {name}"
    return fn(**args)

def validate_arguments(args, schema):
    type_map = {
        "string": (str,),
        "number": (int, float),
        "integer": (int,),
        "boolean": (bool,),
        "array": (list,),
        "object": (dict,),
    }
    for key, props in schema.get("properties", {}).items():
        if key in args:
            expected = props.get("type")
            val = args[key]
            if expected == "boolean":
                if not isinstance(val, bool):
                    return False
            elif expected in ("number", "integer"):
                if isinstance(val, bool) or not isinstance(val, type_map[expected]):
                    return False
            elif expected in type_map:
                if not isinstance(val, type_map[expected]):
                    return False
            elif type(val).__name__ != expected:
                return False
        elif props.get("required", False):
            return False
    return True

def call_with_retry(func, args, max_retries=3):
    last = None
    for _ in range(max_retries):
        try:
            return func(**args)
        except Exception as e:
            last = e
    raise last
''',
    "llm-langchain-workflow": '''class LLMChain:
    def __init__(self, prompt_template, llm):
        self.template = prompt_template
        self.llm = llm

    def run(self, inputs):
        return self.llm(self.template.format(**inputs))

class SequentialChain:
    def __init__(self, chains):
        self.chains = chains

    def run(self, inputs):
        result = inputs
        for chain in self.chains:
            result = chain.run(result if isinstance(result, dict) else {"input": result})
        return result

class Agent:
    def __init__(self, name, tools, role):
        self.name = name
        self.tools = tools
        self.role = role

    def run(self, task):
        return f"{self.name}({self.role})执行: {task}"

def eval_langchain(templates: list[str], inputs: dict, task: str) -> dict:
    chains = [LLMChain(tpl, lambda p: p.upper()) for tpl in templates]
    seq_out = SequentialChain(chains).run(inputs)
    agent_out = Agent("Bot", [], "助手").run(task)
    return {"chain_out": seq_out, "agent_out": agent_out}
''',
    "llm-cot-verify-l2": '''import re

def verify_cot_steps(steps):
    errors = []
    for i, s in enumerate(steps):
        if "+" in s:
            nums = re.findall(r"\\d+", s)
            if len(nums) >= 3:
                a, b, res = int(nums[-3]), int(nums[-2]), int(nums[-1])
                if a + b != res:
                    errors.append([i, "addition error"])
    return {"valid": len(errors) == 0, "errors": errors}

def detect_step_error(step, expected):
    return {"match": str(step).strip() == str(expected).strip()}
''',
    "llm-tool-plan-l2": '''def execute_tool(name, args, tools):
    t = tools.get(name)
    if not t:
        return f"Error: unknown tool {name}"
    try:
        return str(t(**args))
    except Exception as e:
        return f"Error: {e}"

def react_step(state, registry):
    action = state.get("action", "")
    args = state.get("args", {})
    obs = execute_tool(action, args, registry)
    return {"observation": obs, "thought": f"Executed {action}, got: {obs[:50]}"}

def eval_tool_plan(action: str, args: dict, thought: str = "") -> dict:
    registry = {"add": (lambda a, b: a + b), "echo": (lambda msg: msg)}
    return react_step({"thought": thought, "action": action, "args": args}, registry)
''',
    "llm-qlora-l2": '''import numpy as np

def quantize_nf4(w):
    w = np.asarray(w, dtype=float)
    absmax = float(np.max(np.abs(w)))
    normalized = w / absmax if absmax > 0 else w
    levels = np.linspace(-1, 1, 16)
    idx = np.clip(np.digitize(normalized, levels) - 1, 0, 15)
    return {"indices": idx.astype(np.uint8), "absmax": absmax}

def dequantize_nf4(q, absmax):
    levels = np.linspace(-1, 1, 16)
    indices = np.asarray(q["indices"], dtype=int)
    return levels[indices] * float(absmax)
''',
    "llm-dpo-l2": '''import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-np.clip(np.asarray(x, dtype=float), -100, 100)))

def dpo_loss(chosen_logps, rejected_logps, ref_chosen_logps, ref_rejected_logps, beta=0.1):
    sel = np.asarray(chosen_logps, dtype=float)
    rej = np.asarray(rejected_logps, dtype=float)
    sel_ref = np.asarray(ref_chosen_logps, dtype=float)
    rej_ref = np.asarray(ref_rejected_logps, dtype=float)
    pi_diff = (sel - sel_ref) - (rej - rej_ref)
    loss = -np.log(sigmoid(beta * pi_diff) + 1e-10)
    return round(float(np.mean(loss)), 4)
''',
    "llm-kv-cache-l2": '''import numpy as np

def softmax(x):
    xm = x - np.max(x, axis=-1, keepdims=True)
    e = np.exp(xm)
    return e / np.sum(e, axis=-1, keepdims=True)

def init_kv_cache():
    return {"K": None, "V": None}

def update_kv_cache(cache, K, V):
    K, V = np.asarray(K, dtype=float), np.asarray(V, dtype=float)
    if cache["K"] is None:
        cache["K"], cache["V"] = K, V
    else:
        cache["K"] = np.concatenate([np.asarray(cache["K"], dtype=float), K], axis=2)
        cache["V"] = np.concatenate([np.asarray(cache["V"], dtype=float), V], axis=2)
    return cache

def attention_with_cache(Q, cache):
    Q = np.asarray(Q, dtype=float)
    K = np.asarray(cache["K"], dtype=float)
    V = np.asarray(cache["V"], dtype=float)
    d = Q.shape[-1]
    scores = Q @ K.transpose(0, 1, 3, 2) / np.sqrt(d)
    return softmax(scores) @ V
''',
    "llm-chunk-optimize-l2": '''import re

def smart_chunk(text, chunk_size=500, overlap=50):
    paras = re.split(r"\\n\\s*\\n", text)
    chunks, cur = [], ""
    for p in paras:
        sep = "\\n\\n" if cur else ""
        if len(cur) + len(sep) + len(p) <= chunk_size:
            cur += sep + p
        else:
            if cur:
                chunks.append(cur)
            cur = p
    if cur:
        chunks.append(cur)
    if overlap > 0 and len(chunks) > 1:
        result = [chunks[0]]
        for i in range(1, len(chunks)):
            prev = result[-1]
            tail = prev[-overlap:] if len(prev) > overlap else prev
            result.append(tail + chunks[i])
        chunks = result
    return chunks

def chunk_stats(chunks):
    lens = [len(c) for c in chunks]
    return {"count": len(chunks), "avg": round(sum(lens) / len(lens), 1) if lens else 0}
''',
    "llm-embed-alignment-l2": '''import numpy as np

def cosine_sim(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-10))

def compute_alignment(embeddings, labels):
    embs = np.asarray(embeddings, dtype=float)
    pos, neg = [], []
    for i in range(len(embs)):
        for j in range(i + 1, len(embs)):
            s = cosine_sim(embs[i], embs[j])
            (pos if labels[i] == labels[j] else neg).append(s)
    pos_m = float(np.mean(pos)) if pos else 0.0
    neg_m = float(np.mean(neg)) if neg else 0.0
    return {"alignment": round(pos_m - neg_m, 4), "pos_sim": round(pos_m, 4), "neg_sim": round(neg_m, 4)}
''',
    "llm-hnsw-l2": '''import numpy as np

def euclidean(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(np.sqrt(np.sum((a - b) ** 2)))

def hnsw_search(query, nodes, levels, top_k=3):
    query, nodes = np.asarray(query, dtype=float), np.asarray(nodes, dtype=float)
    n = len(nodes)
    nearest = []
    for level in reversed(range(levels)):
        candidates = list(range(n)) if level == 0 else list(range(0, n, 2 ** (level + 1)))
        if not candidates:
            candidates = list(range(n))
        dists = sorted(((euclidean(query, nodes[i]), i) for i in candidates), key=lambda x: x[0])
        nearest = dists[:top_k]
    return [int(i) for _, i in nearest]
''',
    "llm-tool-rag-l2": '''import numpy as np

def cosine_sim(a, b):
    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-10))

def retrieve(query, docs, top_k=2):
    sc = sorted(((cosine_sim(query, d[1]), d) for d in docs), key=lambda x: -x[0])
    return [d for _, d in sc[:top_k]]

def augment(query, relevant):
    ctx = "\\n".join(f"[{i + 1}] {r[2]}" for i, r in enumerate(relevant))
    return f"Context:\\n{ctx}\\n\\nQuestion: {query}\\nAnswer:"

def rag_pipeline(query, docs, llm):
    rl = retrieve(query, docs)
    return {"response": llm(augment(query, rl)), "documents": rl}
''',
    "llm-stream-output-l2": '''import json

def is_complete_json(text):
    try:
        json.loads(text)
        return True
    except Exception:
        return False

def parse_sse_stream(chunks):
    buffer, results = "", []
    for chunk in chunks:
        for line in chunk.replace("\\\\n", "\\n").split("\\n"):
            if line.startswith("data: "):
                buffer += line[6:]
                if is_complete_json(buffer):
                    results.append(json.loads(buffer))
                    buffer = ""
    return results
''',
    "llm-agent-memory-l2": '''class AgentMemory:
    def __init__(self, window=10):
        self.window = window
        self.messages = []
        self.summary = ""

    def add(self, msg):
        self.messages.append(msg)
        if len(self.messages) > self.window:
            oldest = self.messages.pop(0)
            self.summary += oldest[:50] + "\\n"

    def get_context(self):
        ctx = self.messages[-self.window:] if self.window > 0 else []
        if self.summary:
            ctx = [f"Summary: {self.summary[:100]}..."] + ctx
        return ctx

    def summarize(self):
        return self.summary[:200]

def eval_agent_memory(messages: list[str], window: int = 2) -> dict:
    mem = AgentMemory(window)
    for m in messages:
        mem.add(m)
    return {"context": mem.get_context(), "summary": mem.summarize()}
''',
    # --- Stage 09 fixes ---
    "rl-mdpsimulator": '''import numpy as np

def value_iteration(states, actions, trans, rewards, gamma=0.9, theta=0.01):
    n_s = states if isinstance(states, int) else len(states)
    n_a = actions if isinstance(actions, int) else len(actions)
    V = np.zeros(n_s, dtype=float)
    while True:
        delta = 0.0
        for s in range(n_s):
            v = V[s]
            V[s] = max(
                sum(trans[s][a][sn] * (rewards[s][a][sn] + gamma * V[sn]) for sn in range(n_s))
                for a in range(n_a)
            )
            delta = max(delta, abs(v - V[s]))
        if delta < theta:
            break
    return np.round(V, 4)

def extract_policy(V, states, actions, trans, rewards):
    n_s = states if isinstance(states, int) else len(states)
    n_a = actions if isinstance(actions, int) else len(actions)
    policy = []
    for s in range(n_s):
        best_a = int(np.argmax([
            sum(trans[s][a][sn] * (rewards[s][a][sn] + 0.9 * V[sn]) for sn in range(n_s))
            for a in range(n_a)
        ]))
        policy.append(best_a)
    return policy
''',
    "rl-qlearning": '''import numpy as np

def epsilon_greedy(Q, state, epsilon):
    Q = np.asarray(Q, dtype=float)
    if epsilon > 0 and np.random.random() < epsilon:
        return int(np.random.randint(Q.shape[1]))
    return int(np.argmax(Q[state]))

def q_update(Q, s, a, r, s_next, alpha=0.1, gamma=0.9):
    Q[s, a] += alpha * (r + gamma * np.max(Q[s_next]) - Q[s, a])

def q_learning(env, episodes=100, alpha=0.1, gamma=0.9, epsilon=0.1):
    Q = np.zeros((env["n_states"], env["n_actions"]), dtype=float)
    rewards = []
    for _ in range(episodes):
        s, total = 0, 0.0
        for _ in range(50):
            a = epsilon_greedy(Q, s, epsilon)
            probs = env["trans"][s][a]
            s_next = probs.index(1) if 1 in probs and epsilon == 0 else int(np.random.choice(env["n_states"], p=probs))
            r = env["rewards"][s][a][s_next]
            q_update(Q, s, a, r, s_next, alpha, gamma)
            s = s_next
            total += r
        rewards.append(total)
    w = min(20, len(rewards))
    return {"Q": np.round(Q, 4), "avg_return": round(sum(rewards[-w:]) / w, 2)}
''',
    "rl-sarsa": '''import numpy as np

def sarsa_update(Q, s, a, r, s_next, a_next, alpha=0.1, gamma=0.9):
    Q[s, a] += alpha * (r + gamma * Q[s_next, a_next] - Q[s, a])

def epsilon_greedy(Q, state, epsilon):
    Q = np.asarray(Q, dtype=float)
    if epsilon > 0 and np.random.random() < epsilon:
        return int(np.random.randint(Q.shape[1]))
    return int(np.argmax(Q[state]))

def sarsa(env, episodes=100, alpha=0.1, gamma=0.9, epsilon=0.1):
    Q = np.zeros((env["n_states"], env["n_actions"]), dtype=float)
    rewards = []
    for _ in range(episodes):
        s = 0
        a = epsilon_greedy(Q, s, epsilon)
        total = 0.0
        for _ in range(50):
            probs = env["trans"][s][a]
            s_next = probs.index(1) if 1 in probs and epsilon == 0 else int(np.random.choice(env["n_states"], p=probs))
            r = env["rewards"][s][a][s_next]
            a_next = epsilon_greedy(Q, s_next, epsilon)
            sarsa_update(Q, s, a, r, s_next, a_next, alpha, gamma)
            s, a = s_next, a_next
            total += r
        rewards.append(total)
    w = min(20, len(rewards))
    return {"Q": np.round(Q, 4), "avg_return": round(sum(rewards[-w:]) / w, 2)}
''',
    "rl-dqn": '''import numpy as np

class ReplayBuffer:
    def __init__(self, cap):
        self.buf = []
        self.cap = cap
        self.pos = 0

    def push(self, s, a, r, s2, d):
        if len(self.buf) < self.cap:
            self.buf.append((s, a, r, s2, d))
        else:
            self.buf[self.pos] = (s, a, r, s2, d)
        self.pos = (self.pos + 1) % self.cap

    def sample(self, n):
        idx = np.random.choice(len(self.buf), n)
        return [self.buf[i] for i in idx]

def compute_td_loss(batch, online, target, gamma=0.9):
    online, target = np.asarray(online, dtype=float), np.asarray(target, dtype=float)
    loss = 0.0
    for s, a, r, s2, d in batch:
        q_target = r if d else r + gamma * float(np.max(target[s2]))
        loss += (float(online[s][a]) - q_target) ** 2
    return float(loss / len(batch))

def eval_replay_buffer(capacity: int, pushes: list) -> dict:
    rb = ReplayBuffer(capacity)
    for s, a, r, s2, d in pushes:
        rb.push(s, a, r, s2, d)
    return {"size": len(rb.buf), "pos": rb.pos, "buf": [list(item) for item in rb.buf]}
''',
    "rl-actor-critic": '''import numpy as np

def actor_forward(state, theta):
    state, theta = np.asarray(state, dtype=float), np.asarray(theta, dtype=float)
    logits = state @ theta
    exp = np.exp(logits - np.max(logits))
    return exp / np.sum(exp)

def critic_forward(state, w):
    state, w = np.asarray(state, dtype=float), np.asarray(w, dtype=float)
    return float(state @ w)

def actor_critic_train(env, episodes=100, lr_a=0.01, lr_c=0.01, gamma=0.9):
    n_s, n_a = env["n_states"], env["n_actions"]
    theta = np.zeros((n_s, n_a))
    w = np.zeros(n_s)
    returns = []
    for _ in range(episodes):
        s_idx, total = 0, 0.0
        for _ in range(50):
            s = np.eye(n_s)[s_idx]
            probs = actor_forward(s, theta)
            a = int(np.random.choice(n_a, p=probs))
            s_next = int(np.random.choice(n_s, p=env["trans"][s_idx][a]))
            r = env["rewards"][s_idx][a][s_next]
            td = r + gamma * critic_forward(np.eye(n_s)[s_next], w) - critic_forward(s, w)
            theta += lr_a * np.outer(s, td * (np.eye(n_a)[a] - probs))
            w += lr_c * td * s
            s_idx = s_next
            total += r
        returns.append(total)
    return {"avg_return": round(sum(returns[-20:]) / 20, 2)}
''',
    "rl-double-dqn-l2": '''import numpy as np

def double_dqn_update(online, target, batch, gamma=0.9):
    online, target = np.asarray(online, dtype=float), np.asarray(target, dtype=float)
    loss = 0.0
    for s, a, r, s2, d in batch:
        best_a = int(np.argmax(online[s2]))
        q_target = r if d else r + gamma * float(target[s2][best_a])
        loss += (float(online[s][a]) - q_target) ** 2
    return float(loss / len(batch))
''',
    "rl-actor-critic-continuous-l2": '''import numpy as np

def normal_log_prob(mu, sigma, action):
    mu, sigma, action = np.asarray(mu, dtype=float), np.asarray(sigma, dtype=float), np.asarray(action, dtype=float)
    res = -0.5 * (((action - mu) / sigma) ** 2 + np.log(2 * np.pi * sigma ** 2))
    return res.tolist() if res.ndim > 0 else float(res)

def actor_critic_continuous(state, mu_head, sigma_head, critic_w):
    state = np.asarray(state, dtype=float)
    mu_arr = state @ np.asarray(mu_head, dtype=float)
    sigma_arr = np.exp(state @ np.asarray(sigma_head, dtype=float))
    val = float(state @ np.asarray(critic_w, dtype=float))
    return {
        "mu": [round(float(x), 6) for x in mu_arr] if np.ndim(mu_arr) > 0 else round(float(mu_arr), 6),
        "sigma": [round(float(x), 6) for x in sigma_arr] if np.ndim(sigma_arr) > 0 else round(float(sigma_arr), 6),
        "value": round(val, 6),
    }
''',
    # --- Stage 10 fixes ---
    "deploy-continuous-batching-l2": '''def continuous_batching(requests, max_batch=4, max_len=10):
    running = []
    pending = list(requests)
    completed = []
    step = 0
    while (running or pending) and step < max_len * len(requests):
        step += 1
        while len(running) < max_batch and pending:
            running.append({"id": pending.pop(0), "tokens": [0], "done": False})
        for r in running[:]:
            if not r["done"]:
                r["tokens"].append(r["tokens"][-1] + 1)
                if len(r["tokens"]) >= max_len:
                    r["done"] = True
                    completed.append(r["id"])
                    running.remove(r)
    throughput = round(len(completed) / step, 4) if step > 0 else 0.0
    return {"completed": completed, "steps": step, "throughput": throughput}
''',
    "deploy-fastapi-service": '''import json

def validate_input(data, schema):
    type_map = {"str": str, "string": str, "int": int, "float": (int, float), "number": (int, float), "bool": bool, "list": list, "dict": dict}
    for field, expected in schema.items():
        if field not in data:
            return False, f"missing field: {field}"
        expected_type = type_map.get(expected, expected) if isinstance(expected, str) else expected
        val = data[field]
        if expected_type is int and isinstance(val, bool):
            return False, f"{field} should be int"
        if not isinstance(val, expected_type):
            name = expected if isinstance(expected, str) else getattr(expected_type, "__name__", str(expected_type))
            return False, f"{field} should be {name}"
    return True, None

def format_response(prediction, confidence):
    return {"success": True, "prediction": prediction, "confidence": round(confidence, 4), "latency_ms": 0}

def build_openapi_spec(endpoints):
    spec = {"openapi": "3.0.0", "info": {"title": "ML API", "version": "1.0"}, "paths": {}}
    for ep in endpoints:
        spec["paths"][ep["path"]] = {ep["method"]: {"summary": ep["summary"], "responses": {"200": {"description": "OK"}}}}
    return spec
''',
    "deploy-onnx-export": '''import numpy as np

def export_onnx(params, input_shape, output_shape):
    return {
        "version": 7,
        "graph": {
            "inputs": [{"shape": input_shape}],
            "outputs": [{"shape": output_shape}],
            "initializers": {k: np.asarray(v, dtype=float).tolist() for k, v in params.items()},
        },
    }

def onnx_inference(model, input_data):
    W = np.asarray(model["graph"]["initializers"].get("weight", [[1]]), dtype=float)
    b = np.asarray(model["graph"]["initializers"].get("bias", [0]), dtype=float)
    return np.dot(np.asarray(input_data, dtype=float), W) + b

def compare_outputs(torch_out, onnx_out):
    diff = float(np.max(np.abs(np.asarray(torch_out, dtype=float) - np.asarray(onnx_out, dtype=float))))
    return {"max_diff": round(diff, 6), "pass": bool(diff < 1e-4)}
''',
    "deploy-docker-packaging": '''import hashlib
import json

def parse_dockerfile(content):
    instructions = []
    for line in content.split("\\n"):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(None, 1)
        if parts[0].upper() in ("FROM", "RUN", "COPY", "CMD", "WORKDIR", "ENV", "EXPOSE"):
            instructions.append({"cmd": parts[0].upper(), "args": parts[1] if len(parts) > 1 else ""})
    return instructions

def simulate_build(dockerfile, context):
    layers = []
    for inst in dockerfile:
        layer_id = hashlib.md5(json.dumps(inst, sort_keys=True).encode()).hexdigest()[:12]
        layers.append({"id": layer_id, "instruction": inst["cmd"], "size": len(inst["args"]) * 10})
    return layers

def calculate_image_size(layers):
    return sum(l["size"] for l in layers)
''',
    "deploy-vllm-serving": '''import numpy as np

def paged_attention(query, key_cache, page_table, block_size=16):
    query = np.asarray(query, dtype=float)
    key_cache = np.asarray(key_cache, dtype=float)
    scores = np.dot(key_cache, query) / np.sqrt(query.shape[-1])
    weights = np.exp(scores - np.max(scores))
    weights /= np.sum(weights)
    return {"output": np.dot(weights, key_cache), "scores": scores}

def estimate_kv_cache_size(layers=32, hidden=4096, max_len=2048, batch=1):
    size = 2 * layers * hidden * max_len * batch * 2
    return {"bytes": size, "gb": round(size / (1024 ** 3), 2)}

def compute_throughput(total_tokens, total_time):
    return {"tokens_per_sec": round(total_tokens / total_time, 2), "total_tokens": total_tokens, "total_time": total_time}
''',
    "deploy-model-quantization-l2": '''import numpy as np

def quantize_fp16(w):
    return np.asarray(w, dtype=float).astype(np.float16)

def quantize_int8(w):
    w = np.asarray(w, dtype=float)
    absmax = float(np.max(np.abs(w)))
    scale = 127.0 / absmax if absmax > 0 else 1.0
    q = np.clip(np.round(w * scale), -127, 127)
    return {"quantized": q.astype(np.int8), "scale": scale}

def quantization_error(orig, quant):
    orig = np.asarray(orig, dtype=float)
    if isinstance(quant, dict):
        deq = np.asarray(quant["quantized"], dtype=float) / float(quant["scale"])
    else:
        deq = np.asarray(quant, dtype=float)
    return {"mse": round(float(np.mean((orig - deq) ** 2)), 6), "max_error": round(float(np.max(np.abs(orig - deq))), 6)}
''',
    # --- Stage 11 fixes ---
    "project-multi-agent": '''class SchedulerAgent:
    def __init__(self, calendar):
        self.calendar = calendar

    def find_slots(self, participants, duration):
        busy = set(self.calendar.get("busy", []))
        all_slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
        return [s for s in all_slots if s not in busy][:3]

class NotifierAgent:
    def notify(self, participants, meeting):
        return {"sent": len(participants), "meeting": meeting, "status": "invited"}

class ConflictResolverAgent:
    def resolve(self, schedules):
        if not schedules:
            return None
        counts = {}
        for s in schedules:
            for t in s:
                counts[t] = counts.get(t, 0) + 1
        return max(counts, key=counts.get)

class MeetingOrchestrator:
    def __init__(self, scheduler, notifier, resolver):
        self.scheduler = scheduler
        self.notifier = notifier
        self.resolver = resolver

    def arrange_meeting(self, request):
        slots = self.scheduler.find_slots(request["participants"], request["duration"])
        if not slots:
            return {"status": "failed", "reason": "no available slot"}
        chosen = self.resolver.resolve([slots])
        result = self.notifier.notify(request["participants"], {"time": chosen, "date": request["date"]})
        return {"status": "success", "meeting": result["meeting"], "notified": result["sent"]}

def eval_meeting_orchestrator(calendar: dict, request: dict) -> dict:
    orch = MeetingOrchestrator(SchedulerAgent(calendar), NotifierAgent(), ConflictResolverAgent())
    return orch.arrange_meeting(request)
''',
    "project-streamlit-dashboard": '''import numpy as np

def compute_metrics(y_true, y_pred):
    y_true, y_pred = np.asarray(y_true), np.asarray(y_pred)
    tp = np.sum((y_true == 1) & (y_pred == 1))
    fp = np.sum((y_true == 0) & (y_pred == 1))
    fn = np.sum((y_true == 1) & (y_pred == 0))
    acc = float(np.mean(y_true == y_pred))
    prec = float(tp / (tp + fp)) if (tp + fp) > 0 else 0.0
    rec = float(tp / (tp + fn)) if (tp + fn) > 0 else 0.0
    f1 = 2 * prec * rec / (prec + rec) if (prec + rec) > 0 else 0.0
    return {"accuracy": round(acc, 4), "precision": round(prec, 4), "recall": round(rec, 4), "f1": round(f1, 4)}

def build_confusion_matrix(y_true, y_pred, labels):
    y_true, y_pred = np.asarray(y_true), np.asarray(y_pred)
    mat = np.zeros((len(labels), len(labels)), dtype=int)
    for t, p in zip(y_true, y_pred):
        mat[t][p] += 1
    return {"labels": labels, "matrix": mat.tolist()}

def detect_drift(reference, current, threshold=0.1):
    ref_mean = float(np.mean(np.asarray(reference, dtype=float)))
    cur_mean = float(np.mean(np.asarray(current, dtype=float)))
    diff = abs(ref_mean - cur_mean) / (abs(ref_mean) + 1e-10)
    return {"drift_detected": bool(diff > threshold), "diff": round(float(diff), 4), "threshold": threshold}
''',
}


COMMENTS = {
    # --- Stage 07 (16) ---
    "nlp-tokenizer-pos-tagger": (
        "按正向最大匹配 (FMM) 算法依据词表切分中文文本，并映射词性词典完成标注。",
        {"fmm_segment": "从当前位置按 max_len 递减长度匹配词表，未登录词退化为单字", "pos_tag": "查表为每个分词赋予词性标签（缺省为 UNK）"},
    ),
    "nlp-tfidf-retriever": (
        "统计词频 TF 与平滑逆文档频率 IDF 计算 TF-IDF 权重，按余弦加和排序文档。",
        {"tf": "计算词项在单篇文档中的相对出现频率", "idf": "按加一平滑公式统计词项区分度权重", "tfidf": "计算 TF 与 IDF 乘积权重", "search": "累加查询词 TF-IDF 得分并返回最相关 top_k 文档索引"},
    ),
    "nlp-word2vec-embedding": (
        "建立排序词汇表映射词到整数索引，构造独热向量并计算词向量余弦相似度。",
        {"build_vocab": "去重排序全部词条并分配连续索引", "one_hot": "生成指定长度并在 idx 处为 1 的独热浮点向量", "cosine_similarity": "计算向量点积除以模长乘积（零向量防除零返回 0）"},
    ),
    "nlp-bert-pretraining": (
        "构造掩码语言模型 (MLM) 随机掩码样本及忽略索引 -100 标签，并计算预测交叉熵损失。",
        {"mask_tokens": "依概率替换目标 token 为 mask_id 并记录非掩码位置为 -100", "mlm_loss": "跳过负标签位仅对被掩码位置求解平均交叉熵"},
    ),
    "nlp-lstm-sequence-model": (
        "实现遗忘门、输入门、输出门与候选记忆细胞状态更新，并在时间步展开前向 LSTM。",
        {"sigmoid": "数值稳定逻辑斯谛门控激活", "lstm_cell": "计算三门一细胞候选状态并迭代更新细胞与隐状态", "lstm_forward": "沿输入序列逐时间步展开并收集隐状态列表"},
    ),
    "nlp-self-attention": (
        "根据缩放点积公式 softmax(QK^T / sqrt(d_k)) V 计算自注意力输出和注意力权重矩阵。",
        {"scaled_dot_product_attention": "按特征维度平方根缩放点积分数并归一化加权求值", "self_attention": "通过三个投影矩阵把输入映射为 Q/K/V 后求解自注意力"},
    ),
    "nlp-multi-head-attention": (
        "将特征维度按头数切分为多组子空间并行计算注意力，最后拼接线性投影汇总输出。",
        {"split_heads": "重塑张量为 (heads, seq, d_head) 形式", "concat_heads": "还原回 (seq, d_model) 二维表征", "multi_head_attention": "独立计算各注意力头输出拼接后再过输出矩阵 Wo"},
    ),
    "nlp-encoder-decoder": (
        "循环编码输入序列词嵌入得到语境向量，再用贪心解码逐词预测输出序列直到结束符。",
        {"encoder_forward": "逐步累加输入嵌入非线性变换产生最终编码隐状态", "decoder_step": "结合上步隐状态与当前词嵌入生成下一时刻隐状态与词表 logits", "greedy_decode": "每步选取概率最大 token 循环生成直至遇见 end_id 或达最大步"},
    ),
    "nlp-bpe-tokenizer-l2": (
        "统计字符级词表中相邻符号对共现频率并反复合并最高频对构建 BPE 子词切分。",
        {"get_stats": "累加各单词中相邻符号对频次", "merge_vocab": "将指定最高频相邻符号对替换合并为单个符号", "bpe_tokenize": "执行 n 轮高频对合并后返回切分列表"},
    ),
    "nlp-bm25-l2": (
        "使用考虑词频饱和度与文档长度归一化的 BM25 信息检索评分模型对文档集合排序。",
        {"bm25": "按逆文档频率、超参 k1 与长度惩罚因子 b 累加查询相关性排序返回"},
    ),
    "nlp-skipgram-l2": (
        "根据中心词嵌入矩阵内积输出上下文词表 Softmax 分布并计算负对数似然损失。",
        {"softmax": "对数几率稳定归一化为概率分布", "skipgram_forward": "提取中心词向量与输出词矩阵相乘并归一化", "skipgram_loss": "提取目标上下词位置的负对数似然"},
    ),
    "nlp-bert-pretrain-l2": (
        "同时实现带掩码过滤的 MLM 损失与判断句对衔接关系的 NSP 二分类交叉熵损失。",
        {"ce": "二维 logits 批量交叉熵计算", "mlm_loss": "按掩码向量加权平均被遮挡位置的交叉熵", "nsp_loss": "直接求下一句预测二分类序列均值损失"},
    ),
    "nlp-gru-l2": (
        "实现融合更新门 z 与重置门 r 的 GRU 门控循环单元并沿时间序列前向递推隐状态。",
        {"sigmoid": "稳定逻辑门控函数", "gru_cell": "用重置门控制历史记忆参与并线性插值更新隐状态", "gru_forward": "兼容字典与 namedtuple 参数格式逐时间步前向递推"},
    ),
    "nlp-cross-attention-l2": (
        "由解码器特征提供 Query 向量，对编码器侧 Keys 和 Values 进行交叉注意力语义融合。",
        {"softmax": "按行稳定计算注意力权重分布", "cross_attention": "按缩放点积把编码器信息聚合并返回", "cross_attention_forward": "投影 Q/K/V 后调用跨模态交叉注意力"},
    ),
    "nlp-mha-l2": (
        "切片划分多头投影通道并行计算各头加权表示，串联后再经线性层 Wo 映射到输出空间。",
        {"softmax": "行级注意力归一化", "multihead_attention": "遍历多头计算上下文加权并乘以输出权重矩阵", "get_weights": "单独抽取各头注意力对齐矩阵用于可视化检查"},
    ),
    "nlp-beam-search-l2": (
        "维护最多 beam 条对数概率累计最高的候选生成路径，逐步扩展探索序列空间。",
        {"beam_search": "按累积对数概率裁剪候选项直至全达 end_id 或最大长度", "eval_beam_search": "利用确定性解码评分回调验证最优解码路径"},
    ),
    # --- Stage 08 (24) ---
    "llm-few-shot-prompting": (
        "计算示例嵌入向量与查询向量之间的余弦相似度，选出最相近的前 k 条作为上下文示范。",
        {"cosine_sim": "求解单位化向量的夹角余弦相似度", "select_examples": "按相似度降序（并列按原序号升序）挑选 top-k 样例"},
    ),
    "llm-cot-reasoning": (
        "利用正则抽取数学文本中的操作数和运算符，生成逐步加法思维链步骤及结论。",
        {"parse_math_problem": "提取文本整数序列与四则运算符", "cot_reasoning": "分步输出加法推导文本并计算结果", "verify_answer": "核对推理字典 answer 字段是否符合预期答案"},
    ),
    "llm-react-agent": (
        "实现 Reason+Act 交错循环：先判断检索或作答，再执行外部工具观察结果迭代收敛。",
        {"think": "依步骤日志是否含 result 决定继续检索或终止回答", "act": "调用工具字典中对应函数，缺失则返回提示", "react_agent": "在最大步数预算内循环 think 与 act 直至输出答案", "eval_react_agent": "以预设无参工具回调函数验证代理闭环执行"},
    ),
    "llm-lora-finetuning": (
        "模拟低秩适配矩阵 BA 并联冻结权重的推理旁路，并量化可训练参数压缩比率。",
        {"lora_forward": "叠加主路径 x@W^T 与低秩旁路 (x@A^T)@B^T", "count_trainable_params": "计算双低秩分解矩阵合计参数量 2*d*r", "compression_ratio": "比较 LoRA 参数占全量 d*d 参数的比例"},
    ),
    "llm-rlhf-alignment": (
        "实现偏好对齐关键统计量：词对数概率、参考策略 KL 散度散斑约束及 PPO 裁剪替代损失。",
        {"compute_log_prob": "Softmax 稳定取指定目标词的对数似然", "kl_divergence": "计算两策略 logits 概率分布的信息散度", "ppo_clip_loss": "按 [1-eps, 1+eps] 裁剪概率比以限制策略步幅"},
    ),
    "llm-qwen-api": (
        "按中英文字符启发式估算 LLM token 开销，计算不同千问规格调用成本并执行限长截断。",
        {"estimate_tokens": "按中文约 1.5、英文约 0.25 权重估算总 token 数量", "estimate_cost": "查表千问百万 token 单价结算预计费用", "truncate_to_limit": "超出上限时逐步裁切字符串末尾使之满足限制"},
    ),
    "llm-text-splitter": (
        "提供支持滑动重叠窗口的按字符分块与按中文句末标点分组的按句切片及块长统计功能。",
        {"split_by_chars": "以固定块长与 overlap 重叠步进切割长文本", "split_by_sentences": "按中文断句号分割后每 max_sentences 句聚合", "compute_chunk_stats": "统计切分总块数、均值及极值长度"},
    ),
    "llm-embedding": (
        "将输入词条映射为词表索引，通过词嵌入均值池化获得句向量并用余弦相似度完成检索。",
        {"tokenize": "滤除未登录词并返回词表索引序列", "embed_text": "对命中词索引嵌入行取均值构造句表示", "similarity_search": "计算归一化余弦分并按降序抽取 top-k 相似文本"},
    ),
    "llm-vector-db-retrieval": (
        "对比全量矩阵乘暴力召回与基于 IVF 聚类中心过滤最近 n_probe 桶的近似向量检索。",
        {"train_ivf": "随机抽取若干向量作为倒排桶质心", "brute_force_search": "全库精确内积排序返回前 top_k 结果", "ivf_search": "先筛选邻近聚类质心对应的局部桶再精排返回"},
    ),
    "llm-tool-use": (
        "封装工具元信息注册结构，解析模型生成的 <tool>...</tool> JSON 标签并动态执行注册函数。",
        {"register_tool": "包装名称、可执行体与 schema 描述", "parse_tool_call": "定位起止标签并用 json 解析工具调用载体", "execute_tool": "匹配注册名称并以关键字参数触发工具"},
    ),
    "llm-function-calling": (
        "执行带参数 JSON Schema 类型（string/number/boolean/array/object）校验及失败自动重试的函数调用。",
        {"execute_function_call": "读取函数名与参数从注册表分派执行", "validate_arguments": "按 JSON Schema 类型映射严格检验字段类型与必填约束", "call_with_retry": "按最大重试次数捕获异常直至成功或上抛末次异常"},
    ),
    "llm-langchain-workflow": (
        "以极简面向接口设计串联单模板 LLMChain、多链数据流水线 SequentialChain 与角色 Agent。",
        {"LLMChain": "渲染提示词模板并交由回调模型生成字符串结果", "SequentialChain": "依次把上一链输出作为下一链字典入参传递", "Agent": "携带身份角色描述生成任务执行记录", "eval_langchain": "组装链条序列与智能体验证端到端流转"},
    ),
    "llm-prompt-template-l2": (
        "将双花括号变量占位符替换为真实键值，并格式化拼接 Few-Shot 问答示范示例。",
        {"render_prompt": "逐一替换 {{key}} 变量占位内容", "inject_examples": "附加上下文学习 Q/A 示例段"},
    ),
    "llm-cot-verify-l2": (
        "正则检查思维链每步中存在的两数加法等式算术一致性与逐步输出结果匹配度。",
        {"verify_cot_steps": "匹配三元加法数值检验前两项之和是否等于结果", "detect_step_error": "剔除首尾空白比对步骤文本是否精确相符"},
    ),
    "llm-tool-plan-l2": (
        "解析 ReAct 步骤状态中的动作与参数并安全调度内置工具，异常时捕获为观测错误信息。",
        {"execute_tool": "查找工具名并安全执行带异常保护的调用", "react_step": "抽取动作参数执行并返回观察记录与摘要思考", "eval_tool_plan": "构建内置加减回显工具注册表测试单步执行"},
    ),
    "llm-qlora-l2": (
        "模拟 QLoRA 4-bit 块级绝对最大值归一化与 NF4 均匀网格索引量化及反量化恢复。",
        {"quantize_nf4": "按最大绝对值缩放至 [-1, 1] 并映射到 16 阶 uint8 索引", "dequantize_nf4": "查表量化等级并乘回 absmax 重建浮点权重"},
    ),
    "llm-dpo-l2": (
        "无需显式奖励模型，直接利用好坏回复相对于参考模型的对数概率差构造 DPO 损失。",
        {"sigmoid": "稳定计算对数差分概率映射", "dpo_loss": "求解正负偏好相对优势对数似然的批均值"},
    ),
    "llm-kv-cache-l2": (
        "维护解码步自回归 Key/Value 张量沿序列维递增拼接，并结合当前 Query 完成缓存注意力。",
        {"softmax": "稳定计算单步注意力权值", "init_kv_cache": "初始化空 K/V 缓存状态", "update_kv_cache": "将新步键值对拼接在历史序列末尾", "attention_with_cache": "使用当前 Query 与完整缓存 K/V 计算多头注意力输出"},
    ),
    "llm-chunk-optimize-l2": (
        "优先沿双换行段落边界聚合文本控制块长上限，并在相邻块之间拼接指定长度尾缀重叠。",
        {"smart_chunk": "尽量保持完整自然段合入分块并支持字符级滑窗重叠", "chunk_stats": "统计切块总数及平均字符数"},
    ),
    "llm-embed-alignment-l2": (
        "对比同类别正样本对与异类别负样本对的平均嵌入余弦相似度，量化表示空间聚类对齐度。",
        {"cosine_sim": "计算嵌入向量夹角余弦", "compute_alignment": "统计全部类内正对均值与类间负对均值及其差值"},
    ),
    "llm-hnsw-l2": (
        "分层由稀疏高层跳表候选向底层全量精细距离计算推进，模拟 HNSW 分层近邻图搜索。",
        {"euclidean": "计算节点间欧氏距离", "hnsw_search": "按层索引步长抽样过滤并排序选出最接近查询的节点索引"},
    ),
    "llm-tool-rag-l2": (
        "完整串联余弦检索、上下文片段格式化提示拼装与传入大模型回调生成增强回复流程。",
        {"cosine_sim": "计算查询与文档向量的余弦相似度", "retrieve": "提取最相似的前 top_k 条三元组文档", "augment": "编排编号上下文形成提示模板", "rag_pipeline": "联合检索与上下文增强触发模型推理"},
    ),
    "llm-stream-output-l2": (
        "按行剥离 SSE 'data: ' 前缀并累积跨片段未完字符串直至构成合法 JSON 后立即吐出。",
        {"is_complete_json": "试探解析字符串判断 JSON 片段是否闭合完整", "parse_sse_stream": "拼接流式分块字符并在每个有效 JSON 边界收集结果"},
    ),
    "llm-agent-memory-l2": (
        "构建固定窗口长度的近期对话缓冲队列，自动滑出最旧消息浓缩到摘要缓存字符串中。",
        {"AgentMemory": "维护定长近期消息列表与溢出的文本历史摘要", "eval_agent_memory": "写入消息列表并提取上下文与摘要"},
    ),
    # --- Stage 09 (12) ---
    "rl-mdpsimulator": (
        "通过贝尔曼最优期望迭代求状态价值收敛不动点，并贪心抽取每个状态下的最优确定性策略。",
        {"value_iteration": "反复应用贝尔曼最优更新直至状态价值最大变化量小于阈值", "extract_policy": "遍历所有状态选出单步回报加折现未来价值最大化的动作"},
    ),
    "rl-qlearning": (
        "实现 epsilon-贪心探索策略、单步离线异策时序差分 TD 目标 Q 更新以及多回合表格型训练。",
        {"epsilon_greedy": "依概率随机探索，贪心模式下总选最大 Q 值动作索引", "q_update": "依据下个状态最大 Q 值原地更新当前动作价值", "q_learning": "按转换矩阵迭代多回合记录平均累计回报"},
    ),
    "rl-sarsa": (
        "在同策 SARSA 控制中同步使用下一步实际选取动作的 Q 值完成在策略时序差分学习。",
        {"sarsa_update": "用 (s', a') 实际估值而非 max 计算 TD 目标更新 Q 表", "epsilon_greedy": "执行策略采样", "sarsa": "维护动作-状态转移流在同策探索下更新收敛"},
    ),
    "rl-dqn": (
        "用环形覆写数组封装经验回放池，并基于在线网络 Q 值与目标网络最大未来值计算均方 TD 误差。",
        {"ReplayBuffer": "固定容量环形覆盖写入与随机小批量抽样", "compute_td_loss": "依据终止标记区分单步目标值计算批次均方 TD 损失", "eval_replay_buffer": "验证环形覆写位置与存储元素长度"},
    ),
    "rl-ppo": (
        "反向递推计算广义优势估计 (GAE) 平衡偏差方差，并构造 PPO 近端策略截断替代目标。",
        {"compute_advantages": "从后往前按 gamma 与 lambda 累积时序差分优势值", "ppo_clip_surrogate": "比较未裁剪与截断后策略重要性比值乘积目标"},
    ),
    "rl-actor-critic": (
        "线性参数化 Softmax 策略演员与状态值函数评论家，结合 TD 误差同时更新两个组件。",
        {"actor_forward": "线性特征计算动作对数几率并通过 Softmax 输出概率", "critic_forward": "点积估计状态基线标量价值", "actor_critic_train": "按 TD 误差作为优势权重同步更新演员策略梯度与评论家权重"},
    ),
    "rl-bellman-l2": (
        "分别实现等概率随机策略下状态价值的贝尔曼期望算子与贪心最大化的贝尔曼最优算子。",
        {"bellman_expectation": "对各动作期望回报取平均更新状态值向量", "bellman_optimal": "取所有动作期望回报最大值实施最优值备份"},
    ),
    "rl-epsilon-decay-l2": (
        "生成带下界保底的指数衰减探索率曲线并实现 epsilon-贪心动作选择器。",
        {"epsilon_greedy": "随机探索或按当前状态价值表挑出最高分动作", "decay_schedule": "按指数比率衰减但始终不低于下界 eps_end"},
    ),
    "rl-sarsa-lambda-l2": (
        "在同策 SARSA 框架下引入累加资格迹 (Eligibility Traces) 把末端延迟奖赏回传给既往状态动作对。",
        {"sarsa_lambda": "每步计算 TD 误差并按累加资格迹同时回溯更新全状态空间 Q 表"},
    ),
    "rl-double-dqn-l2": (
        "通过在线网络挑选最佳下一动作再交由目标网络评估其 Q 值，缓解传统 DQN 最大化高估偏差。",
        {"double_dqn_update": "解耦动作选择 (argmax online) 与价值评估 (target) 计算批次均方 TD 损失"},
    ),
    "rl-gae-l2": (
        "实现指数加权多步 TD 误差的广义优势估计函数 compute_gae，兼容不同终止边界长度。",
        {"compute_gae": "逆序累加 delta + gamma*lam*gae 生成优势数组"},
    ),
    "rl-actor-critic-continuous-l2": (
        "构建面向连续动作空间的高斯策略分布参数输出头，并实现对应正态对数密度函数求值。",
        {"normal_log_prob": "根据高斯均值与标准差求解连续动作点的对数概率密度", "actor_critic_continuous": "用线性均值头、指数正标准差头与评论家权向量输出连续策略参数及估值"},
    ),
    # --- Stage 10 (10) ---
    "deploy-fastapi-service": (
        "实现模型微服务请求 Schema 类型检查、标准预测 JSON 响应封装及 OpenAPI 3.0 路由清单生成。",
        {"validate_input": "支持类型对象及类型名字符串检查必填项与类型合规性", "format_response": "包装预测结果与四位置信度形成统一响应格式", "build_openapi_spec": "将接口元数据转换为 OpenAPI 3.0 Paths 规范"},
    ),
    "deploy-onnx-export": (
        "模拟线性层权重导出为序列化的版本 7 计算图字典、加载权重前向推理及精度误差一致性对比。",
        {"export_onnx": "序列化张量初始化器及输入输出形状构成模拟计算图", "onnx_inference": "解析初始化权重矩阵对输入作仿射前向推理", "compare_outputs": "校验原始推理与 ONNX 推理最大偏差是否在容差之内"},
    ),
    "deploy-docker-packaging": (
        "解析 Dockerfile 核心指令流、按命令内容计算确定性 MD5 层摘要，并累计总镜像体积。",
        {"parse_dockerfile": "忽略空行和注释提取标准镜像构建指令列表", "simulate_build": "依据 JSON 指令生成 12 位 MD5 层 ID 与长度估算大小", "calculate_image_size": "求和所有构建层的镜像大小"},
    ),
    "deploy-ollama-inference": (
        "模拟本地大模型服务回复生成、常见模型规格清单返回以及按十亿参数量测算 FP16/INT8 显存需求。",
        {"ollama_generate": "拼装模拟响应消息和生成的最大 token 数量", "ollama_list_models": "列举内置本地推荐开源模型规模对照表", "estimate_ram_usage": "依据参数量估算半精度、8 位量化所需内存及安全推荐容量"},
    ),
    "deploy-vllm-serving": (
        "实现离散页式 KV 注意力得分与加权聚合、高并发长文本 KV 缓存显存估算及服务吞吐统计。",
        {"paged_attention": "按查询与缓存键执行缩放注意力得到输出与权分", "estimate_kv_cache_size": "按层数、隐藏维、长度、批大小及 FP16 字节计算总显存字节与 GB", "compute_throughput": "计算每秒处理平均 token 吞吐量"},
    ),
    "deploy-async-handler-l2": (
        "用 asyncio.gather 并发调度多请求并附带单请求超时隔离保护，同时提供令牌桶限流计数器。",
        {"async_process": "异步并发执行全部请求并用 timeout 捕获超时转为超时标签", "rate_limiter": "利用闭包维护剩余令牌配额决定放行或拒绝"},
    ),
    "deploy-onnx-optimize-l2": (
        "遍历计算图识别相邻 Conv + BatchNormalization 节点执行算子融合，返回优化后静态图。",
        {"fuse_conv_bn": "扫描连续卷积与批归一化算子合并为单一 ConvBN 节点", "constant_folding": "保留图结构占位常量折叠通道", "optimize_onnx": "串联算子融合与折叠标记 optimized 为 True"},
    ),
    "deploy-docker-multi-stage-l2": (
        "按 FROM 关键字切分多阶段构建流程，单独估算构建期与精简运行期各层数量和体量。",
        {"parse_stages": "按 FROM 分界切出独立阶段基镜像及指令集", "multi_stage_build": "统计各阶段层数规模并标识末段产物的 final 状态"},
    ),
    "deploy-model-quantization-l2": (
        "对比模型权重半精度 FP16 与对称量化 INT8 编码方案，并计算原始权重间的 MSE 与最大误差。",
        {"quantize_fp16": "转为 IEEE 754 float16 低精度数组", "quantize_int8": "依据 max(|w|) 计算 127 尺度因子执行对称整型截断映射", "quantization_error": "反量化至浮点域计算重建均方误差与绝对峰值误差"},
    ),
    "deploy-continuous-batching-l2": (
        "模拟大语言模型动态批处理调度器：每步从等待队列即时补位完成释出的请求槽位以提升吞吐。",
        {"continuous_batching": "在 max_batch 槽位池中边生成 token 边剔除满长请求并立刻补充新请求"},
    ),
    # --- Stage 11 (10) ---
    "project-ai-customer-service": (
        "通过关键词命中率判别客服意图、正则抽取手机订单与商品实体并填表生成个性化回复。",
        {"classify_intent": "依据意图词表命中计数挑选最佳意图与置信度", "extract_entities": "正则提取两字母八数字订单号及核心品类商品名", "generate_response": "使用抽取到的实体字典格式化渲染意图答复模板"},
    ),
    "project-code-assistant": (
        "解析光标字节偏移所在代码行号和缩进深度，再依关键词匹配相关代码片段排序提供智能补全。",
        {"extract_context": "定位当前行字符串、缩进空格数以及前一行上下文", "suggest_completions": "按相关度得分降序推荐至多前 5 个候选补全块", "calculate_relevance": "统计当前行中包含代码片段关键字的命中数目"},
    ),
    "project-multi-agent": (
        "封装日程查询、冲突消解与通知派发三类角色智能体，通过协调者编排多智能体自动约会工作流。",
        {"SchedulerAgent": "过滤繁忙时段从备选工位抽样空闲时间片", "NotifierAgent": "向与会人员列表下发会议邀请摘要", "ConflictResolverAgent": "统计所有参与方时间交集频次选出共赢最优时段", "MeetingOrchestrator": "串行驱动空挡挖掘、冲突仲裁与全员通知发送", "eval_meeting_orchestrator": "组建智能体协同完成一次端到端约会调度"},
    ),
    "project-gradio-demo": (
        "模拟机器学习可视化演示界面的声明式组件构建、多选项卡分组以及队列批请求调度器。",
        {"build_interface": "整理输入输出组件数量、调用函数名并置为就绪状态", "create_tab_group": "封装选项卡结构并默认激活首个页面", "queue_request": "遍历指定队列长度同步执行推理函数或默认回显"},
    ),
    "project-streamlit-dashboard": (
        "一站式计算模型监测指标（准确率/精召回/F1）、自定义多分类混淆矩阵和均值偏移数据漂移检测。",
        {"compute_metrics": "从二分类标签统计 TP/FP/FN 并求全套评估分值", "build_confusion_matrix": "构造实际×预测计数方阵", "detect_drift": "对比参照窗口与当前流特征均值的相对漂移幅值触发告警"},
    ),
    "proj-sentiment-analyzer-l2": (
        "实现文本规范化预处理、正负面情感词计数特征提取、情绪极性判定以及按严重程度工单分流路由。",
        {"preprocess": "转小写并剔除字母数字与空白以外的标点符号", "extract_features": "对照内置正负面词典分别统计积极/消极词命中量", "classify_sentiment": "用正负词比值阈值划分为正向/中性/负向情感", "route_by_sentiment": "按情感极性分配自动回复、常规队列或紧急工单人工座席"},
    ),
    "proj-code-reviewer-l2": (
        "实现静态代码规范与隐患审计工具：扫描超长行与尾随空格、标记等号真值比较并度量圈复杂度。",
        {"check_style": "逐行查验超过 80 字符、双空格及行尾空格等问题", "detect_bugs": "标记代码中隐含的 == 判断改进建议", "cyclomatic_complexity": "通过统计控制流分支关键词数目估算函数圈复杂度"},
    ),
    "proj-task-decomposer-l2": (
        "依据自然语言任务中的动作关键词拆解原子步骤流，再结合智能体能力匹配和余力均衡指派。",
        {"decompose_task": "识别数据、分析、报告与图表动词生成执行子任务列表", "assign_subtasks": "在能胜任的子智能体中优先调度当前剩余算力最充足者并扣减负载"},
    ),
    "proj-interactive-dashboard-l2": (
        "模拟参数滑块即时驱动的交互式模型控制台：构建输入规范、计算逻辑回归概率输出及记录用户反馈。",
        {"build_demo": "声明交互界面入参清单与在线实时就绪配置", "update_plot": "依据当前滑块特征向量与权重内积输出概率置信度", "process_feedback": "将用户校正样本对标注为已日志归档"},
    ),
    "proj-ml-pipeline-l2": (
        "对预测序列求解 MSE/RMSE/MAE 误差指标、检测训练与验证损失过拟合间隙并自动生成迭代简报。",
        {"compute_metrics": "计算连续预测值的均方根及平均绝对误差", "detect_overfitting": "判断 val_loss-train_loss 间隙是否逾越警戒线并给出正则建议", "build_report": "汇总最新轮次各项指标给出调参或稳步提升诊断趋势"},
    ),
}


PUBLIC_CASE_OVERRIDES = {
    # --- Stage 07 public overrides ---
    "nlp-tokenizer-pos-tagger": [
        case("fmm segments with greedy longest match", "fmm_segment", ["我们在野生动物园玩", ["我们", "在", "野生", "野生动物", "野生动物园", "动物园", "玩"], 5], ["我们", "在", "野生动物园", "玩"]),
        case("pos tag maps known and unknown tokens", "pos_tag", [["我们", "玩", "XYZ"], {"我们": "PRON", "玩": "VERB"}], [{"word": "我们", "pos": "PRON"}, {"word": "玩", "pos": "VERB"}, {"word": "XYZ", "pos": "UNK"}]),
    ],
    "nlp-tfidf-retriever": [
        case("tf computes relative term frequency", "tf", ["苹果", ["苹果", "香蕉", "苹果", "梨"]], 0.5),
        case("search ranks matching doc highest", "search", ["苹果", [["香蕉", "橙子"], ["苹果", "香蕉", "苹果"], ["葡萄", "梨"]], 2], "__COMPUTE__", check=lambda out: len(out) == 2 and out[0][0] == 1 and out[0][1] > out[1][1]),
    ],
    "nlp-word2vec-embedding": [
        case("vocab build sorted indices", "build_vocab", [[["我", "爱", "NLP"], ["NLP", "很", "有趣"]]], {"NLP": 0, "很": 1, "我": 2, "有趣": 3, "爱": 4}),
        case("one hot sets target dimension", "one_hot", [2, 4], [0.0, 0.0, 1.0, 0.0]),
    ],
    "nlp-bert-pretraining": [
        case("mask_tokens prob 0 changes nothing", "mask_tokens", [[0, 1, 2, 3, 4], 100, 0.0], {"masked": [0, 1, 2, 3, 4], "labels": [-100, -100, -100, -100, -100]}),
        case("mask_tokens prob 1 masks every position", "mask_tokens", [[5, 6, 7], 99, 1.0], {"masked": [99, 99, 99], "labels": [5, 6, 7]}),
    ],
    "nlp-lstm-sequence-model": [
        case(
            "lstm forward step count and shape",
            "lstm_forward",
            [
                [[1, 0], [0, 1], [1, 1]],
                {
                    "Wf": [[0.1], [0.2]], "Uf": [[0.2]], "bf": [0],
                    "Wi": [[0.1], [0.2]], "Ui": [[0.2]], "bi": [0],
                    "Wo": [[0.1], [0.2]], "Uo": [[0.2]], "bo": [0],
                    "Wc": [[0.1], [0.2]], "Uc": [[0.2]], "bc": [0],
                },
            ],
            "__COMPUTE__",
            check=lambda out: len(out) == 3 and len(out[0]) == 1,
        ),
        case("sigmoid at zero equals 0.5", "sigmoid", [[0.0]], [0.5]),
    ],
    "nlp-self-attention": [
        case(
            "scaled dot product attention shapes and weight row sum 1",
            "scaled_dot_product_attention",
            [[[1, 2], [3, 4]], [[1, 2], [3, 4]], [[1, 0], [0, 1]]],
            "__COMPUTE__",
            check=lambda out: len(out["output"]) == 2 and all(abs(sum(row) - 1.0) < 1e-6 for row in out["weights"]),
        ),
        case(
            "self_attention with identity projections",
            "self_attention",
            [[[1, 0], [0, 1]], [[1, 0], [0, 1]], [[1, 0], [0, 1]], [[2, 0], [0, 4]]],
            "__COMPUTE__",
            check=lambda out: len(out["output"]) == 2 and out["output"][0][0] > out["output"][1][0],
        ),
    ],
    "nlp-multi-head-attention": [
        case(
            "split_heads reshapes (4, 4) into (2, 4, 2)",
            "split_heads",
            [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], 2],
            [[[1.0, 2.0], [5.0, 6.0], [9.0, 10.0], [13.0, 14.0]], [[3.0, 4.0], [7.0, 8.0], [11.0, 12.0], [15.0, 16.0]]],
        ),
        case(
            "multi_head_attention preserves sequence shape",
            "multi_head_attention",
            [[[1, 0, 1, 0], [0, 1, 0, 1]], {"Wq": [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], "Wk": [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], "Wv": [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], "Wo": [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]}, 2],
            "__COMPUTE__",
            check=lambda out: len(out["output"]) == 2 and len(out["heads"]) == 2,
        ),
    ],
    "nlp-encoder-decoder": [
        case("encoder_forward returns fixed dim vector", "encoder_forward", [[0, 1], [[1, 0], [0, 1]], [[1, 0], [0, 1]]], "__COMPUTE__", check=lambda out: len(out) == 2 and out[1] > 0.5),
        case(
            "greedy_decode halts at end_id",
            "greedy_decode",
            [[0.0, 0.0], 0, 2, 5, {"W_emb": [[1, 0], [0, 1], [1, 1]], "W_dec": [[1, 0], [0, 1]], "W_out": [[0, 5, 0], [0, 0, 5]]}],
            [1],
        ),
    ],
    "nlp-bpe-tokenizer-l2": [
        case("bpe merge 2 rounds", "bpe_tokenize", ["lowlower", {}, 2], "__COMPUTE__", check=lambda out: len(out) < len("lowlower") and "".join(out) == "lowlower"),
        case("bpe 0 merges preserves chars", "bpe_tokenize", ["cat", {}, 0], ["c", "a", "t"]),
    ],
    "nlp-bm25-l2": [
        case("bm25 ranks matching doc first", "bm25", ["hello world", ["hello world", "hello there", "bye now"], 1.5, 0.75], "__COMPUTE__", check=lambda out: len(out) == 3 and out[0][0] == 0 and out[0][1] > out[1][1] and out[2][1] == 0.0),
        case("bm25 unseen query returns zero scores", "bm25", ["quantum", ["hello", "world"], 1.5, 0.75], [[0, 0.0], [1, 0.0]]),
    ],
    "nlp-skipgram-l2": [
        case("softmax sums to 1", "softmax", [[1.0, 2.0, 3.0]], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(sum(out) - 1.0) < 1e-6),
        case("skipgram forward symmetric embeddings uniform", "skipgram_forward", [0, [[0.0, 0.0], [1.0, 1.0]], [[1.0, 1.0], [1.0, 1.0], [1.0, 1.0]]], [1/3, 1/3, 1/3]),
    ],
    "nlp-bert-pretrain-l2": [
        case("mlm loss masks only position 0", "mlm_loss", [[[0, 0], [10, 0]], [1, 1], [1, 0]], 0.6931),
        case("nsp loss perfect predictions near 0", "nsp_loss", [[[10.0, -10.0], [-10.0, 10.0]], [0, 1]], 0.0),
    ],
    "nlp-gru-l2": [
        case(
            "gru forward zero input returns zero hidden sequence",
            "gru_forward",
            [[[0, 0], [0, 0]], {"Wz": [[0.1, -0.1], [0.2, -0.2]], "Uz": [[0.1, -0.1], [0.2, -0.2]], "bz": [0, 0], "Wr": [[0.1, -0.1], [0.2, -0.2]], "Ur": [[0.1, -0.1], [0.2, -0.2]], "br": [0, 0], "Wh": [[0.1, -0.1], [0.2, -0.2]], "Uh": [[0.1, -0.1], [0.2, -0.2]], "bh": [0, 0]}],
            [[0.0, 0.0], [0.0, 0.0]],
        ),
        case(
            "gru forward non-zero sequence length matches steps",
            "gru_forward",
            [[[1, 0], [0, 1]], {"Wz": [[0.1, -0.1], [0.2, -0.2]], "Uz": [[0.1, -0.1], [0.2, -0.2]], "bz": [0, 0], "Wr": [[0.1, -0.1], [0.2, -0.2]], "Ur": [[0.1, -0.1], [0.2, -0.2]], "br": [0, 0], "Wh": [[0.1, -0.1], [0.2, -0.2]], "Uh": [[0.1, -0.1], [0.2, -0.2]], "bh": [0, 0]}],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and len(out[0]) == 2 and out[0] != [0.0, 0.0],
        ),
    ],
    "nlp-cross-attention-l2": [
        case(
            "cross attention orthogonal queries pick aligned value",
            "cross_attention",
            [[[10, 0], [0, 10]], [[10, 0], [0, 10]], [[1, 2], [3, 4]]],
            "__COMPUTE__",
            check=lambda out: abs(out[0][0] - 1.0) < 1e-6 and abs(out[1][1] - 4.0) < 1e-6,
        ),
        case(
            "cross_attention_forward identity weights",
            "cross_attention_forward",
            [[[1, 0]], [[1, 0], [0, 1]], [[1, 0], [0, 1]], [[1, 0], [0, 1]], [[5, 6], [7, 8]]],
            "__COMPUTE__",
            check=lambda out: len(out) == 1 and out[0][0] < 6.0 and out[0][1] < 7.0,
        ),
    ],
    "nlp-mha-l2": [
        case(
            "multihead_attention identity maps sequence",
            "multihead_attention",
            [[[1, 0, 1, 0], [0, 1, 0, 1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and len(out[0]) == 4,
        ),
        case(
            "get_weights returns h square row-stochastic matrices",
            "get_weights",
            [[[1, 0, 0, 1], [0, 1, 1, 0]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], 2],
            "__COMPUTE__",
            check=lambda out: len(out) == 2 and all(abs(sum(row) - 1.0) < 1e-6 for h_mat in out for row in h_mat),
        ),
    ],
    "nlp-beam-search-l2": [
        case("beam chooses preferred path and halts at end_id", "eval_beam_search", [[5.0, 0.0, -5.0], 1, 2, 4, 2], [0, 1, 1, 2]),
        case("immediate stop when init_logits picks end_id", "eval_beam_search", [[-5.0, -5.0, 5.0], 1, 2, 4, 2], [2]),
    ],
    # --- Stage 08 public overrides ---
    "llm-few-shot-prompting": [
        case(
            "select returns top-k closest examples",
            "select_examples",
            [[0.1, 0.2, 0.3], [{"emb": [0.9, 0.8, 0.7], "text": "好"}, {"emb": [0.1, 0.2, 0.3], "text": "最好"}, {"emb": [0.5, 0.5, 0.5], "text": "中"}, {"emb": [0, 0, 0.1], "text": "差"}], 2],
            [{"emb": [0.1, 0.2, 0.3], "text": "最好"}, {"emb": [0.5, 0.5, 0.5], "text": "中"}],
        ),
        case("orthogonal vectors cosine 0", "cosine_sim", [[1, 0], [0, 1]], 0.0),
    ],
    "llm-cot-reasoning": [
        case("cot addition produces steps and sum", "cot_reasoning", ["12 + 34 + 5"], {"steps": ["当前数字: 12", "当前数字: 34", "当前数字: 5", "相加得: 51"], "answer": 51}),
        case("verify_answer confirms expected", "verify_answer", [{"answer": 42}, 42], True),
    ],
    "llm-react-agent": [
        case("eval react reaches answer in 2 steps", "eval_react_agent", ["查找天气", "ok", 5], {"answer": "search -> result:晴天 25C", "steps": ["search -> result:晴天 25C"]}),
        case("eval react missing tool hits max steps", "eval_react_agent", ["查找天气", "empty", 2], {"answer": "max steps reached", "steps": ["search -> unknown action: search", "search -> unknown action: search"]}),
    ],
    "llm-lora-finetuning": [
        case("lora compression ratio", "compression_ratio", [1024, 8], 0.0156),
        case("trainable params count", "count_trainable_params", [512, 4], 4096),
    ],
    "llm-rlhf-alignment": [
        case("kl divergence zero for identical logits", "kl_divergence", [[1, 2, 3, 4], [1, 2, 3, 4]], "__COMPUTE__", check=lambda out: abs(out) < 1e-9),
        case("ppo clip loss exact without clipping", "ppo_clip_loss", [1.0, 1.0, 2.0, 0.2], -2.0),
    ],
    "llm-qwen-api": [
        case("estimate tokens", "estimate_tokens", ["你好世界 hello"], 8),
        case("estimate cost qwen-max", "estimate_cost", [1000000, 500000, "qwen-max"], 5.0),
    ],
    "llm-text-splitter": [
        case("split basic with overlap", "split_by_chars", ["一二三四五六七八九十", 5, 2], ["一二三四五", "四五六七八", "七八九十"]),
        case("compute_chunk_stats summary", "compute_chunk_stats", [["ab", "abcd", "abcdef"]], {"count": 3, "avg_len": 4.0, "min": 2, "max": 6}),
    ],
    "llm-embedding": [
        case("tokenize skips unknown words", "tokenize", ["hello unknown world", {"hello": 0, "world": 2}], [0, 2]),
        case("embed_text pools matching token vectors", "embed_text", ["a b", {"a": 0, "b": 1}, [[1, 3], [3, 1]]], [2.0, 2.0]),
    ],
    "llm-vector-db-retrieval": [
        case("brute_force_search returns top k sorted scores", "brute_force_search", [[1, 0], [[1, 0], [0, 1], [2, 0]], [10, 20, 30], 2], [[30, 2.0], [10, 1.0]]),
        case("ivf_search probes nearest cluster first", "ivf_search", [[1, 0], [[1, 0], [-1, 0]], [[2, 0], [0.5, 0], [-3, 0]], [100, 101, 102], 1, 2], [[100, 2.0], [101, 0.5]]),
    ],
    "llm-tool-use": [
        case("parse tool call", "parse_tool_call", ["计算结果是 <tool>{\"name\":\"calc\",\"args\":{\"a\":1,\"b\":2}}</tool>"], {"name": "calc", "args": {"a": 1, "b": 2}}),
        case("parse returns None without tool tag", "parse_tool_call", ["纯文本无工具调用"], "__COMPUTE__", check=lambda out: out is None),
    ],
    "llm-function-calling": [
        case("validate string and number schema", "validate_arguments", [{"name": "Alice", "age": 30}, {"properties": {"name": {"type": "string"}, "age": {"type": "number"}}}], True),
        case("validate rejects wrong type and bool-as-number", "validate_arguments", [{"age": True}, {"properties": {"age": {"type": "number"}}}], False),
    ],
    "llm-langchain-workflow": [
        case("sequential chain & agent output", "eval_langchain", [["hi {input}"], {"input": "world"}, "汇总"], {"chain_out": "HI WORLD", "agent_out": "Bot(助手)执行: 汇总"}),
        case("two chained prompt templates", "eval_langchain", [["a:{name}", "b:{input}"], {"name": "ai"}, "跑通"], {"chain_out": "B:A:AI", "agent_out": "Bot(助手)执行: 跑通"}),
    ],
    "llm-prompt-template-l2": [
        case("render replaces placeholders", "render_prompt", ["Hello {{name}}!", {"name": "World"}], "Hello World!"),
        case("inject_examples formats Q/A pairs", "inject_examples", ["Translate:", [["hi", "你好"]]], "Translate:\n\nExamples:\nQ: hi\nA: 你好"),
    ],
    "llm-cot-verify-l2": [
        case("verify valid addition passes", "verify_cot_steps", [["Alice has 5 apples", "Total = 5+3 = 8"]], {"valid": True, "errors": []}),
        case("verify wrong addition flags step index", "verify_cot_steps", [["Total = 5+3 = 9"]], {"valid": False, "errors": [[0, "addition error"]]}),
    ],
    "llm-tool-plan-l2": [
        case("eval_tool_plan executes add tool", "eval_tool_plan", ["add", {"a": 3, "b": 4}, "computing"], {"observation": "7", "thought": "Executed add, got: 7"}),
        case("execute_tool missing returns Error message", "execute_tool", ["search", {"q": "weather"}, {}], "Error: unknown tool search"),
    ],
    "llm-qlora-l2": [
        case("quantize_nf4 tracks absmax and indices", "quantize_nf4", [[-1.0, 0.0, 1.0]], {"indices": [0, 7, 15], "absmax": 1.0}),
        case("dequantize_nf4 scales back boundaries", "dequantize_nf4", [{"indices": [0, 15]}, 2.0], [-2.0, 2.0]),
    ],
    "llm-dpo-l2": [
        case("dpo loss computes sigmoid margin", "dpo_loss", [[-0.1, -0.2], [-0.5, -0.6], [-0.15, -0.25], [-0.45, -0.55], 0.1], 0.6882),
        case("dpo equal margin gives ln(2)", "dpo_loss", [[0.0], [0.0], [0.0], [0.0], 0.1], 0.6931),
    ],
    "llm-kv-cache-l2": [
        case("init_kv_cache starts empty", "init_kv_cache", [], {"K": None, "V": None}),
        case(
            "update and attend with cache",
            "attention_with_cache",
            [[[[[1, 0]]]], {"K": [[[[1, 0], [0, 1]]]], "V": [[[[2, 0], [0, 5]]]]}],
            "__COMPUTE__",
            check=lambda out: out[0][0][0][0] > 1.0 and out[0][0][0][1] < 2.5,
        ),
    ],
    "llm-chunk-optimize-l2": [
        case("smart_chunk merges short and splits when exceeding chunk_size", "smart_chunk", ["P1\n\nP2\n\nP3\n\nP4", 6, 0], ["P1\n\nP2", "P3\n\nP4"]),
        case("chunk_stats counts blocks", "chunk_stats", [["abc", "defg"]], {"count": 2, "avg": 3.5}),
    ],
    "llm-embed-alignment-l2": [
        case("compute alignment orthogonal clusters", "compute_alignment", [[[1, 0], [1, 0], [0, 1], [0, 1]], [0, 0, 1, 1]], {"alignment": 1.0, "pos_sim": 1.0, "neg_sim": 0.0}),
        case("cosine_sim identical normalized vectors", "cosine_sim", [[3, 4], [3, 4]], "__COMPUTE__", check=lambda out: abs(out - 1.0) < 1e-6),
    ],
    "llm-hnsw-l2": [
        case("hnsw search top 2 closest indices", "hnsw_search", [[0.5, 0.5], [[0, 0], [1, 1], [0.4, 0.6], [0.6, 0.4]], 2, 2], [2, 3]),
        case("euclidean origin distance", "euclidean", [[0, 0], [3, 4]], 5.0),
    ],
    "llm-tool-rag-l2": [
        case("retrieve ranks closest doc first", "retrieve", [[0.1, 0.2, 0.3], [[1, [0.9, 0.1, 0.0], "doc1"], [2, [0.1, 0.2, 0.3], "doc2"]], 1], [[2, [0.1, 0.2, 0.3], "doc2"]]),
        case("augment builds context prompt", "augment", ["Q?", [[1, [0], "Alpha"]]], "Context:\n[1] Alpha\n\nQuestion: Q?\nAnswer:"),
    ],
    "llm-stream-output-l2": [
        case("parse split chunk SSE json", "parse_sse_stream", [["data: {\"name\":", "data: \"test\"}\n\n"]], [{"name": "test"}]),
        case("parse multiple objects across chunks", "parse_sse_stream", [["data: {\"a\": 1}\n", "data: {\"b\": 2}\n"]], [{"a": 1}, {"b": 2}]),
    ],
    "llm-agent-memory-l2": [
        case("window trims older messages into summary", "eval_agent_memory", [["hello", "how are you", "bye", "ok"], 2], {"context": ["Summary: hello\nhow are you\n...", "bye", "ok"], "summary": "hello\nhow are you\n"}),
        case("within window keeps empty summary", "eval_agent_memory", [["m1", "m2"], 3], {"context": ["m1", "m2"], "summary": ""}),
    ],
    # --- Stage 09 public overrides ---
    "rl-mdpsimulator": [
        case("simple 2-state mdp converges", "value_iteration", [2, 2, [[[0.5, 0.5], [0.8, 0.2]], [[0.3, 0.7], [0.9, 0.1]]], [[[1, 0], [0, 2]], [[0, 1], [2, 0]]], 0.9, 0.01], "__COMPUTE__", check=lambda out: len(out) == 2 and out[0] > 9.0 and out[1] > 10.0),
        case("extract_policy chooses higher immediate reward action", "extract_policy", [[0.0, 0.0], [0, 1], [0, 1], [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], [[[0, 0], [0, 5]], [[1, 0], [0, 0]]]], [1, 0]),
    ],
    "rl-qlearning": [
        case("q_learning deterministic greedy learns terminal reward", "q_learning", [{"n_states": 2, "n_actions": 2, "trans": [[[1, 0], [0, 1]], [[0, 1], [0, 1]]], "rewards": [[[0, 0], [0, 10]], [[0, 0], [0, 0]]]}, 2, 0.5, 0.9, 0.0], "__COMPUTE__", check=lambda out: len(out["Q"]) == 2 and out["Q"][0][1] >= 0),
        case("epsilon_greedy eps=0 selects highest Q action", "epsilon_greedy", [[[1.0, 5.0, 2.0]], 0, 0.0], 1),
    ],
    "rl-sarsa": [
        case("sarsa deterministic greedy traversal", "sarsa", [{"n_states": 2, "n_actions": 2, "trans": [[[0, 1], [1, 0]], [[0, 1], [0, 1]]], "rewards": [[[0, 1], [0, 0]], [[0, 0], [0, 0]]]}, 1, 0.5, 0.9, 0.0], "__COMPUTE__", check=lambda out: len(out["Q"]) == 2 and out["avg_return"] == 1.0),
        case("epsilon_greedy eps=0 picks max column", "epsilon_greedy", [[[3.0, 1.0], [2.0, 8.0]], 1, 0.0], 1),
    ],
    "rl-dqn": [
        case("replay buffer push wraps circularly at capacity", "eval_replay_buffer", [2, [[0, 1, 1.0, 1, False], [1, 0, 0.5, 2, False], [2, 1, 2.0, 0, True]]], {"size": 2, "pos": 1, "buf": [[2, 1, 2.0, 0, True], [1, 0, 0.5, 2, False]]}),
        case("compute_td_loss terminal ignores target max", "compute_td_loss", [[[0, 1, 3.0, 1, True]], [[1.0, 2.0], [5.0, 5.0]], [[9.0, 9.0], [10.0, 10.0]], 0.9], 1.0),
    ],
    "rl-ppo": [
        case("gae advantages matches GAE formula", "compute_advantages", [[0, 0, 1], [0.5, 0.6, 0.8], 0.9, 0.95], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(out[2] - 0.2) < 1e-6),
        case("ppo_clip_surrogate clips excessive positive advantage ratio", "ppo_clip_surrogate", [0.0, 1.0, 2.0, 0.2], -2.4),
    ],
    "rl-actor-critic": [
        case("actor forward sum to 1", "actor_forward", [[1, 0], [[0, 1], [2, 3]]], "__COMPUTE__", check=lambda out: len(out) == 2 and abs(sum(out) - 1.0) < 1e-6 and out[1] > out[0]),
        case("critic forward linear baseline", "critic_forward", [[2, -1], [3, 4]], 2.0),
    ],
    "rl-bellman-l2": [
        case("bellman expectation 2 states uniform actions", "bellman_expectation", [[0, 0], [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], [[[2, 0], [0, 4]], [[6, 0], [0, 2]]], 0.9], [3.0, 4.0]),
        case("bellman optimal picks best action per state", "bellman_optimal", [[0, 0], [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], [[[2, 0], [0, 4]], [[6, 0], [0, 2]]], 0.9], [4.0, 6.0]),
    ],
    "rl-double-dqn-l2": [
        case("double dqn non-terminal update", "double_dqn_update", [[[0.1, 0.2], [0.7, 0.8]], [[0.15, 0.25], [0.75, 0.85]], [[0, 1, 1.0, 1, False]], 0.9], "__COMPUTE__", check=lambda out: out > 2.0),
        case("double dqn terminal transition uses immediate reward", "double_dqn_update", [[[1.0, 2.0], [5.0, 6.0]], [[10.0, 20.0], [50.0, 60.0]], [[0, 1, 2.0, 1, True]], 0.9], 0.0),
    ],
    "rl-gae-l2": [
        case("gae 3-step trajectory", "compute_gae", [[0, 0, 1], [0.5, 0.6, 0.8], 0.9, 0.95], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(out[2] - 0.2) < 1e-6),
        case("gae lam=0 equals one-step td error", "compute_gae", [[1.0, 2.0], [0.5, 1.0], 0.9, 0.0], [1.4, 1.0]),
    ],
    "rl-actor-critic-continuous-l2": [
        case("continuous ac matrix head outputs", "actor_critic_continuous", [[1, 0], [[0.1, 0.2], [0.3, 0.4]], [[-0.1, -0.2], [-0.3, -0.4]], [0.1, 0.2]], "__COMPUTE__", check=lambda out: len(out["mu"]) == 2 and abs(out["mu"][0] - 0.1) < 1e-6 and abs(out["value"] - 0.1) < 1e-6),
        case("normal_log_prob at mean peak", "normal_log_prob", [0.0, 1.0, 0.0], "__COMPUTE__", check=lambda out: abs(out + 0.9189385332) < 1e-6),
    ],
    # --- Stage 10 public overrides ---
    "deploy-fastapi-service": [
        case("validate passes with type names", "validate_input", [{"text": "hello", "count": 3}, {"text": "str", "count": "int"}], [True, None]),
        case("validate catches missing field", "validate_input", [{"text": "hello"}, {"text": "str", "count": "int"}], [False, "missing field: count"]),
    ],
    "deploy-onnx-export": [
        case("onnx export serializes shape and weights", "export_onnx", [{"weight": [[0.5, 0.3], [0.2, 0.8]], "bias": [0.1, 0.2]}, [1, 2], [1, 2]], {"version": 7, "graph": {"inputs": [{"shape": [1, 2]}], "outputs": [{"shape": [1, 2]}], "initializers": {"weight": [[0.5, 0.3], [0.2, 0.8]], "bias": [0.1, 0.2]}}}),
        case("onnx inference affine output", "onnx_inference", [{"graph": {"initializers": {"weight": [[2, 0], [0, 3]], "bias": [1, -1]}}}, [[1, 2]]], [[3.0, 5.0]]),
    ],
    "deploy-docker-packaging": [
        case("parse dockerfile strips blanks and comments", "parse_dockerfile", ["FROM python:3.11\n# note\nRUN pip install torch\nCOPY . /app\nCMD python main.py"], [{"cmd": "FROM", "args": "python:3.11"}, {"cmd": "RUN", "args": "pip install torch"}, {"cmd": "COPY", "args": ". /app"}, {"cmd": "CMD", "args": "python main.py"}]),
        case("calculate_image_size sums layers", "calculate_image_size", [[{"size": 40}, {"size": 60}]], 100),
    ],
    "deploy-ollama-inference": [
        case("ram estimation for 7B model", "estimate_ram_usage", [7], {"model_size_billions": 7, "fp16_ram_gb": 14.0, "int8_ram_gb": 7.0, "recommended_gb": 21}),
        case("ollama_list_models returns catalog", "ollama_list_models", [], [{"name": "llama3:8b", "size": "8.0GB", "ram_required": "16GB"}, {"name": "qwen2:7b", "size": "7.0GB", "ram_required": "14GB"}, {"name": "qwen2:1.5b", "size": "1.5GB", "ram_required": "4GB"}]),
    ],
    "deploy-vllm-serving": [
        case("kv cache size", "estimate_kv_cache_size", [32, 4096, 2048, 4], {"bytes": 4294967296, "gb": 4.0}),
        case("compute_throughput rate", "compute_throughput", [1500, 3.0], {"tokens_per_sec": 500.0, "total_tokens": 1500, "total_time": 3.0}),
    ],
    "deploy-async-handler-l2": [
        case("async process completes concurrent requests", "async_process", [["a", "b", "c"], 5], ["ok:a", "ok:b", "ok:c"]),
        case("async process empty request list", "async_process", [[], 5], []),
    ],
    "deploy-onnx-optimize-l2": [
        case("fuse conv bn reduces operator count", "fuse_conv_bn", [{"nodes": [{"op": "Conv", "input": "x", "output": "c"}, {"op": "BatchNormalization", "input": "c", "output": "y"}, {"op": "Relu", "input": "y", "output": "z"}]}], {"nodes": [{"op": "ConvBN", "input": "x", "output": "y", "fused": True}, {"op": "Relu", "input": "y", "output": "z"}]}),
        case("optimize_onnx sets optimized flag", "optimize_onnx", [{"nodes": [{"op": "Relu", "input": "a", "output": "b"}]}], {"nodes": [{"op": "Relu", "input": "a", "output": "b"}], "optimized": True}),
    ],
    "deploy-docker-multi-stage-l2": [
        case("parse multi-stage builds", "parse_stages", ["FROM python:3.11 AS builder\nRUN pip install torch\nCOPY . /app\nFROM python:3.11-slim\nCOPY --from=builder /app /app\nCMD python main.py"], [{"from": "python:3.11 AS builder", "cmds": ["RUN pip install torch", "COPY . /app"]}, {"from": "python:3.11-slim", "cmds": ["COPY --from=builder /app /app", "CMD python main.py"]}]),
        case("multi_stage_build totals size and flags final", "multi_stage_build", ["FROM a\nRUN 1\nFROM b\nCMD 2"], {"stages": [{"stage": 0, "base": "a", "layers": 1, "size_mb": 5, "final": False}, {"stage": 1, "base": "b", "layers": 1, "size_mb": 5, "final": True}], "total_size": 10}),
    ],
    "deploy-model-quantization-l2": [
        case("int8 quantize maps max abs to 127", "quantize_int8", [[0.0, 1.27, -1.27]], {"quantized": [0, 127, -127], "scale": 100.0}),
        case("quantization_error exact on recoverable scale", "quantization_error", [[0.0, 1.27], {"quantized": [0, 127], "scale": 100.0}], {"mse": 0.0, "max_error": 0.0}),
    ],
    "deploy-continuous-batching-l2": [
        case("continuous batching schedules all requests", "continuous_batching", [[1, 2, 3, 4, 5, 6, 7, 8], 4, 5], {"completed": [1, 2, 3, 4, 5, 6, 7, 8], "steps": 8, "throughput": 1.0}),
        case("single batch size sequential steps", "continuous_batching", [[1, 2], 1, 3], {"completed": [1, 2], "steps": 4, "throughput": 0.5}),
    ],
    # --- Stage 11 public overrides ---
    "project-ai-customer-service": [
        case("classify returns intent", "classify_intent", ["我的手机订单ABC12345678一直没到货", {"退货": ["退货", "退款"], "物流查询": ["物流", "到货", "快递", "发货"], "投诉": ["投诉", "差评", "不满"]}], {"intent": "物流查询", "confidence": 1.0}),
        case("extract_entities extracts order id and product", "extract_entities", ["我的手机订单AB12345678请帮忙查询"], {"order_ids": ["AB12345678"], "products": ["手机"]}),
    ],
    "project-code-assistant": [
        case("extract_context indent and line", "extract_context", ["def hello():\n    pri", 20], {"line": "    pri", "indent": 4, "prev_line": "def hello():", "line_idx": 1}),
        case("calculate_relevance keyword match score", "calculate_relevance", [{"line": "    print(x)"}, {"keywords": ["print", "return"]}], 1),
    ],
    "project-multi-agent": [
        case("orchestrator arranges meeting on first free slot", "eval_meeting_orchestrator", [{"busy": ["09:00"]}, {"participants": ["A", "B"], "duration": "1h", "date": "2025-01-15"}], {"status": "success", "meeting": {"time": "10:00", "date": "2025-01-15"}, "notified": 2}),
        case("all slots busy returns failed status", "eval_meeting_orchestrator", [{"busy": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]}, {"participants": ["A"], "duration": "1h", "date": "2025-01-15"}], {"status": "failed", "reason": "no available slot"}),
    ],
    "project-gradio-demo": [
        case("build interface spec", "build_interface", [["text", "image"], ["label"], "classify", "Image Classifier"], {"title": "Image Classifier", "num_inputs": 2, "num_outputs": 1, "fn_name": "callable", "status": "ready"}),
        case("create tab group activates first tab", "create_tab_group", [[{"name": "Input", "components": ["txt", "img"]}, {"name": "About", "components": ["md"]}]], {"type": "tabs", "tabs": [{"name": "Input", "num_components": 2}, {"name": "About", "num_components": 1}], "active": "Input"}),
    ],
    "project-streamlit-dashboard": [
        case("compute metrics accuracy precision recall f1", "compute_metrics", [[1, 0, 1, 1, 0, 1, 0, 0, 1, 0], [1, 0, 0, 1, 0, 1, 0, 1, 1, 0]], {"accuracy": 0.8, "precision": 0.8, "recall": 0.8, "f1": 0.8}),
        case("build_confusion_matrix 2x2 counts", "build_confusion_matrix", [[0, 0, 1, 1], [0, 1, 1, 1], ["neg", "pos"]], {"labels": ["neg", "pos"], "matrix": [[1, 1], [0, 2]]}),
    ],
    "proj-sentiment-analyzer-l2": [
        case("preprocess strips punctuation and lowercases", "preprocess", ["Good! Broken? YES."], "good broken yes"),
        case("negative sentiment routes to priority agent", "route_by_sentiment", ["negative"], "priority_agent"),
    ],
    "proj-code-reviewer-l2": [
        case("check_style flags double spaces", "check_style", ["x = 1\ny =  2\nz = 3"], ["Line 2: double spaces"]),
        case("cyclomatic_complexity counts branches + 1", "cyclomatic_complexity", ["if a:\n  for x in y:\n    pass"], 3),
    ],
    "proj-task-decomposer-l2": [
        case("decompose extracts workflow steps", "decompose_task", ["Analyze sales data and generate a report", ["data", "analy", "report"]], ["fetch_data", "analyze", "generate_report"]),
        case("assign_subtasks picks higher remaining workload agent", "assign_subtasks", [["analyze"], {"a1": {"can_do": ["analyze"], "workload": 1}, "a2": {"can_do": ["analyze"], "workload": 3}}], {"analyze": "a2"}),
    ],
    "proj-interactive-dashboard-l2": [
        case("build_demo metadata", "build_demo", [[0.5, -0.3, 0.8], ["feature1", "feature2", "feature3"]], {"model": [0.5, -0.3, 0.8], "inputs": ["feature1", "feature2", "feature3"], "outputs": ["prediction", "confidence"], "live": True}),
        case("update_plot linear dot and sigmoid confidence", "update_plot", [[1, 1], [0.0, 0.0]], {"prediction": 0.0, "confidence": 0.5}),
    ],
    "proj-ml-pipeline-l2": [
        case("compute_metrics exact errors", "compute_metrics", [[1, 0, 1, 1], [0.9, 0.1, 0.8, 0.7]], {"mse": 0.0375, "rmse": 0.1936, "mae": 0.175}),
        case("detect_overfitting warns above threshold", "detect_overfitting", [0.1, 0.4, 0.15], {"overfitting": True, "gap": 0.3, "recommendation": "add regularization or early stop"}),
    ],
}


HIDDEN_CASES = {
    # --- Stage 07 hidden (16) ---
    "nlp-tokenizer-pos-tagger": [
        case("oov characters split individually", "fmm_segment", ["今天天气abc", ["今天", "天气"], 4], ["今天", "天气", "a", "b", "c"], hidden=True),
        case("max_len constrains match window", "fmm_segment", ["中华人民共和国", ["中华", "中华人民共和国"], 2], ["中华", "人", "民", "共", "和", "国"], hidden=True),
    ],
    "nlp-tfidf-retriever": [
        case("idf decreases as term document frequency grows", "idf", ["a", [["a", "b"], ["c", "d"], ["e", "f"]]], "__COMPUTE__", check=lambda out: out > 1.4, hidden=True),
        case("empty doc tf safe zero", "tf", ["a", []], 0, hidden=True),
    ],
    "nlp-word2vec-embedding": [
        case("cosine opposite vectors -1", "cosine_similarity", [[1, -2], [-1, 2]], "__COMPUTE__", check=lambda out: abs(out + 1.0) < 1e-6, hidden=True),
        case("zero vector similarity returns 0", "cosine_similarity", [[0, 0], [3, 4]], 0.0, hidden=True),
    ],
    "nlp-bert-pretraining": [
        case("mlm_loss ignores -100 positions", "mlm_loss", [[[10.0, 0.0], [0.0, 10.0]], [-100, 1]], 0.0, hidden=True),
        case("mlm_loss all ignored returns 0", "mlm_loss", [[[1.0, 2.0]], [-100]], 0.0, hidden=True),
    ],
    "nlp-lstm-sequence-model": [
        case(
            "zero input and zero weights emit zero hidden state",
            "lstm_forward",
            [[[0.0], [0.0]], {"Wf": [[0.0]], "Uf": [[0.0]], "bf": [0.0], "Wi": [[0.0]], "Ui": [[0.0]], "bi": [0.0], "Wo": [[0.0]], "Uo": [[0.0]], "bo": [0.0], "Wc": [[0.0]], "Uc": [[0.0]], "bc": [0.0]}],
            [[0.0], [0.0]],
            hidden=True,
        ),
        case("lstm_cell updates both h and c", "lstm_cell", [[1.0], [0.0], [0.5], {"Wf": [[0.0]], "Uf": [[0.0]], "bf": [0.0], "Wi": [[0.0]], "Ui": [[0.0]], "bi": [0.0], "Wo": [[0.0]], "Uo": [[0.0]], "bo": [0.0], "Wc": [[1.0]], "Uc": [[0.0]], "bc": [0.0]}], "__COMPUTE__", check=lambda out: len(out) == 2 and out[1][0] > 0.25 and out[0][0] > 0, hidden=True),
    ],
    "nlp-self-attention": [
        case("uniform scores equal average of V", "scaled_dot_product_attention", [[[0, 0], [0, 0]], [[1, 1], [2, 2]], [[2, 4], [4, 8]]], {"output": [[3.0, 6.0], [3.0, 6.0]], "weights": [[0.5, 0.5], [0.5, 0.5]]}, hidden=True),
        case("zero projection weights make uniform weights", "self_attention", [[[1, 2], [3, 4]], [[0, 0], [0, 0]], [[0, 0], [0, 0]], [[1, 0], [0, 1]]], {"output": [[2.0, 3.0], [2.0, 3.0]], "weights": [[0.5, 0.5], [0.5, 0.5]]}, hidden=True),
    ],
    "nlp-multi-head-attention": [
        case("concat_heads inverse of split_heads", "concat_heads", [[[[1, 2], [5, 6]], [[3, 4], [7, 8]]]], [[1.0, 2.0, 3.0, 4.0], [5.0, 6.0, 7.0, 8.0]], hidden=True),
        case("split_heads single head preserves original", "split_heads", [[[1, 2], [3, 4]], 1], [[[1.0, 2.0], [3.0, 4.0]]], hidden=True),
    ],
    "nlp-encoder-decoder": [
        case("empty token sequence returns zero hidden vector", "encoder_forward", [[], [[1, 0]], [[1, 0], [0, 1]]], [0.0, 0.0], hidden=True),
        case("greedy_decode respects max_len budget", "greedy_decode", [[0.0, 0.0], 0, 99, 2, {"W_emb": [[1, 0], [0, 1]], "W_dec": [[1, 0], [0, 1]], "W_out": [[0, 1], [1, 0]]}], [1, 0], hidden=True),
    ],
    "nlp-bpe-tokenizer-l2": [
        case("single char returns one element list", "bpe_tokenize", ["x", {}, 3], ["x"], hidden=True),
        case("get_stats counts adjacent frequency", "bpe_tokenize", ["ababab", {}, 1], ["ab", "ab", "ab"], hidden=True),
    ],
    "nlp-bm25-l2": [
        case("bm25 multi-term accumulates query matches", "bm25", ["ai ml", ["ai", "ml", "ai ml", "none"], 1.5, 0.75], "__COMPUTE__", check=lambda out: out[0][0] == 2 and out[3][0] == 3 and out[3][1] == 0.0, hidden=True),
        case("bm25 repeated term increases score with saturation", "bm25", ["deep", ["deep deep deep", "deep"], 1.5, 0.75], "__COMPUTE__", check=lambda out: out[0][0] == 0 and out[0][1] > out[1][1], hidden=True),
    ],
    "nlp-skipgram-l2": [
        case("skipgram_loss prob 1 near zero", "skipgram_loss", [[1.0, 0.0], 0], "__COMPUTE__", check=lambda out: abs(out) < 1e-6, hidden=True),
        case("softmax shift invariance", "softmax", [[1000.0, 1000.0]], [0.5, 0.5], hidden=True),
    ],
    "nlp-bert-pretrain-l2": [
        case("mlm_loss zero masked tokens safe zero", "mlm_loss", [[[1, 2], [3, 4]], [0, 1], [0, 0]], 0.0, hidden=True),
        case("nsp_loss equal logits ln(2)", "nsp_loss", [[[0.0, 0.0], [5.0, 5.0]], [0, 1]], 0.6931, hidden=True),
    ],
    "nlp-gru-l2": [
        case("gru_cell pure forget z=1 passes h unchanged", "gru_cell", [[1, 1], [2, -3], {"Wz": [[0, 0], [0, 0]], "Uz": [[0, 0], [0, 0]], "bz": [50, 50], "Wr": [[0, 0], [0, 0]], "Ur": [[0, 0], [0, 0]], "br": [0, 0], "Wh": [[1, 1], [1, 1]], "Uh": [[0, 0], [0, 0]], "bh": [0, 0]}], "__COMPUTE__", check=lambda out: abs(out[0] - 2.0) < 1e-6 and abs(out[1] + 3.0) < 1e-6, hidden=True),
        case("gru_forward empty sequence empty list", "gru_forward", [[], {"Wz": [[0.1, 0.2]]}], [], hidden=True),
    ],
    "nlp-cross-attention-l2": [
        case("cross_attention uniform K sums to mean of V", "cross_attention", [[[1, 2]], [[0, 0], [0, 0]], [[2, 4], [6, 8]]], [[4.0, 6.0]], hidden=True),
        case("cross_attention_forward zero Wq uniforms V", "cross_attention_forward", [[[3, 4]], [[1, 0], [0, 1]], [[0, 0], [0, 0]], [[1, 0], [0, 1]], [[1, 3], [5, 7]]], [[3.0, 5.0]], hidden=True),
    ],
    "nlp-mha-l2": [
        case("multihead zero Wo outputs zeros", "multihead_attention", [[[1, 2, 3, 4]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], 2], [[0.0, 0.0, 0.0, 0.0]], hidden=True),
        case("get_weights single token always [1.0]", "get_weights", [[[1, 2, 3, 4]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], 2], [[[1.0]], [[1.0]]], hidden=True),
    ],
    "nlp-beam-search-l2": [
        case("beam_search prefers token 0 until max_len-1 then end_id", "eval_beam_search", [[0.0, 10.0, -5.0], 0, 2, 3, 2], [1, 0, 2], hidden=True),
        case("beam=1 greedy decoding", "eval_beam_search", [[5.0, 0.0, -5.0], 1, 1, 2, 2], [0, 2], hidden=True),
    ],
    # --- Stage 08 hidden (24) ---
    "llm-few-shot-prompting": [
        case("k larger than examples returns all", "select_examples", [[1, 0], [{"emb": [1, 0], "id": 1}, {"emb": [0, 1], "id": 2}], 5], [{"emb": [1, 0], "id": 1}, {"emb": [0, 1], "id": 2}], hidden=True),
        case("k=0 returns empty list", "select_examples", [[1, 0], [{"emb": [1, 0]}], 0], [], hidden=True),
    ],
    "llm-cot-reasoning": [
        case("parse extracts numbers and ops", "parse_math_problem", ["8 + 2 * 3"], {"numbers": [8, 2, 3], "operators": ["+", "*"]}, hidden=True),
        case("verify_answer mismatch returns False", "verify_answer", [{"answer": 10}, 12], False, hidden=True),
    ],
    "llm-react-agent": [
        case("think selects answer after result observation", "think", [{"steps": ["search -> result:42"]}, {}], "answer", hidden=True),
        case("act handles missing tool safely", "act", ["calc", {}], "unknown action: calc", hidden=True),
    ],
    "llm-lora-finetuning": [
        case("zero A bypass reduces lora_forward to x @ W^T", "lora_forward", [[[1, 2]], [[1, 0], [0, 2]], [[0, 0]], [[3], [4]]], [[1.0, 4.0]], hidden=True),
        case("rank 1 addition changes output", "lora_forward", [[[1, 1]], [[0, 0]], [[1, 1]], [[2]]], [[4.0]], hidden=True),
    ],
    "llm-rlhf-alignment": [
        case("compute_log_prob symmetric logits equal -ln(2)", "compute_log_prob", [[2.0, 2.0], 0], "__COMPUTE__", check=lambda out: abs(out + 0.693147) < 1e-4, hidden=True),
        case("ppo_clip_loss caps advantage gain", "ppo_clip_loss", [2.0, 1.0, 1.0, 0.2], -1.2, hidden=True),
    ],
    "llm-qwen-api": [
        case("truncate_to_limit empties oversize single chunk under budget 0", "truncate_to_limit", ["hello", 0], "", hidden=True),
        case("unknown model defaults to qwen-max pricing", "estimate_cost", [1000000, 0, "custom"], 2.0, hidden=True),
    ],
    "llm-text-splitter": [
        case("split_by_sentences splits Chinese punctuation", "split_by_sentences", ["第一句。第二句！第三句？", 2], ["第一句。第二句。", "第三句。"], hidden=True),
        case("split_by_chars shorter than chunk_size single chunk", "split_by_chars", ["短文", 10, 2], ["短文"], hidden=True),
    ],
    "llm-embedding": [
        case("embed_text OOV returns zero vector", "embed_text", ["unknown words", {"hello": 0}, [[1, 2]]], [0.0, 0.0], hidden=True),
        case("similarity_search orders top matches", "similarity_search", [[1, 0], [[0, 1], [1, 0]], ["B", "A"], 2], [{"text": "A", "score": 1.0}, {"text": "B", "score": 0.0}], hidden=True),
    ],
    "llm-vector-db-retrieval": [
        case("brute_force top_k=1 single item", "brute_force_search", [[0, 1], [[1, 0], [0, 3]], [1, 2], 1], [[2, 3.0]], hidden=True),
        case("ivf_search probes both clusters when n_probe=2", "ivf_search", [[1, 0], [[1, 0], [-1, 0]], [[0.5, 0], [-2, 0]], [1, 2], 2, 2], [[1, 0.5], [2, -2.0]], hidden=True),
    ],
    "llm-tool-use": [
        case("execute_tool returns unknown message when missing", "execute_tool", ["missing", {}, [{"name": "calc"}]], "unknown tool: missing", hidden=True),
        case("parse tool call nested args", "parse_tool_call", ["prefix <tool>{\"name\":\"sum\",\"args\":{\"nums\":[1,2]}}</tool> suffix"], {"name": "sum", "args": {"nums": [1, 2]}}, hidden=True),
    ],
    "llm-function-calling": [
        case("validate missing required parameter false", "validate_arguments", [{"name": "A"}, {"properties": {"name": {"type": "string"}, "id": {"type": "integer", "required": True}}}], False, hidden=True),
        case("execute_function_call missing prints unknown function", "execute_function_call", [{"name": "noop", "arguments": {}}, {}], "unknown function: noop", hidden=True),
    ],
    "llm-langchain-workflow": [
        case("empty chains returns inputs untouched", "eval_langchain", [[], {"input": "raw"}, "无"], {"chain_out": {"input": "raw"}, "agent_out": "Bot(助手)执行: 无"}, hidden=True),
        case("Agent format check", "eval_langchain", [["{x}"], {"x": "test"}, "检查"], {"chain_out": "TEST", "agent_out": "Bot(助手)执行: 检查"}, hidden=True),
    ],
    "llm-prompt-template-l2": [
        case("render missing key leaves template untouched", "render_prompt", ["Hello {{name}}", {"other": "1"}], "Hello {{name}}", hidden=True),
        case("inject_examples custom separator", "inject_examples", ["Task:", [["1", "2"], ["3", "4"]]], "Task:\n\nExamples:\nQ: 1\nA: 2\nQ: 3\nA: 4", hidden=True),
    ],
    "llm-cot-verify-l2": [
        case("detect_step_error ignores outer whitespace", "detect_step_error", ["  42  ", "42"], {"match": True}, hidden=True),
        case("multi-step one invalid addition", "verify_cot_steps", [["Step 1: 2+2 = 4", "Step 2: 3+4 = 9"]], {"valid": False, "errors": [[1, "addition error"]]}, hidden=True),
    ],
    "llm-tool-plan-l2": [
        case("eval_tool_plan unknown tool returns error obs", "eval_tool_plan", ["missing", {}, "try"], {"observation": "Error: unknown tool missing", "thought": "Executed missing, got: Error: unknown tool missing"}, hidden=True),
        case("eval_tool_plan echo tool succeeds", "eval_tool_plan", ["echo", {"msg": "ok"}, "say"], {"observation": "ok", "thought": "Executed echo, got: ok"}, hidden=True),
    ],
    "llm-qlora-l2": [
        case("zero tensor safe without NaN", "quantize_nf4", [[0.0, 0.0]], {"indices": [7, 7], "absmax": 0.0}, hidden=True),
        case("dequantize midpoint check", "dequantize_nf4", [{"indices": [0, 7, 15]}, 1.5], "__COMPUTE__", check=lambda out: abs(out[0] + 1.5) < 1e-6 and abs(out[2] - 1.5) < 1e-6, hidden=True),
    ],
    "llm-dpo-l2": [
        case("strong positive preference gives smaller loss", "dpo_loss", [[2.0], [-2.0], [0.0], [0.0], 1.0], "__COMPUTE__", check=lambda out: out < 0.03, hidden=True),
        case("reversed preference gives larger loss", "dpo_loss", [[-2.0], [2.0], [0.0], [0.0], 1.0], "__COMPUTE__", check=lambda out: out > 3.9, hidden=True),
    ],
    "llm-kv-cache-l2": [
        case("update_kv_cache concatenates along sequence axis 2", "update_kv_cache", [{"K": [[[[1, 0]]]], "V": [[[[2, 0]]]]}, [[[[0, 1]]]], [[[[0, 3]]]]], {"K": [[[[1.0, 0.0], [0.0, 1.0]]]], "V": [[[[2.0, 0.0], [0.0, 3.0]]]]}, hidden=True),
        case("single cached KV pair attends 100 percent to V", "attention_with_cache", [[[[[3, 4]]]], {"K": [[[[1, 1]]]], "V": [[[[9, -2]]]]}], [[[[9.0, -2.0]]]], hidden=True),
    ],
    "llm-chunk-optimize-l2": [
        case("smart_chunk overlap prepends tail of prior chunk", "smart_chunk", ["AAAA\n\nBBBB\n\nCCCC", 5, 2], ["AAAA", "AABBBB", "BBCCCC"], hidden=True),
        case("chunk_stats empty safe zero", "chunk_stats", [[]], {"count": 0, "avg": 0}, hidden=True),
    ],
    "llm-embed-alignment-l2": [
        case("inverted clusters give negative alignment", "compute_alignment", [[[1, 0], [0, 1], [1, 0], [0, 1]], [0, 0, 1, 1]], {"alignment": -0.5, "pos_sim": 0.0, "neg_sim": 0.5}, hidden=True),
        case("orthogonal cosine 0", "cosine_sim", [[1, 0, 0], [0, 1, 0]], 0.0, hidden=True),
    ],
    "llm-hnsw-l2": [
        case("single level searches full list", "hnsw_search", [[0, 0], [[5, 5], [1, 1], [10, 10]], 1, 2], [1, 0], hidden=True),
        case("top_k=1 finds closest point", "hnsw_search", [[9.9, 9.9], [[0, 0], [10, 10], [5, 5]], 3, 1], [1], hidden=True),
    ],
    "llm-tool-rag-l2": [
        case("top_k=2 preserves descending relevance order", "retrieve", [[1, 0], [[1, [0, 1], "B"], [2, [1, 0], "A"], [3, [0.8, 0.2], "C"]], 2], [[2, [1, 0], "A"], [3, [0.8, 0.2], "C"]], hidden=True),
        case("cosine_sim zero denominator safe 0", "cosine_sim", [[0, 0], [1, 2]], 0.0, hidden=True),
    ],
    "llm-stream-output-l2": [
        case("is_complete_json validates braces", "is_complete_json", ["{\"ok\": true}"], True, hidden=True),
        case("is_complete_json incomplete returns False", "is_complete_json", ["{\"ok\": "], False, hidden=True),
    ],
    "llm-agent-memory-l2": [
        case("window=1 rolls every prior item into summary", "eval_agent_memory", [["first", "second", "third"], 1], {"context": ["Summary: first\nsecond\n...", "third"], "summary": "first\nsecond\n"}, hidden=True),
        case("empty history empty context", "eval_agent_memory", [[], 2], {"context": [], "summary": ""}, hidden=True),
    ],
    # --- Stage 09 hidden (12) ---
    "rl-mdpsimulator": [
        case("list states/actions zero rewards gives zero values", "value_iteration", [[0, 1], [0], [[[1, 0]], [[0, 1]]], [[[0, 0]], [[0, 0]]], 0.9, 0.01], [0.0, 0.0], hidden=True),
        case("gamma=0 evaluates immediate expected reward only", "value_iteration", [2, 1, [[[1, 0]], [[0, 1]]], [[[5, 0]], [[0, 3]]], 0.0, 1e-4], [5.0, 3.0], hidden=True),
    ],
    "rl-qlearning": [
        case("absorbing zero rewards stay zero", "q_learning", [{"n_states": 2, "n_actions": 1, "trans": [[[0, 1]], [[0, 1]]], "rewards": [[[0, 0]], [[0, 0]]]}, 3, 0.5, 0.9, 0.0], {"Q": [[0.0], [0.0]], "avg_return": 0.0}, hidden=True),
        case("epsilon_greedy tie breaks to first max index 0", "epsilon_greedy", [[[2.0, 2.0, 1.0]], 0, 0.0], 0, hidden=True),
    ],
    "rl-sarsa": [
        case("sarsa multi episode reward accumulation", "sarsa", [{"n_states": 2, "n_actions": 1, "trans": [[[1, 0]], [[0, 1]]], "rewards": [[[2, 0]], [[0, 0]]]}, 2, 0.1, 0.9, 0.0], "__COMPUTE__", check=lambda out: out["avg_return"] == 100.0 and out["Q"][0][0] > 0, hidden=True),
        case("epsilon_greedy greedy last column", "epsilon_greedy", [[[0.0, 0.0, 9.0]], 0, 0.0], 2, hidden=True),
    ],
    "rl-dqn": [
        case("compute_td_loss non-terminal backs up gamma max target", "compute_td_loss", [[[0, 0, 1.0, 1, False]], [[0.0, 0.0], [0.0, 0.0]], [[0.0, 0.0], [2.0, 4.0]], 0.5], 9.0, hidden=True),
        case("replay buffer within capacity preserves all", "eval_replay_buffer", [5, [[0, 0, 1.0, 0, True], [1, 1, 2.0, 1, False]]], {"size": 2, "pos": 2, "buf": [[0, 0, 1.0, 0, True], [1, 1, 2.0, 1, False]]}, hidden=True),
    ],
    "rl-ppo": [
        case("lambda=0 turns GAE into 1-step TD error", "compute_advantages", [[1.0, 2.0], [0.0, 1.0], 0.9, 0.0], [1.9, 1.0], hidden=True),
        case("ppo_clip_surrogate negative advantage clips below", "ppo_clip_surrogate", [0.0, -1.0, -2.0, 0.2], "__COMPUTE__", check=lambda out: abs(out - 1.6) < 1e-6, hidden=True),
    ],
    "rl-actor-critic": [
        case("zero theta gives uniform probabilities", "actor_forward", [[1, 2], [[0, 0, 0], [0, 0, 0]]], [1/3, 1/3, 1/3], hidden=True),
        case("critic zero state zero baseline", "critic_forward", [[0, 0], [10, -20]], 0.0, hidden=True),
    ],
    "rl-bellman-l2": [
        case("gamma scales successor value", "bellman_expectation", [[10.0, 0.0], [[[1, 0]], [[1, 0]]], [[[0, 0]], [[0, 0]]], 0.8], [8.0, 8.0], hidden=True),
        case("bellman_optimal with terminal zero", "bellman_optimal", [[0.0, 10.0], [[[0, 1], [1, 0]], [[0, 1], [0, 1]]], [[[1, 0], [0, 0]], [[0, 0], [0, 0]]], 0.5], [5.0, 5.0], hidden=True),
    ],
    "rl-epsilon-decay-l2": [
        case("decay with zero rate jumps to floor", "decay_schedule", [1.0, 0.1, 0.0, 3], [1.0, 0.1, 0.1], hidden=True),
        case("greedy chooses negative max closest to zero", "epsilon_greedy", [[[-5.0, -1.0, -9.0]], 0, 0.0], 1, hidden=True),
    ],
    "rl-sarsa-lambda-l2": [
        case("zero alpha leaves Q zero", "sarsa_lambda", [{"start": 0, "transitions": [[[1, 5, True]], []]}, 2, 0.0, 0.9, 0.0, 0.9], [[0.0], []], hidden=True),
        case("empty action state safely skipped", "sarsa_lambda", [{"start": 0, "transitions": [[]]}, 1, 0.5, 0.9, 0.0, 0.5], [[]], hidden=True),
    ],
    "rl-double-dqn-l2": [
        case("double dqn terminal zero loss when exact", "double_dqn_update", [[[3.0, 1.0]], [[9.0, 9.0]], [[0, 0, 3.0, 0, True]], 0.9], 0.0, hidden=True),
        case("double dqn decouples online argmax from target eval", "double_dqn_update", [[[0.0, 0.0], [10.0, 1.0]], [[0.0, 0.0], [2.0, 99.0]], [[0, 0, 1.0, 1, False]], 0.5], 4.0, hidden=True),
    ],
    "rl-gae-l2": [
        case("single terminal step GAE", "compute_gae", [[2.0], [0.5], 0.9, 0.95], [1.5], hidden=True),
        case("zero rewards and zero values zero advantage", "compute_gae", [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], 0.99, 0.95], [0.0, 0.0, 0.0], hidden=True),
    ],
    "rl-actor-critic-continuous-l2": [
        case("1D head scalar outputs", "actor_critic_continuous", [[1, 2], [0.5, 0.5], [0.0, 0.0], [1.0, -0.5]], {"mu": 1.5, "sigma": 1.0, "value": 0.0}, hidden=True),
        case("normal_log_prob symmetric around mu", "normal_log_prob", [2.0, 1.0, 3.0], "__COMPUTE__", check=lambda out: abs(out + 0.5 * (1.0 + 1.8378770664)) < 1e-5, hidden=True),
    ],
    # --- Stage 10 hidden (10) ---
    "deploy-fastapi-service": [
        case("validate rejects wrong type and reports field", "validate_input", [{"count": "abc"}, {"count": "int"}], [False, "count should be int"], hidden=True),
        case("build_openapi_spec maps endpoint path", "build_openapi_spec", [[{"path": "/predict", "method": "post", "summary": "Infer"}]], {"openapi": "3.0.0", "info": {"title": "ML API", "version": "1.0"}, "paths": {"/predict": {"post": {"summary": "Infer", "responses": {"200": {"description": "OK"}}}}}}, hidden=True),
    ],
    "deploy-onnx-export": [
        case("compare_outputs matching arrays passes", "compare_outputs", [[[1.0, 2.0]], [[1.0, 2.0]]], {"max_diff": 0.0, "pass": True}, hidden=True),
        case("compare_outputs large diff fails", "compare_outputs", [[1.0], [1.5]], {"max_diff": 0.5, "pass": False}, hidden=True),
    ],
    "deploy-docker-packaging": [
        case("simulate_build deterministic md5 hash", "simulate_build", [[{"cmd": "FROM", "args": "alpine"}], {}], "__COMPUTE__", check=lambda out: len(out) == 1 and len(out[0]["id"]) == 12 and out[0]["size"] == 60, hidden=True),
        case("ignores unsupported instruction EXPOSE? no EXPOSE included, ECHO excluded", "parse_dockerfile", ["UNKNOWN arg\nWORKDIR /app"], [{"cmd": "WORKDIR", "args": "/app"}], hidden=True),
    ],
    "deploy-ollama-inference": [
        case("small 1.5b model recommended floor 8GB", "estimate_ram_usage", [1.5], {"model_size_billions": 1.5, "fp16_ram_gb": 3.0, "int8_ram_gb": 1.5, "recommended_gb": 8}, hidden=True),
        case("ollama_generate respects max_tokens option", "ollama_generate", ["qwen2:7b", "hi", {"max_tokens": 16}], {"model": "qwen2:7b", "response": "[qwen2:7b 模拟回复] 收到: hi... (16 tokens)", "tokens_generated": 16, "done": True}, hidden=True),
    ],
    "deploy-vllm-serving": [
        case("paged_attention equal keys uniform mix", "paged_attention", [[1, 0], [[1, 1], [1, 1]], [0], 16], {"output": [1.0, 1.0], "scores": [0.7071067811865475, 0.7071067811865475]}, hidden=True),
        case("estimate_kv_cache_size defaults 32L 4096H 2048T B1 -> 1GB", "estimate_kv_cache_size", [], {"bytes": 1073741824, "gb": 1.0}, hidden=True),
    ],
    "deploy-async-handler-l2": [
        case("single item request", "async_process", [["solo"], 5], ["ok:solo"], hidden=True),
        case("ultra short timeout triggers timeout branch", "async_process", [["a"], 0.0001], ["timeout:"], hidden=True),
    ],
    "deploy-onnx-optimize-l2": [
        case("isolated Conv without trailing BN unchanged", "fuse_conv_bn", [{"nodes": [{"op": "Conv", "input": "x", "output": "y"}, {"op": "Relu", "input": "y", "output": "z"}]}], {"nodes": [{"op": "Conv", "input": "x", "output": "y"}, {"op": "Relu", "input": "y", "output": "z"}]}, hidden=True),
        case("two ConvBN pairs both fused", "optimize_onnx", [{"nodes": [{"op": "Conv", "input": "a", "output": "b"}, {"op": "BatchNormalization", "input": "b", "output": "c"}, {"op": "Conv", "input": "c", "output": "d"}, {"op": "BatchNormalization", "input": "d", "output": "e"}]}], {"nodes": [{"op": "ConvBN", "input": "a", "output": "c", "fused": True}, {"op": "ConvBN", "input": "c", "output": "e", "fused": True}], "optimized": True}, hidden=True),
    ],
    "deploy-docker-multi-stage-l2": [
        case("empty dockerfile zero size", "multi_stage_build", [""], {"stages": [], "total_size": 0}, hidden=True),
        case("single stage final true", "multi_stage_build", ["FROM ubuntu\nRUN apt\nCMD sh"], {"stages": [{"stage": 0, "base": "ubuntu", "layers": 2, "size_mb": 10, "final": True}], "total_size": 10}, hidden=True),
    ],
    "deploy-model-quantization-l2": [
        case("fp16 preserves shape and range", "quantize_fp16", [[1.0, -0.5, 0.25]], [1.0, -0.5, 0.25], hidden=True),
        case("quantization_error array comparison", "quantization_error", [[1.0, 2.0], [1.0, 2.5]], {"mse": 0.125, "max_error": 0.5}, hidden=True),
    ],
    "deploy-continuous-batching-l2": [
        case("empty queue returns zero steps and throughput", "continuous_batching", [[], 4, 5], {"completed": [], "steps": 0, "throughput": 0.0}, hidden=True),
        case("all fit in one batch completes in max_len-1 steps", "continuous_batching", [[10, 20], 4, 4], {"completed": [10, 20], "steps": 3, "throughput": 0.6667}, hidden=True),
    ],
    # --- Stage 11 hidden (10) ---
    "project-ai-customer-service": [
        case("generate_response formats order entities", "generate_response", ["物流查询", {"order_ids": ["XX00000001"], "products": ["耳机"]}, {"物流查询": "订单 {order_ids} 涉及 {products}"}], "订单 ['XX00000001'] 涉及 ['耳机']", hidden=True),
        case("unmatched text returns None intent confidence 0", "classify_intent", ["今天天气不错", {"退货": ["退货"]}], {"intent": None, "confidence": 0.0}, hidden=True),
    ],
    "project-code-assistant": [
        case("suggest_completions filters irrelevant and sorts descending", "suggest_completions", [{"line": "for i in range(10):"}, [{"code": "else", "keywords": ["if"]}, {"code": "break", "keywords": ["for", "range"]}, {"code": "loop", "keywords": ["for"]}]], [{"code": "break", "keywords": ["for", "range"]}, {"code": "loop", "keywords": ["for"]}], hidden=True),
        case("line 0 has empty prev_line", "extract_context", ["x = 1", 2], {"line": "x = 1", "indent": 0, "prev_line": "", "line_idx": 0}, hidden=True),
    ],
    "project-multi-agent": [
        case("five busy slots still leaves 16:00", "eval_meeting_orchestrator", [{"busy": ["09:00", "10:00", "11:00", "14:00", "15:00"]}, {"participants": ["X"], "duration": "30m", "date": "2025-05-01"}], {"status": "success", "meeting": {"time": "16:00", "date": "2025-05-01"}, "notified": 1}, hidden=True),
        case("no busy slots picks 09:00", "eval_meeting_orchestrator", [{}, {"participants": ["A", "B", "C"], "duration": "1h", "date": "2025-06-01"}], {"status": "success", "meeting": {"time": "09:00", "date": "2025-06-01"}, "notified": 3}, hidden=True),
    ],
    "project-gradio-demo": [
        case("queue_request fallback processes queue_size items", "queue_request", ["non_callable_fn", ["x"], 3], {"processed": 3, "status": "completed"}, hidden=True),
        case("empty tab group active is None", "create_tab_group", [[]], {"type": "tabs", "tabs": [], "active": None}, hidden=True),
    ],
    "project-streamlit-dashboard": [
        case("detect_drift triggers alert beyond threshold", "detect_drift", [[10, 10, 10], [13, 13, 13], 0.1], {"drift_detected": True, "diff": 0.3, "threshold": 0.1}, hidden=True),
        case("detect_drift stable within threshold", "detect_drift", [[10, 10], [10.5, 10.5], 0.1], {"drift_detected": False, "diff": 0.05, "threshold": 0.1}, hidden=True),
    ],
    "proj-sentiment-analyzer-l2": [
        case("extract_features counts positive and negative keywords", "extract_features", ["good great love but slow"], {"pos_count": 3, "neg_count": 1, "total": 5}, hidden=True),
        case("classify_sentiment distinguishes positive neutral negative", "classify_sentiment", [{"pos_count": 3, "neg_count": 0}], "positive", hidden=True),
    ],
    "proj-code-reviewer-l2": [
        case("detect_bugs warns on double equals comparison", "detect_bugs", ["if x == True:\n    pass"], ["Use is instead of =="], hidden=True),
        case("trailing whitespace and long line flagged", "check_style", ["x = 1 "], ["Line 1: trailing space"], hidden=True),
    ],
    "proj-task-decomposer-l2": [
        case("fallback generic task yields process", "decompose_task", ["clean workspace", []], ["process"], hidden=True),
        case("unmatched capability marked unassigned", "assign_subtasks", [["deploy"], {"worker": {"can_do": ["test"], "workload": 2}}], {"deploy": "unassigned"}, hidden=True),
    ],
    "proj-interactive-dashboard-l2": [
        case("process_feedback logs user and model values", "process_feedback", [{"temp": 0.5}, 0.75], {"user_input": {"temp": 0.5}, "model_output": 0.75, "logged": True}, hidden=True),
        case("empty params plot gives neutral 0.5 confidence", "update_plot", [[], [1, 2]], {"prediction": 0.0, "confidence": 0.5}, hidden=True),
    ],
    "proj-ml-pipeline-l2": [
        case("detect_overfitting healthy gap returns ok", "detect_overfitting", [0.2, 0.25, 0.15], {"overfitting": False, "gap": 0.05, "recommendation": "ok"}, hidden=True),
        case("build_report summarizes high val_acc trend", "build_report", [{"train_loss": [0.5, 0.1], "val_acc": [0.6, 0.92]}], {"latest_metrics": {"train_loss": 0.1, "val_acc": 0.92}, "total_epochs": 2, "trend": "improving"}, hidden=True),
    ],
}
