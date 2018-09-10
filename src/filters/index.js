const moment = require('moment')
export function cutWords(str, length) {
    let newStr = "";
    if (str.length > length) {
        newStr = str.substring(0, length) + '...'
    } else {
        newStr = str;
    }
    return newStr;
}
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  return moment(time).format(cFormat)
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function parseStatus(str) {
  const statusMap = {pending:'审核中',normal:'正常',lock:'锁定'}
  return statusMap[str]||str
}

export function parseByOptions(key,options){
  if(options){
    let option = options.find(v=>v.value === key)
    return option?option.label:key
  }
  return key
}
export function status(key,options){
  options = options||[{label:'正常',value:'normal'},{label:'锁定',value:'lock'},{label:'新建',value:'new'}]
  let option = options.find(v=>v.value === key)
  return option?option.label:key
}

export function number(key,len=6){
  return parseInt(key * Math.pow(10,len)) /  Math.pow(10,len)
}

export function parseObj(key,objKey){
  if(key instanceof Object && objKey){
    return key[objKey]
  }else{
    return key
  }
}

export function isSystemCost(key,) {
  console.log('aaa')
  let systemPayTrType = ['SystemReward','LinkBaseReward','LinkHigherReward','SystemDividend','WorkerEarn'],
      systemIncome = ['SystemDeduction','SystemWithdraw','UserPay']
  if(systemPayTrType.find(key))return true
  return false
}