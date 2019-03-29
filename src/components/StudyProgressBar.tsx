import React from 'react';
import { ILicenseDetails, IParticipationPoint, IParticipation } from '../models/license-details';
import './StudyProgressBar.css';

interface StudyProgressBarProps {
  licenseDetails: ILicenseDetails;
}
export const StudyProgressBar: React.SFC<StudyProgressBarProps> = (props) => {
  const participationPoints = props.licenseDetails.ParticipationPoints;
  const participations = props.licenseDetails.Participations;
  let required: { themeName: string; done: boolean }[] = [];
  let optional: any[] = [];
  let optionalDone: number = 0;
  let availableThemes: string[] = [];
  const doneThemes: string[] = [];
  participations.map((participation: IParticipation) => {
    doneThemes.push(participation.Course.Theme);
  });
  participationPoints.map((participationPoint: IParticipationPoint) => {
    // Check all required points
    if (participationPoint.RequiredPoints >= 1) {
      for (let index = 0; index < participationPoint.RequiredPoints; index++) {
        required.push({
          themeName: `${participationPoint.ThemeName} (verplicht)`,
          done: participationPoint.CountedPoints > 0,
        });
        if (doneThemes.indexOf(participationPoint.ThemeName) > -1) {
          doneThemes.splice(doneThemes.indexOf(participationPoint.ThemeName), 1);
        }
      }
      if (participationPoint.CountedPoints - participationPoint.RequiredPoints > 0) {
        // Required point is done as optional theme
        optionalDone += participationPoint.CountedPoints - participationPoint.RequiredPoints;
      }
    } else {
      optionalDone += participationPoint.CountedPoints;
      availableThemes.push(participationPoint.ThemeName);
    }
  });
  for (let index = 0; index < props.licenseDetails.RequiredPoints - required.length; index++) {
    let isDone = false;

    if (optionalDone > 0) {
      isDone = true;
      optionalDone -= 1;
    }
    const themeName = doneThemes[index];
    optional.push({ themeName: !!themeName ? themeName : 'Thema naar keuze', done: isDone });
  }

  const blocks = (
    <div className="block-container">
      {required.map((requiredBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: requiredBlock.done ? '#6abbb7' : '#dd6b02' }}
          key={index}
        >
          <p>{requiredBlock.themeName}</p>
        </div>
      ))}
      {optional.map((optionalBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: optionalBlock.done ? '#6abbb7' : '#dd6b02' }}
          key={index}
        >
          <p>{optionalBlock.themeName}</p>
        </div>
      ))}
    </div>
  );
  return blocks;
};
