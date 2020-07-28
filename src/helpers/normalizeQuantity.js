export const normalizeQuantity = quantity => {
  if (!quantity) return ""
  const numbersInRange = quantity.split(/\s?[-–—]\s?/)
  const normalizedNumbersInRange = numbersInRange.map(number => {
    const decimal = number.split(".")[1]
    let fraction
    switch (decimal) {
      case "25":
        fraction = "¼"
        break
      case "5":
        fraction = "½"
        break
      case "75":
        fraction = "¾"
        break
      case "33":
        fraction = "⅓"
        break
      case "66":
        fraction = "⅔"
        break
      case "125":
        fraction = "⅛"
        break
      default:
        fraction = ""
        break
    }
    return `${
      number.split(".")[0] === "0" ? "" : number.split(".")[0]
    }${fraction}`
  })
  return normalizedNumbersInRange.join(" – ")
}
