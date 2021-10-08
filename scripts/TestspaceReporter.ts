const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder');
const { AggregatedResult } = require('@jest/reporters');

const TestCaseStatusEnum = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERRORED: 'errored',
  UNKNOWN: 'unknown',
  IGNORED: 'ignored',
};

const TestCaseStatus = {
  passed: TestCaseStatusEnum.PASSED,
  failed: TestCaseStatusEnum.FAILED,
  skipped: TestCaseStatusEnum.IGNORED,
  pending: TestCaseStatusEnum.UNKNOWN,
  todo: TestCaseStatusEnum.UNKNOWN,
  disabled: TestCaseStatusEnum.IGNORED,
};

class TestspaceReporter {
  /**
   * @param {AggregatedResult} aggregatedResults
   */
  onRunComplete(_, aggregatedResults) {
    const json = {
      // https://help.testspace.com/reference/data-formats/#reporter
      reporter: {
        '@product_version': '',
        '@schema_version': '1.0',
        // https://help.testspace.com/reference/data-formats/#generic-format
        annotation: {
          '@name': new Date().toISOString(),
          '@level': 'info',
        },
        // https://help.testspace.com/reference/data-formats/#test_suite
        test_suite: aggregatedResults.testResults.map((testSuite) => ({
          '@name': testSuite.testFilePath,
          // https://help.testspace.com/reference/data-formats/#test_case
          test_case: testSuite.testResults.map((testCase) => ({
            '@name': testCase.fullName,
            '@status':
              TestCaseStatus[testCase.status] || TestCaseStatusEnum.UNKNOWN,
            '@duration': testCase.duration || '0',
          })),
        })),
      },
    };
    const xml = create(json).end({ pretty: true });
    const filename = path.resolve(__dirname, '../coverage/testspace.xml');
    fs.writeFileSync(filename, xml);
  }
}

module.exports = TestspaceReporter;
