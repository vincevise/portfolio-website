import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type InputSearchProps = {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  searchOptions?: string[];
};

const InputSearch: React.FC<InputSearchProps> = ({ 
  placeholder, 
  value, 
  setValue, 
  searchOptions = [] 
}) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputPosition, setInputPosition] = useState({ top: 0, left: 0, width: 0 });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update position of dropdown when input changes
  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setInputPosition({ 
        top: rect.bottom, 
        left: rect.left, 
        width: rect.width 
      });
    }
  }, [value, isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = (inputValue: string) => {
    if (!inputValue.trim()) {
      return searchOptions;
    }
    
    return searchOptions.filter(option => 
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    const filtered = filterOptions(newValue);
    setFilteredOptions(filtered);
    setIsDropdownOpen(true);
    setHighlightedIndex(-1);
  };
  
  const handleOptionSelect = (option: string) => {
    setValue(option);
    setIsDropdownOpen(false);
  };
  
  const handleInputFocus = () => {
    setFilteredOptions(filterOptions(value));
    setIsDropdownOpen(true);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev <= 0 ? filteredOptions.length - 1 : prev - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        className="w-full rounded-md bg-white h-10 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ring-transparent border border-gray-300"
      />
      
      {isDropdownOpen && filteredOptions.length > 0 && createPortal(
        <div 
          ref={dropdownRef}
          className="p-1 rounded-md shadow-lg border border-gray-300 bg-white max-h-60 overflow-auto z-50"
          style={{ 
            position: 'absolute', 
            top: inputPosition.top + 2, 
            left: inputPosition.left, 
            width: inputPosition.width
          }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onMouseDown={() => handleOptionSelect(option)}
              className={`p-2 rounded text-sm cursor-pointer ${
                highlightedIndex === index ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              {option}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default InputSearch;