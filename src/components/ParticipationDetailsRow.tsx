import React from 'react';
import { IParticipation } from '../models/license-details';
import { toDutchDate } from '../helpers/date-utils';

interface IParticipationDetailsRowProps {
  row: IParticipation;
}

class ParticipationDetailsRow extends React.Component<IParticipationDetailsRowProps, {}> {
  constructor(props: IParticipationDetailsRowProps) {
    super(props);
  }
  render() {
    const row = this.props.row;
    // const themeLink = `/Default.aspx?tabid=132&Mode=${row.ThemeId}&cert=${this.props.licenseId}`;
    const rows = [
      <tr key={row.ParticipationId}>
        <td>{row.Course.Theme}</td>
        <td>{row.Course.Title}</td>
        <td>{toDutchDate(row.Course.Date)}</td>
        <td>{row.Status}</td>
      </tr>,
    ];
    return rows;
  }
}

export default ParticipationDetailsRow;
