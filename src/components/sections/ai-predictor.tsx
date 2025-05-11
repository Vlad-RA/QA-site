// use client';
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { predictFailureAction, type PredictionFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle2, Lightbulb, ListChecks, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? 'Predicting...' : 'Predict Failures'}
    </Button>
  );
}

export default function AiPredictorSection() {
  const initialState: PredictionFormState = {};
  const [state, formAction] = useActionState(predictFailureAction, initialState);

  return (
    <section id="tools" className="py-16 md:py-24 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">AI-Driven Failure Prediction</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Leverage AI to anticipate potential software failure scenarios. Input historical data and current development practices to receive an analysis of risks and actionable recommendations.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg bg-card border-border">
          <CardContent className="p-6 md:p-8">
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="historicalData" className="block text-sm font-medium text-foreground/90 mb-1">
                  Historical Data
                </Label>
                <Textarea
                  id="historicalData"
                  name="historicalData"
                  rows={5}
                  className="bg-input border-border focus:ring-primary focus:border-primary"
                  placeholder="Enter historical data: failure reports, bug tracking data, performance metrics..."
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
                  Development Practices
                </Label>
                <Textarea
                  id="developmentPractices"
                  name="developmentPractices"
                  rows={5}
                  className="bg-input border-border focus:ring-primary focus:border-primary"
                  placeholder="Describe current development practices: methodologies, coding standards, testing procedures..."
                  aria-describedby="developmentPractices-error"
                />
                 {state?.fieldErrors?.developmentPractices && (
                  <p id="developmentPractices-error" className="text-sm text-destructive mt-1">
                    {state.fieldErrors.developmentPractices.join(', ')}
                  </p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state?.message && !state.result && (
           <Alert variant={state.error || state.fieldErrors ? "destructive" : "default"} className="mt-8 max-w-3xl mx-auto">
            {state.error || state.fieldErrors ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            <AlertTitle>{state.error || state.fieldErrors ? "Error" : "Status"}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state?.result && (
          <Card className="mt-8 max-w-3xl mx-auto shadow-lg bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Prediction Results</CardTitle>
              <CardDescription className="text-foreground/70">Analysis based on the provided data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-primary" />
                      Predicted Failure Scenarios
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
                      <p className="text-foreground/70">No specific failure scenarios predicted based on the input.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                     <div className="flex items-center gap-2">
                       <ListChecks className="h-5 w-5 text-primary" />
                        Overall Risk Assessment
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
                        Recommendations
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
                      <p className="text-foreground/70">No specific recommendations generated.</p>
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
