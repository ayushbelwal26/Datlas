import { topics, weakAreas, revisionQueue } from '../../src/data/topics'
import { problems, resources } from '../../src/data/problems'

/**
 * Data Service abstracting database operations.
 * Once Supabase project is fully initialized and seeded,
 * replace these with actual Supabase client queries.
 */

export async function getTopics() {
  return topics
}

export async function getTopicById(id: string) {
  return topics.find(t => t.id === id) || null
}

export async function getWeakAreas() {
  return weakAreas
}

export async function getRevisionQueue() {
  return revisionQueue
}

export async function getResourcesByTopic(topicId: string) {
  return (resources as any)[topicId] || []
}

export async function getProblemsByTopic(topicId: string) {
  return (problems as any)[topicId] || {}
}

export async function getUserProgress(userId: string) {
  return {
    streak: 12,
    topicsCompleted: 3,
    problemsAttempted: 47,
    revisionPending: 3,
    weakAreasPending: 3
  }
}
