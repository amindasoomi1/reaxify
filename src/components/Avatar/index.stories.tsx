import type { Meta } from "@storybook/react";
import { Add, Profile } from "iconsax-react";
import Avatar from ".";
import Stack from "../Stack";

const meta: Meta<typeof Avatar> = {
  title: "Component/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function Basic() {
  return (
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
  );
}

export function Badge() {
  return (
    <Avatar>
      <Avatar.Image
        src="https://randomuser.me/api/portraits/women/3.jpg"
        alt="Reaxify Avatar"
      />
      <Avatar.Fallback>CN</Avatar.Fallback>
      <Avatar.Badge />
    </Avatar>
  );
}
export function BadgeWithIcon() {
  return (
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
  );
}
export function AvatarGroup() {
  return (
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
  );
}
export function AvatarGroupCount() {
  return (
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
  );
}
export function AvatarGroupWithIcon() {
  return (
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
  );
}
export function Sizes() {
  return (
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
  );
}

export default meta;
