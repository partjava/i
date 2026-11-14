"""Extra hidden evaluation cases for Stages 03 - 06 (76 challenges)."""


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


EXTRA_HIDDEN_CASES: dict[str, list[dict]] = {
    # --- Stage 03 (20) ---
    "math-vector-projection-decomposer": [
        case("orthogonal raises ValueError on zero onto", "orthogonal", [[3, 4], [0, 0]], expected_exc="ValueError", hidden=True),
        case("project negative 3d vector onto diagonal", "project", [[-2, 4, 2], [1, 1, 0]], [1.0, 1.0, 0.0], hidden=True),
    ],
    "math-linear-system-solver": [
        case("is_invertible detects non-square matrix", "is_invertible", [[[1, 0, 0], [0, 1, 0]]], False, hidden=True),
        case("solve_linear 3x3 diagonal negative", "solve_linear", [[[2, 0, 0], [0, -4, 0], [0, 0, 5]], [6, 8, -15]], [3.0, -2.0, -3.0], hidden=True),
    ],
    "math-svd-image-compressor": [
        case("svd_compress k=0 produces zero matrix", "svd_compress", [[[1.0, 2.0], [3.0, 4.0]], 0], [[0.0, 0.0], [0.0, 0.0]], hidden=True),
        case("svd_compress rectangular full rank reconstructs", "svd_compress", [[[3.0, 0.0, 0.0], [0.0, 2.0, 0.0]], 2], [[3.0, 0.0, 0.0], [0.0, 2.0, 0.0]], hidden=True),
    ],
    "math-eigen-page-rank": [
        case("page_rank dangling node distributes uniformly", "page_rank", [[["A", "B"]], 0.85, 50], "__COMPUTE__", check=lambda out: len(out) == 2 and out[0][0] == "B" and out[0][1] > out[1][1], hidden=True),
        case("eigen_decompose 3x3 identity", "eigen_decompose", [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], {"values": [1.0, 1.0, 1.0], "vectors": [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]}, hidden=True),
    ],
    "math-bayes-spam-classifier": [
        case("predict directly from trained model dict", "predict", [{"priors": {"spam": 0.8, "ham": 0.2}, "likelihoods": {"spam": {"0": 0.9, "1": 0.1}, "ham": {"0": 0.1, "1": 0.9}}}, [1, 0]], "spam", hidden=True),
        case("prior dominates when likelihoods tie", "eval_naive_bayes_predict", [[{"features": [1], "label": "spam"}, {"features": [0], "label": "spam"}, {"features": [1], "label": "spam"}, {"features": [0], "label": "spam"}, {"features": [1], "label": "ham"}, {"features": [0], "label": "ham"}], [1]], "spam", hidden=True),
    ],
    "math-gaussian-bernoulli-simulator": [
        case("all zeros bernoulli zero var", "compare_with_theory", [[0, 0, 0, 0], "bernoulli"], {"sample_mean": 0.0, "sample_var": 0.0, "theoretical_mean": 0.0, "theoretical_var": 0.0}, hidden=True),
        case("symmetric gaussian sample zero mean", "compare_with_theory", [[-2.0, 0.0, 2.0], "gaussian"], {"sample_mean": 0.0, "sample_var": 2.6667, "theoretical_mean": "mu", "theoretical_var": "sigma^2"}, hidden=True),
    ],
    "math-mle-parameter-estimator": [
        case("gaussian_mle constant sample zero sigma", "gaussian_mle", [[5, 5, 5, 5]], {"mu": 5.0, "sigma": 0.0}, hidden=True),
        case("negative sigma returns None", "negative_log_likelihood", [[1, 2, 3], 2.0, -1.0], "__COMPUTE__", check=lambda out: out is None, hidden=True),
    ],
    "math-gradient-numerical-checker": [
        case("relative_error both zero vectors safe 0", "relative_error", [[0.0, 0.0], [0.0, 0.0]], 0.0, hidden=True),
        case("square1 at zero gradient passes", "eval_gradient_check", ["square1", [0.0], False], {"max_relative_error": 0.0, "pass": True}, hidden=True),
    ],
    "math-gradient-descent-optimizer": [
        case("momentum gd on shifted objective", "eval_gd_optimizer", ["momentum", "shifted", 0.0, 0.1, 3, 0.5], "__COMPUTE__", check=lambda out: len(out) == 4 and out[0] == 0.0 and out[-1] > 0.0, hidden=True),
        case("unknown optimizer mode raises ValueError", "eval_gd_optimizer", ["adam", "square", 1.0, 0.1, 2], expected_exc="ValueError", hidden=True),
    ],
    "math-taylor-approximation": [
        case("taylor_expand quadratic around a=1", "taylor_expand", [None, [1.0, 2.0, 2.0], 1.0, 3.0, 2], 9.0, hidden=True),
        case("exp_approx negative x order 4", "exp_approx", [-1.0, 4], "__COMPUTE__", check=lambda out: abs(out - 0.375) < 1e-12, hidden=True),
    ],
    "math-cauchy-schwarz-l2": [
        case("zero vector safe cos=1 and dot=0", "verify_cauchy_schwarz", [[0, 0], [3, 4]], {"inequality_holds": True, "cos_theta": 1.0, "dot": 0.0}, hidden=True),
        case("4d opposite vectors cos=-1", "verify_cauchy_schwarz", [[1, -1, 1, -1], [-1, 1, -1, 1]], {"inequality_holds": True, "cos_theta": -1.0, "dot": -4.0}, hidden=True),
    ],
    "math-matrix-determinant-l2": [
        case("3x3 permutation matrix det=-1", "matrix_analysis", [[[0, 1, 0], [1, 0, 0], [0, 0, 1]]], {"det": -1.0, "invertible": True, "inverse": [[0.0, 1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0]], "verification": 0.0}, hidden=True),
        case("zero matrix singular", "matrix_analysis", [[[0, 0], [0, 0]]], {"det": 0.0, "invertible": False, "inverse": None, "verification": None}, hidden=True),
    ],
    "math-svd-rank-l2": [
        case("zero matrix rank 0 cond None", "svd_analysis", [[[0, 0], [0, 0]]], {"singular_values": [0.0, 0.0], "rank": 0, "condition_number": None}, hidden=True),
        case("rectangular 2x3 full row rank", "svd_analysis", [[[3, 0, 0], [0, 1, 0]]], {"singular_values": [3.0, 1.0], "rank": 2, "condition_number": 3.0}, hidden=True),
    ],
    "math-eigen-decomposition-l2": [
        case("90 degree rotation matrix trace and det hold", "eigen_analysis", [[[0, -1], [1, 0]]], {"eigenvalues": [0.0, 0.0], "trace_check": True, "det_check": True}, hidden=True),
        case("3x3 identity eigenvalues all 1", "eigen_analysis", [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], {"eigenvalues": [1.0, 1.0, 1.0], "trace_check": True, "det_check": True}, hidden=True),
    ],
    "math-bayes-theorem-l2": [
        case("zero prior yields zero posterior", "bayes_theorem", [0.0, 0.9, 0.1], 0.0, hidden=True),
        case("prior=1 yields posterior=1", "bayes_theorem", [1.0, 0.3, 0.9], 1.0, hidden=True),
    ],
    "math-central-limit-l2": [
        case("clt n=5 m=100 seed=0", "clt_simulation", [5, 100, 0], "__COMPUTE__", check=lambda out: out["theoretical_var"] == round(1 / 60, 4) and 0.3 < out["mean_of_means"] < 0.7, hidden=True),
        case("clt m=1 single group zero empirical variance", "clt_simulation", [10, 1, 42], "__COMPUTE__", check=lambda out: out["var_of_means"] == 0.0 and out["theoretical_var"] == round(1 / 120, 4), hidden=True),
    ],
    "math-mle-estimation-l2": [
        case("all heads p_hat=1", "bernoulli_mle", [[1, 1, 1, 1]], {"p_hat": 1.0, "log_likelihood": -0.0}, hidden=True),
        case("log_likelihood at p=0.2", "log_likelihood", [[1, 0], 0.2], "__COMPUTE__", check=lambda out: abs(out - (-1.8326)) < 1e-4, hidden=True),
    ],
    "math-partial-derivative-l2": [
        case("gradient at negative point (-2,-1)", "gradient_at", [-2, -1], {"grad": [-5.0, -6.0], "magnitude": 7.8102}, hidden=True),
        case("directional derivative unnormalized vector", "directional_derivative", [1, 1, [3, 4]], 5.8, hidden=True),
    ],
    "math-convergence-analysis-l2": [
        case("f evaluates polynomial at x=2", "f", [2], -6, hidden=True),
        case("df vanishes at local minimum x=2.25", "df", [2.25], 0.0, hidden=True),
    ],
    "math-taylor-approximation-l2": [
        case("taylor_ln negative x=-0.5 order 3", "taylor_ln", [-0.5, 3], "__COMPUTE__", check=lambda out: out < -0.66, hidden=True),
        case("taylor_error negative x=-0.2 order 5", "taylor_error", [-0.2, 5], "__COMPUTE__", check=lambda out: out["error"] < 1e-4 and out["exact"] < 0, hidden=True),
    ],

    # --- Stage 04 (26) ---
    "ml-linear-regression-trainer": [
        case("fit_normal_equation 3d identity basis", "fit_normal_equation", [[[1, 0, 0], [0, 1, 0], [0, 0, 1]], [2.0, -3.0, 5.0]], [2.0, -3.0, 5.0], hidden=True),
        case("fit_normal_equation singular collinear raises LinAlgError", "fit_normal_equation", [[[1, 2], [2, 4]], [3, 6]], expected_exc="LinAlgError", hidden=True),
    ],
    "ml-logistic-regression-classifier": [
        case("sigmoid extreme values clip stably", "sigmoid", [[-200.0, 200.0]], "__COMPUTE__", check=lambda out: 0.0 <= out[0] < 1e-10 and out[1] > 0.999999, hidden=True),
        case("predict high threshold 0.8", "predict", [[0.0, 1.0], [[1, 0.5], [1, 2.0]], 0.8], [0, 1], hidden=True),
    ],
    "ml-svm-hinge-classifier": [
        case("hinge_loss positive margin violations", "hinge_loss", [[1, -1], [0.5, 1.0]], 1.25, hidden=True),
        case("margin 3-4 weight vector", "margin", [[3.0, 4.0]], 0.4, hidden=True),
    ],
    "ml-decision-tree-splitter": [
        case("gini balanced binary equals 0.5", "gini", [[0, 1, 0, 1]], 0.5, hidden=True),
        case("information_gain perfect split equals 1", "information_gain", [[1, 2, 10, 11], [0, 0, 1, 1], 2.0], "__COMPUTE__", check=lambda out: abs(out - 1.0) < 1e-6, hidden=True),
    ],
    "ml-random-forest-ensemble": [
        case("predict_forest multi-class majority vote", "predict_forest", [[{"leaf": True, "pred": 2}, {"leaf": True, "pred": 2}, {"leaf": True, "pred": 1}, {"leaf": True, "pred": 0}], [[0.0], [1.0]]], [2, 2], hidden=True),
        case("predict_forest nested 2-level tree", "predict_forest", [[{"leaf": False, "feature": 0, "threshold": 0.0, "left": {"leaf": False, "feature": 1, "threshold": 0.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}}, "right": {"leaf": True, "pred": 2}}], [[-1.0, -1.0], [-1.0, 1.0], [1.0, -1.0]]], [0, 1, 2], hidden=True),
    ],
    "ml-xgboost-gbdt-simulator": [
        case("predict_gbdt split stump negative and positive", "predict_gbdt", [[{"tree": {"feature": 0, "threshold": 0.0, "leaf": False, "left": {"leaf": True, "pred": -2.0}, "right": {"leaf": True, "pred": 4.0}}, "weight": 0.5}], [[-1.0], [1.0]]], [-1.0, 2.0], hidden=True),
        case("fit_gbdt zero estimators returns empty model", "fit_gbdt", [[[1], [2]], [3, 4], 0, 0.1], [], hidden=True),
    ],
    "ml-knn-classifier": [
        case("fit_knn packages X and y", "fit_knn", [[[1, 2], [3, 4]], [0, 1]], {"X": [[1.0, 2.0], [3.0, 4.0]], "y": [0, 1]}, hidden=True),
        case("euclidean_distance identical 3d points zero", "euclidean_distance", [[2.5, -1.5, 4.0], [2.5, -1.5, 4.0]], 0.0, hidden=True),
    ],
    "ml-kmeans-clusterer": [
        case("assign_clusters 3 centroids 3d", "assign_clusters", [[[0, 0, 0], [5, 0, 0], [0, 5, 0]], [[0, 5, 0], [0, 0, 0], [5, 0, 0]]], [1, 2, 0], hidden=True),
        case("update_centroids negative coordinates", "update_centroids", [[[-2.0, 4.0], [0.0, 2.0], [3.0, -1.0], [5.0, 1.0]], [0, 0, 1, 1], 2], [[-1.0, 3.0], [4.0, 0.0]], hidden=True),
    ],
    "ml-dbscan-clusterer": [
        case("euclidean 3-4-5 negative offset", "euclidean", [[-1, -2], [2, 2]], 5.0, hidden=True),
        case("dbscan chain density reachability", "dbscan", [[[0, 0], [1, 0], [2, 0], [3, 0]], 1.0, 2], {"labels": [0, 0, 0, 0], "n_clusters": 1, "noise": 0}, hidden=True),
    ],
    "ml-hierarchical-clustering": [
        case("cluster_distance single linkage minimum", "cluster_distance", [[[0, 0], [1, 0]], [[4, 0], [10, 0]], "single"], 3.0, hidden=True),
        case("agglomerative complete linkage 2 clusters", "agglomerative_clustering", [[[0, 0], [2, 0], [5, 0], [6, 0]], 2, "complete"], [0, 0, 1, 1], hidden=True),
    ],
    "ml-pca-dimensionality-reducer": [
        case("pca_transform with non-zero mean", "pca_transform", [{"mean": [2.0, -1.0], "components": [[1.0, 0.0], [0.0, 1.0]]}, [[5.0, 3.0], [2.0, -1.0]], 2], [[3.0, 4.0], [0.0, 0.0]], hidden=True),
        case("pca_inverse_transform 1d back to 2d", "pca_inverse_transform", [{"mean": [1.0, 2.0], "components": [[1.0, 0.0], [0.0, 1.0]]}, [[3.0], [-1.0]]], [[4.0, 2.0], [0.0, 2.0]], hidden=True),
    ],
    "ml-feature-standardizer": [
        case("unknown scaling method raises ValueError", "eval_feature_scaler", ["unknown", [[1, 2], [3, 4]], [[1, 2]]], expected_exc="ValueError", hidden=True),
        case("minmax constant column zero-range guard", "eval_feature_scaler", ["minmax", [[4, 0], [4, 2]], [[4, 1]]], {"scaled": [[0.0, 0.5]], "restored": [[4.0, 1.0]]}, hidden=True),
    ],
    "ml-normalization-techniques": [
        case("layer_norm_forward constant rows map to beta", "layer_norm_forward", [[[3, 3], [5, 5]], [2, 3], [1, -1]], {"out": [[1.0, -1.0], [1.0, -1.0]], "cache": {"x_hat": [[0.0, 0.0], [0.0, 0.0]], "gamma": [2.0, 3.0], "beta": [1.0, -1.0]}}, hidden=True),
        case("batch_norm_forward single sample shifts to beta", "batch_norm_forward", [[[4.0, -2.0]], [3.0, 5.0], [7.0, 8.0]], {"out": [[7.0, 8.0]], "cache": {"X": [[4.0, -2.0]], "mu": [4.0, -2.0], "var": [0.0, 0.0], "x_hat": [[0.0, 0.0]], "gamma": [3.0, 5.0], "beta": [7.0, 8.0], "eps": 1e-05}}, hidden=True),
    ],
    "ml-ridge-regression-l2": [
        case("fit_ridge stabilizes collinear feature column", "fit_ridge", [[[1, 1], [1, 1]], [2, 2], 1.0], [2.0, 0.0], hidden=True),
        case("compare_coefs single unpenalized lambda", "compare_coefs", [[[1, 0], [1, 1]], [1, 3], [0]], [{"lambda": 0, "coefs": [1.0, 2.0]}], hidden=True),
    ],
    "ml-softmax-regression-l2": [
        case("softmax large logits shift invariance", "softmax", [[[1000.0, 1000.0], [-1000.0, -1000.0]]], [[0.5, 0.5], [0.5, 0.5]], hidden=True),
        case("cross_entropy_loss uniform 4-class equals ln(4)", "cross_entropy_loss", [[0, 1, 2, 3], [[0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25], [0.25, 0.25, 0.25, 0.25]]], "__COMPUTE__", check=lambda out: abs(out - 1.386294) < 1e-4, hidden=True),
    ],
    "ml-svm-kernel-l2": [
        case("eval_kernel_matrix linear rectangular", "eval_kernel_matrix", [[[1, 2], [0, -1]], [[3, 4]], "linear"], [[11.0], [-4.0]], hidden=True),
        case("eval_dual_predict rbf with positive bias", "eval_dual_predict", [[1.0, 1.0], [[0, 0], [10, 10]], [1, -1], [[0, 0], [10, 10], [5, 5]], "rbf", 0.5, 1.0], [1.0, -1.0, 1.0], hidden=True),
    ],
    "ml-decision-tree-regressor-l2": [
        case("predict_tree 1d single sample", "predict_tree", [{"feature": 0, "threshold": 5.0, "left": {"leaf": True, "pred": 1.0}, "right": {"leaf": True, "pred": 9.0}}, [3.0]], 1.0, hidden=True),
        case("build_tree stops immediately at max_depth=0", "build_tree", [[[1], [2], [10], [11]], [1.0, 3.0, 7.0, 9.0], 0, 2], {"pred": 5.0, "leaf": True}, hidden=True),
    ],
    "ml-random-forest-oob-l2": [
        case("oob_predict traverses feature split tree", "oob_predict", [[{"leaf": False, "feature": 0, "threshold": 0.0, "left": {"leaf": True, "pred": 0}, "right": {"leaf": True, "pred": 1}}], [[0, 1]], [[-2.0], [3.0]]], [0, 1], hidden=True),
        case("oob_score half accuracy", "oob_score", [[{"leaf": True, "pred": 1}], [[0, 1]], [[1.0], [2.0]], [1, 0]], 0.5, hidden=True),
    ],
    "ml-xgboost-gbdt-regression-l2": [
        case("gbdt_fit single sample creates leaf", "gbdt_fit", [[[1.0]], [5.0], 1, 0.5, 2], [{"tree": {"pred": 5.0, "leaf": True}, "weight": 0.5}], hidden=True),
        case("gbdt_predict empty model returns zeros", "gbdt_predict", [[], [[0.0], [1.0]]], [0.0, 0.0], hidden=True),
    ],
    "ml-knn-regression-l2": [
        case("weighted_knn_predict exact match dominates", "weighted_knn_predict", [[[0, 0], [5, 5]], [42.0, 100.0], [[0, 0]], 2], "__COMPUTE__", check=lambda out: abs(out[0] - 42.0) < 1e-6, hidden=True),
        case("euclidean distance with negative coord", "euclidean", [[-3, 0], [0, 4]], 5.0, hidden=True),
    ],
    "ml-kmeans-plusplus-l2": [
        case("euclidean 3d distance", "euclidean", [[1, 2, 2], [0, 0, 0]], 3.0, hidden=True),
        case("silhouette_score singleton cluster safe", "silhouette_score", [[[0, 0], [10, 0], [10, 1]], [0, 1, 1]], "__COMPUTE__", check=lambda out: out > 0.5, hidden=True),
    ],
    "ml-dbscan-eps-l2": [
        case("k_distance_plot k=1 nearest neighbor", "k_distance_plot", [[[0, 0], [1, 0], [4, 0]], 1], [3.0, 1.0, 1.0], hidden=True),
        case("dbscan empty dataset", "dbscan", [[], 1.0, 2], {"labels": [], "n_clusters": 0, "noise": 0}, hidden=True),
    ],
    "ml-hierarchical-dendrogram-l2": [
        case("cluster_dist average linkage", "cluster_dist", [[[0, 0], [0, 2]], [[3, 0], [3, 2]], "average"], "__COMPUTE__", check=lambda out: abs(out - 3.3027756) < 1e-4, hidden=True),
        case("dendrogram_heights single point empty", "dendrogram_heights", [[[5, 5]], "single"], [], hidden=True),
    ],
    "ml-pca-whitening-l2": [
        case("reconstruction_error half squared norm", "reconstruction_error", [[[1, 0], [0, 1]], [[1, 0], [0, 0]]], 0.5, hidden=True),
        case("pca_whiten zero eigenvalue safe eps", "pca_whiten", [{"mean": [0.0, 0.0], "components": [[1.0, 0.0], [0.0, 1.0]], "values": [1.0, 0.0]}, [[2.0, 0.0]], 2], "__COMPUTE__", check=lambda out: abs(out[0][0] - 2.0) < 1e-6 and out[0][1] == 0.0, hidden=True),
    ],
    "ml-robust-scaler-l2": [
        case("quantile clips out-of-range test points", "eval_scalers", ["quantile", [[0], [10], [20]], [[-100], [100]], "uniform"], {"transformed": [[0.0], [1.0]]}, hidden=True),
        case("robust multi-column negative roundtrip", "eval_scalers", ["robust", [[-10, 0], [-6, 2], [-2, 4]], [[-6, 2], [2, 6]]], {"transformed": [[0.0, 0.0], [2.0, 2.0]], "restored": [[-6.0, 2.0], [2.0, 6.0]]}, hidden=True),
    ],
    "ml-layer-normalization-l2": [
        case("batch_norm affine gamma beta shift", "batch_norm", [[[0, 2], [2, 4]], [2, 0.5], [1, -1], 0.0], {"out": [[-1.0, -1.5], [3.0, -0.5]], "mu": [1.0, 3.0], "var": [1.0, 1.0]}, hidden=True),
        case("compare_gradients zero diff on symmetric matrix", "compare_gradients", [[[1, 1], [1, 1]], [[1, 2], [2, 1]], [1, 1], [0, 0]], {"max_diff": 0.0, "same_shape": True}, hidden=True),
    ],

    # --- Stage 05 (14) ---
    "dl-mlp-classifier": [
        case("softmax batch stability on large logits", "softmax", [[[100.0, 100.0], [0.0, 0.0]]], [[0.5, 0.5], [0.5, 0.5]], hidden=True),
        case("mlp_forward 3-layer partial relu clipping", "mlp_forward", [[[1, 1]], [[[[-1, 1], [-1, 1]], [0, 0]], [[[1, 0], [0, 1]], [0, 0]], [[[1, 0], [0, 1]], [0, 0]]]], [[[1.0, 1.0]], [[0.0, 2.0]], [[0.0, 2.0]], [[0.11920292202211755, 0.8807970779778823]]], hidden=True),
    ],
    "dl-activation-functions": [
        case("leaky_relu negative slope scaling", "leaky_relu", [[-10.0, 0.0, 5.0], 0.1], [-1.0, 0.0, 5.0], hidden=True),
        case("max_gradient relu equals 1", "max_gradient", ["relu", [-5, 5]], 1.0, hidden=True),
    ],
    "dl-loss-functions": [
        case("binary_cross_entropy clips extreme 0/1 safely", "binary_cross_entropy", [[0.0, 1.0], [1, 0]], "__COMPUTE__", check=lambda out: out > 20.0, hidden=True),
        case("huber_loss zero error returns zero", "huber_loss", [[2.0, -3.0], [2.0, -3.0], 0.5], 0.0, hidden=True),
    ],
    "dl-backpropagation": [
        case("mlp_backward 2-layer grads list", "mlp_backward", [[[1.0]], [[[1.0, 2.0]], [[3.0, 4.0]], [[5.0]]], [[[[1.0, 0.0], [0.0, 1.0]], [0.0, 0.0]], [[[1.0], [1.0]], [0.0]]]], "__COMPUTE__", check=lambda out: len(out) == 2 and out[1][1] == [1.0], hidden=True),
        case("linear_backward batch size 2 sums db", "linear_backward", [[[1.0], [2.0]], [[1.0, 0.0], [0.0, 1.0]], [[2.0], [3.0]]], [[[1.0], [2.0]], [3.0], [[2.0, 3.0], [4.0, 6.0]]], hidden=True),
    ],
    "dl-optimizers-sgd-adam": [
        case("sgd zero gradients preserve params", "eval_optimizer", ["sgd", 0.5, [1.0, -2.0], [[0.0, 0.0], [0.0, 0.0]]], [1.0, -2.0], hidden=True),
        case("unknown optimizer raises ValueError", "eval_optimizer", ["rmsprop", 0.1, [1.0], [[0.5]]], expected_exc="ValueError", hidden=True),
    ],
    "dl-batchnorm-training": [
        case("batchnorm_train momentum=0 resets running stats", "batchnorm_train", [[[0, 4], [2, 8]], [1, 1], [0, 0], [99, 99], [99, 99], 0.0, 0.0], {"out": [[-1.0, -1.0], [1.0, 1.0]], "running_mean": [1.0, 6.0], "running_var": [1.0, 4.0], "cache": {"x_hat": [[-1.0, -1.0], [1.0, 1.0]], "gamma": [1.0, 1.0]}}, hidden=True),
        case("batchnorm_inference affine gamma and beta", "batchnorm_inference", [[[3, 5]], [2, -1], [1, 4], [1, 2], [4, 9], 0.0], [[3.0, 3.0]], hidden=True),
    ],
    "dl-dropout-regularizer": [
        case("dropout_forward keep_prob=0 zeroes output and mask", "dropout_forward", [[[1.0, 2.0], [3.0, 4.0]], 0.0, True], {"out": [[0.0, 0.0], [0.0, 0.0]], "mask": [[0.0, 0.0], [0.0, 0.0]]}, hidden=True),
        case("train_with_dropout keep_prob=0.5 seeded", "train_with_dropout", [[[1, 0], [0, 1]], [1, 0], 4, 0.5, 4], "__COMPUTE__", check=lambda out: len(out) == 4 and all(isinstance(v, float) for v in out), hidden=True),
    ],
    "dl-cnn-forward-l2": [
        case("conv2d_forward stride 2 valid", "conv2d_forward", [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], [[1, 0], [0, 1]], 2, 0], [[7.0, 11.0], [23.0, 27.0]], hidden=True),
        case("compute_output_shape asymmetric rectangular", "compute_output_shape", [10, 14, 3, 5, 2, 1], [5, 6], hidden=True),
    ],
    "dl-relu-variants-l2": [
        case("elu negative value exponential", "elu", [[-1.0, 1.0], 2.0], "__COMPUTE__", check=lambda out: abs(out[0] - 2.0 * (0.36787944 - 1.0)) < 1e-5 and out[1] == 1.0, hidden=True),
        case("gradient elu at zero and positive", "gradient", ["elu", [0.0, 2.0]], [1.0, 1.0], hidden=True),
    ],
    "dl-focal-loss-l2": [
        case("focal_loss hard misclassified high loss", "focal_loss", [[0.01, 0.99], [1, 0], 2.0], "__COMPUTE__", check=lambda out: out > 4.0, hidden=True),
        case("compare_losses monotonic ordering", "compare_losses", [[0.8, 0.2], [1, 0]], "__COMPUTE__", check=lambda out: out["ce"] >= out["fl_g1"] >= out["fl_g2"], hidden=True),
    ],
    "dl-autograd-l2": [
        case("eval_autograd negative input a=-2 b=1", "eval_autograd", [-2.0, 1.0], "__COMPUTE__", check=lambda out: abs(out["out"] - 0.017986) < 1e-4 and out["db"] < 0, hidden=True),
        case("eval_autograd origin a=0 b=0", "eval_autograd", [0.0, 0.0], {"out": 0.5, "da": 0.25, "db": 0.0}, hidden=True),
    ],
    "dl-sgd-momentum-compare-l2": [
        case("sgd short trajectory from origin", "sgd", [[0.0, 0.0], 0.01, 2], "__COMPUTE__", check=lambda out: len(out["trajectory"]) == 3 and out["final"] == out["trajectory"][-1] and out["final"][0] > 0.0, hidden=True),
        case("rosenbrock at origin equals 1", "rosenbrock", [0.0, 0.0], 1.0, hidden=True),
    ],
    "dl-batchnorm-vs-layernorm-l2": [
        case("single feature column batchnorm", "eval_batchnorm", [[[0.0], [2.0], [4.0]], [[2.0]], [[1.0], [0.0], [-1.0]], 0.5], "__COMPUTE__", check=lambda out: abs(out["dbeta"][0]) < 1e-9 and len(out["dx"]) == 3, hidden=True),
        case("asymmetric dout non-zero dx", "eval_batchnorm", [[[1.0, 0.0], [3.0, 4.0]], [[2.0, 2.0]], [[2.0, 1.0], [0.0, -1.0]], 0.0], "__COMPUTE__", check=lambda out: abs(out["dbeta"][0] - 2.0) < 1e-9 and abs(out["dbeta"][1]) < 1e-9, hidden=True),
    ],
    "dl-dropout-variants-l2": [
        case("dropout negative keep_prob zeroes safely", "dropout", [[[3.0, -4.0]], -0.5, True], [[0.0, 0.0]], hidden=True),
        case("dropout keep_prob>1 preserves input", "dropout", [[2.0, 0.0, -5.0], 1.5, True], [2.0, 0.0, -5.0], hidden=True),
    ],

    # --- Stage 06 (16) ---
    "cv-image-filter-kernel": [
        case("convolve horizontal edge detector kernel", "convolve", [[[0, 0, 10], [0, 0, 10], [0, 0, 10]], [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]]], [[0.0, 20.0, 0.0], [0.0, 30.0, 0.0], [0.0, 20.0, 0.0]], hidden=True),
        case("gaussian_kernel 5x5 normalized and peaked", "gaussian_kernel", [5, 1.5], "__COMPUTE__", check=lambda out: len(out) == 5 and abs(sum(sum(r) for r in out) - 1.0) < 1e-6 and out[2][2] > out[0][0], hidden=True),
    ],
    "cv-canny-edge-detector": [
        case("sobel_gradients vertical step horizontal mag", "sobel_gradients", [[[0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1]]], "__COMPUTE__", check=lambda out: out["magnitude"][1][1] > 0 and abs(out["direction"][1][1]) < 1e-6, hidden=True),
        case("hysteresis drops isolated weak edge", "hysteresis", [[[0, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 2], [0, 0, 0, 0]]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 255], [0, 0, 0, 0]], hidden=True),
    ],
    "cv-color-space-converter": [
        case("rgb_to_hsv pure blue hue 2/3", "rgb_to_hsv", [[[[0.0, 0.0, 1.0]]]], "__COMPUTE__", check=lambda out: abs(out[0][0][0] - 2 / 3) < 1e-6 and out[0][0][1] == 1.0 and out[0][0][2] == 1.0, hidden=True),
        case("hsv_to_rgb zero saturation grayscale", "hsv_to_rgb", [[[[0.5, 0.0, 0.4]]]], [[[0.4, 0.4, 0.4]]], hidden=True),
    ],
    "cv-sift-feature-matcher": [
        case("dog_keypoints flat image empty", "dog_keypoints", [[[5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5]], 1.0, 1.6, 0.03], [], hidden=True),
        case("compute_descriptor skips boundary keypoint", "compute_descriptor", [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], [[0, 0, 1.0]], 8], [], hidden=True),
    ],
    "cv-cnn-classifier": [
        case("conv2d_forward stride 2 valid", "conv2d_forward", [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], [[1, 0], [0, 1]], 0, 2], [[7.0, 11.0], [23.0, 27.0]], hidden=True),
        case("max_pool2d negative inputs", "max_pool2d", [[[-5, -2], [-8, -1]], 2, 2], [[-1.0]], hidden=True),
    ],
    "cv-yolo-anchor-detector": [
        case("iou partial overlap 1/7", "iou", [[0, 0, 2, 2], [1, 1, 3, 3]], "__COMPUTE__", check=lambda out: abs(out - 1 / 7) < 1e-6, hidden=True),
        case("map_score greedy 1-to-1 gt matching", "map_score", [[[0, 0, 2, 2, 0.9], [0, 0, 2, 2, 0.8]], [[0, 0, 2, 2], [5, 5, 7, 7]], 0.5], 0.5, hidden=True),
    ],
    "cv-unet-segmenter": [
        case("dice_loss disjoint near 1", "dice_loss", [[[1, 0], [0, 0]], [[0, 1], [1, 1]]], "__COMPUTE__", check=lambda out: abs(out - 1.0) < 1e-6, hidden=True),
        case("unet_forward negative input clipped by ReLU", "unet_forward", [[[-1.0, -1.0, -1.0, -1.0], [-1.0, -1.0, -1.0, -1.0], [-1.0, -1.0, -1.0, -1.0], [-1.0, -1.0, -1.0, -1.0]], {"e1": [[1]], "e2": [[1]], "b": [[1]], "d1": [[1]], "d2": [[1]], "out": [[1]]}], [[0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0]], hidden=True),
    ],
    "cv-sam-prompt-segmenter": [
        case("point_to_mask negative label subtracts logits", "point_to_mask", [[[5.0, 5.0, 5.0], [5.0, 5.0, 5.0], [5.0, 5.0, 5.0]], [1, 1], 0, 1], [[5.0, 5.0, 5.0], [5.0, -5.0, 5.0], [5.0, 5.0, 5.0]], hidden=True),
        case("iou_matrix zero masks safe off-diagonal", "iou_matrix", [[[[0, 0], [0, 0]], [[0, 0], [0, 0]]]], [[1.0, 0.0], [0.0, 1.0]], hidden=True),
    ],
    "cv-histogram-l2": [
        case("uniform 255 image stays 255", "histogram_equalize", [[[255, 255], [255, 255]]], [[255, 255], [255, 255]], hidden=True),
        case("3x3 dark low-contrast stretches range", "histogram_equalize", [[[10, 20, 30], [10, 20, 30], [10, 20, 30]]], "__COMPUTE__", check=lambda out: len(out) == 3 and out[0][2] == 255 and out[0][0] < out[0][1] < out[0][2], hidden=True),
    ],
    "cv-hough-l2": [
        case("hough_lines horizontal line max votes", "hough_lines", [[[0, 0, 0], [1, 1, 1], [0, 0, 0]], 45, 1], "__COMPUTE__", check=lambda out: max(max(row) for row in out[0]) == 3, hidden=True),
        case("find_peaks strict greater-than threshold", "find_peaks", [[[10, 11], [9, 10]], 10], [[0, 1]], hidden=True),
    ],
    "cv-color-transfer-l2": [
        case("single pixel image matches target color", "color_transfer", [[[[0.2, 0.8, 0.4]]], [[[0.7, 0.3, 0.5]]]], "__COMPUTE__", check=lambda out: len(out) == 1 and all(abs(out[0][0][c] - [0.7, 0.3, 0.5][c]) < 1e-4 for c in range(3)), hidden=True),
        case("color_transfer output bounded in [0, 1]", "color_transfer", [[[[0.0, 0.0, 0.0], [1.0, 1.0, 1.0]]], [[[0.1, 0.9, 0.2], [0.2, 0.8, 0.3]]]], "__COMPUTE__", check=lambda out: all(0.0 <= v <= 1.0 for row in out for px in row for v in px), hidden=True),
    ],
    "cv-harris-l2": [
        case("horizontal step edge zero corners", "harris_corner", [[[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1]], 0.04, 1e-06], [[0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0]], hidden=True),
        case("isolated impulse peak positive corner response", "harris_corner", [[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], 0.04, 1e-06], "__COMPUTE__", check=lambda out: max(max(r) for r in out) > 0, hidden=True),
    ],
    "cv-resnet-l2": [
        case("conv2d stride 2 halves dimensions", "conv2d", [[[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]]], [[[[1.0]]]], 2], [[[[1.0, 3.0], [9.0, 11.0]]]], hidden=True),
        case("residual_block multi-channel zero weights", "residual_block", [[[[[1, 0], [0, 1]], [[2, 2], [2, 2]]]], [[[[1]], [[0]]], [[[0]], [[1]]]], [[[[0]], [[0]]], [[[0]], [[0]]]]], [[[[1.0, 0.0], [0.0, 1.0]], [[2.0, 2.0], [2.0, 2.0]]]], hidden=True),
    ],
    "cv-yolo-loss-l2": [
        case("width height sqrt mismatch scaled by lc", "yolo_loss", [[[0.5, 0.5, 0.25, 0.25]], [[0.5, 0.5, 0.0, 0.0]], [1.0], [1.0], [[1]], [[1]], 5], "__COMPUTE__", check=lambda out: out > 2.4, hidden=True),
        case("multi-box batch sums across objects", "yolo_loss", [[[0.5, 0.5, 0.2, 0.2], [0.5, 0.5, 0.2, 0.2]], [[0.5, 0.5, 0.2, 0.2], [0.5, 0.5, 0.2, 0.2]], [0.0, 0.5], [1.0, 1.0], [[1, 0], [0, 1]], [[1, 0], [0, 1]]], 1.25, hidden=True),
    ],
    "cv-dice-l2": [
        case("dice_coef disjoint masks near zero", "dice_coef", [[[1, 0], [0, 0]], [[0, 1], [1, 1]]], 0.0, hidden=True),
        case("pixel_accuracy strict >0.5 boundary", "pixel_accuracy", [[[0.5, 0.51], [0.49, 1.0]], [[0, 1], [0, 1]]], 1.0, hidden=True),
    ],
    "cv-sam-l2": [
        case("extract_embedding 32x32 4 patches", "extract_embedding", [[[float((i + j) % 2) for j in range(32)] for i in range(32)], 6], "__COMPUTE__", check=lambda out: len(out) == 6, hidden=True),
        case("decode_mask size=0 returns empty list", "decode_mask", [[0.0], [0, 0], 0], [], hidden=True),
    ],
}
