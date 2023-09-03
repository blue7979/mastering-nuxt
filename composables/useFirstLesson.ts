export default () => {
  const { chapters } = useCourse();
  return chapters[0].lesson[0];
};
