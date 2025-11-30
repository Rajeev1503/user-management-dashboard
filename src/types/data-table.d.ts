import type { RowData } from "@tanstack/react-table";

type TextFilterConfig = {
  filterVariant?: "text";
};

type RangeFilterConfig = {
  filterVariant: "range";
  min?: number;
  max?: number;
};

type SelectFilterConfig<TValue> = {
  filterVariant: "select";
  options: Array<{
    label: string;
    value: TValue;
  }>;
  multiple?: boolean;
};

type DateFilterMode = "static" | "range";

type StaticDateFilterConfig = {
  filterVariant: "Date";
  mode: "static";
  defaultValue?: Date;
};

type RangeDateFilterConfig = {
  filterVariant: "Date";
  mode: "range";
  minYear?: number;
  maxYear?: number;
};

// type DateFilterConfig = StaticDateFilterConfig | RangeDateFilterConfig;

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    // merge your union into the existing meta
    filterVariant?: "text" | "range" | "select" | "date";

    // now add variant-specific fields:
    // range
    minRange?: number;
    maxRange?: number;

    // select
    options?: Array<{
      label: string;
      value: string;
    }>;
    multiple?: boolean;

    // date
    minYear?: number;
    maxYear?: number;
    defaultValue?: Date;
  }
}

