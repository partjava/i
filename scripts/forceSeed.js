const { executeQuery } = require('../app/lib/database');
const { seedChallengesIfNeeded } = require('../app/lib/seedChallenges');

async function main() {
  console.log('🔄 Cleaning up old challenges and quizzes...');
  await executeQuery('DELETE FROM star_challenge_quizzes');
  await executeQuery('DELETE FROM star_challenges');
  console.log('🌱 Seed challenges with updated Stage 1 configurations...');
  await seedChallengesIfNeeded();
  console.log('🎉 Database reseeded successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error("Reseed failed:", err);
  process.exit(1);
});
