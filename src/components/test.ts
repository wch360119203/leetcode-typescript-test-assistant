import {
  MinPriorityQueue,
  PriorityQueueItem,
} from '@datastructures-js/priority-queue'
export default function countCompleteComponents(
  n: number,
  edges: number[][],
): number {
  const edgesVertexUsed = new Set(edges.flat())
  let count = n - edgesVertexUsed.size
  const map = new Map<number, Set<number>>()
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i]
    if (!map.has(edge[0])) {
      map.set(edge[0], new Set([edge[1]]))
    } else {
      map.get(edge[0])?.add(edge[1])
    }
    if (!map.has(edge[1])) {
      map.set(edge[1], new Set([edge[0]]))
    } else {
      map.get(edge[1])?.add(edge[0])
    }
  }
  const searched = new Set<number>()
  for (const [k, v] of map.entries()) {
    let ss = 0
    if (searched.has(k)) continue
    const size = v.size
    let condition = true
    searched.add(k)
    ss++
    condition = condition && searchNode(v, size)
    if (condition && ss === size) {
      count++
    }
    function searchNode(set: Set<number>, size: number): boolean {
      let condition = set.size === size
      for (const t of set.values()) {
        if (searched.has(t)) continue
        searched.add(t)
        ss++
        condition = condition && searchNode(map.get(t)!, size)
      }
      return condition
    }
  }
  return count
}
