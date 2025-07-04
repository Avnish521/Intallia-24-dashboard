"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

/**
 * Option type for MultiSelect
 */
export type MultiSelectOption = { label: string; value: string };

/**
 * Props for MultiSelect component
 * @template T Option value type (default: string)
 */
export interface MultiSelectProps {
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** List of options to display */
  options: MultiSelectOption[];
  /** Array of selected option values */
  value: string[];
  /** Callback when selection changes */
  onChange: (selected: string[]) => void;
  /** Disable the select */
  disabled?: boolean;
  /** Optional className for the button */
  className?: string;
}

/**
 * A reusable, accessible multi-select dropdown component.
 */
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder = "Select...",
  options,
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  const handleSelectChange = useCallback(
    (optionValue: string) => {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue));
      } else {
        onChange([...value, optionValue]);
      }
    },
    [onChange, value],
  );

  const selectedLabels = options.filter((opt) => value.includes(opt.value));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          className={`w-full flex items-center justify-between text-left h-auto ${className}`}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={undefined}
        >
          <span className="truncate flex-1 flex flex-wrap gap-1">
            {value.length > 0 ? (
              selectedLabels.map((opt) => (
                <span
                  key={opt.value}
                  className=" inline-flex items-center ring-1 ring-[#0DAFDC] rounded-full bg-gradient-to-r from-[#0DAFDC] to-[#22E9A2]
  bg-clip-text text-transparent
  px-3 py-1.5 text-xs font-medium mx-2 my-2"
                >
                  {opt.label}
                </span>
              ))
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full max-w-full lg:max-w-xl max-h-64 overflow-y-auto z-50"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {options.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-400">No options</div>
        ) : (
          options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={option.value}
                checked={isSelected}
                onCheckedChange={() => handleSelectChange(option.value)}
                disabled={disabled}
                className={`cursor-pointer flex items-center gap-2 ${
                  isSelected ? "bg-blue-100 font-semibold text-blue-700" : ""
                }`}
              >
                {isSelected && (
                  <span
                    className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"
                    aria-hidden="true"
                  ></span>
                )}
                {option.label}
              </DropdownMenuCheckboxItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
