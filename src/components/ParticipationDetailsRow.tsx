import React from 'react';
import { IParticipation } from '../models/license-details';
import { toDutchDate } from '../helpers/date-utils';

export const ParticipationDetailsRow: React.FC<{ row: IParticipation }> = (props) => {
  const { row } = props;
  return (
    <tr key={row.ParticipationId}>
      <td>{row.Course.Theme}</td>
      <td>{row.Course.CourseCode}</td>
      <td>{row.Course.Title}</td>
      <td>{toDutchDate(row.Course.Date)}</td>
      <td>{row.Status}</td>
    </tr>
  );
};
