'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const onehotCode = `import numpy as np
from sklearn.preprocessing import OneHotEncoder

# 创建词汇表
vocabulary = ['猫', '狗', '鱼', '鸟']

# 创建OneHotEncoder
encoder = OneHotEncoder(sparse=False)

# 将词汇表转换为二维数组
vocabulary_array = np.array(vocabulary).reshape(-1, 1)

# 进行编码
one_hot_vectors = encoder.fit_transform(vocabulary_array)

# 打印结果
for word, vector in zip(vocabulary, one_hot_vectors):
    print(f"{word}: {vector}")

# 创建词到向量的映射
word_to_vector = {word: vector for word, vector in zip(vocabulary, one_hot_vectors)}

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for word1 in vocabulary:
    for word2 in vocabulary:
        if word1 != word2:
            sim = cosine_similarity(word_to_vector[word1], word_to_vector[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim}")`

const w2vCode = `from gensim.models import Word2Vec
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 准备训练数据
sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛'],
    ['词向量', '是', '自然语言', '处理', '的', '基础', '技术'],
    ['Word2Vec', '是', '一种', '常用', '的', '词向量', '模型']
]

# 训练Word2Vec模型
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 保存模型
model.save('word2vec.model')

# 加载模型
model = Word2Vec.load('word2vec.model')

# 获取词向量
word_vectors = model.wv

# 查找相似词
print("与'自然语言'最相似的词：")
print(word_vectors.most_similar('自然语言'))

# 词语类比
print("\\n词语类比：")
print(word_vectors.most_similar(positive=['自然语言', '处理'], negative=['机器']))

# 可视化词向量
def plot_word_vectors(words, vectors):
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    plt.title('词向量可视化')
    plt.show()

words = ['自然语言', '处理', '人工智能', '机器', '学习', '深度学习', '词向量']
vectors = [word_vectors[word] for word in words]
plot_word_vectors(words, vectors)

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(word_vectors[word1], word_vectors[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")`

const gloveCode = `from gensim.models import KeyedVectors
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

def load_glove_model(file_path):
    print("加载GloVe模型...")
    model = KeyedVectors.load_word2vec_format(file_path, binary=False)
    print("加载完成！")
    return model

model = load_glove_model('glove.6B.100d.txt')

print("与'king'最相似的词：")
print(model.most_similar('king'))

print("\\n词语类比：")
print(model.most_similar(positive=['king', 'woman'], negative=['man']))

def plot_word_vectors(words, model):
    vectors = [model[word] for word in words]
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    plt.title('GloVe词向量可视化')
    plt.show()

words = ['king', 'queen', 'man', 'woman', 'boy', 'girl', 'child']
plot_word_vectors(words, model)

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(model[word1], model[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")

# 训练自定义GloVe模型
from glove import Corpus, Glove

sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛']
]
corpus = Corpus()
corpus.fit(sentences, window=5)
glove = Glove(no_components=100, learning_rate=0.05)
glove.fit(corpus.matrix, epochs=30, no_threads=4, verbose=True)
glove.add_dictionary(corpus.dictionary)
glove.save('glove.model')
glove = Glove.load('glove.model')
print("\\n与'自然语言'最相似的词：")
print(glove.most_similar('自然语言', number=5))`

const fasttextCode = `from gensim.models import FastText
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛'],
    ['词向量', '是', '自然语言', '处理', '的', '基础', '技术'],
    ['FastText', '是', '一种', '常用', '的', '词向量', '模型']
]

model = FastText(sentences, vector_size=100, window=5, min_count=1, workers=4)
model.save('fasttext.model')
model = FastText.load('fasttext.model')
word_vectors = model.wv

print("与'自然语言'最相似的词：")
print(word_vectors.most_similar('自然语言'))

print("\\n未登录词'自然语言处理技术'的向量：")
print(word_vectors['自然语言处理技术'])

def plot_word_vectors(words, vectors):
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    plt.title('FastText词向量可视化')
    plt.show()

words = ['自然语言', '处理', '人工智能', '机器', '学习', '深度学习', '词向量']
vectors = [word_vectors[word] for word in words]
plot_word_vectors(words, vectors)

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(word_vectors[word1], word_vectors[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")`

const bertCode = `import torch
from transformers import BertTokenizer, BertModel, BertForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertModel.from_pretrained('bert-base-chinese')

text = "自然语言处理是人工智能的重要分支"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

with torch.no_grad():
    outputs = model(**inputs)

last_hidden_states = outputs.last_hidden_state
sentence_embedding = last_hidden_states[0][0]
word_embeddings = last_hidden_states[0][1:-1]
word_embeddings = word_embeddings.numpy()

def plot_word_vectors(words, vectors):
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    plt.title('BERT词向量可视化')
    plt.show()

tokens = tokenizer.tokenize(text)
print("分词结果：", tokens)
plot_word_vectors(tokens, word_embeddings)

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("\\n词语相似度：")
for i, word1 in enumerate(tokens):
    for j, word2 in enumerate(tokens):
        if i != j:
            sim = cosine_similarity(word_embeddings[i], word_embeddings[j])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")

# 文本分类
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
    def __len__(self):
        return len(self.texts)
    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        encoding = self.tokenizer(text, padding='max_length', truncation=True, max_length=128, return_tensors='pt')
        return {'input_ids': encoding['input_ids'].flatten(), 'attention_mask': encoding['attention_mask'].flatten(), 'labels': torch.tensor(label)}

train_texts = ["自然语言处理是人工智能的重要分支", "机器学习在自然语言处理中应用广泛", "深度学习推动了自然语言处理的发展", "词向量是自然语言处理的基础技术"]
train_labels = [1, 1, 1, 1]
train_dataset = TextDataset(train_texts, train_labels, tokenizer)
train_dataloader = DataLoader(train_dataset, batch_size=2, shuffle=True)

classifier = BertForSequenceClassification.from_pretrained('bert-base-chinese', num_labels=2)
optimizer = torch.optim.AdamW(classifier.parameters(), lr=2e-5)

for epoch in range(3):
    classifier.train()
    for batch in train_dataloader:
        optimizer.zero_grad()
        outputs = classifier(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()

classifier.save_pretrained('bert-classifier')
classifier = BertForSequenceClassification.from_pretrained('bert-classifier')

def predict(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = classifier(**inputs)
    predictions = torch.softmax(outputs.logits, dim=-1)
    return predictions.argmax().item()

test_text = "自然语言处理技术发展迅速"
prediction = predict(test_text)
print(f"\\n预测结果：{'正面' if prediction == 1 else '负面'}")`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '词向量与词嵌入', chapterNumber: 3, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '文本预处理', href: '/study/ai/nlp/preprocessing' },
  nextChapter: { label: '文本分类', href: '/study/ai/nlp/text-classification' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>词向量与词嵌入概述</PageTitle><BookParagraph>词向量是将词语映射到低维实数空间的技术，使得词语之间的语义关系可以通过向量空间中的距离和方向来表示。词嵌入是词向量的一种实现方式，它能够捕捉词语之间的语义和语法关系。</BookParagraph><div className="flex justify-center"><svg width="100%" height="220" viewBox="0 0 800 220"><rect x="30" y="80" width="100" height="50" rx="5" fill="#e3f2fd" /><text x="80" y="110" textAnchor="middle" fill="#1565c0">词语</text><line x1="130" y1="105" x2="190" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_we)"/><rect x="190" y="80" width="100" height="50" rx="5" fill="#e8f5e9" /><text x="240" y="110" textAnchor="middle" fill="#2e7d32">词向量</text><line x1="290" y1="105" x2="350" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_we)"/><rect x="350" y="80" width="100" height="50" rx="5" fill="#fff3e0" /><text x="400" y="110" textAnchor="middle" fill="#e65100">语义空间</text><line x1="450" y1="105" x2="510" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_we)"/><rect x="510" y="80" width="100" height="50" rx="5" fill="#f3e5f5" /><text x="560" y="110" textAnchor="middle" fill="#6a1b9a">NLP任务</text></svg></div><SectionTitle>词向量的优势</SectionTitle><BookList items={['捕捉词语间的语义关系','支持词语相似度计算','便于机器学习模型处理','降低特征维度','提高模型泛化能力']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['文本分类','情感分析','机器翻译','问答系统','命名实体识别']} /></div>),
  },
  {
    label: 'One-Hot编码', left: (<div className="space-y-4"><PageTitle>One-Hot编码</PageTitle><BookParagraph>One-Hot编码是最简单的词向量表示方法，它将每个词表示为一个向量，其中只有一个元素为1，其余都为0。虽然简单直观，但存在维度灾难和无法表示词语间关系的问题。</BookParagraph><div className="flex justify-center"><svg width="100%" height="140" viewBox="0 0 500 140"><rect x="30" y="20" width="440" height="60" fill="#f5f5f5" /><text x="70" y="55" textAnchor="middle">猫</text><text x="150" y="55" textAnchor="middle">狗</text><text x="230" y="55" textAnchor="middle">鱼</text><text x="310" y="55" textAnchor="middle">鸟</text><line x1="70" y1="80" x2="70" y2="95"/><line x1="150" y1="80" x2="150" y2="95"/><line x1="230" y1="80" x2="230" y2="95"/><line x1="310" y1="80" x2="310" y2="95"/><text x="70" y="115" textAnchor="middle" fontSize="12">[1,0,0,0]</text><text x="150" y="115" textAnchor="middle" fontSize="12">[0,1,0,0]</text><text x="230" y="115" textAnchor="middle" fontSize="12">[0,0,1,0]</text><text x="310" y="115" textAnchor="middle" fontSize="12">[0,0,0,1]</text></svg></div><SectionTitle>特点</SectionTitle><BookList items={['简单直观，易于实现','向量维度等于词汇表大小','任意两个词向量正交','无法表示词语间的语义关系','维度灾难问题']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={onehotCode} /></div>),
  },
  {
    label: 'Word2Vec', left: (<div className="space-y-4"><PageTitle>Word2Vec</PageTitle><BookParagraph>Word2Vec是一种基于神经网络的词嵌入模型，它通过预测词语的上下文来学习词向量。Word2Vec包含CBOW和Skip-gram两种模型架构。</BookParagraph><SectionTitle>特点</SectionTitle><BookList items={['能够捕捉词语间的语义关系','支持词语类比运算','训练速度快，效果好','可以处理大规模语料','支持增量训练']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={w2vCode} /></div>),
  },
  {
    label: 'GloVe', left: (<div className="space-y-4"><PageTitle>GloVe</PageTitle><BookParagraph>GloVe（Global Vectors for Word Representation）是一种基于全局词频统计的词嵌入模型。它通过构建词语共现矩阵，并优化目标函数来学习词向量。</BookParagraph><SectionTitle>特点</SectionTitle><BookList items={['结合了全局统计信息和局部上下文信息','训练速度快，效果好','可以处理大规模语料','支持增量训练','适合处理低频词']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={gloveCode} /></div>),
  },
  {
    label: 'FastText', left: (<div className="space-y-4"><PageTitle>FastText</PageTitle><BookParagraph>FastText是Facebook开发的一种词向量模型，它通过将词分解为字符n-gram来学习词向量，能够更好地处理未登录词和形态丰富的语言。</BookParagraph><SectionTitle>特点</SectionTitle><BookList items={['能够处理未登录词','适合形态丰富的语言','训练速度快','内存占用小','支持多语言']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={fasttextCode} /></div>),
  },
  {
    label: 'BERT', left: (<div className="space-y-4"><PageTitle>BERT</PageTitle><BookParagraph>BERT（Bidirectional Encoder Representations from Transformers）是一种基于Transformer的双向预训练语言模型，它能够生成上下文相关的词向量。</BookParagraph><SectionTitle>特点</SectionTitle><BookList items={['双向上下文表示','预训练+微调范式','强大的特征提取能力','支持多种下游任务','处理一词多义问题']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={bertCode} /></div>),
  },
]

export default function NlpWordEmbeddingsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
