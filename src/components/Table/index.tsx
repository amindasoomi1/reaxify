import { useClasses } from "@/hooks";
import { useHotkey } from "@tanstack/react-hotkeys";
import {
  ComponentProps,
  createContext,
  MouseEvent,
  useCallback,
  useContext,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Bordered = boolean | "dashed" | "solid";
type TableContextType = {
  striped: boolean;
  bordered: Bordered;
  hover: boolean;
  disabled: boolean;
};
type TableContainerProps = ComponentProps<"div">;
type BaseTableProps = {
  striped?: boolean;
  bordered?: Bordered;
  hover?: boolean;
  disabled?: boolean;
};
type TableProps = BaseTableProps &
  Omit<ComponentProps<"table">, keyof BaseTableProps>;
type BaseTableHeaderProps = { sticky?: boolean };
type TableHeaderProps = BaseTableHeaderProps &
  Omit<ComponentProps<"thead">, keyof BaseTableHeaderProps>;
type TableBodyProps = ComponentProps<"tbody">;
type TableRowStateProps = {
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
};
type TableRowProps = TableRowStateProps &
  Omit<ComponentProps<"tr">, keyof TableRowStateProps>;
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
  disabled: false,
});
const TableHeaderContext = createContext(false);
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
  disabled = false,
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
      <TableContext.Provider value={{ bordered, hover, striped, disabled }}>
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
        sticky && "sticky top-0 left-0 right-0 z-2",
        sticky && classes?.sticky,
        className,
      )}
      {...props}
    >
      <TableHeaderContext.Provider value={true}>
        {children}
      </TableHeaderContext.Provider>
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
function TableRow({
  hover,
  active = false,
  disabled,
  className,
  children,
  tabIndex,
  onClick,
  ...props
}: TableRowProps) {
  const classes = useClasses((c) => c.table.row);
  const { bordered, hover: tableHover, striped, disabled: tableDisabled } =
    useContext(TableContext);
  const inHeader = useContext(TableHeaderContext);
  const rowRef = useRef<HTMLTableRowElement>(null);

  const isDisabled = disabled ?? tableDisabled;
  const isHoverable = (hover ?? tableHover) && !inHeader && !isDisabled;
  const isActive = active && !inHeader && !isDisabled;
  const hasBordered = !!bordered;
  const isDashed = bordered === "dashed";
  const isSolid = bordered === "solid";
  const hotkeyEnabled = isHoverable && !!onClick;

  const activate = useCallback(
    (event: KeyboardEvent) => {
      if (isDisabled || !onClick) return;
      onClick(event as unknown as MouseEvent<HTMLTableRowElement>);
    },
    [isDisabled, onClick],
  );

  useHotkey("Enter", activate, {
    target: rowRef,
    enabled: hotkeyEnabled,
    preventDefault: true,
  });

  useHotkey("Space", activate, {
    target: rowRef,
    enabled: hotkeyEnabled,
    preventDefault: true,
  });

  return (
    <tr
      ref={rowRef}
      data-name="table-row"
      tabIndex={tabIndex ?? (isHoverable ? 0 : undefined)}
      aria-disabled={isDisabled || undefined}
      aria-current={isActive ? "true" : undefined}
      className={twMerge(
        "bg-white",
        classes?.base,
        hasBordered && "border-b border-solid border-border",
        isDashed && "border-dashed",
        isSolid && "border-solid",
        hasBordered && classes?.bordered,
        isHoverable &&
          "cursor-pointer transition-colors hover:bg-gray-200 [user-select:none]",
        isHoverable && classes?.hover,
        striped && !inHeader && "even:bg-gray-100",
        striped && !inHeader && classes?.striped,
        isActive && "bg-primary/10 text-primary",
        isActive && classes?.active,
        isDisabled &&
          "opacity-75 cursor-not-allowed pointer-events-none select-none",
        isDisabled && classes?.disabled,
        className,
      )}
      onClick={isDisabled ? undefined : onClick}
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
