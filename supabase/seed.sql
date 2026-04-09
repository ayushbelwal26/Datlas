-- Seed data for DSA Atlas

-- Topics
INSERT INTO topics (id, title, difficulty, estimated_hours, phase, why_it_matters, order_index) VALUES
('arrays', 'Arrays', 'Beginner', '2-3 weeks', 'Beginner', 'Foundation of all DSA. Master arrays before anything else.', 1),
('strings', 'Strings', 'Beginner', '1-2 weeks', 'Beginner', 'String manipulation and pattern matching fundamentals.', 2),
('recursion', 'Recursion', 'Beginner', '2 weeks', 'Beginner', 'Think recursively. Foundation for trees, graphs, and DP.', 3),
('sorting', 'Sorting', 'Beginner', '1 week', 'Beginner', 'Understand sorting algorithms and their trade-offs.', 4),
('binary-search', 'Binary Search', 'Intermediate', '2 weeks', 'Intermediate', 'One of the most frequently asked patterns in interviews.', 5),
('linked-list', 'Linked List', 'Intermediate', '1-2 weeks', 'Intermediate', 'Pointers, nodes, and classic interview problems.', 6),
('stack', 'Stack', 'Intermediate', '1 week', 'Intermediate', 'LIFO structure powering expression eval and backtracking.', 7),
('queue', 'Queue', 'Intermediate', '1 week', 'Intermediate', 'BFS, sliding window, and producer-consumer patterns.', 8),
('hashing', 'Hashing', 'Intermediate', '1 week', 'Intermediate', 'O(1) lookups — one of the most powerful tools in interviews.', 9),
('trees', 'Trees', 'Intermediate', '3 weeks', 'Intermediate', 'Binary trees, traversals, and recursive thinking at scale.', 10),
('bst', 'BST', 'Intermediate', '1 week', 'Intermediate', 'Ordered trees with fast search, insert, delete.', 11),
('heaps', 'Heaps', 'Advanced', '1-2 weeks', 'Advanced', 'Priority queues in disguise. Essential for top-K problems.', 12),
('graphs', 'Graphs', 'Advanced', '4 weeks', 'Advanced', 'BFS, DFS, shortest paths, and topological sort.', 13),
('greedy', 'Greedy', 'Advanced', '2 weeks', 'Advanced', 'Local optimal choices that lead to global solutions.', 14),
('backtracking', 'Backtracking', 'Advanced', '2 weeks', 'Advanced', 'Permutations, combinations, and constraint satisfaction.', 15),
('dp', 'Dynamic Programming', 'Advanced', '5-6 weeks', 'Advanced', 'The boss level. Memoization, tabulation, all patterns.', 16),
('tries', 'Tries', 'Advanced', '1 week', 'Placement Prep', 'Prefix trees for string search and autocomplete.', 17),
('bit-manipulation', 'Bit Manipulation', 'Advanced', '1 week', 'Placement Prep', 'Bitwise tricks — fast, elegant, and often asked.', 18),
('complexity', 'Time & Space Complexity', 'Beginner', '3 days', 'Beginner', 'Big-O thinking — the lens through which you judge code.', 0)
ON CONFLICT (id) DO NOTHING;

-- Subtopics for Arrays
INSERT INTO subtopics (id, topic_id, title, order_index) VALUES
('arrays-basics', 'arrays', 'Array Basics', 1),
('arrays-prefix-sum', 'arrays', 'Prefix Sum', 2),
('arrays-kadanes', 'arrays', 'Kadane''s Algorithm', 3),
('arrays-two-pointers', 'arrays', 'Two Pointers', 4),
('arrays-sliding-window', 'arrays', 'Sliding Window', 5),
('arrays-frequency-counting', 'arrays', 'Frequency Counting', 6),
('arrays-subarray-patterns', 'arrays', 'Subarray Patterns', 7)
ON CONFLICT (id) DO NOTHING;

-- Resources for Arrays
INSERT INTO resources (id, topic_id, subtopic_id, title, type, platform, url, duration, rating, is_featured) VALUES
('r1', 'arrays', 'arrays-basics', 'Arrays Full Course — Abdul Bari', 'video', 'YouTube', 'https://youtube.com', '2h 15m', 4.9, TRUE),
('r2', 'arrays', 'arrays-prefix-sum', 'Arrays in Depth — CP Algorithms', 'article', 'cp-algorithms.com', 'https://cp-algorithms.com', '25 min read', 4.7, TRUE),
('r3', 'arrays', 'arrays-prefix-sum', 'Prefix Sum Patterns — Codeforces Blog', 'editorial', 'Codeforces', 'https://codeforces.com', '15 min read', 4.8, FALSE),
('r4', 'arrays', NULL, 'Arrays Cheat Sheet — NeetCode', 'revision', 'NeetCode.io', 'https://neetcode.io', '10 min', 4.9, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Problems for Arrays
INSERT INTO problems (id, topic_id, subtopic_id, title, platform, url, difficulty, stage, tags, is_must_solve, cf_link) VALUES
('p1', 'arrays', 'arrays-basics', 'Two Sum', 'LeetCode', 'https://leetcode.com/problems/two-sum/', 'Easy', 'warmup', '{"Must Solve"}', TRUE, FALSE),
('p2', 'arrays', 'arrays-prefix-sum', 'Running Sum of 1D Array', 'LeetCode', 'https://leetcode.com', 'Easy', 'warmup', '{"Prefix Sum"}', FALSE, FALSE),
('p3', 'arrays', 'arrays-kadanes', 'Maximum Subarray', 'LeetCode', 'https://leetcode.com', 'Easy', 'warmup', '{"Kadane''s"}', FALSE, FALSE),
('p4', 'arrays', 'arrays-prefix-sum', 'Subarray Sum Equals K', 'LeetCode', 'https://leetcode.com', 'Medium', 'core', '{"Must Solve", "Prefix Sum"}', TRUE, FALSE),
('p5', 'arrays', 'arrays-two-pointers', 'Container With Most Water', 'LeetCode', 'https://leetcode.com', 'Medium', 'core', '{"Two Pointers"}', FALSE, FALSE),
('p6', 'arrays', 'arrays-sliding-window', 'Longest Subarray ≤ k', 'Codeforces', 'https://codeforces.com', 'Medium', 'core', '{"Sliding Window", "Editorial"}', FALSE, TRUE),
('p7', 'arrays', 'arrays-two-pointers', 'Trapping Rain Water', 'LeetCode', 'https://leetcode.com', 'Hard', 'interview', '{"Must Solve", "Two Pointers"}', TRUE, FALSE),
('p8', 'arrays', 'arrays-kadanes', 'Maximum Product Subarray', 'LeetCode', 'https://leetcode.com', 'Medium', 'interview', '{"Must Solve"}', TRUE, FALSE),
('p9', 'arrays', NULL, 'Ynoi 2015 Problem', 'Codeforces', 'https://codeforces.com', 'Hard', 'competitive', '{"Codeforces", "Editorial"}', FALSE, TRUE),
('p10', 'arrays', NULL, 'Tourist''s Walk', 'Codeforces', 'https://codeforces.com', 'Hard', 'competitive', '{"Competitive Stretch"}', FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;
