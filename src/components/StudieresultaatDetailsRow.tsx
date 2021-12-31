import React from 'react';
import { toDutchDate } from '@erkenningen/ui/utils';
import { StudieresultaatFieldsFragment } from '../generated/graphql';

interface StudieresultaatDetailsRowProps {
  row?: StudieresultaatFieldsFragment | null;
}

export const StudieresultaatDetailsRow: React.FC<StudieresultaatDetailsRowProps> = ({ row }) => {
  if (!row) {
    return null;
  }
  const firstSessieDatum = row.Cursus.Sessies![0]?.Datum;
  return (
    <tr key={row.StudieresultaatID}>
      <td>{row.Cursus.Vak.ThemaNaam}</td>
      <td>{row.Cursus.CursusCode}</td>
      <td>{row.Cursus.Titel ?? row.Cursus.Vak.Titel}</td>
      <td>{toDutchDate(firstSessieDatum)}</td>
      <td>{row.Status}</td>
    </tr>
  );
};
