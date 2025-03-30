import type { Meta } from "@storybook/react";
import Table from ".";

const meta: Meta<typeof Table> = {
  title: "Component/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export function Default() {
  return (
    <Table.Container className="max-w-sm max-h-96">
      <Table striped bordered hover>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>Dessert (100g serving)</Table.HeaderCell>
            <Table.HeaderCell>Calories</Table.HeaderCell>
            <Table.HeaderCell>Fat (g)</Table.HeaderCell>
            <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
            <Table.HeaderCell sticky>Protein (g)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...Array(25).keys()].map((key) => (
            <Table.Row key={key}>
              <Table.DataCell>Frozen yoghurt</Table.DataCell>
              <Table.DataCell>159</Table.DataCell>
              <Table.DataCell>6</Table.DataCell>
              <Table.DataCell>24</Table.DataCell>
              <Table.DataCell sticky>4</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  );
}
export default meta;
