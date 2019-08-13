import React from 'react';
import { ILicenseDetails, IParticipationPoint, IParticipation } from '../models/license-details';
import './StudyProgressBar.css';
import { Button } from '@erkenningen/ui';

export const StudyProgressBar: React.FC<{ licenseDetails: ILicenseDetails }> = (props) => {
  const participationPoints = props.licenseDetails.ParticipationPoints;
  const participations = props.licenseDetails.Participations;
  let required: { themeId: number; themeName: string; done: boolean }[] = [];
  let optional: {
    themes: { themeId: number; themeName: string }[];
    themeName: string;
    done: boolean;
  }[] = [];
  let optionalDone: number = 0;
  let availableThemes: { themeId: number; themeName: string }[] = [];
  const doneThemes: string[] = [];
  participations.forEach((participation: IParticipation) => {
    doneThemes.push(participation.Course.Theme);
  });
  participationPoints.forEach((participationPoint: IParticipationPoint) => {
    // Check all required points
    if (participationPoint.RequiredPoints >= 1) {
      let requiredDone: number = participationPoint.CountedPoints;
      let requiredTodo: number =
        participationPoint.RequiredPoints - participationPoint.CountedPoints;
      if (requiredTodo < 0) {
        requiredTodo = 0;
      }
      for (
        let requiredParticipation = 0;
        requiredParticipation < participationPoint.RequiredPoints;
        requiredParticipation++
      ) {
        let done = false;
        if (requiredDone > 0) {
          done = true;
        }
        required.push({
          themeId: participationPoint.ThemeId,
          themeName: `${participationPoint.ThemeName} (verplicht)`,
          done: done,
        });
        requiredDone = requiredDone - 1;
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
  if (availableThemes.length === 0) {
    participationPoints.forEach((participationPoint: IParticipationPoint) => {
      availableThemes.push({
        themeId: participationPoint.ThemeId,
        themeName: participationPoint.ThemeName,
      });
    });
  }
  for (let index = 0; index < props.licenseDetails.RequiredPoints - required.length; index++) {
    let isDone = false;

    if (optionalDone > 0) {
      isDone = true;
      optionalDone -= 1;
    }
    const themeName = doneThemes[index];
    optional.push({
      themes: availableThemes,
      themeName: !!themeName
        ? themeName
        : `Thema naar keuze:${availableThemes.map((theme) => theme.themeName).join(' of ')}`,
      done: isDone,
    });
  }
  const colorGreen: string = '#6abbb7';
  const colorOrange: string = '#dd6b02';
  const url: string = `${process.env.REACT_APP_DNN_SEARCH_COURSE_MODULE_URL}?themaId=`;

  const blocks = (
    <div className="block-container">
      {required.map((requiredBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: requiredBlock.done ? colorGreen : colorOrange }}
          key={index}
        >
          {requiredBlock.done ? (
            <Button disabled={true} type="link" label={requiredBlock.themeName} className="done" />
          ) : (
            <Button
              onClick={() => {
                const fullUrl = `${url}${requiredBlock.themeId}&certificeringId=${props.licenseDetails.LicenseId}`;
                window.location.assign(fullUrl);
              }}
              type="link"
              label={requiredBlock.themeName}
              tooltip={`Klik om bijeenkomsten te kiezen van thema ${requiredBlock.themeName}`}
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
            <div>
              Thema naar keuze:{' '}
              {optionalBlock.themes.map(
                (theme: { themeId: number; themeName: string }, index: number) => {
                  return (
                    <div key={index}>
                      <Button
                        onClick={() => {
                          const fullUrl = `${url}${theme.themeId}&certificeringId=${props.licenseDetails.LicenseId}`;
                          window.location.assign(fullUrl);
                        }}
                        type="link"
                        label={theme.themeName}
                        tooltip={`Klik om bijeenkomsten te kiezen van thema ${theme.themeName}`}
                        tooltipOptions={{ position: 'top' }}
                      />{' '}
                      {index !== optionalBlock.themes.length - 1 && 'of '}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
  return blocks;
};
