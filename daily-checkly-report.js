require('dotenv').config();
const axios = require('axios');

const CHECKLY_API_KEY = process.env.CHECKLY_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

if (!CHECKLY_API_KEY) {
  console.error('CHECKLY_API_KEY from env: ❌ missing');
  process.exit(1);
} else {
  console.log('CHECKLY_API_KEY from env: ✅ present');
}

if (!SLACK_WEBHOOK_URL) {
  console.error('SLACK_WEBHOOK_URL from env: ❌ missing');
  process.exit(1);
} else {
  console.log('SLACK_WEBHOOK_URL from env: ✅ present');
}

const CHECKLY_API_URL = 'https://api.checklyhq.com/v1/checks';

async function fetchChecks() {
  try {
    const response = await axios.get(CHECKLY_API_URL, {
      headers: {
        Authorization: `Bearer ${CHECKLY_API_KEY}`,
        'x-checkly-account': process.env.CHECKLY_ACCOUNT_ID,
        Accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching checks:', error.message);
    return [];
  }
}

// Updated function to fetch latest run for a check using /v1/runs with checkId filter
async function fetchLatestRun(checkId) {
  try {
    const response = await axios.get('https://api.checklyhq.com/v1/runs', {
      headers: {
        Authorization: `Bearer ${CHECKLY_API_KEY}`,
        'x-checkly-account': process.env.CHECKLY_ACCOUNT_ID,
        Accept: 'application/json'
      },
      params: {
        checkId: checkId,
        limit: 1,
        orderBy: 'desc' // latest run first
      }
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching runs for check ${checkId}:`, error.message);
    return null;
  }
}

function formatStatus(run) {
  if (!run) return 'No runs found';
  if (run.status === 'FAILED') return '❌ Failed';
  if (run.status === 'PASSED') return '✅ Passed';
  return run.status || 'Unknown';
}

function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString();
}

async function sendSlackMessage(message) {
  try {
    await axios.post(SLACK_WEBHOOK_URL, { text: message });
    console.log('✅ Report sent to Slack.');
  } catch (error) {
    console.error('Error sending report to Slack:', error.message);
  }
}

(async () => {
  console.log('Fetching checks...');
  const checks = await fetchChecks();
  console.log(`Total checks fetched: ${checks.length}`);

  const dailyReportChecks = checks.filter(check =>
    check.tags && check.tags.includes('daily-report')
  );

  let report = `📝 *Checkly Daily Summary Report - ${new Date().toISOString().slice(0, 10)}*\n\n`;

  for (const check of dailyReportChecks) {
    console.log(`🔍 Check: "${check.name}"\n     ID: ${check.id}\n     Tags: ${JSON.stringify(check.tags)}\n     Includes 'daily-report': true`);

    const latestRun = await fetchLatestRun(check.id);
    if (!latestRun) {
      report += `❓ *${check.name}*: No runs found\n`;
    } else {
      const status = formatStatus(latestRun);
      const startedAt = formatTimestamp(latestRun.startedAt);
      const endedAt = formatTimestamp(latestRun.endedAt);
      report += `*${check.name}*: ${status}\nStarted: ${startedAt}\nEnded: ${endedAt}\n\n`;
    }
  }

  await sendSlackMessage(report);
})();
