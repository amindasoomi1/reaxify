import { booleanArg } from "@/storybook/argTypes";
import { asStaticStory } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Table from ".";

const meta = {
  title: "Component/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    striped: true,
    bordered: true,
    hover: true,
    disabled: false,
  },
  argTypes: {
    striped: booleanArg("Alternating row background colors.", false),
    bordered: {
      description: "Adds borders to the table.",
      table: { defaultValue: { summary: "false" } },
      options: [true, false, "solid", "dashed"],
      control: { type: "select" },
    },
    hover: booleanArg("Highlights rows on hover.", false),
    disabled: booleanArg("Disables row interactions.", false),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Table.Container className="w-full max-h-96">
      <Table {...args}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Dessert (100g serving)</Table.HeaderCell>
            <Table.HeaderCell>Calories</Table.HeaderCell>
            <Table.HeaderCell>Fat (g)</Table.HeaderCell>
            <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
            <Table.HeaderCell sticky>Protein (g)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...Array(10).keys()].map((key) => (
            <Table.Row key={key}>
              <Table.DataCell>Frozen yoghurt</Table.DataCell>
              <Table.DataCell>159</Table.DataCell>
              <Table.DataCell>6</Table.DataCell>
              <Table.DataCell>24</Table.DataCell>
              <Table.DataCell>4</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  ),
};

export const Default = asStaticStory(() => (
    <Table.Container className="w-full max-h-96">
      <Table striped bordered hover>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Dessert (100g serving)</Table.HeaderCell>
            <Table.HeaderCell>Calories</Table.HeaderCell>
            <Table.HeaderCell>Fat (g)</Table.HeaderCell>
            <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
            <Table.HeaderCell sticky>Protein (g)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[...Array(10).keys()].map((key) => (
            <Table.Row key={key}>
              <Table.DataCell>Frozen yoghurt</Table.DataCell>
              <Table.DataCell>159</Table.DataCell>
              <Table.DataCell>6</Table.DataCell>
              <Table.DataCell>24</Table.DataCell>
              <Table.DataCell>4</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  ));

export const Interactive = asStaticStory(function Interactive() {
    const [activeId, setActiveId] = useState(1);

    const rows = [
      {
        id: 1,
        name: "Active row (click to select)",
        note: "active + hover inherited",
        onClick: () => setActiveId(1),
      },
      {
        id: 2,
        name: "Clickable row",
        note: "hover from Table",
        onClick: () => setActiveId(2),
      },
      {
        id: 3,
        name: "No hover override",
        note: "hover={false}",
        hover: false as const,
        onClick: () => {},
      },
      {
        id: 4,
        name: "Disabled row",
        note: "disabled",
        disabled: true as const,
        onClick: () => {},
      },
      {
        id: 5,
        name: "Display only",
        note: "no onClick",
      },
    ];

    return (
      <Table.Container className="w-full max-h-96">
        <Table striped bordered hover>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Note</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row
                key={row.id}
                active={activeId === row.id}
                hover={row.hover}
                disabled={row.disabled}
                onClick={row.onClick}
              >
                <Table.DataCell>{row.name}</Table.DataCell>
                <Table.DataCell>{row.note}</Table.DataCell>
                <Table.DataCell>6</Table.DataCell>
                <Table.DataCell>24</Table.DataCell>
                <Table.DataCell>4</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Container>
    );
  });