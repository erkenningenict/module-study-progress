import React from 'react';
import { ILicenseDetails } from '../models/license-details';

const ProgressBar = ({
  licenseDetails,
  showLabels = true,
}: {
  licenseDetails: ILicenseDetails;
  showLabels: boolean;
}) => {
  const progressPercentageDone = (
    ((licenseDetails.RequiredPoints - licenseDetails.PointsToDo) / licenseDetails.RequiredPoints) *
    100
  ).toString();
  const progressPercentageTodo = (
    ((licenseDetails.RequiredPoints - licenseDetails.CountedPoints) /
      licenseDetails.RequiredPoints) *
    100
  ).toString();
  const styleTodo = {
    width: `${progressPercentageTodo}%`,
  };
  const styleDone = {
    width: `${progressPercentageDone}%`,
  };
  if (licenseDetails.RequiredPoints === 0) {
    return null;
  }
  return (
    <div className="progress">
      <div className="progress-bar progress-bar-success" role="progressbar" style={styleDone}>
        <strong>
          {showLabels ? 'Gedaan: ' : ''}
          {licenseDetails.CountedPoints}
        </strong>
      </div>
      <div className="progress-bar progress-bar-danger" role="progressbar" style={styleTodo}>
        <strong>
          {showLabels ? 'Nog te doen: ' : ''}
          {licenseDetails.RequiredPointsTodo}
        </strong>
      </div>
    </div>
  );
};

export default ProgressBar;
