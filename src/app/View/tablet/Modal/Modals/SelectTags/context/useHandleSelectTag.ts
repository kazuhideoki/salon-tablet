import { T_tag_id } from "../../../../../../Store/Types";

export const useHandleSelectTag = (selectingTags: number[], setSelectingTags: React.Dispatch<React.SetStateAction<number[]>>
) => {
  return (tagId: T_tag_id) => {
    let newValue;

    if (selectingTags.includes(tagId)) {
      newValue = selectingTags.filter((value) => {
        return value !== tagId;
      });
    } else {
      newValue = selectingTags.concat(tagId);
    }

    setSelectingTags(newValue);
  };
}