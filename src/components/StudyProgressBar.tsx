import React from 'react';
import { ILicenseDetails, IParticipationPoint, IParticipation } from '../models/license-details';
import './StudyProgressBar.css';
// tslint:
// import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

interface StudyProgressBarProps {
  licenseDetails: ILicenseDetails;
}
export const StudyProgressBar: React.SFC<StudyProgressBarProps> = (props) => {
  const participationPoints = props.licenseDetails.ParticipationPoints;
  const participations = props.licenseDetails.Participations;
  let required: { themeId: number; themeName: string; done: boolean }[] = [];
  let optional: { themeIds: number[]; themeName: string; done: boolean }[] = [];
  let optionalDone: number = 0;
  let availableThemes: { themeId: number; themeName: string }[] = [];
  const doneThemes: string[] = [];
  participations.map((participation: IParticipation) => {
    doneThemes.push(participation.Course.Theme);
  });
  participationPoints.map((participationPoint: IParticipationPoint) => {
    // Check all required points
    if (participationPoint.RequiredPoints >= 1) {
      for (let index = 0; index < participationPoint.RequiredPoints; index++) {
        required.push({
          themeId: participationPoint.ThemeId,
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
      availableThemes.push({
        themeId: participationPoint.ThemeId,
        themeName: participationPoint.ThemeName,
      });
    }
  });
  for (let index = 0; index < props.licenseDetails.RequiredPoints - required.length; index++) {
    let isDone = false;

    if (optionalDone > 0) {
      isDone = true;
      optionalDone -= 1;
    }
    const themeName = doneThemes[index];
    optional.push({
      themeIds: availableThemes.map((theme: any) => theme.themeId),
      themeName: !!themeName
        ? themeName
        : `Thema naar keuze: ${availableThemes.map((theme) => theme.themeName).join(' of ')}`,
      done: isDone,
    });
  }
  const colorGreen: string = '#6abbb7';
  const colorOrange: string = '#dd6b02';
  const url: string = `${process.env.REACT_APP_DNN_SEARCH_COURSE_MODULE_URL}?themeIds=`;

  const blocks = (
    <div className="block-container">
      {required.map((requiredBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: requiredBlock.done ? colorGreen : colorOrange }}
          key={index}
        >
          {requiredBlock.done ? (
            <Button type="link" disabled label={requiredBlock.themeName} className="done" />
          ) : (
            <Button
              type="link"
              onClick={() => {
                const fullUrl = `${url}${requiredBlock.themeId}`;
                console.log('#DH# url', fullUrl);
                window.location.assign(fullUrl);
              }}
              label={requiredBlock.themeName}
              tooltip="Klik om bijeenkomsten te kiezen van dit thema"
              tooltipOptions={{ position: 'top' }}
            />
          )}
        </div>
      ))}
      {optional.map((optionalBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: optionalBlock.done ? colorGreen : colorOrange }}
          key={index}
        >
          {optionalBlock.done ? (
            <Button type="link" disabled label={optionalBlock.themeName} />
          ) : (
            <Button
              type="link"
              onClick={() => {
                const fullUrl = `${url}${optionalBlock.themeIds}`;
                console.log('#DH# url', fullUrl);
                window.location.assign(fullUrl);
              }}
              label={optionalBlock.themeName}
              tooltip="Klik om bijeenkomsten te kiezen van dit thema"
              tooltipOptions={{ position: 'top' }}
            />
          )}
        </div>
      ))}
    </div>
  );
  return blocks;
};
