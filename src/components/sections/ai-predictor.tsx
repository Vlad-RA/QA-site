// src/components/sections/ai-predictor.tsx
'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { predictFailureAction, type PredictionFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Lightbulb, ListChecks, ShieldAlert, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? 'Прогнозирование...' : 'Предсказать сбои'}
    </Button>
  );
}

const exampleHistoricalData = [
  "В предыдущем проекте у нас было много сбоев, связанных с утечкой памяти в модуле обработки изображений. Данные телеметрии показывают, что проблема усугублялась при обработке больших файлов.",
  "Журналы ошибок показывают, что после последнего обновления участились случаи NullPointerException в сервисе аутентификации.",
  "Анализ старых баг-репортов выявил, что большинство критических ошибок связано с недостаточным тестированием граничных случаев.",
  "Данные мониторинга производительности показывают, что среднее время ответа API увеличилось на 20% после внедрения нового алгоритма кэширования.",
  "После перехода на новую базу данных участились случаи deadlock'ов, особенно при одновременной записи в несколько таблиц."
];

const exampleDevelopmentPractices = [
  "Мы используем Agile-методологию с двухнедельными спринтами. Покрытие кода тестами составляет около 70%. CI/CD настроен, но автоматические тесты запускаются только ночью.",
  "В проекте используется микросервисная архитектура. Каждый сервис разрабатывается отдельной командой с разным уровнем опыта. Code review проводится не всегда.",
  "Мы придерживаемся waterfall-модели. Тестирование начинается только после завершения разработки. Используем статический анализатор кода, но не регулярно.",
  "Используем Kanban-подход. Нет четких сроков и планирования. Рефакторинг кода проводится редко из-за нехватки времени.",
  "У нас строгие стандарты кодирования и code review. Используем TDD. Автоматические тесты покрывают 95% кода. Интеграция и развертывание автоматизированы."
];


export default function AiPredictorSection() {
  const initialState: PredictionFormState = {};
  const [state, formAction] = useActionState(predictFailureAction, initialState);
  const [showExamplesModal, setShowExamplesModal] = useState(false);

  return (
    <section id="tools" className="py-16 md:py-24 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Прогнозирование сбоев на основе AI</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Используйте AI для прогнозирования потенциальных сценариев сбоев программного обеспечения. Введите исторические данные и текущие практики разработки, чтобы получить анализ рисков и действенные рекомендации.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg bg-card border-border">
          <CardContent className="p-6 md:p-8">
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="historicalData" className="block text-sm font-medium text-foreground/90 mb-1">
                  Исторические данные
                </Label>
                <Textarea
                  id="historicalData"
                  name="historicalData"
                  rows={5}
                  className="bg-input border-border focus:ring-primary focus:border-primary"
                  placeholder="Введите исторические данные: отчеты о сбоях, данные отслеживания ошибок, метрики производительности..."
                  aria-describedby="historicalData-error"
                />
                {state?.fieldErrors?.historicalData && (
                  <p id="historicalData-error" className="text-sm text-destructive mt-1">
                    {state.fieldErrors.historicalData.join(', ')}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="developmentPractices" className="block text-sm font-medium text-foreground/90 mb-1">
                  Практики разработки
                </Label>
                <Textarea
                  id="developmentPractices"
                  name="developmentPractices"
                  rows={5}
                  className="bg-input border-border focus:ring-primary focus:border-primary"
                  placeholder="Опишите текущие практики разработки: методологии, стандарты кодирования, процедуры тестирования..."
                  aria-describedby="developmentPractices-error"
                />
                 {state?.fieldErrors?.developmentPractices && (
                  <p id="developmentPractices-error" className="text-sm text-destructive mt-1">
                    {state.fieldErrors.developmentPractices.join(', ')}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <SubmitButton />
                <Dialog open={showExamplesModal} onOpenChange={setShowExamplesModal}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Примеры ввода
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl md:max-w-4xl bg-background border-border text-foreground p-0">
                    <DialogHeader className="p-6 pb-4">
                      <DialogTitle className="text-2xl text-white">Примеры данных для ввода</DialogTitle>
                      <DialogDescription className="text-foreground/70">
                        Используйте эти примеры как вдохновение для заполнения полей формы.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-6 grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Исторические данные:</h3>
                        <ul className="space-y-3 text-sm text-foreground/80">
                          {exampleHistoricalData.map((example, index) => (
                            <li key={`hist-${index}`} className="bg-card/50 p-3 rounded-md border border-border/50 shadow-sm">{example}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-3">Практики разработки:</h3>
                        <ul className="space-y-3 text-sm text-foreground/80">
                          {exampleDevelopmentPractices.map((example, index) => (
                            <li key={`dev-${index}`} className="bg-card/50 p-3 rounded-md border border-border/50 shadow-sm">{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <DialogFooter className="p-6 pt-4">
                        <Button variant="outline" onClick={() => setShowExamplesModal(false)}>Закрыть</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </CardContent>
        </Card>

        {state?.message && !state.result && (
           <Alert variant={state.error || state.fieldErrors ? "destructive" : "default"} className="mt-8 max-w-3xl mx-auto">
            {state.error || state.fieldErrors ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <AlertTitle>{state.error || state.fieldErrors ? "Ошибка" : "Статус"}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state?.result && (
          <Card className="mt-8 max-w-3xl mx-auto shadow-lg bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Результаты прогнозирования</CardTitle>
              <CardDescription className="text-foreground/70">Анализ на основе предоставленных данных.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-primary" />
                      Прогнозируемые сценарии сбоев
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    {state.result.failureScenarios.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-foreground/80">
                        {state.result.failureScenarios.map((scenario, index) => (
                          <li key={index}>{scenario}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-foreground/70">Конкретных сценариев сбоев на основе введенных данных не предсказано.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                     <div className="flex items-center gap-2">
                       <ListChecks className="h-5 w-5 text-primary" />
                        Общая оценка рисков
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <p className="text-foreground/80">{state.result.riskAssessment}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                     <div className="flex items-center gap-2">
                       <Lightbulb className="h-5 w-5 text-primary" />
                        Рекомендации
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                     {state.result.recommendations.length > 0 ? (
                      <ul className="list-disc space-y-2 pl-5 text-foreground/80">
                        {state.result.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-foreground/70">Конкретных рекомендаций не сгенерировано.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
