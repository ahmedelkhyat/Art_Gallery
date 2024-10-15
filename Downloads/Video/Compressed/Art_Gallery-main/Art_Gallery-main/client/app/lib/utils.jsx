export const formatTitle = (title) => {
  const formatedTitle = title.length > 20 ? title.slice(0, 25) : title;
  return `${formatedTitle}...`;
};
