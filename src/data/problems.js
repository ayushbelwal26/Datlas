export const resources = {
  arrays: [
    {
      id: 'r1',
      type: 'video',
      label: 'Best Beginner Video',
      title: 'Arrays Full Course — Abdul Bari',
      platform: 'YouTube',
      url: 'https://youtube.com',
      duration: '2h 15m',
      rating: 4.9,
    },
    {
      id: 'r2',
      type: 'article',
      label: 'Best Article',
      title: 'Arrays in Depth — CP Algorithms',
      platform: 'cp-algorithms.com',
      url: 'https://cp-algorithms.com',
      duration: '25 min read',
      rating: 4.7,
    },
    {
      id: 'r3',
      type: 'editorial',
      label: 'Best Editorial',
      title: 'Prefix Sum Patterns — Codeforces Blog',
      platform: 'Codeforces',
      url: 'https://codeforces.com',
      duration: '15 min read',
      rating: 4.8,
    },
    {
      id: 'r4',
      type: 'revision',
      label: 'Best Revision Resource',
      title: 'Arrays Cheat Sheet — NeetCode',
      platform: 'NeetCode.io',
      url: 'https://neetcode.io',
      duration: '10 min',
      rating: 4.9,
    },
  ],
}

export const problems = {
  arrays: {
    warmup: [
      { id: 'p1', name: 'Two Sum', platform: 'LeetCode', difficulty: 'Easy', tags: ['Must Solve'], url: 'https://leetcode.com/problems/two-sum/', cf: false },
      { id: 'p2', name: 'Running Sum of 1D Array', platform: 'LeetCode', difficulty: 'Easy', tags: ['Prefix Sum'], url: 'https://leetcode.com', cf: false },
      { id: 'p3', name: 'Maximum Subarray', platform: 'LeetCode', difficulty: 'Easy', tags: ["Kadane's"], url: 'https://leetcode.com', cf: false },
    ],
    core: [
      { id: 'p4', name: 'Subarray Sum Equals K', platform: 'LeetCode', difficulty: 'Medium', tags: ['Must Solve', 'Prefix Sum'], url: 'https://leetcode.com', cf: false },
      { id: 'p5', name: 'Container With Most Water', platform: 'LeetCode', difficulty: 'Medium', tags: ['Two Pointers'], url: 'https://leetcode.com', cf: false },
      { id: 'p6', name: 'Longest Subarray ≤ k', platform: 'Codeforces', difficulty: 'Medium', tags: ['Sliding Window', 'Editorial'], url: 'https://codeforces.com', cf: true },
    ],
    interview: [
      { id: 'p7', name: 'Trapping Rain Water', platform: 'LeetCode', difficulty: 'Hard', tags: ['Must Solve', 'Two Pointers'], url: 'https://leetcode.com', cf: false },
      { id: 'p8', name: 'Maximum Product Subarray', platform: 'LeetCode', difficulty: 'Medium', tags: ['Must Solve'], url: 'https://leetcode.com', cf: false },
    ],
    competitive: [
      { id: 'p9', name: 'Ynoi 2015 Problem', platform: 'Codeforces', difficulty: 'Hard', tags: ['Codeforces', 'Editorial'], url: 'https://codeforces.com', cf: true },
      { id: 'p10', name: "Tourist's Walk", platform: 'Codeforces', difficulty: 'Hard', tags: ['Competitive Stretch'], url: 'https://codeforces.com', cf: true },
    ],
  }
}
