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
    left: { 
      val: '1-2-1',
      left: {
        val: '1-2-1-1',
      }
    },
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

// 生成镜像对称二叉树
function toMirror(root) {
  if (root) {
    let stash = root.left
    root.left = root.right
    root.right = stash
    toMirror(root.left)
    toMirror(root.right)
    return root
  }
}
// 判断是否是对称二叉树
function isSymmetrical(root1, root2) {
  if (!root1 && !root2) return true
  if (!root1 || !root2) return false
  if (root1.val != root2.val) return false
  return isSymmetrical(root1.left, root2.right) && isSymmetrical(root1.right, root2.left)
}

/**
 * 找到二叉搜索树 第k小节点
 * 解析：二叉搜索树值的规律为 左子树大于根节点 根节点大于右节点
 */
function kthNode(root, k) {
  if (k <= 0) return null
  let arr = []
  let curr = root
  let stack = []
  while(curr || stack.length) {
    while(curr) {
      stack.push(curr)
      curr = curr.left
    }
    let last = stack.pop()
    if (arr.length + 1 >= k) {
      return last
    }
    arr.push(last)
    curr = last.right
  }
}
let searchTree = {
  val: 4,
  left: {
    val: 2,
    left: { val: 1 },
    right: { val: 3 }
  },
  right: {
    val: 6,
    left: { val: 5 },
    right: { val: 7 }
  },
}
console.log(
  '二叉搜索树 第k小节点',
  kthNode(searchTree, 6)
)

// 二叉树最大深度
function maxDepth(root) {
  let num = 0
  if (root) {
    let l = maxDepth(root.left)
    let r = maxDepth(root.right)
    num = Math.max(l, r) + 1
    // console.log(
    //   root.val,
    //   l,
    //   r,
    //   num,
    // )
  }
  return num
}
// 二叉树最小深度
function minDepth(root) {
  if (!root) return 0
  if (!root.left) {
    return 1 + minDepth(root.right)
  }
  if (!root.right) {
    return 1 + minDepth(root.left)
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}

let preArr = recursion('lt', bTree)
let vinArr = iter('ct', bTree)
let symTree = { val: '0', left: bTree }
symTree.right = toMirror(JSON.parse(JSON.stringify(bTree)))

console.log(
  preArr, 
  vinArr, 
  rebuildNode(preArr, vinArr),
)
console.log(
  'Mirror',
  symTree,
  isSymmetrical(symTree, symTree),
)
console.log(
  'maxDepth',
  maxDepth(bTree),
)
console.log(
  'minDepth',
  minDepth(bTree),
)
