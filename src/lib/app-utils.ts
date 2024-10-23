export const getAbbreviation = (text: string): string => {
  if (!text) return "";

  return (
    text
      ?.match(/[\p{Alpha}\p{Nd}]+/gu)
      ?.reduce((previous, next) => previous + next[0], "")
      .toUpperCase() || ""
  );
};
