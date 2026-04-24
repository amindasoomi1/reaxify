import type { Meta } from "@storybook/react";
import { Profile2User } from "iconsax-react";
import Avatar from ".";
import Stack from "../Stack";

const meta: Meta<typeof Avatar> = {
  title: "Component/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

// type Story = StoryObj<typeof meta>;
export function Default() {
  return (
    <Stack wrap className="gap-6">
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Profile2User color="currentColor" />
      </Avatar>
      <Avatar>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/men/2.jpg"
          alt="Reaxify Avatar"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
        <Avatar.Badge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <Avatar.Group className="grayscale">
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

// export function Sizes() {
//   return (
//     <Stack wrap className="items-center gap-4">
//       <Avatar. color="success" variant="solid" size="icon">
//         <Send2 color="currentColor" variant="Bold" />
//       </Avatar.>
//       <Avatar. color="success" variant="solid" size="sm">
//         Small
//       </Avatar.>
//       <Avatar. color="success" variant="solid" size="md">
//         Medium
//       </Avatar.>
//       <Avatar. color="success" variant="solid" size="lg">
//         Large
//       </Avatar.>
//     </Stack>
//   );
// }

export default meta;
