const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const junit = require('cucumber-junit');

const jsonFile = path.join(__dirname, 'reports/cucumber_report.json');
const htmlFile = path.join(__dirname, 'reports/cucumber_report.html');
const junitFile = path.join(__dirname, 'reports/cucumber_report.xml');

// Generate HTML Report
const options = {
  theme: 'bootstrap',
  jsonFile: jsonFile,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  launchReport: true
};

reporter.generate(options);

// Generate JUnit XML Report
const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
const xml = junit.convert(json);
fs.writeFileSync(junitFile, xml);
