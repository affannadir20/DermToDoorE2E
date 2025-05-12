import axios from 'axios';
import fs from 'fs';
import dayjs from 'dayjs';

const CHECKLY_API_KEY = process.env.CHECKLY_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const CHECKLY_API_URL = 'https://api.checklyhq.com/v1/checks';

async function fetchChecks() {
  try {
    const response = await axios.get(CHECKLY_API_URL, {
      headers: {
        'Authorization': `Bearer ${CHECKLY_API_KEY}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Checkly checks:', error.message);
    return [];
  }
}

function generateSummary(checks) {
  const today = dayjs().startOf('day');
  const reportChecks = checks.filter(check => check.tags?.includes('daily-report'));

  if (reportChecks.length === 0) return "⚠️ No checks found with tag 'daily-report'.";

  const summary = reportChecks.map(check => {
    const lastRun = check.lastCheckTime ? dayjs(check.lastCheckTime) : null;
    const status = check.lastCheckResult?.status || 'unknown';

    if (lastRun && lastRun.isAfter(today)) {
      return `✅ ${check.name}: **${status.toUpperCase()}** at ${lastRun.format('HH:mm')}`;
    } else {
      return `❓ ${check.name}: No run today`;
    }
  }).join('\n');

  return `📝 *Checkly Daily Summary Report - ${dayjs().format('YYYY-MM-DD')}*\n\n${summary}`;
}


async function sendToSlack(reportText) {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: reportText
    });
    console.log('✅ Report sent to Slack.');
  } catch (error) {
    console.error('Error sending to Slack:', error.message);
  }
}

(async () => {
  const checks = await fetchChecks();
  const report = generateSummary(checks);

  console.log(report);

  fs.writeFileSync(`checkly-report-${dayjs().format('YYYY-MM-DD')}.txt`, report);

  if (SLACK_WEBHOOK_URL) {
    await sendToSlack(report);
  }
})();
