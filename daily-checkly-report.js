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

console.log('CHECKLY_API_KEY from env:', CHECKLY_API_KEY ? '✅ present' : '❌ missing');
console.log('SLACK_WEBHOOK_URL from env:', SLACK_WEBHOOK_URL ? '✅ present' : '❌ missing');

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
    console.error('Error fetching Checkly checks:', error.message);
    console.error('Full error:', error.response?.data || error);
    return [];
  }
}

async function fetchLatestRun(checkId) {
  try {
    const response = await axios.get(`https://api.checklyhq.com/v1/checks/${checkId}/runs?limit=1`, {
      headers: {
        Authorization: `Bearer ${CHECKLY_API_KEY}`,
        'x-checkly-account': process.env.CHECKLY_ACCOUNT_ID,
        Accept: 'application/json'
      }
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching runs for check ${checkId}:`, error.message);
    return null;
  }
}

async function generateSummary(checks) {
  const today = dayjs().utc().startOf('day');
  console.log("Today UTC start:", today.format());

  const summaryLines = [];

  for (const check of checks) {
    const tags = check.tags || [];
    const hasTag = tags.includes('daily-report');

    console.log(`🔍 Check: "${check.name}"`);
    console.log(`     ID: ${check.id}`);
    console.log(`     Tags: ${JSON.stringify(tags)}`);
    console.log(`     Includes 'daily-report':`, hasTag);

    if (!hasTag) {
      console.log(`     ⏭ Skipped (no matching tag)`);
      continue;
    }

    const latestRun = await fetchLatestRun(check.id);

    if (!latestRun) {
      summaryLines.push(`❓ ${check.name}: No runs found`);
      continue;
    }

    const lastRunTime = dayjs(latestRun.startedAt).utc();
    const status = latestRun.status || 'unknown';

    console.log(`🕒 ${check.name} ran at ${lastRunTime.format()} (UTC) with status ${status}`);

    if (lastRunTime.isAfter(today)) {
      summaryLines.push(`✅ ${check.name}: **${status.toUpperCase()}** at ${lastRunTime.format('HH:mm')} UTC`);
    } else {
      summaryLines.push(`❓ ${check.name}: No run today`);
    }
  }

  if (summaryLines.length === 0) return "⚠️ No checks found with tag 'daily-report'.";

  return `📝 *Checkly Daily Summary Report - ${dayjs().format('YYYY-MM-DD')}*\n\n${summaryLines.join('\n')}`;
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
  const checks = await fetchChecks();
  console.log("Total checks fetched:", checks.length);
  if (checks.length > 0) {
    console.log("Sample check data:\n", JSON.stringify(checks[0], null, 2));
  }
  const report = await generateSummary(checks);

  console.log(report);

  fs.writeFileSync(`checkly-report-${dayjs().format('YYYY-MM-DD')}.txt`, report);

  if (SLACK_WEBHOOK_URL) {
    await sendToSlack(report);
  }
})();
