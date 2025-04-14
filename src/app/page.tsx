
'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {Icons} from '@/components/icons';

export default function Home() {
  const [geoId, setGeoId] = useState('');
  const [tcgaId, setTcgaId] = useState('');
  const {toast} = useToast();

  const handleDataImport = async () => {
    if (!geoId || !tcgaId) {
      toast({
        title: 'Error',
        description: 'Please enter both GEO ID and TCGA ID.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Importing data for GEO ID: ${geoId} and TCGA ID: ${tcgaId}.`,
    });
  };

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
          <div className="grid gap-2">
            <label htmlFor="geoId">GEO ID</label>
            <Input
              id="geoId"
              value={geoId}
              onChange={e => setGeoId(e.target.value)}
              placeholder="GSEXXXXX"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="tcgaId">TCGA ID</label>
            <Input
              id="tcgaId"
              value={tcgaId}
              onChange={e => setTcgaId(e.target.value)}
              placeholder="TCGA-XXX-XXXX"
            />
          </div>
          <Button onClick={handleDataImport}>
            <Icons.upload className="mr-2 h-4 w-4"/>
            Import Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
