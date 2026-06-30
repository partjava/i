'use client';
import { useState } from 'react';

interface QuickSearchProps {
  onSearch: (query: string) => void;
}

export default function QuickSearch({ onSearch }: QuickSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 快速搜索工具或技术..."
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-line-strong focus:border-content-muted focus:outline-none shadow-md transition-all duration-300 bg-surface-raised text-content-primary placeholder-content-muted"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-content-muted text-content-inverse rounded-full hover:shadow-lg transition-all duration-300 hover:bg-content-secondary"
        >
          搜索
        </button>
      </form>
    </div>
  );
}
