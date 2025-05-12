// src/components/ui/qa-card.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDesc } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface QaCardModalContent {
  title: string;
  description: React.ReactNode;
  imageName: string;
}

interface QaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  modalContent: QaCardModalContent;
}

export default function QaCard({ icon: Icon, title, description, modalContent }: QaCardProps) {
  const imagePath = `/images/${modalContent.imageName}`;
  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-shadow duration-300 flex flex-col">
      <CardHeader className="items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between text-center">
        <CardDesc className="text-foreground/70 mb-6">
          {description}
        </CardDesc>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out">
              Узнать больше
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl md:max-w-5xl bg-background border-border text-foreground p-0">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl text-white">{modalContent.title}</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-4 items-start"> {/* Reduced gap from gap-6 to gap-4 */}
                <div className="relative w-[250px] h-[250px] rounded-lg overflow-hidden shadow-md border border-border/50 mx-auto md:mx-0">
                  <Image
                    src={imagePath}
                    alt={modalContent.title}
                    width={250}
                    height={250}
                    objectFit="cover" 
                    data-ai-hint={`${title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="rounded-lg"
                  />
                </div>
                <div className="prose prose-sm md:prose-base prose-invert max-w-none text-foreground/80 space-y-3 text-left md:max-h-[calc(85vh-150px)] md:overflow-y-auto custom-scrollbar pr-2">
                   <DialogDescription asChild>
                    <div className={cn("text-sm text-foreground/80 space-y-3 text-left")}>
                      {modalContent.description}
                    </div>
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
