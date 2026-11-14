"""Extra hidden evaluation cases for Stage 07 - Stage 11 (all 72 challenges)."""


def case(name, fn, args, expected=None, *, expected_exc=None, hidden=True, kwargs=None, check=None):
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


EXTRA_HIDDEN_CASES = {
    # =========================================================================
    # Stage 07: NLP (16 challenges)
    # =========================================================================
    "nlp-tokenizer-pos-tagger": [
        case("fmm empty text returns empty list", "fmm_segment", ["", ["今天", "天气"], 5], []),
        case("pos_tag empty tokens returns empty list", "pos_tag", [[], {"今天": "NOUN"}], []),
    ],
    "nlp-tfidf-retriever": [
        case("tfidf computes rounded product for known term", "tfidf", ["苹果", ["苹果", "香蕉"], [["苹果", "香蕉"], ["橙子", "梨"]]], 0.7027),
        case("search multi-word query top_k=1 selects best doc", "search", ["ai ml", [["ai"], ["ai", "ml"], ["ai", "dl"]], 1], "__COMPUTE__", check=lambda out: len(out) == 1 and out[0][0] == 1 and out[0][1] > 1.3),
    ],
    "nlp-word2vec-embedding": [
        case("build_vocab ignores empty sentences and deduplicates", "build_vocab", [[[], ["b", "a", "b"]]], {"a": 0, "b": 1}),
        case("one_hot size 1 index 0", "one_hot", [0, 1], [1.0]),
    ],
    "nlp-bert-pretraining": [
        case("mask_tokens empty sequence returns empty lists", "mask_tokens", [[], 99, 1.0], {"masked": [], "labels": []}),
        case("mlm_loss uniform logits equals ln(2)", "mlm_loss", [[[0.0, 0.0], [0.0, 0.0]], [0, 1]], 0.6931),
    ],
    "nlp-lstm-sequence-model": [
        case("lstm_forward empty sequence returns empty list", "lstm_forward", [[], {"Wf": [[0.1, 0.2]]}], []),
        case("sigmoid clips extreme values safely", "sigmoid", [[-1000.0, 1000.0]], "__COMPUTE__", check=lambda out: len(out) == 2 and abs(out[0]) < 1e-12 and abs(out[1] - 1.0) < 1e-12),
    ],
    "nlp-self-attention": [
        case("single query key-value pair gets weight 1.0", "scaled_dot_product_attention", [[[1, 0, 0, 0]], [[1, 0, 0, 0]], [[5, 6]]], {"output": [[5.0, 6.0]], "weights": [[1.0]]}),
        case("non-square query and single key attends fully to V", "scaled_dot_product_attention", [[[1, 2], [3, 4]], [[1, 2]], [[7, 8]]], {"output": [[7.0, 8.0], [7.0, 8.0]], "weights": [[1.0], [1.0]]}),
    ],
    "nlp-multi-head-attention": [
        case("multi_head_attention single token 4 heads identity", "multi_head_attention", [[[1, 2, 3, 4]], {"Wq": [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], "Wk": [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], "Wv": [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], "Wo": [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]}, 4], {"output": [[1.0, 2.0, 3.0, 4.0]], "heads": [[[1.0]], [[2.0]], [[3.0]], [[4.0]]]}),
        case("concat_heads merges 3 heads of width 1", "concat_heads", [[[[1], [2]], [[3], [4]], [[5], [6]]]], [[1.0, 3.0, 5.0], [2.0, 4.0, 6.0]]),
    ],
    "nlp-encoder-decoder": [
        case("decoder_step produces updated hidden state and logits", "decoder_step", [0, [0.0, 0.0], [[1, 0], [0, 1]], [[1, 0], [0, 1]], [[2, -1], [0, 3]]], "__COMPUTE__", check=lambda out: len(out) == 2 and len(out[0]) == 2 and len(out[1]) == 2 and out[1][0] > 0 and out[1][1] < 0),
        case("greedy_decode max_len 0 returns empty list", "greedy_decode", [[0.0, 0.0], 0, 2, 0, {"W_emb": [[1, 0]], "W_dec": [[1, 0]], "W_out": [[1, 0]]}], []),
    ],
    "nlp-bpe-tokenizer-l2": [
        case("get_stats empty vocab returns empty dict", "get_stats", [{}], {}),
        case("bpe_tokenize empty word returns empty list", "bpe_tokenize", ["", {}, 3], []),
    ],
    "nlp-bm25-l2": [
        case("bm25 empty query gives zero scores", "bm25", ["", ["hello world", "foo"], 1.5, 0.75], [[0, 0.0], [1, 0.0]]),
        case("bm25 b=0 disables length normalization penalty", "bm25", ["ml", ["ml", "ml a b c d"], 1.5, 0.0], "__COMPUTE__", check=lambda out: abs(out[0][1] - out[1][1]) < 1e-6 and out[0][1] > 0),
    ],
    "nlp-skipgram-l2": [
        case("skipgram_forward selects center row and peaks at aligned target", "skipgram_forward", [1, [[0.0, 0.0], [10.0, 0.0]], [[1.0, 0.0], [0.0, 1.0]]], "__COMPUTE__", check=lambda out: len(out) == 2 and out[0] > 0.9999 and abs(sum(out) - 1.0) < 1e-6),
        case("skipgram_loss uniform prob 0.5 equals ln(2)", "skipgram_loss", [[0.5, 0.5], 1], "__COMPUTE__", check=lambda out: abs(out - 0.69314718) < 1e-6),
    ],
    "nlp-bert-pretrain-l2": [
        case("ce direct call on equal logits gives ln(2)", "ce", [[[0.0, 0.0]], [0]], "__COMPUTE__", check=lambda out: len(out) == 1 and abs(out[0] - 0.69314718) < 1e-6),
        case("mlm_loss multiple confident masked tokens ignores unmasked middle", "mlm_loss", [[[10.0, -10.0], [0.0, 0.0], [-10.0, 10.0]], [0, 0, 1], [1, 0, 1]], 0.0),
    ],
    "nlp-gru-l2": [
        case("sigmoid handles zero and extreme bounds", "sigmoid", [[0.0, -1000.0, 1000.0]], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(out[0] - 0.5) < 1e-12 and abs(out[1]) < 1e-12 and abs(out[2] - 1.0) < 1e-12),
        case("gru_cell near-zero update gate z=0 replaces h with candidate", "gru_cell", [[0.0, 0.0], [1.0, 1.0], {"Wz": [[0, 0], [0, 0]], "Uz": [[0, 0], [0, 0]], "bz": [-50, -50], "Wr": [[0, 0], [0, 0]], "Ur": [[0, 0], [0, 0]], "br": [0, 0], "Wh": [[0, 0], [0, 0]], "Uh": [[0, 0], [0, 0]], "bh": [0, 0]}], "__COMPUTE__", check=lambda out: len(out) == 2 and abs(out[0]) < 1e-6 and abs(out[1]) < 1e-6),
    ],
    "nlp-cross-attention-l2": [
        case("softmax 2d stability on large equal logits", "softmax", [[[1000.0, 1000.0], [0.0, 0.0]]], [[0.5, 0.5], [0.5, 0.5]]),
        case("cross_attention single encoder key broadcasts value to all queries", "cross_attention", [[[1, 0], [0, 1], [1, 1]], [[1, 0]], [[3, 7]]], [[3.0, 7.0], [3.0, 7.0], [3.0, 7.0]]),
    ],
    "nlp-mha-l2": [
        case("softmax uniform over 4 elements", "softmax", [[[0.0, 0.0, 0.0, 0.0]]], [[0.25, 0.25, 0.25, 0.25]]),
        case("multihead_attention 4 heads dk=1", "multihead_attention", [[[1, 0, 1, 0], [0, 1, 0, 1]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], [[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 0, 0, 2]], [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], 4], "__COMPUTE__", check=lambda out: len(out) == 2 and len(out[0]) == 4 and out[0][0] > 1.4 and abs(out[1][0] - 1.0) < 1e-6 and abs(out[0][1] - 1.0) < 1e-6 and out[1][1] > 1.4),
    ],
    "nlp-beam-search-l2": [
        case("eval_beam_search non-default end_id=0 stops after max_len", "eval_beam_search", [[-5.0, 5.0, 0.0], 2, 2, 5, 0], [1, 2, 2, 2, 0]),
        case("eval_beam_search stops early when preferred_token equals end_id", "eval_beam_search", [[5.0, 0.0, -5.0], 2, 2, 4, 2], [0, 2]),
    ],

    # =========================================================================
    # Stage 08: LLM (24 challenges)
    # =========================================================================
    "llm-few-shot-prompting": [
        case("cosine_sim zero vector safe zero", "cosine_sim", [[0, 0], [1, 2]], 0.0),
        case("select_examples empty examples returns empty list", "select_examples", [[1, 0], [], 3], []),
    ],
    "llm-cot-reasoning": [
        case("cot_reasoning non-addition expression yields empty steps and None", "cot_reasoning", ["10 - 3"], {"steps": [], "answer": None}),
        case("verify_answer non-dict returns False", "verify_answer", ["not a dict", 42], False),
    ],
    "llm-react-agent": [
        case("think empty steps starts with search", "think", [{"steps": []}, {}], "search"),
        case("eval_react_agent max_steps=0 hits limit immediately", "eval_react_agent", ["task", "ok", 0], {"answer": "max steps reached", "steps": []}),
    ],
    "llm-lora-finetuning": [
        case("count_trainable_params rank 0 returns 0", "count_trainable_params", [256, 0], 0),
        case("compression_ratio full rank equals 1.0", "compression_ratio", [100, 50], 1.0),
    ],
    "llm-rlhf-alignment": [
        case("ppo_clip_loss zero old_prob safely returns 0", "ppo_clip_loss", [1.0, 0.0, 2.0, 0.2], 0.0),
        case("kl_divergence large mismatch yields positive KL", "kl_divergence", [[10.0, 0.0], [0.0, 10.0]], "__COMPUTE__", check=lambda out: out > 9.0),
    ],
    "llm-qwen-api": [
        case("estimate_tokens empty string returns 1", "estimate_tokens", [""], 1),
        case("truncate_to_limit iteratively trims 100-char chunks", "truncate_to_limit", ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 20], "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
    ],
    "llm-text-splitter": [
        case("split_by_chars empty string returns empty list", "split_by_chars", ["", 5, 2], []),
        case("split_by_sentences handles newlines and trailing fragment", "split_by_sentences", ["甲。\n乙！丙", 1], ["甲。", "乙。", "丙。"]),
    ],
    "llm-embedding": [
        case("tokenize empty text returns empty list", "tokenize", ["", {"a": 0}], []),
        case("similarity_search zero query vector avoids NaN", "similarity_search", [[0, 0], [[1, 0]], ["only"], 1], [{"text": "only", "score": 0.0}]),
    ],
    "llm-vector-db-retrieval": [
        case("ivf_search n_probe=1 restricts to single cluster even if top_k larger", "ivf_search", [[1, 0], [[1, 0], [-1, 0]], [[2, 0], [-5, 0], [-3, 0]], [10, 20, 30], 1, 5], [[10, 2.0]]),
        case("brute_force_search top_k exceeding corpus size returns all sorted", "brute_force_search", [[1, 1], [[1, 0], [0, 2], [2, 2]], [1, 2, 3], 5], [[3, 4.0], [2, 2.0], [1, 1.0]]),
    ],
    "llm-tool-use": [
        case("register_tool packages metadata dict", "register_tool", ["search", "fn_ref", {"q": "str"}], {"name": "search", "func": "fn_ref", "schema": {"q": "str"}}),
        case("execute_tool empty tools list returns unknown message", "execute_tool", ["calc", {}, []], "unknown tool: calc"),
    ],
    "llm-function-calling": [
        case("validate_arguments rejects int 1 for boolean field", "validate_arguments", [{"flag": 1}, {"properties": {"flag": {"type": "boolean"}}}], False),
        case("validate_arguments accepts array object integer boolean types", "validate_arguments", [{"tags": [1, 2], "meta": {"a": 1}, "count": 5, "ok": True}, {"properties": {"tags": {"type": "array"}, "meta": {"type": "object"}, "count": {"type": "integer"}, "ok": {"type": "boolean"}}}], True),
    ],
    "llm-langchain-workflow": [
        case("eval_langchain 3-stage chain passes intermediate outputs", "eval_langchain", [["step1:{a}-{b}", "step2:{input}", "step3:{input}"], {"a": "x", "b": "y"}, "完成"], {"chain_out": "STEP3:STEP2:STEP1:X-Y", "agent_out": "Bot(助手)执行: 完成"}),
        case("eval_langchain missing template key raises KeyError", "eval_langchain", [["missing:{k}"], {}, "test"], expected_exc="KeyError"),
    ],
    "llm-prompt-template-l2": [
        case("render_prompt replaces repeated and numeric placeholders", "render_prompt", ["{{a}} + {{b}} = {{a}}", {"a": 1, "b": 2}], "1 + 2 = 1"),
        case("inject_examples respects explicit custom separator", "inject_examples", ["Prompt", [["q1", "a1"], ["q2", "a2"]], "\n---\n"], "Prompt\n\nExamples:\nQ: q1\nA: a1\n---\nQ: q2\nA: a2"),
    ],
    "llm-cot-verify-l2": [
        case("verify_cot_steps flags multiple invalid steps and skips non-numeric", "verify_cot_steps", [["a + b = c", "1 + 2", "1 + 2 = 4", "3 + 5 = 9"]], {"valid": False, "errors": [[2, "addition error"], [3, "addition error"]]}),
        case("detect_step_error mismatch returns False", "detect_step_error", ["42", "43"], {"match": False}),
    ],
    "llm-tool-plan-l2": [
        case("react_step empty state handles missing action and args", "react_step", [{}, {}], {"observation": "Error: unknown tool ", "thought": "Executed , got: Error: unknown tool "}),
        case("eval_tool_plan truncates long observation in thought to 50 chars", "eval_tool_plan", ["echo", {"msg": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}, "truncate"], {"observation": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "thought": "Executed echo, got: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}),
    ],
    "llm-qlora-l2": [
        case("quantize_nf4 scales asymmetric values with absmax 4.0", "quantize_nf4", [[-4.0, 2.0]], {"indices": [0, 11], "absmax": 4.0}),
        case("dequantize_nf4 zero absmax produces zero tensor", "dequantize_nf4", [{"indices": [0, 15]}, 0.0], [0.0, 0.0]),
    ],
    "llm-dpo-l2": [
        case("sigmoid evaluates 0 and clipped extremes", "sigmoid", [[0.0, -1000.0, 1000.0]], "__COMPUTE__", check=lambda out: len(out) == 3 and abs(out[0] - 0.5) < 1e-12 and abs(out[1]) < 1e-12 and abs(out[2] - 1.0) < 1e-12),
        case("dpo_loss equal logp margin cancels to ln(2)", "dpo_loss", [[-1.0, -1.0], [-1.0, -1.0], [-2.0, -2.0], [-2.0, -2.0], 0.5], 0.6931),
    ],
    "llm-kv-cache-l2": [
        case("update_kv_cache populates empty None cache", "update_kv_cache", [{"K": None, "V": None}, [[[[1, 2]]]], [[[[3, 4]]]]], {"K": [[[[1.0, 2.0]]]], "V": [[[[3.0, 4.0]]]]}),
        case("softmax handles large equal logits without overflow", "softmax", [[[100.0, 100.0]]], [[0.5, 0.5]]),
    ],
    "llm-chunk-optimize-l2": [
        case("smart_chunk empty text returns single empty chunk or list", "smart_chunk", ["", 10, 2], []),
        case("smart_chunk overlap on short prior chunk prepends available chars", "smart_chunk", ["AA\n\nBBBBBBBB", 4, 1], ["AA", "ABBBBBBBB"]),
    ],
    "llm-embed-alignment-l2": [
        case("compute_alignment single class has neg_sim 0", "compute_alignment", [[[1, 0], [1, 0]], [0, 0]], {"alignment": 1.0, "pos_sim": 1.0, "neg_sim": 0.0}),
        case("compute_alignment all distinct classes has pos_sim 0", "compute_alignment", [[[1, 0], [0, 1]], [0, 1]], {"alignment": 0.0, "pos_sim": 0.0, "neg_sim": 0.0}),
    ],
    "llm-hnsw-l2": [
        case("euclidean identical vectors gives 0", "euclidean", [[1, 2, 3], [1, 2, 3]], 0.0),
        case("hnsw_search top_k exceeding nodes returns all sorted", "hnsw_search", [[0, 0], [[3, 4], [1, 1]], 2, 5], [1, 0]),
    ],
    "llm-tool-rag-l2": [
        case("retrieve empty docs returns empty list", "retrieve", [[1, 0], [], 2], []),
        case("augment empty relevant list formats prompt cleanly", "augment", ["How?", []], "Context:\n\n\nQuestion: How?\nAnswer:"),
    ],
    "llm-stream-output-l2": [
        case("parse_sse_stream ignores non-data lines and DONE marker", "parse_sse_stream", [["event: ping\n", "data: [1, 2]\n", "ignore\n", "data: [DONE]"]], [[1, 2]]),
        case("is_complete_json empty string returns False", "is_complete_json", [""], False),
    ],
    "llm-agent-memory-l2": [
        case("window=0 keeps empty recent context and summarizes all", "eval_agent_memory", [["a", "b"], 0], {"context": ["Summary: a\nb\n..."], "summary": "a\nb\n"}),
        case("long messages truncate per-message 50 chars and summary preview 100 chars", "eval_agent_memory", [["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "z"], 1], {"context": ["Summary: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb...", "z"], "summary": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\n"}),
    ],

    # =========================================================================
    # Stage 09: RL (12 challenges)
    # =========================================================================
    "rl-mdpsimulator": [
        case("value_iteration 1-state geometric reward sum", "value_iteration", [1, 2, [[[1.0], [1.0]]], [[[1.0], [4.0]]], 0.5, 0.001], [7.999]),
        case("extract_policy picks transition to higher value state under zero rewards", "extract_policy", [[10.0, 0.0], 2, 2, [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]], [0, 0]),
    ],
    "rl-qlearning": [
        case("q_learning deterministic cycle updates Q and avg_return", "q_learning", [{"n_states": 2, "n_actions": 1, "trans": [[[0, 1]], [[1, 0]]], "rewards": [[[0, 2]], [[0, 0]]]}, 1, 0.5, 0.9, 0.0], {"Q": [[8.6451], [7.6544]], "avg_return": 50.0}),
        case("epsilon_greedy non-zero state with negative Q values", "epsilon_greedy", [[[-10.0, -2.0, -5.0], [-5.0, -1.0, -3.0]], 1, 0.0], 1),
    ],
    "rl-sarsa": [
        case("sarsa zero reward absorbing stays zero", "sarsa", [{"n_states": 2, "n_actions": 1, "trans": [[[0, 1]], [[0, 1]]], "rewards": [[[0, 0]], [[0, 0]]]}, 3, 0.5, 0.9, 0.0], {"Q": [[0.0], [0.0]], "avg_return": 0.0}),
        case("epsilon_greedy negative tie breaks to first max index", "epsilon_greedy", [[[-3.0, -3.0, -5.0]], 0, 0.0], 0),
    ],
    "rl-dqn": [
        case("eval_replay_buffer empty pushes stays empty", "eval_replay_buffer", [3, []], {"size": 0, "pos": 0, "buf": []}),
        case("compute_td_loss mixed terminal and non-terminal batch", "compute_td_loss", [[[0, 0, 1.0, 1, False], [1, 1, 2.0, 0, True]], [[1.0, 2.0], [3.0, 2.0]], [[0.0, 0.0], [4.0, 0.0]], 0.5], 2.0),
    ],
    "rl-ppo": [
        case("compute_advantages empty trajectory returns empty", "compute_advantages", [[], [], 0.99, 0.95], []),
        case("ppo_clip_surrogate ratio=1 unclipped equals -advantage", "ppo_clip_surrogate", [0.0, 0.0, 3.0, 0.2], -3.0),
    ],
    "rl-actor-critic": [
        case("actor_forward large logits remain numerically stable", "actor_forward", [[10, 0], [[100, -100], [0, 0]]], [1.0, 0.0]),
        case("critic_forward 3D mixed sign dot product", "critic_forward", [[-2, 3, -1], [1.5, 2.0, -4.0]], 7.0),
    ],
    "rl-bellman-l2": [
        case("bellman_expectation stochastic transitions", "bellman_expectation", [[4.0, 6.0], [[[0.5, 0.5]], [[0.0, 1.0]]], [[[2.0, 0.0]], [[0.0, 1.0]]], 0.5], [3.5, 4.0]),
        case("bellman_optimal gamma=0 ignores successor values", "bellman_optimal", [[2.0, 4.0], [[[1, 0], [0, 1]], [[1, 0], [0, 1]]], [[[1, 0], [0, 2]], [[3, 0], [0, 1]]], 0.0], [2.0, 3.0]),
    ],
    "rl-epsilon-decay-l2": [
        case("decay_schedule steps=0 returns empty list", "decay_schedule", [0.5, 0.1, 0.9, 0], []),
        case("epsilon_greedy non-zero state tie-breaks to first index", "epsilon_greedy", [[[1, 9, 0], [4, 4, 2]], 1, 0.0], 0),
    ],
    "rl-sarsa-lambda-l2": [
        case("sarsa_lambda multi-episode accumulation with lam=1", "sarsa_lambda", [{"start": 0, "transitions": [[[1, 0, False]], [[2, 1, True]], []]}, 2, 0.5, 1.0, 0.0, 1.0], [[0.75], [0.75], []]),
        case("sarsa_lambda episodes=0 leaves Q all zeros", "sarsa_lambda", [{"start": 0, "transitions": [[[1, 0, False]], [[2, 1, True]], []]}, 0, 1.0, 0.9, 0.0, 0.5], [[0.0], [0.0], []]),
    ],
    "rl-double-dqn-l2": [
        case("double_dqn_update gamma=0 mixed batch", "double_dqn_update", [[[1.0, 2.0], [3.0, 4.0]], [[1.0, 2.0], [5.0, 6.0]], [[0, 0, 1.0, 1, False], [1, 1, 2.0, 0, True]], 0.0], 2.0),
        case("double_dqn_update online argmax tie breaks to index 0", "double_dqn_update", [[[2.0, 0.0], [5.0, 5.0]], [[0.0, 0.0], [4.0, 100.0]], [[0, 0, 0.0, 1, False]], 0.5], 0.0),
    ],
    "rl-gae-l2": [
        case("compute_gae empty trajectory returns empty", "compute_gae", [[], [], 0.99, 0.95], []),
        case("compute_gae bootstraps extra terminal value when len(values) > len(rewards)", "compute_gae", [[1.0, 1.0], [0.0, 0.0, 10.0], 0.5, 1.0], [4.0, 6.0]),
    ],
    "rl-actor-critic-continuous-l2": [
        case("normal_log_prob handles vector inputs", "normal_log_prob", [[0.0, 1.0], [1.0, 2.0], [0.0, 1.0]], "__COMPUTE__", check=lambda out: len(out) == 2 and abs(out[0] + 0.91893853) < 1e-6 and abs(out[1] + 1.61208571) < 1e-6),
        case("actor_critic_continuous zero state gives unit sigma", "actor_critic_continuous", [[0, 0], [[1, 2], [3, 4]], [[5, 6], [7, 8]], [9, 10]], {"mu": [0.0, 0.0], "sigma": [1.0, 1.0], "value": 0.0}),
    ],

    # =========================================================================
    # Stage 10: Engineering & Deployment (10 challenges)
    # =========================================================================
    "deploy-fastapi-service": [
        case("format_response rounds confidence to 4 decimals", "format_response", ["positive", 0.912345], {"success": True, "prediction": "positive", "confidence": 0.9123, "latency_ms": 0}),
        case("validate_input rejects bool for int field", "validate_input", [{"count": True}, {"count": "int"}], [False, "count should be int"]),
    ],
    "deploy-onnx-export": [
        case("compare_outputs boundary diff=1e-4 fails strict <1e-4", "compare_outputs", [[[1.0, 2.0]], [[1.0, 2.0001]]], {"max_diff": 0.0001, "pass": False}),
        case("onnx_inference defaults missing weight and bias", "onnx_inference", [{"graph": {"initializers": {}}}, [[3.0]]], [[3.0]]),
    ],
    "deploy-docker-packaging": [
        case("parse_dockerfile handles lowercase ENV EXPOSE and no-arg CMD", "parse_dockerfile", ["env A=1\nexpose 8080\n\n# comment\ncmd"], [{"cmd": "ENV", "args": "A=1"}, {"cmd": "EXPOSE", "args": "8080"}, {"cmd": "CMD", "args": ""}]),
        case("calculate_image_size empty layers returns 0", "calculate_image_size", [[]], 0),
    ],
    "deploy-ollama-inference": [
        case("ollama_generate truncates long prompt to 50 chars with default 128 tokens", "ollama_generate", ["llama3:8b", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"], {"model": "llama3:8b", "response": "[llama3:8b 模拟回复] 收到: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa... (128 tokens)", "tokens_generated": 128, "done": True}),
        case("estimate_ram_usage 70B large model", "estimate_ram_usage", [70], {"model_size_billions": 70, "fp16_ram_gb": 140.0, "int8_ram_gb": 70.0, "recommended_gb": 210}),
    ],
    "deploy-vllm-serving": [
        case("paged_attention sharp key dominates output", "paged_attention", [[10, 0], [[10, 0], [0, 10]], [0, 1], 16], "__COMPUTE__", check=lambda out: out["output"][0] > 9.99 and abs(out["scores"][0] - 70.710678) < 1e-4),
        case("compute_throughput rounds tokens_per_sec to 2 decimals", "compute_throughput", [100, 3.0], {"tokens_per_sec": 33.33, "total_tokens": 100, "total_time": 3.0}),
    ],
    "deploy-async-handler-l2": [
        case("async_process timeout=0 triggers deterministic timeout for all", "async_process", [["x", "y"], 0.0], ["timeout:", "timeout:"]),
        case("async_process 5 concurrent requests complete", "async_process", [["1", "2", "3", "4", "5"], 2], ["ok:1", "ok:2", "ok:3", "ok:4", "ok:5"]),
    ],
    "deploy-onnx-optimize-l2": [
        case("constant_folding preserves graph structure", "constant_folding", [{"nodes": [{"op": "Add", "input": "x", "output": "y"}]}], {"nodes": [{"op": "Add", "input": "x", "output": "y"}]}),
        case("fuse_conv_bn empty graph returns empty nodes", "fuse_conv_bn", [{}], {"nodes": []}),
    ],
    "deploy-docker-multi-stage-l2": [
        case("parse_stages ignores lines before first FROM and supports empty stage", "parse_stages", ["RUN orphan\nFROM alpine\n\nFROM scratch\nCOPY a b"], [{"from": "alpine", "cmds": []}, {"from": "scratch", "cmds": ["COPY a b"]}]),
        case("multi_stage_build 3 stages with empty final stage", "multi_stage_build", ["FROM a\nRUN 1\nFROM b\nRUN 2\nFROM c"], {"stages": [{"stage": 0, "base": "a", "layers": 1, "size_mb": 5, "final": False}, {"stage": 1, "base": "b", "layers": 1, "size_mb": 5, "final": False}, {"stage": 2, "base": "c", "layers": 0, "size_mb": 0, "final": True}], "total_size": 10}),
    ],
    "deploy-model-quantization-l2": [
        case("quantize_int8 all-zero tensor uses safe scale 1.0", "quantize_int8", [[0.0, 0.0, 0.0]], {"quantized": [0, 0, 0], "scale": 1.0}),
        case("quantization_error quantized dict computes non-zero mse and max_error", "quantization_error", [[0.5, 1.0], {"quantized": [1, 3], "scale": 2.0}], {"mse": 0.125, "max_error": 0.5}),
    ],
    "deploy-continuous-batching-l2": [
        case("continuous_batching max_len=1 completes in ceiling(N/batch) steps", "continuous_batching", [[1, 2, 3], 2, 1], {"completed": [1, 2, 3], "steps": 2, "throughput": 1.5}),
        case("continuous_batching exact single batch size", "continuous_batching", [[1, 2, 3], 3, 3], {"completed": [1, 2, 3], "steps": 2, "throughput": 1.5}),
    ],

    # =========================================================================
    # Stage 11: Capstone Projects (10 challenges)
    # =========================================================================
    "project-ai-customer-service": [
        case("generate_response missing intent falls back to default message", "generate_response", ["未知意图", {"order_ids": [], "products": []}, {"退货": "退货"}], "感谢您的咨询，我们已收到您的请求。"),
        case("extract_entities multiple products without order IDs", "extract_entities", ["没有订单只有电脑和键盘"], {"order_ids": [], "products": ["电脑", "键盘"]}),
    ],
    "project-code-assistant": [
        case("suggest_completions caps output at top 5", "suggest_completions", [{"line": "x = 1"}, [{"code": f"s{i}", "keywords": ["x"]} for i in range(7)]], [{"code": f"s{i}", "keywords": ["x"]} for i in range(5)]),
        case("calculate_relevance case-insensitive keyword matching", "calculate_relevance", [{"line": "RETURN value"}, {"keywords": ["return", "async"]}], 1),
    ],
    "project-multi-agent": [
        case("eval_meeting_orchestrator picks afternoon slot with 0 participants", "eval_meeting_orchestrator", [{"busy": ["09:00", "10:00", "11:00"]}, {"participants": [], "duration": "2h", "date": "2025-07-01"}], {"status": "success", "meeting": {"time": "14:00", "date": "2025-07-01"}, "notified": 0}),
        case("ConflictResolverAgent picks consensus slot across schedules", "ConflictResolverAgent.resolve", [[["10:00", "11:00"], ["11:00", "14:00"]]], "11:00"),
    ],
    "project-gradio-demo": [
        case("queue_request queue_size=0 processes zero items", "queue_request", ["non_callable", [], 0], {"processed": 0, "status": "completed"}),
        case("build_interface empty inputs and outputs", "build_interface", [[], [], "fn", "Empty"], {"title": "Empty", "num_inputs": 0, "num_outputs": 0, "fn_name": "callable", "status": "ready"}),
    ],
    "project-streamlit-dashboard": [
        case("compute_metrics all negative labels avoids zero division", "compute_metrics", [[0, 0, 0], [0, 0, 0]], {"accuracy": 1.0, "precision": 0.0, "recall": 0.0, "f1": 0.0}),
        case("detect_drift exact threshold is not flagged as drift", "detect_drift", [[10, 10], [11, 11], 0.1], {"drift_detected": False, "diff": 0.1, "threshold": 0.1}),
    ],
    "proj-sentiment-analyzer-l2": [
        case("classify_sentiment neutral mid-ratio range", "classify_sentiment", [{"pos_count": 1, "neg_count": 1}], "neutral"),
        case("route_by_sentiment unknown sentiment falls back to general_queue", "route_by_sentiment", ["unknown_label"], "general_queue"),
    ],
    "proj-code-reviewer-l2": [
        case("check_style flags lines longer than 80 characters", "check_style", ["a" * 81], ["Line 1: too long (81 chars)"]),
        case("detect_bugs clean code returns empty list", "detect_bugs", ["x = 1\ny = 2"], []),
    ],
    "proj-task-decomposer-l2": [
        case("decompose_task handles summar and plot keywords", "decompose_task", ["Summarize and plot metrics", []], ["generate_report", "visualize"]),
        case("assign_subtasks decrements workload after assignment", "assign_subtasks", [["fetch_data", "analyze"], {"a1": {"can_do": ["fetch_data", "analyze"], "workload": 2}, "a2": {"can_do": ["analyze"], "workload": 2}}], {"fetch_data": "a1", "analyze": "a2"}),
    ],
    "proj-interactive-dashboard-l2": [
        case("update_plot non-zero dot product and sigmoid confidence", "update_plot", [[2.0, -1.0], [1.5, 1.0]], {"prediction": 2.0, "confidence": 0.881}),
        case("build_demo empty model and schema", "build_demo", [[], []], {"model": [], "inputs": [], "outputs": ["prediction", "confidence"], "live": True}),
    ],
    "proj-ml-pipeline-l2": [
        case("build_report val_acc=0.8 boundary gives needs_tuning", "build_report", [{"train_loss": [0.5, 0.3], "val_acc": [0.7, 0.8]}], {"latest_metrics": {"train_loss": 0.3, "val_acc": 0.8}, "total_epochs": 2, "trend": "needs_tuning"}),
        case("detect_overfitting exact threshold gap == th returns ok", "detect_overfitting", [0.25, 0.5, 0.25], {"overfitting": False, "gap": 0.25, "recommendation": "ok"}),
    ],
}
