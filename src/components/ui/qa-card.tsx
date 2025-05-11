
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription as CardDesc } from '@/components/ui/card'; // Renamed CardDescription to avoid conflict
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface QaCardModalContent {
  title: string;
  description: string | React.ReactNode;
  imageHint: string; // For data-ai-hint and potentially for placeholder uniqueness
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
        <CardDesc className="text-foreground/70 mb-6"> {/* Used aliased CardDesc */}
          {description}
        </CardDesc>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out">
              Узнать больше
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-2xl bg-background border-border text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl text-white">{modalContent.title}</DialogTitle>
              </div>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 pt-4 items-start">
              <div className="relative aspect-square w-full max-w-[250px] mx-auto md:mx-0 md:max-w-none">
                <Image
                  src={`https://picsum.photos/seed/${encodeURIComponent(modalContent.imageHint)}/250/250`}
                  alt={modalContent.title}
                  width={250}
                  height={250}
                  className="rounded-lg object-cover shadow-md"
                  data-ai-hint={modalContent.imageHint}
                />
              </div>
              <div className="md:max-h-[300px] md:overflow-y-auto pr-2"> {/* Added max-height and overflow for text */}
                <DialogDescription className="text-foreground/80 space-y-3 text-left">
                  {typeof modalContent.description === 'string' ? <p>{modalContent.description}</p> : modalContent.description}
                </DialogDescription>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

