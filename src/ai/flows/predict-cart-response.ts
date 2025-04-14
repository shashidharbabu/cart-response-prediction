'use server';
/**
 * @fileOverview Predicts CAR-T therapy response based on patient data.
 *
 * - predictCartResponse - A function that predicts CAR-T therapy response.
 * - PredictCartResponseInput - The input type for the predictCartResponse function.
 * - PredictCartResponseOutput - The return type for the predictCartResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PredictCartResponseInputSchema = z.object({
  geoId: z.string().describe('The GEO ID of the patient.'),
  tcgaId: z.string().describe('The TCGA ID of the patient.'),
});
export type PredictCartResponseInput = z.infer<typeof PredictCartResponseInputSchema>;

const PredictCartResponseOutputSchema = z.object({
  prediction: z.enum(['responder', 'non-responder']).describe('The predicted CAR-T therapy response.'),
  confidence: z.number().min(0).max(1).describe('The confidence level of the prediction.'),
  shapValues: z.record(z.string(), z.number()).describe('SHAP values for feature importance.'),
});
export type PredictCartResponseOutput = z.infer<typeof PredictCartResponseOutputSchema>;

export async function predictCartResponse(input: PredictCartResponseInput): Promise<PredictCartResponseOutput> {
  return predictCartResponseFlow(input);
}

const predictCartResponsePrompt = ai.definePrompt({
  name: 'predictCartResponsePrompt',
  input: {
    schema: z.object({
      patientData: z.string().describe('Combined GEO and TCGA data for the patient.'),
    }),
  },
  output: {
    schema: z.object({
      prediction: z.enum(['responder', 'non-responder']).describe('The predicted CAR-T therapy response.'),
      confidence: z.number().min(0).max(1).describe('The confidence level of the prediction.'),
      shapValues: z.record(z.string(), z.number()).describe('SHAP values for feature importance.'),
    }),
  },
  prompt: `You are an AI expert in CAR-T therapy response prediction. Based on the provided patient data, predict whether the patient will respond to CAR-T therapy (responder) or not (non-responder). Also, provide a confidence level for your prediction and SHAP values for feature importance.

Patient Data: {{{patientData}}}

Return the prediction, confidence, and SHAP values.`,
});

const predictCartResponseFlow = ai.defineFlow<
  typeof PredictCartResponseInputSchema,
  typeof PredictCartResponseOutputSchema
>(
  {
    name: 'predictCartResponseFlow',
    inputSchema: PredictCartResponseInputSchema,
    outputSchema: PredictCartResponseOutputSchema,
  },
  async input => {
    // Simulate fetching patient data and feature engineering
    const patientData = `GEO ID: ${input.geoId}, TCGA ID: ${input.tcgaId}`; // Replace with actual data retrieval and processing

    const {output} = await predictCartResponsePrompt({
      patientData: patientData,
    });
    return output!;
  }
);
