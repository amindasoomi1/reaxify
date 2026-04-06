import type { Meta } from "@storybook/react";
import { useState } from "react";
import {
  cn,
  copy,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isEmptyValue,
  randomID,
  replaceNonDigits,
  scrollIntoView,
  twoDigitNumber,
  wait,
} from ".";
import { Button, Stack, Typography } from "../components";

const meta: Meta = {
  title: "Helpers",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export function ClassName() {
  return (
    <Typography>
      cn: {String(cn("border-primary", false, undefined, null, ""))}
    </Typography>
  );
}
export function Copy() {
  const handleClick = () => {
    copy("Copy this text")
      .then(() => {
        alert("success");
      })
      .catch(() => {
        alert("failed");
      });
  };
  return (
    <Stack className="gap-4">
      <Button type="button" onClick={handleClick}>
        Copy this text
      </Button>
      <input
        type="text"
        className="flex-1 h-10 border border-[#e8eaee] rounded px-4"
        placeholder="Paste here"
      />
    </Stack>
  );
}
export function IsEmpty() {
  return (
    <Stack variant="vertical" className="gap-4">
      <Typography>
        isEmpty({`null`}): {String(isEmpty(null))}
      </Typography>
      <Typography>
        isEmpty({`[]`}): {String(isEmpty([]))}
      </Typography>
      <Typography>
        isEmpty({`{}`}): {String(isEmpty({}))}
      </Typography>
      <Typography>
        isEmpty({`""`}): {String(isEmpty(""))}
      </Typography>
      <Typography>
        isEmptyArray({`[]`}): {String(isEmptyArray([]))}
      </Typography>
      <Typography>
        isEmptyObject({`{}`}): {String(isEmptyObject({}))}
      </Typography>
      <Typography>
        isEmptyString({`""`}): {String(isEmptyString(""))}
      </Typography>
      <Typography>
        isEmptyValue({`null`}): {String(isEmptyValue(null))}
      </Typography>
    </Stack>
  );
}
export function RandomID() {
  const [id, setID] = useState("");
  return (
    <Button type="button" onClick={() => setID(randomID())}>
      {!id ? "Click to generate id" : `id is: ${id}`}
    </Button>
  );
}
export function ReplaceNonDigits() {
  const str = "abcd1ABCD.EFGH125efgh";
  return (
    <Typography>
      {str} {`=>`} {replaceNonDigits(str)}
    </Typography>
  );
}
export function TwoDigitNumber() {
  return (
    <Stack variant="vertical" className="gap-4">
      <Typography>
        0 {`=>`} {twoDigitNumber(0)}
      </Typography>
      <Typography>
        5 {`=>`} {twoDigitNumber(5)}
      </Typography>
      <Typography>
        10 {`=>`} {twoDigitNumber(10)}
      </Typography>
      <Typography>
        20 {`=>`} {twoDigitNumber(20)}
      </Typography>
    </Stack>
  );
}
export function Wait() {
  const handleClick = async () => {
    await wait(2500);
    alert("Some thing...");
  };
  return (
    <Button type="button" onClick={handleClick}>
      Click me!
    </Button>
  );
}
export function ScrollIntoView() {
  const handleClick = () => {
    scrollIntoView("#element");
  };
  return (
    <Stack variant="vertical" className="gap-4 items-start">
      <Button type="button" onClick={handleClick}>
        Scroll to element
      </Button>
      {[...Array(50).keys()].map((key) => {
        const isActive = key === 30;
        return (
          <Typography
            key={key}
            id={isActive ? "element" : undefined}
            className={cn(isActive && "underline font-bold")}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            commodi sunt perspiciatis id, culpa tenetur officia! Est molestias,
            deserunt aut illo delectus vel accusamus perferendis ex, quo
            doloremque recusandae rerum!
          </Typography>
        );
      })}
    </Stack>
  );
}

export default meta;
