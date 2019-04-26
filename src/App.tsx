import React, { Component } from 'react';
import LicenseTable from './containers/LicenseTable';
import { handleErrors } from './helpers/fetch-helper';
import { ILicenseDetails } from './models/license-details';
import StudyProgressContainer from './containers/StudyProgressContainer';
import 'primereact/resources/primereact.min.css';

interface IAppProps {}
interface IAppState {
  licenseList: ILicenseDetails[];
  error: any;
  isLoaded: boolean;
  isLoading: boolean;
  showStudyProgressForLicenseId: ILicenseDetails | undefined;
}

class App extends Component<{}, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading: true,
      licenseList: [],
      showStudyProgressForLicenseId: undefined,
    };
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_DNN_WEB_API}/License/LicenseList`, {
      credentials: 'same-origin',
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            licenseList: result,
            error: undefined,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('Fetch error', error);
          this.setState({
            isLoaded: true,
            error: 'Probleem opgetreden bij ophalen gegevens.',
          });
        },
      );
  }
  render() {
    const { error, isLoaded, isLoading, licenseList, showStudyProgressForLicenseId } = this.state;
    return (
      <div>
        {isLoading && !isLoaded && (
          <div className="alert alert-info">Gegevens worden geladen...</div>
        )}
        {error && (
          <div className="alert alert-danger">
            Er is een probleem opgetreden bij het ophalen van de gegevens. Probeer het later nog
            eens.
          </div>
        )}
        {isLoaded && !error && !showStudyProgressForLicenseId && (
          <LicenseTable
            error={error}
            isLoaded={isLoaded}
            isLoading={isLoading}
            licenseList={licenseList}
            onSelectLicense={(licenseDetails: ILicenseDetails) =>
              this.setState({ showStudyProgressForLicenseId: licenseDetails })
            }
          />
        )}
        {isLoaded && !!showStudyProgressForLicenseId && (
          <StudyProgressContainer
            licenseDetails={showStudyProgressForLicenseId}
            onShowAllLicenses={() => this.setState({ showStudyProgressForLicenseId: undefined })}
          />
        )}
      </div>
    );
  }
}

export default App;
