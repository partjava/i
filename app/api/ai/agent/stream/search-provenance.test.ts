import { describe, it, expect, vi, afterEach } from 'vitest';
import { executeTool, summarizeToolResult } from './lib';
afterEach(() => vi.unstubAllGlobals());
function context() {
 const events: Array<{name:string;data: any}> = [];
 const state = {siteLinks: [], citations: [], ragFragments: []} as any;
 return { events, state, apiKey: 'test-key', sendSSE: (name:string,data:any)=>events.push({name,data}), message:'Java', history:[], pageContext:'' } as any;
}
describe('search provenance', () => {
 it('marks curated links when search is unavailable and does not claim fetched text', async()=>{
  vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));
  const ctx=context();const result=await executeTool('web_search',{query:'java'},ctx);
  expect(result.source).toBe('recommended');expect(result.fetchedCount).toBe(0);
  expect(ctx.state.citations.every((c:any)=>c.source==='recommended'&&!c.contentFetched)).toBe(true);
  expect(result.note).toContain('未验证实时内容');expect(summarizeToolResult('web_search',result)).toContain('实时搜索不可用');
 });
 it('keeps search snippets distinct from successfully fetched document bodies',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockImplementation(async(url:string)=>url.endsWith('/tools/search')
   ? Response.json({results:[{title:'Java docs',url:'https://docs.oracle.com/java/',snippet:'摘要'}]})
   : new Response('',{status:503})));
  const ctx=context();const result=await executeTool('web_search',{query:'java'},ctx);
  expect(result.source).toBe('live');expect(result.fetchedCount).toBe(0);expect(result.citations[0].contentFetched).toBe(false);expect(result.note).toContain('未读取正文');
 });
 it('reports successfully fetched body count',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockImplementation(async(url:string)=>url.endsWith('/tools/search')
   ? Response.json({results:[{title:'Java docs',url:'https://docs.oracle.com/java/',snippet:'摘要'}]})
   : Response.json({content:'实际正文'})));
  const ctx=context();const result=await executeTool('web_search',{query:'java'},ctx);
  expect(result.fetchedCount).toBe(1);expect(result.citations[0].contentFetched).toBe(true);expect(ctx.state.ragFragments.join('')).toContain('实际正文');
 });
});
