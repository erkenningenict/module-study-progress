import React from 'react';
import { Button, toDutchDate } from '@erkenningen/ui';
import { ILicenseDetails, ILicenseAnnotation } from '../models/license-details';

import './LicenseListRow.css';

interface ILicenseListRowProps {
  row: ILicenseDetails;
  onSelectLicense: (row: ILicenseDetails | undefined) => void;
}

export const LicenseListRow: React.FC<ILicenseListRowProps> = (props) => {
  const { row } = props;
  const withDrawn =
    (row.WithdrawnFromDate &&
      row.WithdrawnToDate &&
      new Date() >= new Date(row.WithdrawnFromDate) &&
      new Date() <= new Date(row.WithdrawnToDate)) ||
    row.Status === 'Ingetrokken';
  let statusLabel: any = row.Status;
  if (withDrawn) {
    statusLabel = (
      <span style={{ color: 'red' }}>
        <del>{row.Status}</del> (ingetrokken van{' '}
        {row.WithdrawnFromDate && toDutchDate(row.WithdrawnFromDate.toString())} tot{' '}
        {row.WithdrawnToDate && toDutchDate(row.WithdrawnToDate.toString())})
      </span>
    );
  }
  let certificateName = row.CertificateName;
  if (row.LicenseAnnotations) {
    let annotations: string = '';
    row.LicenseAnnotations.forEach((annotation: ILicenseAnnotation) => {
      annotations += ` + ${annotation.AnnotationCode} (vanaf: ${toDutchDate(
        annotation.FromDate.toString(),
      )})`;
    });
    certificateName += annotations;
  }
  return (
    <tr key={row.LicenseId}>
      <td className="text-right">
        <Button
          type="link"
          label={row.CertificateNr}
          onClick={() => props.onSelectLicense(row)}
          icon="pi pi-chevron-right"
          tooltip="Bekijk de studievordering voor deze licentie"
        ></Button>
      </td>
      <td>{certificateName}</td>
      <td>{statusLabel}</td>
      <td className="text-right">{toDutchDate(row.StartDate)}</td>
      <td className="text-right">{toDutchDate(row.EndDate)}</td>
    </tr>
  );
};
