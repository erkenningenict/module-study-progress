import React from 'react';
import { Panel, PanelBody } from '@erkenningen/ui/layout/panel';
import { TableResponsive } from '@erkenningen/ui/layout/table';
import { LicenseListRow } from '../components/LicenseListRow';
import { StudyProgressDetailFragment } from '../generated/graphql';

interface LicenseTableProps {
  licenseList: StudyProgressDetailFragment[];
  onSelectLicense: (license: StudyProgressDetailFragment) => void;
}

export const LicenseTable: React.FC<LicenseTableProps> = ({ licenseList, onSelectLicense }) => {
  return (
    <Panel
      title={`Uw licentie${licenseList && licenseList.length > 1 ? '(s)' : ''}`}
      doNotIncludeBody={true}
    >
      <PanelBody>
        <p>Wij hebben de volgende licenties van u geregistreerd:</p>
      </PanelBody>
      <TableResponsive>
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
          <tbody>
            {licenseList.map((studyProgress: StudyProgressDetailFragment) => (
              <LicenseListRow
                studyProgress={studyProgress}
                key={studyProgress.Certificering.CertificeringID}
                onSelectLicense={() => onSelectLicense(studyProgress)}
              />
            ))}
          </tbody>
        </table>
      </TableResponsive>
    </Panel>
  );
};
