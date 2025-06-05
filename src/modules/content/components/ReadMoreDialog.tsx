// components/ReadMoreDialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/Dialog";
import { Container } from "@components/ui/Containers";

export default function ReadMoreDialog({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          Đọc thêm
        </Button>
      </div>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Container
            size="md"
            as={DialogContent}
            className="max-h-[80vh] overflow-y-auto bg-neutral-50 dark:bg-neutral-900"
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="sr-only">
                Mô tả trợ năng
              </DialogDescription>
            </DialogHeader>
            <section
              className="entry-content prose prose-gray max-w-none text-base text-justify"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Container>
        </Dialog>
      )}
    </>
  );
}
