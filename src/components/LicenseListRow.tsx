import React from 'react';
import { Button } from '@erkenningen/ui/components/button';
import { toDutchDate } from '@erkenningen/ui/utils';

import './LicenseListRow.css';
import { StudyProgressDetailFragment, CertificeringStatusEnum } from '../generated/graphql';

interface LicenseListRowProps {
  studyProgress: StudyProgressDetailFragment;
  onSelectLicense: (row: StudyProgressDetailFragment | undefined) => void;
}

export const LicenseListRow: React.FC<LicenseListRowProps> = ({
  studyProgress,
  onSelectLicense,
}) => {
  const row = studyProgress!.Certificering;
  const withDrawn =
    (row.DatumIngetrokkenVan &&
      row.DatumIngetrokkenTot &&
      new Date() >= new Date(row.DatumIngetrokkenVan) &&
      new Date() <= new Date(row.DatumIngetrokkenTot)) ||
    row.Status === CertificeringStatusEnum.Ingetrokken;
  let statusLabel: any = row.Status;
  if (withDrawn) {
    statusLabel = (
      <span style={{ color: 'red' }}>
        {row.Status}{' '}
        {row.DatumIngetrokkenVan && row.DatumIngetrokkenTot && (
          <span>
            ingetrokken van {row.DatumIngetrokkenVan && toDutchDate(row.DatumIngetrokkenVan)} tot{' '}
            {row.DatumIngetrokkenTot && toDutchDate(row.DatumIngetrokkenTot)}
          </span>
        )}
      </span>
    );
  }
  let certificateName = row.Certificaat?.Naam;
  if (row.CertificeringAantekeningen) {
    let annotations = '';
    row.CertificeringAantekeningen?.forEach((annotation) => {
      annotations += ` + ${annotation?.AantekeningCode} (vanaf: ${toDutchDate(
        annotation?.VanafDatum,
      )})`;
    });
    certificateName += annotations;
  }
  return (
    <tr key={row.CertificeringID}>
      <td className="text-right">
        <Button
          type="link"
          label={row.NummerWeergave}
          onClick={() => onSelectLicense(studyProgress)}
          icon="pi pi-chevron-right"
          tooltip="Bekijk de studievordering voor deze licentie"
        ></Button>
      </td>
      <td>{certificateName}</td>
      <td>{statusLabel}</td>
      <td className="text-right">{toDutchDate(row.BeginDatum)}</td>
      <td className="text-right">{toDutchDate(row.EindDatum)}</td>
    </tr>
  );
};
