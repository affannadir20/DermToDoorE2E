import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

dotenv.config();

// Load from environment
const CHECKLY_API_KEY = process.env.CHECKLY_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

console.log('CHECKLY_API_KEY from env:', process.env.CHECKLY_API_KEY);
console.log('SLACK_WEBHOOK_URL from env:', process.env.SLACK_WEBHOOK_URL);

// You can hardcode or use process.env.CHECKLY_API_URL if preferred
const CHECKLY_API_URL = 'https://api.checklyhq.com/v1/checks';

async function fetchChecks() {
  try {
    const response = await axios.get('https://api.checklyhq.com/v1/checks', {
  headers: {
    Authorization: `Bearer ${process.env.CHECKLY_API_KEY}`,
    'x-checkly-account': process.env.CHECKLY_ACCOUNT_ID,
    Accept: 'application/json'
  }
});
    return response.data;
  } catch (error) {
    console.error('Error fetching Checkly checks:', error.message);
    console.error('Full error:', error.response?.data || error);
    return [];
  }
}

function generateSummary(checks) {
  const today = dayjs().utc().startOf('day');
  const reportChecks = checks.filter(check => check.tags?.includes('daily-report'));
  console.log(reportChecks);

  if (reportChecks.length === 0) return "⚠️ No checks found with tag 'daily-report'.";

  const summary = reportChecks.map(check => {
    const lastRun = check.lastCheckTime ? dayjs(check.lastCheckTime).utc() : null;
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
    console.error('Full error:', error.response?.data || error);
  }
}

(async () => {
  console.log("Checkly API Key present:", !!CHECKLY_API_KEY);
  console.log("Slack Webhook URL present:", !!SLACK_WEBHOOK_URL);

  const checks = await fetchChecks();
  console.log("Sample check data:\n", JSON.stringify(checks[0], null, 2));
  const report = generateSummary(checks);

  console.log(report);

  fs.writeFileSync(`checkly-report-${dayjs().format('YYYY-MM-DD')}.txt`, report);

  if (SLACK_WEBHOOK_URL) {
    await sendToSlack(report);
  }
})();
