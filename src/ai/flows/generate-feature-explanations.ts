'use server';
/**
 * @fileOverview Generates human-readable explanations of the top features identified by SHAP analysis.
 *
 * - generateFeatureExplanations - A function that generates explanations for the top features.
 * - GenerateFeatureExplanationsInput - The input type for the generateFeatureExplanations function.
 * - GenerateFeatureExplanationsOutput - The return type for the generateFeatureExplanations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateFeatureExplanationsInputSchema = z.object({
  topFeatures: z
    .array(z.string())
    .describe('The top features identified by SHAP analysis.'),
});
export type GenerateFeatureExplanationsInput = z.infer<
  typeof GenerateFeatureExplanationsInputSchema
>;

const GenerateFeatureExplanationsOutputSchema = z.object({
  explanations: z
    .array(z.string())
    .describe('Human-readable explanations for each feature.'),
});
export type GenerateFeatureExplanationsOutput = z.infer<
  typeof GenerateFeatureExplanationsOutputSchema
>;

export async function generateFeatureExplanations(
  input: GenerateFeatureExplanationsInput
): Promise<GenerateFeatureExplanationsOutput> {
  return generateFeatureExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFeatureExplanationsPrompt',
  input: {
    schema: z.object({
      topFeatures: z
        .array(z.string())
        .describe('The top features identified by SHAP analysis.'),
    }),
  },
  output: {
    schema: z.object({
      explanations: z
        .array(z.string())
        .describe('Human-readable explanations for each feature.'),
    }),
  },
  prompt: `You are a scientific expert in CAR-T therapy and machine learning.
  Your task is to provide human-readable explanations for the following top features identified by SHAP analysis.
  These explanations should be concise and informative, suitable for researchers to quickly understand the biological significance of each feature in predicting CAR-T therapy response.
  Return the explanations as a numbered list.

  Top Features:
  {{#each topFeatures}}
  {{@index}}. {{{this}}}
  {{/each}}`,
});

const generateFeatureExplanationsFlow = ai.defineFlow<
  typeof GenerateFeatureExplanationsInputSchema,
  typeof GenerateFeatureExplanationsOutputSchema
>(
  {
    name: 'generateFeatureExplanationsFlow',
    inputSchema: GenerateFeatureExplanationsInputSchema,
    outputSchema: GenerateFeatureExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
