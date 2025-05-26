import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@components/ui/Button";

interface SearchOverlayProps {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when overlay opens
    inputRef.current?.focus();

    // Add ESC key listener
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="absolute top-14 left-0 w-full bg-neutral-900/95 backdrop-blur-md rounded-xl p-4 shadow-lg fade-in">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full bg-neutral-800 text-neutral-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search
          className="absolute left-3 top-2.5 text-neutral-400"
          size={18}
        />
        <Button
          variant="ghost"
          className="absolute right-3 top-0.5 text-neutral-400 hover:text-neutral-100"
          onClick={onClose}
          aria-label="Close search"
        >
          <X size={18} />
        </Button>
      </div>
      <div className="mt-3 text-xs text-neutral-400">
        Press ESC to close search
      </div>
    </div>
  );
};

export default SearchOverlay;
