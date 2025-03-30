import type { Meta } from "@storybook/react";
import {
  Table,
  TableBody,
  TableContainer,
  TableDataCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from ".";

const meta: Meta<typeof Table> = {
  title: "Component/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <TableContainer className="max-w-sm max-h-96">
      <Table striped bordered hover>
        <TableHeader sticky>
          <TableRow>
            <TableHeaderCell>Dessert (100g serving)</TableHeaderCell>
            <TableHeaderCell>Calories</TableHeaderCell>
            <TableHeaderCell>Fat (g)</TableHeaderCell>
            <TableHeaderCell>Carbs (g)</TableHeaderCell>
            <TableHeaderCell sticky>Protein (g)</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(25).keys()].map((key) => (
            <TableRow key={key}>
              <TableDataCell>Frozen yoghurt</TableDataCell>
              <TableDataCell>159</TableDataCell>
              <TableDataCell>6</TableDataCell>
              <TableDataCell>24</TableDataCell>
              <TableDataCell sticky>4</TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default meta;
