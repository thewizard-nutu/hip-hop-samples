'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    } else if (debouncedQuery) {
      router.push(`/products?search=${encodeURIComponent(debouncedQuery)}`);
    }
  }, [debouncedQuery, router, onSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search samples..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;
