const zhNumberFormatter = new Intl.NumberFormat('zh-CN')

export function formatNumber(value: number) {
  return zhNumberFormatter.format(value)
}
