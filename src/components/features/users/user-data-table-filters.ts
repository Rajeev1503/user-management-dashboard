import { FilterFn } from "@tanstack/react-table";
export const statusFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true; // no filter → show all
  const value = row.getValue<string>(columnId);
  return value === filterValue;
};

export const calendarFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  // filterValue is expected to be [from, to]
  if (!filterValue) return true;

  const [from, to] = filterValue as [Date | undefined, Date | undefined];

  // If neither bound is set, don't filter
  if (!from && !to) return true;

  const raw = row.getValue(columnId);

  if (!raw) return false;

  // Normalize row value to Date
  const value =
    raw instanceof Date ? raw : new Date(raw as string | number);

  if (Number.isNaN(value.getTime())) return false;

  const time = value.getTime();

  if (from && to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return time >= fromTime && time <= toTime;
  }

  if (from) {
    const fromTime = from.getTime();
    return time >= fromTime;
  }

  if (to) {
    const toTime = to.getTime();
    return time <= toTime;
  }

  return true;
};
