import * as React from 'react';
import Panel from '../components/Panel';
import { ILicenseDetails } from '../models/license-details';
import LicenseListRow from '../components/LicenseListRow';

interface ILicenseTableProps {
  licenseList: ILicenseDetails[];
  error: any;
  isLoaded: boolean;
  isLoading: boolean;
  onSelectLicense: any;
}

interface ILicenseTableState {
  showStudyProgress: boolean;
}

class LicenseTable extends React.Component<ILicenseTableProps, ILicenseTableState> {
  constructor(props: ILicenseTableProps) {
    super(props);
  }

  public render() {
    const { licenseList } = this.props;
    const rows: any[] = [];
    licenseList.map((licenseDetails: ILicenseDetails) =>
      rows.push(
        <LicenseListRow
          row={licenseDetails}
          key={licenseDetails.LicenseId}
          onSelectLicense={() => this.props.onSelectLicense(licenseDetails)}
        />,
      ),
    );

    return (
      <Panel title="Licentie(s)" useBody={false}>
        <div className="panel-body">
          <p>Wij hebben de volgende licenties van u geregistreerd:</p>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-right">Pasnummer</th>
                <th>Licentie</th>
                <th>Status</th>
                <th className="text-right" style={{ minWidth: '90px' }}>
                  Geldig van
                </th>
                <th className="text-right" style={{ minWidth: '90px' }}>
                  Geldig tot
                </th>
                {/* <th style={{ minWidth: '175px' }}>
                  <div className="progress" style={{ marginBottom: '0' }}>
                    <div
                      className="progress-bar progress-bar-success"
                      role="progressbar"
                      style={{ width: '50%' }}
                    >
                      <strong>Gedaan</strong>
                    </div>
                    <div
                      className="progress-bar progress-bar-danger"
                      role="progressbar"
                      style={{ width: '50%' }}
                    >
                      <strong>Nog te doen</strong>
                    </div>
                  </div>
                </th> */}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </Panel>
    );
  }
}

export default LicenseTable;
