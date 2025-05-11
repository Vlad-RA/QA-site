'use server';

import { predictFailureScenarios, type FailurePredictionInput, type FailurePredictionOutput } from '@/ai/flows/failure-prediction';
import { z } from 'zod';

const InputSchema = z.object({
  historicalData: z.string().min(10, "Historical data must be at least 10 characters long."),
  developmentPractices: z.string().min(10, "Development practices description must be at least 10 characters long."),
});

export type PredictionFormState = {
  result?: FailurePredictionOutput;
  error?: string;
  fieldErrors?: {
    historicalData?: string[];
    developmentPractices?: string[];
  };
  message?: string;
};

export async function predictFailureAction(
  prevState: PredictionFormState,
  formData: FormData
): Promise<PredictionFormState> {
  const historicalData = formData.get('historicalData') as string;
  const developmentPractices = formData.get('developmentPractices') as string;

  const validatedFields = InputSchema.safeParse({
    historicalData,
    developmentPractices,
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the inputs.",
    };
  }

  try {
    const input: FailurePredictionInput = {
      historicalData: validatedFields.data.historicalData,
      developmentPractices: validatedFields.data.developmentPractices,
    };
    const output = await predictFailureScenarios(input);
    return { result: output, message: "Prediction successful." };
  } catch (e) {
    console.error("AI Prediction Error:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during prediction.";
    return { error: errorMessage, message: "Prediction failed." };
  }
}
