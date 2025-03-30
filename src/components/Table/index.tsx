import { ComponentProps, createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

type Bordered = boolean | "dashed" | "solid";
type TableContextType = {
  striped: boolean;
  bordered: Bordered;
  hover: boolean;
};
type TableContainerProps = ComponentProps<"div">;
type BaseTableProps = {
  striped?: boolean;
  bordered?: Bordered;
  hover?: boolean;
};
type TableProps = BaseTableProps &
  Omit<ComponentProps<"table">, keyof BaseTableProps>;
type BaseTableHeaderProps = { sticky?: boolean };
type TableHeaderProps = BaseTableHeaderProps &
  Omit<ComponentProps<"thead">, keyof BaseTableHeaderProps>;
type TableBodyProps = ComponentProps<"tbody">;
type TableRowProps = ComponentProps<"tr">;
type BaseTableHeaderCellProps = { sticky?: boolean };
type TableHeaderCellProps = BaseTableHeaderCellProps &
  Omit<ComponentProps<"th">, keyof BaseTableHeaderCellProps>;
type BaseTableDataCellProps = { sticky?: boolean };
type TableDataCellProps = BaseTableDataCellProps &
  Omit<ComponentProps<"td">, keyof BaseTableDataCellProps>;

const TableContext = createContext<TableContextType>({
  striped: false,
  bordered: false,
  hover: false,
});
function TableContainer({
  className,
  children,
  ...props
}: TableContainerProps) {
  return (
    <div className={twMerge("w-full overflow-auto", className)} {...props}>
      {children}
    </div>
  );
}
function Table({
  striped = false,
  bordered = false,
  hover = false,
  className,
  children,
  ...props
}: TableProps) {
  return (
    <table
      className={twMerge(
        "min-w-full border-collapse border-spacing-0",
        className
      )}
      {...props}
    >
      <TableContext.Provider value={{ bordered, hover, striped }}>
        {children}
      </TableContext.Provider>
    </table>
  );
}
function TableHeader({
  sticky = false,
  className,
  children,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      className={twMerge(
        sticky && "sticky top-0 left-0 right-0 z-[2]",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}
function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={twMerge("", className)} {...props}>
      {children}
    </tbody>
  );
}
function TableRow({ className, children, ...props }: TableRowProps) {
  const { bordered, hover, striped } = useContext(TableContext);
  const hasBordered = !!bordered;
  const isDashed = bordered === "dashed";
  const isSolid = bordered === "solid";
  return (
    <tr
      className={twMerge(
        "bg-white",
        hasBordered && "border-b border-solid",
        isDashed && "border-dashed",
        isSolid && "border-solid",
        hover && "transition-colors hover:bg-gray-200",
        striped && "even:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}
function TableHeaderCell({
  sticky = false,
  className,
  children,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={twMerge(
        "font-medium text-sm py-2 px-4 whitespace-nowrap text-center first:text-start last:text-end",
        sticky && "bg-inherit sticky end-0 z-[1]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}
function TableDataCell({
  sticky = false,
  className,
  children,
  ...props
}: TableDataCellProps) {
  return (
    <td
      className={twMerge(
        "font-normal text-sm py-2 px-4 whitespace-nowrap text-center first:text-start last:text-end",
        sticky && "bg-inherit sticky end-0 z-[1]",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

Table.Container = TableContainer;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.DataCell = TableDataCell;

export default Table;
