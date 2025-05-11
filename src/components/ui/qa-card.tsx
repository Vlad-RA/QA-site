'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';

interface QaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  modalContent: {
    title: string;
    description: string | React.ReactNode;
  };
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
        <CardDescription className="text-foreground/70 mb-6">
          {description}
        </CardDescription>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out">
              Learn more
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-background border-border text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl text-white">{modalContent.title}</DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="text-foreground/80 space-y-3">
              {typeof modalContent.description === 'string' ? <p>{modalContent.description}</p> : modalContent.description}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
