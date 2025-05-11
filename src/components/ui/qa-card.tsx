'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDesc } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QaCardModalContent {
  title: string;
  description: React.ReactNode;
  imageName: string; // Keep imageName for potential future use, but it won't be displayed
}

interface QaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  modalContent: QaCardModalContent;
}

export default function QaCard({ icon: Icon, title, description, modalContent }: QaCardProps) {
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
          <DialogContent className="sm:max-w-2xl md:max-w-3xl bg-background border-border text-foreground p-0">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl text-white">{modalContent.title}</DialogTitle>
              </div>
            </DialogHeader>
            <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="prose prose-sm md:prose-base prose-invert max-w-none text-foreground/80 space-y-3 text-left md:max-h-[calc(85vh-120px)] md:overflow-y-auto custom-scrollbar pr-2">
                 <DialogDescription asChild>
                    <div className={cn("text-sm text-foreground/80 space-y-3 text-left")}>
                        {modalContent.description}
                    </div>
                </DialogDescription>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
