import * as React from 'react';
import { Panel, PanelBody } from '@erkenningen/ui';
import { ILicenseDetails } from '../models/license-details';
import { LicenseListRow } from '../components/LicenseListRow';

interface ILicenseTableProps {
  licenseList: ILicenseDetails[] | null;
  error: any;
  isLoaded: boolean;
  isLoading: boolean;
  onSelectLicense: any;
}

export const LicenseTable: React.FC<ILicenseTableProps> = (props) => {
  const { licenseList } = props;
  const rows: any[] = [];
  licenseList &&
    licenseList.map((licenseDetails: ILicenseDetails) =>
      rows.push(
        <LicenseListRow
          row={licenseDetails}
          key={licenseDetails.LicenseId}
          onSelectLicense={() => props.onSelectLicense(licenseDetails)}
        />,
      ),
    );

  return (
    <Panel
      title={`Uw licentie${licenseList && licenseList.length > 1 ? '(s)' : ''}`}
      doNotIncludeBody={true}
    >
      <PanelBody>
        <p>Wij hebben de volgende licenties van u geregistreerd:</p>
        <p>(Klik op een pasnummer om uw studievorderingen te bekijken)</p>
      </PanelBody>
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </Panel>
  );
};
