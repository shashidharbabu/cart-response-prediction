'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface PredictionCardProps {
  prediction: 'responder' | 'non-responder' | null;
  confidence: number | null;
}

const PredictionCard: React.FC<PredictionCardProps> = ({prediction, confidence}) => {
  let predictionText = 'Awaiting Prediction';
  if (prediction === 'responder') {
    predictionText = 'Responder';
  } else if (prediction === 'non-responder') {
    predictionText = 'Non-Responder';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>CAR-T Therapy Response Prediction</CardTitle>
        <CardDescription>
          AI-powered prediction of patient response to CAR-T therapy.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="prediction">Prediction</label>
          <div id="prediction" className="text-lg font-semibold">
            {predictionText}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="confidence">Confidence</label>
          <div id="confidence">
            {confidence !== null ? `${(confidence * 100).toFixed(2)}%` : 'N/A'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
