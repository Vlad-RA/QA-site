import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Свяжитесь с нами</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Есть вопросы или хотите обсудить проект? Напишите нам.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Контактная информация</h3>
              <p className="text-foreground/70">
                Свяжитесь с нами по электронной почте или через социальные сети.
              </p>
            </div>
            <div className="space-y-3">
              <a href="mailto:info@qualityinsightshub.com" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                info@qualityinsightshub.com
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
                Профиль LinkedIn
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Github className="h-5 w-5 text-primary" />
                Репозиторий GitHub
              </a>
            </div>
          </div>

          <form className="space-y-6 p-6 bg-card rounded-lg shadow-md border border-border">
            <div>
              <Label htmlFor="name" className="text-foreground/90">Полное имя</Label>
              <Input type="text" id="name" name="name" placeholder="Ваше имя" className="mt-1 bg-input border-border focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/90">Адрес электронной почты</Label>
              <Input type="email" id="email" name="email" placeholder="your@email.com" className="mt-1 bg-input border-border focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground/90">Сообщение</Label>
              <Textarea id="message" name="message" rows={4} placeholder="Ваше сообщение..." className="mt-1 bg-input border-border focus:ring-primary focus:border-primary" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Отправить сообщение</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
