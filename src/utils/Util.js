export const randomInt=(n)=>{
  if (typeof(n)!=='number') {
    n = 10
  }
  n = parseInt(Math.abs(n))
  return Math.floor(Math.random()*n)
}

export const tuid=()=>{
  return `${Date.now()}${(new Array(6)).map(e=>randomInt()).join('')}`
}

export const rowsify=(arr, c)=>{
  if (Array.isArray(arr) && typeof(c)==='number' && c>0) {
    let r=0
    const rows = []
    arr.forEach((e,i)=>{
      if (!rows[r]) rows[r] = [e]
      else rows[r].push(e)
      if (i%c===c-1) r++
    })
    return rows
  }
  if (Array.isArray(arr)) return [arr]
  return [[]]
}

export const numberOfDigits=(n)=>{
  if (typeof(n)==='number') {
    return Math.floor(n).toString().length
  }
  return 0
}

export const isEmail=(v)=>{
  if (typeof(v)==='string'&&v.length>0) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(v.toLowerCase())
  }
  return false
}

export const urlify=(v)=>{
  if (typeof(v)==='string') {
    return encodeURIComponent(v.trim())
  }
  return '%20'
}
