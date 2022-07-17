export type Data = {
  project_name: string
  departments: string
  amount: string
  date: string
  member_name: string
}

export type SortKeys = keyof Data
export type SortOrder = "ascn" | "desc"

export type TypeValue = {
  data: Data[]
}

export type OptionContextType = {
  option: string
  setOption?: (option: string) => void | undefined
}
