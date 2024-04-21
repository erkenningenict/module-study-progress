import { useState } from 'react';
import { LicenseTable } from './containers/LicenseTable';
import { StudyProgressContainer } from './containers/StudyProgressContainer';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Alert } from '@erkenningen/ui/components/alert';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { StudyProgressDetailFragment, useGetMyStudyProgressQuery } from './generated/graphql';

export const App = () => {
  const [studyProgressForLicenseId, setStudyProgressForLicenseId] = useState<
    StudyProgressDetailFragment | undefined
  >(undefined);

  const { loading, error, data } = useGetMyStudyProgressQuery();

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    for (const err of error.graphQLErrors) {
      if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
        return <Alert type="warning">U bent niet ingelogd. Log eerst in.</Alert>;
      }
    }
    return <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>;
  }
  if (!data?.my) {
    return <Alert type="danger">Kan geen gegevens ophalen</Alert>;
  }

  return (
    <>
      {data.my?.StudyProgress && !error && !studyProgressForLicenseId && (
        <LicenseTable
          licenseList={data.my?.StudyProgress}
          onSelectLicense={(studyProgressDetails: StudyProgressDetailFragment) =>
            setStudyProgressForLicenseId(studyProgressDetails)
          }
        />
      )}

      {!!studyProgressForLicenseId && (
        <StudyProgressContainer
          studyProgress={studyProgressForLicenseId}
          onShowAllLicenses={() => setStudyProgressForLicenseId(undefined)}
        />
      )}
    </>
  );
};
