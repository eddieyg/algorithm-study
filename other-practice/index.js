/**
 * 将扁平的数据结构转成树结构
 */
let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

function createTree(data = [], id) {
  let childIndexes = {}
  let idIndexes = {}
  data.forEach((e) => {
    if (!childIndexes[e.id]) childIndexes[e.id] = []
    idIndexes[e.id] = {
      ...e,
      children: childIndexes[e.id],
    }
    if (!childIndexes[e.pid]) childIndexes[e.pid] = []
    childIndexes[e.pid].push(idIndexes[e.id])
  })
  return idIndexes[id]
}

console.log(createTree(arr, 1))
