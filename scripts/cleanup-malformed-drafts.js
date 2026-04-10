const { getDb } = require('../server/db');
const { pruneMalformedDrafts } = require('../server/lib/drafts');

function main() {
  const db = getDb();
  const pruned = pruneMalformedDrafts(db);

  if (!pruned.length) {
    console.log('No malformed drafts found.');
    return;
  }

  console.log(`Pruned ${pruned.length} malformed draft(s):`);
  for (const item of pruned) {
    console.log(`- ${item.draft.id} (${item.draft.lang}): ${item.issues.join('; ')}`);
  }
}

main();
