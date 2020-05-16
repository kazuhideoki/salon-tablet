import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { checkImg, removeImg } from "../app/Setting/QuillEditor";

const delta = {
  ops: [
    {
      attributes: {
        color: "#ffebcc",
        bold: true,
      },
      insert: "d",
    },
    {
      insert: "\n\n",
    },
    {
      insert: {
        image:
          "data:image/jpeg;bas/9k=",
      },
    },
    {
      insert: "\n",
    },
    {
      attributes: {
        color: "#ffebcc",
      },
      insert: "dfsaa",
    },
    {
      insert: "\n",
    },
  ],
};
const delta2 = {ops: [
    {
      retain: 5,
    },
    {
      insert: {
        notImg: 'no ima',
      },
    },
  ],
}
test("checkImg", () => {
  const { result } = renderHook(() => React.useState(false));

  expect(result.current[0]).toBe(false);

  // imageがある
  act(() => {
    //@ts-ignore
    checkImg(delta, result.current[1], removeImg);
  });
  expect(result.current[0]).toBe(true);

  // imageがない
  act(() => {
    //@ts-ignore
    checkImg(delta2, result.current[1], removeImg);
  });
  expect(result.current[0]).toBe(false);
});
