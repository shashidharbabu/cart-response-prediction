'use client';

import React, {useState, useCallback} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import PatientDataForm from '@/components/PatientDataForm';
import PredictionCard from '@/components/PredictionCard';
import ShapAnalysis from '@/components/ShapAnalysis';
import {predictCartResponse} from '@/ai/flows/predict-cart-response';
import {getPatientData, engineerFeatures} from '@/services/data-services';
import {Icons} from '@/components/icons';

export default function Home() {
  const [geoId, setGeoId] = useState('');
  const [tcgaId, setTcgaId] = useState('');
  const [prediction, setPrediction] = useState<'responder' | 'non-responder' | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [shapValues, setShapValues] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const handleDataImport = useCallback(async () => {
    setIsLoading(true);
    setPrediction(null);
    setConfidence(null);
    setShapValues(null);

    if (!geoId || !tcgaId) {
      toast({
        title: 'Error',
        description: 'Please enter both GEO ID and TCGA ID.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // GenAI Prediction Flow
      const predictionResult = await predictCartResponse({geoId, tcgaId});

      setPrediction(predictionResult.prediction);
      setConfidence(predictionResult.confidence);
      setShapValues(predictionResult.shapValues);

      toast({
        title: 'Prediction Result',
        description: `Prediction: ${predictionResult.prediction}, Confidence: ${(predictionResult.confidence * 100).toFixed(2)}%`,
      });
    } catch (error: any) {
      console.error('Error during prediction:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get prediction.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [geoId, tcgaId, toast]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>CAR-T Therapy Response Prediction</CardTitle>
          <CardDescription>
            Enter GEO and TCGA IDs to import patient data and predict therapy response.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <PatientDataForm
            geoId={geoId}
            tcgaId={tcgaId}
            onGeoIdChange={setGeoId}
            onTcgaIdChange={setTcgaId}
            onDataImport={handleDataImport}
          />
        </CardContent>
      </Card>

      {isLoading &&
        <Card>
          <CardContent>
            <Icons.loader className="mr-2 h-4 w-4 animate-spin"/>
            Loading prediction...
          </CardContent>
        </Card>
      }

      {prediction && (
        <PredictionCard
          prediction={prediction}
          confidence={confidence}
        />
      )}

      {shapValues && (
        <ShapAnalysis shapValues={shapValues}/>
      )}
    </div>
  );
}
