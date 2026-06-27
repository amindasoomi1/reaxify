import { sizeArgType } from "@/storybook/argTypes";
import { staticStoryParameters } from "@/storybook/parameters";
import type { Meta, StoryObj } from "@storybook/react";
import { Add, Profile } from "iconsax-react";
import Avatar from ".";
import Stack from "../Stack";

const meta = {
  title: "Component/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    size: "md",
  },
  argTypes: {
    size: sizeArgType,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ size }) => (
    <Stack wrap className="gap-6">
      <Avatar size={size}>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
        <Avatar.Badge className="bg-danger" />
      </Avatar>
      <Avatar size={size}>
        <Avatar.Fallback>
          <Profile color="currentColor" />
        </Avatar.Fallback>
      </Avatar>
      <Avatar size={size}>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/2.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
        <Avatar.Badge>
          <Add color="currentColor" />
        </Avatar.Badge>
      </Avatar>
      <Avatar.Group>
        <Avatar size={size}>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/women/3.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
        <Avatar size={size}>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/men/4.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>LR</Avatar.Fallback>
        </Avatar>
        <Avatar size={size}>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/women/5.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>ER</Avatar.Fallback>
        </Avatar>
        <Avatar size={size}>
          <Avatar.Count>+3</Avatar.Count>
        </Avatar>
      </Avatar.Group>
    </Stack>
  ),
};

export const Basic: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="gap-6">
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
        <Avatar.Badge className="bg-danger" />
      </Avatar>
      <Avatar>
        <Avatar.Fallback>
          <Profile color="currentColor" />
        </Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/2.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
        <Avatar.Badge>
          <Add color="currentColor" />
        </Avatar.Badge>
      </Avatar>
      <Avatar.Group>
        <Avatar>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/women/3.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/men/4.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>LR</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/women/5.jpg"
            alt="Reaxify Avatar"
          />
          <Avatar.Fallback>ER</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Count>+3</Avatar.Count>
        </Avatar>
      </Avatar.Group>
    </Stack>
  ),
};

export const Badge: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Avatar>
      <Avatar.Image
        src="https://randomuser.me/api/portraits/women/3.jpg"
        alt="Reaxify Avatar"
      />
      <Avatar.Fallback>CN</Avatar.Fallback>
      <Avatar.Badge />
    </Avatar>
  ),
};

export const BadgeWithIcon: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Avatar>
      <Avatar.Image
        src="https://randomuser.me/api/portraits/women/3.jpg"
        alt="Reaxify Avatar"
      />
      <Avatar.Fallback>CN</Avatar.Fallback>
      <Avatar.Badge className="bg-dark">
        <Add color="white" />
      </Avatar.Badge>
    </Avatar>
  ),
};

export const AvatarGroup: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Avatar.Group>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/3.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>LR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/5.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>
    </Avatar.Group>
  ),
};

export const AvatarGroupCount: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Avatar.Group>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/3.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>LR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/5.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Count>+4</Avatar.Count>
      </Avatar>
    </Avatar.Group>
  ),
};

export const AvatarGroupWithIcon: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Avatar.Group>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/3.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>LR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/5.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Count>
          <Add color="currentColor" />
        </Avatar.Count>
      </Avatar>
    </Avatar.Group>
  ),
};

export const Sizes: Story = {
  parameters: staticStoryParameters,
  render: () => (
    <Stack wrap className="items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/3.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/5.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
    </Stack>
  ),
};
