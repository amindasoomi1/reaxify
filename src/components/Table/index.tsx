import { useClasses } from "@/hooks";
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
  const classes = useClasses((c) => c.table.container.base);
  return (
    <div
      data-name="table-container"
      className={twMerge("w-full overflow-auto", classes, className)}
      {...props}
    >
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
  const classes = useClasses((c) => c.table.base);
  return (
    <table
      data-name="table"
      className={twMerge(
        "min-w-full border-collapse border-spacing-0",
        classes,
        className,
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
  const classes = useClasses((c) => c.table.header);
  return (
    <thead
      data-name="table-header"
      className={twMerge(
        classes?.base,
        sticky && "sticky top-0 left-0 right-0 z-[2]",
        sticky && classes?.sticky,
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  );
}
function TableBody({ className, children, ...props }: TableBodyProps) {
  const classes = useClasses((c) => c.table.body.base);
  return (
    <tbody
      data-name="table-body"
      className={twMerge(classes, className)}
      {...props}
    >
      {children}
    </tbody>
  );
}
function TableRow({ className, children, ...props }: TableRowProps) {
  const classes = useClasses((c) => c.table.row);
  const { bordered, hover, striped } = useContext(TableContext);
  const hasBordered = !!bordered;
  const isDashed = bordered === "dashed";
  const isSolid = bordered === "solid";
  return (
    <tr
      data-name="table-row"
      className={twMerge(
        "bg-white",
        classes?.base,
        hasBordered && "border-b border-solid border-border",
        isDashed && "border-dashed",
        isSolid && "border-solid",
        hasBordered && classes?.bordered,
        hover && "cursor-pointer transition-colors hover:bg-gray-200",
        hover && classes?.hover,
        striped && "even:bg-gray-100",
        striped && classes?.hover,
        className,
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
      data-name="table-header-cell"
      className={twMerge(
        "font-medium text-sm py-2 px-4 whitespace-nowrap text-center first:text-start last:text-end",
        sticky && "bg-inherit sticky inset-e-0 z-1",
        className,
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
      data-name="table-data-cell"
      className={twMerge(
        "font-normal text-sm py-2 px-4 whitespace-nowrap text-center first:text-start last:text-end",
        sticky && "bg-inherit sticky inset-e-0 z-1",
        className,
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
