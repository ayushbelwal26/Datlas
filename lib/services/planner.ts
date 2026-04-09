export interface PlannerInput {
  userId: string;
  availableMinutes: number;
  energyLevel: 'low' | 'medium' | 'high';
  goals?: string[];
}

export interface PlannerTask {
  emoji: string;
  task: string;
  time: string; // e.g. "15 min"
  tag: string;
  reason: string;
  estimatedMinutes: number;
  priorityScore?: number;
}

/**
 * A highly deterministic planner engine. 
 * For full-stack integration, this should fetch current:
 * - Weak areas (Progress table)
 * - Revision queue (Progress table where next_review <= now)
 * - Next uncompleted topic in the Roadmap
 * 
 * For now, this mimics the logic by defining buckets of tasks and allocating 
 * them based on available minutes.
 */
export async function generateDailyPlan(input: PlannerInput): Promise<PlannerTask[]> {
  const { availableMinutes, energyLevel } = input;
  
  // Weights based on energy level
  const energyWeights = {
    low: { newTopic: 0.1, weakArea: 0.2, revision: 0.5, practice: 0.2 },
    medium: { newTopic: 0.3, weakArea: 0.3, revision: 0.2, practice: 0.2 },
    high: { newTopic: 0.4, weakArea: 0.4, revision: 0.1, practice: 0.1 }
  };

  const weights = energyWeights[energyLevel] || energyWeights['medium'];
  
  const potentialTasks: PlannerTask[] = [
    { emoji: '🔁', task: 'Revise Binary Search', time: '20 min', estimatedMinutes: 20, tag: 'Weak Area', reason: 'Failed boundary problems recently' },
    { emoji: '⚡', task: 'Retry 3 weak area problems', time: '30 min', estimatedMinutes: 30, tag: 'Revision', reason: 'Spaced repetition queue' },
    { emoji: '📝', task: 'Solve 2 Prefix Sum problems', time: '30 min', estimatedMinutes: 30, tag: 'Core Pattern', reason: 'Next pattern in Arrays roadmap' },
    { emoji: '🎓', task: 'Learn Sliding Window in depth', time: '45 min', estimatedMinutes: 45, tag: 'Next Topic', reason: 'Prerequisite for 2-pointer problems' },
    { emoji: '🏁', task: 'Mock 20-min timed set', time: '20 min', estimatedMinutes: 20, tag: 'Contest Prep', reason: 'Contest Improvement goal activated' },
    { emoji: '🎥', task: 'Watch Sliding Window video', time: '25 min', estimatedMinutes: 25, tag: 'Next Topic', reason: 'Introduces next Arrays subtopic' },
    { emoji: '🔁', task: 'Quick revise Binary Search edges', time: '15 min', estimatedMinutes: 15, tag: 'Weak Area', reason: 'Low accuracy on 3 recent problems' },
    { emoji: '⚡', task: 'Solve 2 easy array problems', time: '15 min', estimatedMinutes: 15, tag: 'Practice', reason: 'Momentum building' },
  ];

  // We add dynamic priority scores to pick best tasks matching the duration
  potentialTasks.forEach(t => {
    let baseScore = 1;
    if (t.tag === 'Next Topic') baseScore = weights.newTopic * 10;
    if (t.tag === 'Weak Area') baseScore = weights.weakArea * 10;
    if (t.tag === 'Revision') baseScore = weights.revision * 10;
    if (t.tag === 'Practice') baseScore = weights.practice * 10;
    t.priorityScore = baseScore + (Math.random() * 2); // tie-breaker
  });

  // Sort descending by priority
  potentialTasks.sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));

  const selectedPlans: PlannerTask[] = [];
  let remainingTime = availableMinutes;

  for (const t of potentialTasks) {
    if (remainingTime <= 0) break;
    // Always include the task if it reasonably fits or if we have nothing yet
    if (t.estimatedMinutes <= remainingTime + 10) { 
      selectedPlans.push(t);
      remainingTime -= t.estimatedMinutes;
    }
  }

  // Ensure minimum task count if very low time to avoid empty plans
  if (selectedPlans.length === 0 && potentialTasks.length > 0) {
    // just pick the smallest one
    const smallest = [...potentialTasks].sort((a, b) => a.estimatedMinutes - b.estimatedMinutes)[0];
    selectedPlans.push(smallest);
  }

  return selectedPlans;
}
