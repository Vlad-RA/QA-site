'use server';

import { predictFailureScenarios, type FailurePredictionInput, type FailurePredictionOutput } from '@/ai/flows/failure-prediction';
import { z } from 'zod';

const InputSchema = z.object({
  historicalData: z.string().min(10, "Исторические данные должны содержать не менее 10 символов."),
  developmentPractices: z.string().min(10, "Описание практик разработки должно содержать не менее 10 символов."),
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
      message: "Ошибка валидации. Пожалуйста, проверьте введенные данные.",
    };
  }

  try {
    const input: FailurePredictionInput = {
      historicalData: validatedFields.data.historicalData,
      developmentPractices: validatedFields.data.developmentPractices,
    };
    const output = await predictFailureScenarios(input);
    return { result: output, message: "Прогнозирование успешно." };
  } catch (e) {
    console.error("AI Prediction Error:", e);
    const errorMessage = e instanceof Error ? e.message : "Произошла неизвестная ошибка во время прогнозирования.";
    return { error: errorMessage, message: "Ошибка прогнозирования." };
  }
}

