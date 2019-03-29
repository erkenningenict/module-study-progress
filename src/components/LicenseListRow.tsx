import React from 'react';
import { toDutchDate } from '../helpers/date-utils';
import { ILicenseDetails, ILicenseAnnotation } from '../models/license-details';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import StudyProgressContainer from '../containers/StudyProgressContainer';
import ProgressBar from './ProgressBar';
import './LicenseListRow.css';

interface ILicenseListRowProps {
  row: ILicenseDetails;
  onSelectLicense: any;
}

interface ILicenseListRowState {
  showStudyProgress: boolean;
}
class LicenseListRow extends React.Component<ILicenseListRowProps, ILicenseListRowState> {
  constructor(props: ILicenseListRowProps) {
    super(props);
    this.state = {
      showStudyProgress: false,
    };
  }

  render() {
    const row = this.props.row;
    const withDrawn =
      (row.WithdrawnFromDate &&
        row.WithdrawnToDate &&
        new Date() >= new Date(row.WithdrawnFromDate) &&
        new Date() <= new Date(row.WithdrawnToDate)) ||
      row.Status === 'Ingetrokken';
    let statusLabel: any = row.Status;
    if (withDrawn) {
      statusLabel = (
        <span style={{ color: 'red' }}>
          <del>{row.Status}</del> (ingetrokken van{' '}
          {row.WithdrawnFromDate && toDutchDate(row.WithdrawnFromDate.toString())} tot{' '}
          {row.WithdrawnToDate && toDutchDate(row.WithdrawnToDate.toString())})
        </span>
      );
    }
    let certificateName = row.CertificateName;
    if (row.LicenseAnnotations) {
      let annotations: string = '';
      row.LicenseAnnotations.map((annotation: ILicenseAnnotation) => {
        annotations += ` + ${annotation.AnnotationCode} (vanaf: ${toDutchDate(
          annotation.FromDate.toString(),
        )})`;
      });
      certificateName += annotations;
    }
    const backgroundColor = '#eee';
    const rows = [
      <tr
        key={row.LicenseId}
        style={{ backgroundColor: this.state.showStudyProgress ? backgroundColor : 'unset' }}
      >
        <td className="text-right">
          <a href="#" className="licenseNr" onClick={() => this.props.onSelectLicense(row)}>
            {row.CertificateNr}
          </a>
        </td>
        <td>{certificateName}</td>
        <td>{statusLabel}</td>
        <td className="text-right">{toDutchDate(row.StartDate)}</td>
        <td className="text-right">{toDutchDate(row.EndDate)}</td>
        {/* <td>
          <ProgressBar licenseDetails={row} showLabels={false} />
        </td> */}
      </tr>,
    ];
    const duration = 300;

    const defaultStyle = {
      transition: `all ${duration}ms ease-in-out`,
      opacity: 0,
      height: 0,
      transform: 'translateY(-20%)',
      overflow: 'hidden',
    };

    const transitionStyles: any = {
      entering: { opacity: 0, height: 0 },
      entered: { opacity: 1, height: '100%', transform: 'translateY(0%)' },
    };
    const extendedRow = (
      <tr key={row.LicenseId + 1}>
        <td colSpan={7} style={{ padding: 0, borderTop: 0 }}>
          <TransitionGroup className="example" key={row.LicenseId + 1} component={null}>
            <CSSTransition key={row.LicenseId + 1} timeout={500} classNames="fade">
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[this.state.showStudyProgress ? 'entered' : 'entering'],
                }}
              >
                <div
                  style={{
                    padding: '16px',
                    background: backgroundColor,
                  }}
                >
                  <StudyProgressContainer
                    licenseDetails={row}
                    onShowAllLicenses={() => this.props.onSelectLicense(undefined)}
                  />
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </td>
      </tr>
    );
    rows.push(extendedRow);
    return rows;
  }
}

export default LicenseListRow;
