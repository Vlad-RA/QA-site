// use server'

/**
 * @fileOverview Predicts potential software failure scenarios based on historical data and current development practices.
 *
 * - predictFailureScenarios - A function that handles the failure prediction process.
 * - FailurePredictionInput - The input type for the predictFailureScenarios function.
 * - FailurePredictionOutput - The return type for the predictFailureScenarios function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FailurePredictionInputSchema = z.object({
  historicalData: z
    .string()
    .describe('Исторические данные, связанные с разработкой, тестированием и развертыванием программного обеспечения. Включите отчеты о сбоях, данные отслеживания ошибок и метрики производительности.'),
  developmentPractices: z
    .string()
    .describe('Описание текущих практик разработки программного обеспечения, включая методологии, стандарты кодирования и процедуры тестирования.'),
});
export type FailurePredictionInput = z.infer<typeof FailurePredictionInputSchema>;

const FailurePredictionOutputSchema = z.object({
  failureScenarios: z
    .array(z.string())
    .describe('Массив прогнозируемых сценариев сбоев программного обеспечения, каждый из которых подробно описан.'),
  riskAssessment: z
    .string()
    .describe('Общая оценка рисков на основе прогнозируемых сценариев сбоев, включая потенциальное воздействие и вероятность.'),
  recommendations:
    z.array(z.string()).describe('Массив рекомендаций по проактивному устранению уязвимостей и улучшению качества программного обеспечения на основе прогнозируемых сценариев сбоев.'),
});
export type FailurePredictionOutput = z.infer<typeof FailurePredictionOutputSchema>;

export async function predictFailureScenarios(input: FailurePredictionInput): Promise<FailurePredictionOutput> {
  return failurePredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'failurePredictionPrompt',
  input: {schema: FailurePredictionInputSchema},
  output: {schema: FailurePredictionOutputSchema},
  prompt: `Вы — инструмент на базе ИИ, который прогнозирует потенциальные сценарии сбоев программного обеспечения на основе исторических данных и текущих практик разработки.

  На основе следующих исторических данных:
  {{historicalData}}

  И текущих практик разработки:
  {{developmentPractices}}

  Предскажите потенциальные сценарии сбоев программного обеспечения, предоставьте общую оценку рисков и предложите рекомендации для проактивного устранения уязвимостей и улучшения качества программного обеспечения. Придерживайтесь формата FailurePredictionOutputSchema.
  `,
});

const failurePredictionFlow = ai.defineFlow(
  {
    name: 'failurePredictionFlow',
    inputSchema: FailurePredictionInputSchema,
    outputSchema: FailurePredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
