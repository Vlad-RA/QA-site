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
    .describe('Historical data related to software development, testing, and deployment. Include failure reports, bug tracking data, and performance metrics.'),
  developmentPractices: z
    .string()
    .describe('Description of current software development practices, including methodologies, coding standards, and testing procedures.'),
});
export type FailurePredictionInput = z.infer<typeof FailurePredictionInputSchema>;

const FailurePredictionOutputSchema = z.object({
  failureScenarios: z
    .array(z.string())
    .describe('An array of predicted software failure scenarios, each described in detail.'),
  riskAssessment: z
    .string()
    .describe('An overall risk assessment based on the predicted failure scenarios, including potential impact and likelihood.'),
  recommendations:
    z.array(z.string()).describe('An array of recommendations for proactively addressing vulnerabilities and improving software quality based on the predicted failure scenarios.'),
});
export type FailurePredictionOutput = z.infer<typeof FailurePredictionOutputSchema>;

export async function predictFailureScenarios(input: FailurePredictionInput): Promise<FailurePredictionOutput> {
  return failurePredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'failurePredictionPrompt',
  input: {schema: FailurePredictionInputSchema},
  output: {schema: FailurePredictionOutputSchema},
  prompt: `You are an AI-powered tool that predicts potential software failure scenarios based on historical data and current development practices.

  Based on the following historical data:
  {{historicalData}}

  And current development practices:
  {{developmentPractices}}

  Predict potential software failure scenarios, provide an overall risk assessment, and offer recommendations for proactively addressing vulnerabilities and improving software quality. Adhere to the FailurePredictionOutputSchema format.
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
