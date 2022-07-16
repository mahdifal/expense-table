import { SortKeys } from "types";

export const headers: { key: SortKeys; label: string }[] = [
  { key: "project_name", label: "Project Name" },
  { key: "departments", label: "Departments" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Date" },
  { key: "member_name", label: "Member Name" },
];

export const dropdownItems: { [name: string]: string }[] = [
  { key: "", label: "choose option" },
  { key: "project_name", label: "Project Name" },
  { key: "departments", label: "Departments" },
  { key: "date", label: "Date" },
  { key: "member_name", label: "Member Name" },
];
