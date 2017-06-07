var REPO_ROOT = 'https://github.com/TheConnMan/my-public-apology/';
var version = process.env.npm_package_version;
var commit = (version || '').split('-').length === 1 ? null : version.split('-')[1].slice(0, 7);

module.exports.globals = {
  version: commit ? version.split('-')[0] + '-' + commit : version,
  versionLink: commit ? REPO_ROOT + 'commit/' + commit : REPO_ROOT + 'releases/tag/v' + version,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

  oauth: {
    google: {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
  }
};
