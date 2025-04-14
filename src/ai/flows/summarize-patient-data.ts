'use server';
/**
 * @fileOverview Summarizes patient data and predicts CAR-T therapy response.
 *
 * - summarizePatientData - A function that summarizes patient data and predicts CAR-T therapy response.
 * - SummarizePatientDataInput - The input type for the summarizePatientData function.
 * - SummarizePatientDataOutput - The return type for the summarizePatientData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getGEOData} from '@/services/geo';
import {getTCGAData} from '@/services/tcga';

const SummarizePatientDataInputSchema = z.object({
  geoId: z.string().describe('The GEO ID of the patient.'),
  tcgaId: z.string().describe('The TCGA ID of the patient.'),
});
export type SummarizePatientDataInput = z.infer<typeof SummarizePatientDataInputSchema>;

const SummarizePatientDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the patient data and predicted CAR-T therapy response.'),
});
export type SummarizePatientDataOutput = z.infer<typeof SummarizePatientDataOutputSchema>;

export async function summarizePatientData(input: SummarizePatientDataInput): Promise<SummarizePatientDataOutput> {
  return summarizePatientDataFlow(input);
}

const summarizePatientDataPrompt = ai.definePrompt({
  name: 'summarizePatientDataPrompt',
  input: {
    schema: z.object({
      geoData: z.string().describe('The GEO data for the patient.'),
      tcgaData: z.string().describe('The TCGA data for the patient.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the patient data and predicted CAR-T therapy response.'),
    }),
  },
  prompt: `You are an expert oncologist specializing in CAR-T therapy. You will be provided with GEO and TCGA data for a patient. Generate a concise summary of the patient's key characteristics and predicted CAR-T therapy response.

GEO Data: {{{geoData}}}
TCGA Data: {{{tcgaData}}}`,
});

const summarizePatientDataFlow = ai.defineFlow<
  typeof SummarizePatientDataInputSchema,
  typeof SummarizePatientDataOutputSchema
>(
  {
    name: 'summarizePatientDataFlow',
    inputSchema: SummarizePatientDataInputSchema,
    outputSchema: SummarizePatientDataOutputSchema,
  },
  async input => {
    const geoData = await getGEOData(input.geoId);
    const tcgaData = await getTCGAData(input.tcgaId);

    const geoDataString = JSON.stringify(geoData);
    const tcgaDataString = JSON.stringify(tcgaData);

    const {output} = await summarizePatientDataPrompt({
      geoData: geoDataString,
      tcgaData: tcgaDataString,
    });
    return output!;
  }
);
