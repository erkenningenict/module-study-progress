import React from 'react';
import './StudyProgressBar.css';
import { Button } from '@erkenningen/ui/components/button';
import { StudyProgressDetailFragment } from '../generated/graphql';

interface StudyProgressBarProps {
  studyProgress: StudyProgressDetailFragment | null;
}

export const StudyProgressBar: React.FC<StudyProgressBarProps> = ({ studyProgress }) => {
  const participationPoints = studyProgress?.ParticipationPoints || [];
  const studieresultaten = studyProgress?.Studieresultaten || [];
  const required: { themeId: number; themeName: string; done: boolean }[] = [];
  const optional: {
    themes: { themeId: number; themeName: string }[];
    themeName: string;
    done: boolean;
  }[] = [];
  let optionalDone = 0;
  const availableThemes: { themeId: number; themeName: string }[] = [];
  const doneThemes: string[] = [];
  studieresultaten?.forEach((studieresultaat) => {
    doneThemes.push(studieresultaat?.Cursus.Vak.ThemaNaam || 'Onbekend thema');
  });
  participationPoints.forEach((participationPoint) => {
    // Check all required points
    if (participationPoint!.RequiredPoints >= 1) {
      let requiredDone: number = participationPoint!.CountedPoints;
      let requiredTodo: number =
        participationPoint!.RequiredPoints - participationPoint!.CountedPoints;
      if (requiredTodo < 0) {
        requiredTodo = 0;
      }
      for (
        let requiredParticipation = 0;
        requiredParticipation < participationPoint!.RequiredPoints;
        requiredParticipation++
      ) {
        let done = false;
        if (requiredDone > 0) {
          done = true;
        }
        required.push({
          themeId: participationPoint!.ThemaId,
          themeName: `${participationPoint!.ThemaNaam} (verplicht)`,
          done: done,
        });
        requiredDone = requiredDone - 1;
        if (doneThemes.indexOf(participationPoint!.ThemaNaam) > -1) {
          doneThemes.splice(doneThemes.indexOf(participationPoint!.ThemaNaam), 1);
        }
      }
      if (participationPoint!.CountedPoints - participationPoint!.RequiredPoints > 0) {
        // Required point is done as optional theme
        optionalDone += participationPoint!.CountedPoints - participationPoint!.RequiredPoints;
      }
      if (participationPoint!.ThemaNaam !== 'KBA' && participationPoint!.ThemaNaam !== 'KBA-GB') {
        availableThemes.push({
          themeId: participationPoint!.ThemaId,
          themeName: participationPoint!.ThemaNaam,
        });
      }
    } else {
      optionalDone += participationPoint!.CountedPoints;

      availableThemes.push({
        themeId: participationPoint!.ThemaId,
        themeName: participationPoint!.ThemaNaam,
      });
    }
  });
  if (availableThemes.length === 0) {
    participationPoints.forEach((participationPoint) => {
      availableThemes.push({
        themeId: participationPoint!.ThemaId,
        themeName: participationPoint!.ThemaNaam,
      });
    });
  }
  for (let index = 0; index < (studyProgress?.RequiredPoints || 0) - required.length; index++) {
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
  const colorGreen = '#6abbb7';
  const colorOrange = '#dd6b02';
  const url = `${import.meta.env.REACT_APP_DNN_SEARCH_COURSE_MODULE_URL}?themaId=`;

  const blocks = (
    <div className="block-container">
      {required.map((requiredBlock, index) => (
        <div
          className="block"
          style={{ backgroundColor: requiredBlock.done ? colorGreen : colorOrange }}
          key={index}
        >
          {requiredBlock.done ? (
            <Button
              disabled={true}
              buttonType="link"
              label={requiredBlock.themeName}
              className="done"
            />
          ) : (
            <Button
              onClick={() => {
                const fullUrl = `${url}${requiredBlock.themeId}&certificeringId=${studyProgress?.Certificering.CertificeringID}`;
                window.location.assign(fullUrl);
              }}
              buttonType="link"
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
            <Button buttonType="link" disabled label={optionalBlock.themeName} />
          ) : (
            <div>
              Thema naar keuze:{' '}
              {optionalBlock.themes.map(
                (theme: { themeId: number; themeName: string }, index: number) => {
                  return (
                    <div key={index}>
                      <Button
                        onClick={() => {
                          const fullUrl = `${url}${theme.themeId}&certificeringId=${studyProgress?.Certificering.CertificeringID}`;
                          window.location.assign(fullUrl);
                        }}
                        buttonType="link"
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
