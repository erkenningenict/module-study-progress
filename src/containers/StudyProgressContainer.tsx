import * as React from 'react';
import Panel from '../components/Panel';
import { ILicenseDetails, ILicenseAnnotation, IParticipation } from '../models/license-details';
import ParticipationDetailsRow from '../components/ParticipationDetailsRow';
import { StudyProgressBar } from '../components/StudyProgressBar';

import { toDutchDate } from '../helpers/date-utils';

interface IStudyProgressContainerProps {
  licenseDetails: ILicenseDetails;
  onShowAllLicenses: any;
}

class StudyProgressContainer extends React.Component<IStudyProgressContainerProps, {}> {
  public render() {
    const licenseDetails: ILicenseDetails = this.props.licenseDetails;
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
        <p>Is de status ‘Voorlopig’? Dan is registratie van uw deelname nog niet volledig.</p>
        <p>
          Is de status ‘Aangemeld’? Dan staat uw deelname nog niet geregistreerd, mogelijk omdat de
          bijeenkomst nog moet plaatsvinden.
        </p>
      </div>
    );

    return (
      <Panel title={'Studievordering'} useBody={false} key={licenseDetails.LicenseId}>
        <div className="panel-body">
          <a
            href="#"
            style={{
              color: 'rgb(106, 187, 183)',
              fontWeight: 'bold',
              textAlign: 'right',
              display: 'block',
            }}
            onClick={() => this.props.onShowAllLicenses()}
          >
            <i className="glyphicon glyphicon-chevron-left" /> Terug naar mijn licenties
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
        </div>
      </Panel>
    );
  }
}

export default StudyProgressContainer;
