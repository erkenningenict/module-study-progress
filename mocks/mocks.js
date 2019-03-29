const ngApimock = require('ng-apimock')();

ngApimock.run({
  baseUrl: 'http://localhost:4000',
  src: 'mocks/*',
  outputDir: '.tmp/mocks',
  done: function() {
    console.log('produced initial mocks');
  },
});

ngApimock.watch('mocks');

(function serve() {
  const http = require('http'),
    connect = require('connect'),
    ngApiMockRequest = require('ng-apimock/lib/utils').ngApimockRequest;

  const app = connect();

  app.use(ngApiMockRequest);
  app.use('/mocking', require('serve-static')('.tmp/mocks'));
  app.use((req, res) => {
    console.log('incoming request url: ', req.url);
    if (req.url.match('/DesktopModules') !== null) {
      console.log('#DH# inside Desktopmodules', req.url.indexOf('/heatnl-dev/v1'));
      // Real MMF dev api endpoint
      const baseUrlProd =
        'https://erkenningen.nl/DesktopModules/AOCRaad.Erkenningen.WebAPI/API/License/LicenseList';
      // const url = req.url.replace('/DesktopModules/AOCRaad.Erkenningen.WebAPI/API', '');
      const redirectUrl = `${baseUrlProd}`;
      console.log('redirecting to Prod API: ', redirectUrl);
      // Redirect to the real api endpoint
      res.writeHead(307, {
        Location: redirectUrl,
      });
      res.end();
    }
  });

  http.createServer(app).listen(4000);
})();
