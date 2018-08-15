export const combinations=(list,n)=>{
  if (n>list.length)
    return []

  if (n === list.length)
    return [list]

  const combs = []
  if (n===1) {
    for (let i=0; i<list.length; i++) {
      combs.push([list[i]])
    }
    return combs
  }

  let h
  let t
  for (let i=0; i<list.length-n+1; i++) {
    h = list.slice(i, i + 1)
    t = combinations(list.slice(i + 1), n - 1)
    for (let j=0; j<t.length; j++) {
      combs.push(h.concat(t[j]))
    }
  }
  return combs
}

export const isInline=(p)=>{
  return [ p[0].x*(p[1].y-p[2].y) + p[1].x*(p[2].y-p[0].y) + p[2].x*(p[0].y-p[1].y) ]/2 === 0
}

export const isWinning=(marked)=>{
  const combs = combinations(marked, 3)
  const win = combs.some(c=>{
    return isInline(c)
  })
  return win
}
