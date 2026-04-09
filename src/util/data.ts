export const formatDate = (date: string) => {
  if (!date) return ""

  const [year, month, day] = date.split("-")

  const months: any = {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    "10": "OCT",
    "11": "NOV",
    "12": "DEC",
  }

  return `${day}-${months[month]}-${year}`
}