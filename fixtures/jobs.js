// @ts-check

const jobCategories = ['Engineering', 'Design', 'Marketing', 'Operations', 'Support'];
const jobStatuses = ['open', 'in-progress', 'completed'];

/**
 * Fixture containing 5,000 consistently shaped job records.
 * @type {Array<{ id: number, name: string, category: string, status: string }>}
 */
const jobs = Array.from({ length: 5000 }, (_, index) => {
  const jobNumber = index + 1;

  return {
    id: jobNumber,
    name: `Công việc ${jobNumber}`,
    category: jobCategories[index % jobCategories.length],
    status: jobStatuses[index % jobStatuses.length],
  };
});

module.exports = { jobs };
