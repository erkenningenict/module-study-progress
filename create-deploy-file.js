require('dotenv').config();

const fs = require('fs-extra');
const path = require('path');
const log = require('console-emoji');

const moduleName = process.env.MODULE_NAME;
const buildFolder = path.resolve(__dirname, './build/static/');
const outputFolder = path.resolve(__dirname, './dnn/build/');
const deployFile = path.resolve(outputFolder, 'deploy.json');

function run() {
  try {
    log(':put_litter_in_its_place:  Remove current deploy file');

    // Clear current deploy file
    fs.removeSync(deployFile);

    log(':page_with_curl:  Creating new deploy file');

    const json = {
      targets: [
        {
          name: 'Module ascx control',
          path: `DesktopModules/AOCRaad.Erkenningen.${moduleName}`,
          files: [],
        },
        {
          name: 'Module js files',
          path: `DesktopModules/AOCRaad.Erkenningen.${moduleName}/static/js`,
          clear: true,
          files: [],
        },
        {
          name: 'Module css files',
          path: `DesktopModules/AOCRaad.Erkenningen.${moduleName}/static/css`,
          clear: true,
          files: [],
        },
        {
          name: 'Module media files',
          path: `DesktopModules/AOCRaad.Erkenningen.${moduleName}/static/media`,
          clear: true,
          files: [],
        },
      ],
    };

    log(':earth_americas:  Adding ascx to deploy file');

    // Add ASCX file
    json.targets[0].files.push(moduleName + '.ascx');

    log(':gift:  Adding assets to deploy file');

    // Add file entries
    ['js', 'css', 'media'].forEach((folder) => {
      fs.readdirSync(path.resolve(buildFolder, folder)).forEach((file) => {
        if (!fs.existsSync(path.resolve(buildFolder, folder))) {
          return;
        }
        // TODO Improve assets by folder, should be more dynamic
        json.targets[1 + ['js', 'css', 'media'].indexOf(folder)].files.push(
          path.join('static', folder, file),
        );
      });
    });

    fs.ensureDirSync(outputFolder);
    fs.writeFileSync(deployFile, JSON.stringify(json, null, 2), 'utf-8', 'w+');

    log(':beer:  Finished!');
  } catch (err) {
    log(':rage:  ' + err);
  }

  console.log('');
}

run();
