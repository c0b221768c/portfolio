type DatePart =
  | 'yyyy'          // 年（4桁）
  | 'yy'         // 年（2桁）
  | 'm'          // 月（数値）
  | 'mm'         // 月（ゼロ埋め）
  | 'monthName'  // Jan, Feb, ...
  | 'd'          // 日（数値）
  | 'dd'         // 日（ゼロ埋め）
  | 'h'          // 時（数値）
  | 'hh'         // 時（ゼロ埋め）
  | 's'          // 秒（数値）
  | 'ss'         // 秒（ゼロ埋め');

interface FormatOptions {
  monthFormat?: 'short' | 'long'; // "Jun" or "June"
  padZero?: boolean;              // trueでゼロ埋め
}

export function formatDateParts(
  date: Date,
  parts: DatePart[],
  options: FormatOptions = {}
): string[] {
  const { monthFormat = 'short', padZero = true } = options

  const pad = (num: number) => (padZero && num < 10 ? `0${num}` : `${num}`)

  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const monthNamesLong = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"]

  return parts.map(part => {
    switch (part) {
      case 'yyyy': return `${date.getFullYear()}`
      case 'yy': return `${date.getFullYear()}`.slice(-2)
      case 'm': return `${date.getMonth() + 1}`
      case 'mm': return pad(date.getMonth() + 1)
      case 'monthName':
        return monthFormat === 'long'
          ? monthNamesLong[date.getMonth()]
          : monthNamesShort[date.getMonth()]
      case 'd': return `${date.getDate()}`
      case 'dd': return pad(date.getDate())
      case 'h': return `${date.getHours()}`
      case 'hh': return pad(date.getHours())
      case 's': return `${date.getSeconds()}`
      case 'ss': return pad(date.getSeconds())
      default: return ''
    }
  })
}
