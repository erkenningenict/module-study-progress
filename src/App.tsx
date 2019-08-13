import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LicenseTable } from './containers/LicenseTable';
import { ILicenseDetails } from './models/license-details';
import { StudyProgressContainer } from './containers/StudyProgressContainer';
import 'primereact/resources/primereact.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import { Alert, Spinner } from '@erkenningen/ui';

export const App: React.FC<{}> = (props) => {
  const [showStudyProgressForLicenseId, setShowStudyProgressForLicenseId] = useState<
    ILicenseDetails | undefined
  >(undefined);
  const [data, setData] = useState<ILicenseDetails[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const result = await axios(`${process.env.REACT_APP_DNN_WEB_API}/License/LicenseList`);
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }
    getData();
  }, []);

  return (
    <>
      {isLoading && !data && <Spinner />}
      {isError && (
        <Alert type="danger">
          Er is een probleem opgetreden bij het ophalen van de gegevens. Probeer het later nog eens.
        </Alert>
      )}
      {data && !isError && !showStudyProgressForLicenseId && (
        <LicenseTable
          error={isError}
          isLoaded={!!data}
          isLoading={isLoading}
          licenseList={data}
          onSelectLicense={(licenseDetails: ILicenseDetails) =>
            setShowStudyProgressForLicenseId(licenseDetails)
          }
        />
      )}
      {data && !!showStudyProgressForLicenseId && (
        <StudyProgressContainer
          licenseDetails={showStudyProgressForLicenseId}
          onShowAllLicenses={() => setShowStudyProgressForLicenseId(undefined)}
        />
      )}
    </>
  );
};
