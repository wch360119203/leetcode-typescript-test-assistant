import {
  MinPriorityQueue,
  PriorityQueueItem,
  MaxPriorityQueue,
  PriorityQueue,
} from '@datastructures-js/priority-queue'
import * as _ from 'lodash'
export default function uniquePathsIII(grid: number[][]): number {
  let gridTempStart = _.cloneDeep(grid)
  let pathcount = 0
  let start: number[]
  const totalZero = grid.reduce(
    (sum, arr, r) =>
      sum +
      arr.reduce((s, v, c) => {
        if (v === 1) start = [r, c, 0]
        return v === 0 ? s + 1 : s
      }, 0),
    0,
  )
  start![2] = totalZero
  const stack = [start!]
  const stackGrid = [gridTempStart]
  while (stack.length > 0) {
    const rawcolleft = stack.pop()
    help(rawcolleft![0], rawcolleft![1], rawcolleft![2], stackGrid.pop()!)
  }
  return pathcount
  function help(row: number, col: number, left: number, gridTemp: number[][]) {
    move(row - 1, col)
    move(row + 1, col)
    move(row, col + 1)
    move(row, col - 1)
    function move(row: number, col: number) {
      const mark = gridTemp[row]?.[col] as 0 | 1 | 2 | -1 | undefined
      if (mark === 0) {
        const temp = _.cloneDeep(gridTemp)
        temp[row][col] = 1
        stack.push([row, col, left - 1])
        stackGrid.push(temp)
        return
      }
      if (mark === 2 && left === 0) {
        pathcount++
      }
    }
  }
}
