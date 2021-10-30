import React from 'react';
import { Panel } from '@erkenningen/ui/layout/panel';
import { TableResponsive } from '@erkenningen/ui/layout/table';
import { toDutchDate } from '@erkenningen/ui/utils';
import { Button } from '@erkenningen/ui/components/button';
import { StudieresultaatDetailsRow } from '../components/StudieresultaatDetailsRow';
import { StudyProgressBar } from '../components/StudyProgressBar';
import { StudyProgressDetailFragment } from '../generated/graphql';

interface StudyProgressContainerProps {
  studyProgress: StudyProgressDetailFragment;
  onShowAllLicenses: () => void;
}

export const StudyProgressContainer: React.FC<StudyProgressContainerProps> = ({
  studyProgress,
  onShowAllLicenses,
}) => {
  if (studyProgress === null) {
    return null;
  }

  const certificering = studyProgress.Certificering;
  let certificateName = certificering.Certificaat?.Naam;
  if (certificering.CertificeringAantekeningen) {
    let aantekeningen = '';
    certificering.CertificeringAantekeningen?.forEach((aantekening) => {
      aantekeningen += ` + ${aantekening?.AantekeningCode} (vanaf: ${toDutchDate(
        aantekening?.VanafDatum,
      )})`;
    });
    certificateName += aantekeningen;
  }

  const participationDetails = (
    <div>
      <p>
        Wij hebben voor {certificering.Certificaat?.Naam} de volgende bijeenkomsten van u
        geregistreerd:
      </p>
      <TableResponsive>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Thema</th>
              <th>Erkenningsnummer</th>
              <th>Titel</th>
              <th>Datum gevolgd</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studyProgress?.Studieresultaten!.map((studieresultaat) => (
              <StudieresultaatDetailsRow
                row={studieresultaat}
                key={studieresultaat?.StudieresultaatID}
              />
            ))}
          </tbody>
        </table>
      </TableResponsive>
      <p>
        Is de status ‘Voorlopig’? Dan moet de kennisaanbieder de registratie nog betalen aan Bureau
        Erkenningen.
      </p>
      <p>
        Is de status ‘Aangemeld’? Dan staat uw deelname nog niet geregistreerd, mogelijk omdat de
        bijeenkomst nog moet plaatsvinden.
      </p>
    </div>
  );
  return (
    <Panel title="Studievordering" key={certificering.CertificeringID}>
      <div className="">
        <Button
          type="greenLink"
          onClick={() => onShowAllLicenses()}
          label="Terug naar mijn licenties"
          icon="pi pi-chevron-left"
          className="pull-right"
        ></Button>
      </div>
      <h4 style={{ lineHeight: '28px' }}>
        {certificering.NummerWeergave} - {certificateName}
        <br />
        Geldig tot: {toDutchDate(certificering.EindDatum)}
      </h4>
      <p>
        Tot {toDutchDate(certificering.EindDatum)} heeft u de tijd om uw licentie{' '}
        {certificering.Certificaat?.Naam} te verlengen. U volgt daarvoor minimaal{' '}
        {studyProgress?.RequiredPoints} bijeenkomsten:
      </p>
      <StudyProgressBar studyProgress={studyProgress} />
      {studyProgress?.RequiredPointsTodo === 0 ? (
        <p>
          <strong>Alles groen? Gefeliciteerd! U ontvangt/heeft een verlengingslicentie.</strong>
        </p>
      ) : (
        <p>Oranje betekent dat u nog een bijeenkomst over dit thema moet volgen.</p>
      )}
      {(studyProgress!.Studieresultaten?.length || 0) > 0 ? (
        participationDetails
      ) : (
        <p>U heeft nog geen bijeenkomsten gevolgd of deze zijn nog niet geregistreerd.</p>
      )}
      <p>Neem bij twijfel contact op met uw kennisaanbieder.</p>
    </Panel>
  );
};
