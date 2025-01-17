export const generateId = (title: string) => {
  return title.toLowerCase().replace(/ /g, '-')
}
