import React from 'react';
import { ILicenseDetails } from '../models/license-details';

interface ITotalsRowProps {
  row: ILicenseDetails;
}

class TotalsRow extends React.Component<ITotalsRowProps, {}> {
  constructor(props: ITotalsRowProps) {
    super(props);
  }
  render() {
    const row = this.props.row;
    return (
      <tr key={row.LicenseId}>
        <td>&nbsp;</td>
        <td>
          <strong>{row.RequiredPoints} verplichte deelnames</strong>
        </td>
        <td>
          <strong>{row.CountedPoints} totaal geteld</strong>
        </td>
        <td>
          <strong>{row.DonePoints} totaal gevolgd</strong>&nbsp;
          <a
            href={'/Default.aspx?tabId=132&cert=' + row.LicenseId}
            title="Bekijk de gevolgde bijeenkomsten"
          >
            bekijk
          </a>
        </td>
        <td>
          <strong>{row.RequiredPointsTodo} nog te volgen</strong>
        </td>
      </tr>
    );
  }
}

export default TotalsRow;
