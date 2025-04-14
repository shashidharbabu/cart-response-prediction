/**
 * Represents a data point from TCGA (The Cancer Genome Atlas).
 */
export interface TCGADatPoint {
  /**
   * The patient ID.
   */
  patientId: string;
  /**
   * The genomic variant data.
   */
  genomicVariants: Record<string, boolean>;
}

/**
 * Asynchronously retrieves TCGA data.
 *
 * @param tcgaId The TCGA ID to retrieve data for.
 * @returns A promise that resolves to an array of TCGADatPoint objects.
 */
export async function getTCGAData(tcgaId: string): Promise<TCGADatPoint[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      patientId: 'patient1',
      genomicVariants: {
        'CD19': true,
        'BTK': false,
      },
    },
    {
      patientId: 'patient2',
      genomicVariants: {
        'CD19': false,
        'BTK': true,
      },
    },
  ];
}
