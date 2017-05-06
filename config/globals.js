module.exports.globals = {
  version: process.env.npm_package_version,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,

  oauth: {
    google: {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    },
  }
};
