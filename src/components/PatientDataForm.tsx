'use client';

import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';

interface PatientDataFormProps {
  geoId: string;
  tcgaId: string;
  onGeoIdChange: (geoId: string) => void;
  onTcgaIdChange: (tcgaId: string) => void;
  onDataImport: () => void;
}

const PatientDataForm: React.FC<PatientDataFormProps> = ({
  geoId,
  tcgaId,
  onGeoIdChange,
  onTcgaIdChange,
  onDataImport,
}) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="geoId">GEO ID</label>
        <Input
          id="geoId"
          value={geoId}
          onChange={e => onGeoIdChange(e.target.value)}
          placeholder="GSEXXXXX"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="tcgaId">TCGA ID</label>
        <Input
          id="tcgaId"
          value={tcgaId}
          onChange={e => onTcgaIdChange(e.target.value)}
          placeholder="TCGA-XXX-XXXX"
        />
      </div>
      <Button onClick={onDataImport}>
        <Icons.upload className="mr-2 h-4 w-4"/>
        Import Data
      </Button>
    </div>
  );
};

export default PatientDataForm;
