"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/SearchDialog";

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the input when dialog opens
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex hover:text-primary transition-colors p-1 rounded-full md:[&_svg]:size-4 [&_svg]:size-4.5"
          aria-label="Search"
        >
          <Search />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 w-[calc(100vw-30px)] mx-auto">
        <DialogHeader className="border-b px-4 py-2 sr-only">
          <DialogTitle className="text-sm">Search</DialogTitle>
          <DialogDescription className="sr-only">
            Mô tả trợ năng
          </DialogDescription>
        </DialogHeader>

        <div className="relative px-4 py-3 overflow-y-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Nhập từ khoá tìm kiếm..."
              className="w-full text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-md py-2 px-4 pl-10 focus:outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-neutral-400"
              size={18}
            />
          </div>

          <div className="hidden md:flex items-center mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            Press ESC to close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
