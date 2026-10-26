const {test}=require('node:test'),assert=require('node:assert/strict');
const ts=require('typescript'),fs=require('node:fs'),Module=require('node:module');
const file=require('node:path').resolve(__dirname,'../app/_shared/lib/edge-ai.ts');const m=new Module(file,module);m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {findSemanticMatch,saveEdgeCacheEntry}=m.exports;
test('cache isolates scopes and ignores expired entries before selecting best match',()=>{
 const previous=global.window;const store=new Map();global.window={localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)}};
 try {
  saveEdgeCacheEntry('同一个问题','账号7页面A的回答',new Float32Array([1,0]),'account7-pageA');
  assert.equal(findSemanticMatch(new Float32Array([1,0]),'account7-pageB'),null);
  assert.equal(findSemanticMatch(new Float32Array([1,0]),'account8-pageA'),null);
  assert.equal(findSemanticMatch(new Float32Array([1,0]),'account7-pageA').a,'账号7页面A的回答');
  const key=[...store.keys()][0];const entries=JSON.parse(store.get(key));entries[0].ts=Date.now()-8*86400000;store.set(key,JSON.stringify(entries));
  assert.equal(findSemanticMatch(new Float32Array([1,0]),'account7-pageA'),null);
  saveEdgeCacheEntry('新问题','新回答',new Float32Array([.9,.1]),'account7-pageA');
  assert.equal(findSemanticMatch(new Float32Array([1,0]),'account7-pageA').a,'新回答');
 }finally{global.window=previous;}
});
