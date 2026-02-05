'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const GENRES = ['Trap', 'Boom Bap', 'Drill', 'Phonk', 'Cloud Rap'];
const BPM_RANGES = [
  { label: 'Slow (60-90 BPM)', min: 60, max: 90 },
  { label: 'Medium (90-120 BPM)', min: 90, max: 120 },
  { label: 'Fast (120-150 BPM)', min: 120, max: 150 },
  { label: 'Very Fast (150+ BPM)', min: 150, max: 200 },
];

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, onReset }) => {
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedBPM, setSelectedBPM] = React.useState<{ min: number; max: number } | null>(null);
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 100 });

  const handleGenreToggle = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updated);
    onFilterChange({ genre: updated });
  };

  const handleBPMSelect = (range: { min: number; max: number }) => {
    setSelectedBPM(range);
    onFilterChange({ bpm: [range.min, range.max] });
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedBPM(null);
    setPriceRange({ min: 0, max: 100 });
    onReset();
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Genres */}
      <div>
        <h4 className="font-medium mb-2">Genres</h4>
        <div className="space-y-2">
          {GENRES.map((genre) => (
            <label key={genre} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* BPM */}
      <div>
        <h4 className="font-medium mb-2">BPM Range</h4>
        <div className="space-y-2">
          {BPM_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => handleBPMSelect(range)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedBPM?.min === range.min
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm font-medium">${priceRange.max}</span>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
