const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    // experimentalSessionAndOrigin: true,
    videoCompression: 50,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
