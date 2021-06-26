/**
 * @description 二叉树
 */
let bTree = {
  val: '1',
  left: {
    val: '1-1',
    left: { val: '1-1-1' },
    right: { val: '1-1-2' },
  },
  right: {
    val: '1-2',
    left: { val: '1-2-1' },
    right: { val: '1-2-2' },
  }
}

// 二叉树递归遍历
function recursion(sortType = 'lt', root, arr) {
  if (!arr) arr = []
  if (root) {
    switch(sortType) {
      case 'lt':
        arr.push(root.val)
        recursion(sortType, root.left, arr)
        recursion(sortType, root.right, arr)
        break
      case 'ct':
        recursion(sortType, root.left, arr)
        arr.push(root.val)
        recursion(sortType, root.right, arr)
        break
      case 'rt':
        recursion(sortType, root.left, arr)
        recursion(sortType, root.right, arr)
        arr.push(root.val)
        break
    }
  }
  return arr
}
// 二叉树非递归遍历
function iter(sortType = 'lt',root) {
  let result = []
  let stack = []
  let curr = root
  let last = null
  while(curr || stack.length) {
    switch(sortType) {
      // 前序
      case 'lt':
        while(curr) {
          result.push(curr.val)
          stack.push(curr)
          curr = curr.left
        }
        curr = stack.pop()
        curr = curr.right
        break
      // 中序
      case 'ct':
        while(curr) {
          stack.push(curr)
          curr = curr.left
        }
        curr = stack.pop()
        result.push(curr.val)
        curr = curr.right
        break
      // 后序
      case 'rt':
        while(curr) {
          stack.push(curr)
          curr = curr.left
        }
        curr = stack[stack.length - 1]
        if (!curr.right || curr.right == last) {
          result.push(curr.val)
          last = curr
          stack.pop()
          curr = null
        } else {
          curr = curr.right
        }
    }
  }
  return result
}

const createNode = (val) => ({ val })
// 重建二叉树（递归）
function rebuildNode(pre, vin) {
  if (!pre.length) {
    return null
  } else if (pre.length === 1) {
    return createNode(pre[0])
  }
  let result
  let val = pre[0]
  let index = vin.indexOf(val)
  let vinLeft = vin.slice(0, index)
  let vinRight = vin.slice(index + 1)
  let preLeft = pre.slice(1, index + 1)
  let preRight = pre.slice(index + 1)
  result = createNode(val)
  result.left = rebuildNode(preLeft, vinLeft)
  result.right = rebuildNode(preRight, vinRight)
  return result
}

let preArr = recursion('lt', bTree)
let vinArr = iter('ct', bTree)
console.log(preArr, vinArr, rebuildNode(preArr, vinArr))
