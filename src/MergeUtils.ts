import {RecursivePick} from "./types/RecursivePick"
import _ from 'lodash'
import {arrayAndUnderFinedBlatterMerger} from "../LodashUtils"

export const deepStateMerge = <T>(delta: RecursivePick<T>) => {
  return (prevState: T) => {
    return _.mergeWith({}, prevState, delta, arrayAndUnderFinedBlatterMerger)
  }
}