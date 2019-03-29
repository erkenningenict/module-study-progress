import React from 'react';
import { IParticipationPoint } from '../models/license-details';

interface ILicenseDetailsRowProps {
  row: IParticipationPoint;
  licenseId: number;
}

class LicenseDetailsRow extends React.Component<ILicenseDetailsRowProps, {}> {
  constructor(props: ILicenseDetailsRowProps) {
    super(props);
  }
  render() {
    const row = this.props.row;
    let todo = '';
    if (row.ThemeName === 'KBA' || row.ThemeName === 'KBG-GB') {
      todo = `${row.TodoPoints} (Max 1)`;
    } else {
      todo = row.TodoPoints.toString();
    }
    const themeLink = `/Default.aspx?tabid=132&Mode=${row.ThemeId}&cert=${this.props.licenseId}`;
    const rows = [
      <tr key={row.ThemeId}>
        <td>{row.ThemeName}</td>
        <td>{row.RequiredPoints === 0 ? 'geen deelname vereist' : row.RequiredPoints}</td>
        <td>{row.CountedPoints}</td>
        <td>{row.DonePoints}</td>
        <td>
          {todo}{' '}
          <a href={themeLink} title="Zoek een bijeenkomst voor dit thema">
            Kies bijeenkomst
          </a>
        </td>
      </tr>,
    ];
    return rows;
  }
}

export default LicenseDetailsRow;
