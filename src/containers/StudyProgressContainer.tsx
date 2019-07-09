import * as React from 'react';
import { Panel } from '@erkenningen/ui';
import { ILicenseDetails, ILicenseAnnotation, IParticipation } from '../models/license-details';
import { ParticipationDetailsRow } from '../components/ParticipationDetailsRow';
import { StudyProgressBar } from '../components/StudyProgressBar';

import { toDutchDate } from '../helpers/date-utils';

interface IStudyProgressContainerProps {
  licenseDetails: ILicenseDetails | null;
  onShowAllLicenses: any;
}

export const StudyProgressContainer: React.FC<IStudyProgressContainerProps> = (props) => {
  const { licenseDetails } = props;
  if (licenseDetails === null) {
    return null;
  }
  let certificateName = licenseDetails.CertificateName;
  if (licenseDetails.LicenseAnnotations) {
    let annotations: string = '';
    licenseDetails.LicenseAnnotations.map((annotation: ILicenseAnnotation) => {
      annotations += ` + ${annotation.AnnotationCode} (vanaf: ${toDutchDate(
        annotation.FromDate.toString(),
      )})`;
    });
    certificateName += annotations;
  }
  const participationRows: any[] = [];
  licenseDetails.Participations.map((participation: IParticipation) =>
    participationRows.push(
      <ParticipationDetailsRow row={participation} key={participation.ParticipationId} />,
    ),
  );

  const participationDetails = (
    <div>
      <p>
        Wij hebben voor {licenseDetails.CertificateName} de volgende bijeenkomsten van u
        geregistreerd:
      </p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Thema</th>
              <th>Titel</th>
              <th>Datum gevolgd</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{participationRows}</tbody>
        </table>
      </div>
      <p>Is de status ‘Voorlopig’? Dan is registratie van uw deelname nog niet volledig.</p>
      <p>
        Is de status ‘Aangemeld’? Dan staat uw deelname nog niet geregistreerd, mogelijk omdat de
        bijeenkomst nog moet plaatsvinden.
      </p>
    </div>
  );

  return (
    <Panel title="Studievordering" key={licenseDetails.LicenseId}>
      <a
        href="#"
        style={{
          color: 'rgb(106, 187, 183)',
          fontWeight: 'bold',
          textAlign: 'right',
          display: 'block',
        }}
        onClick={() => props.onShowAllLicenses()}
      >
        <i className="fa fa-chevron-left" aria-hidden={true} style={{ marginRight: '10px' }} />
        Terug naar mijn licenties
      </a>
      <h4 style={{ lineHeight: '28px' }}>
        {licenseDetails.CertificateNr} - {certificateName}
        <br />
        Geldig tot: {toDutchDate(licenseDetails.EndDate)}
      </h4>
      <p>
        Tot {toDutchDate(licenseDetails.EndDate)} heeft u de tijd om uw licentie{' '}
        {licenseDetails.CertificateName} te verlengen. U volgt daarvoor minimaal{' '}
        {licenseDetails.RequiredPoints} bijeenkomsten:
      </p>
      <StudyProgressBar licenseDetails={licenseDetails} />
      {licenseDetails.RequiredPointsTodo === 0 ? (
        <p>
          <strong>Alles groen? Gefeliciteerd! U ontvangt/heeft een verlengingslicentie.</strong>
        </p>
      ) : (
        <p>Oranje betekent dat u nog een bijeenkomst over dit thema moet volgen.</p>
      )}
      {participationRows.length > 0 ? participationDetails : null}
      <p>Neem bij twijfel contact op met uw kennisaanbieder.</p>
    </Panel>
  );
};
