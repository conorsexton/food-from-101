import { UNITS } from "./constants"
export const normalizeUnit = (unit, quantity = "1") => {
  if (!unit) return ""
  const parseQuantity = quantity => {
    const rangePattern = /\d\s?[-–—]{1,2}\s?\d/
    // If quantity is a range, parse upper bound
    const maxAmount = rangePattern.test(quantity)
      ? quantity.split(/[-–—]{1,2}/)[1]
      : quantity
    return parseFloat(maxAmount)
  }
  const parsedQuantity = parseQuantity(quantity)
  const pluralRule = new Intl.PluralRules("en-US").select(
    parsedQuantity < 1 ? 1 : parsedQuantity
  )
  return (UNITS[unit] && UNITS[unit][pluralRule]) || unit
}
