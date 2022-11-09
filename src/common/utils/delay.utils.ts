export const delayUtils = async (delay: number) => {
  // Имитация длительного запроса, чтобы на фронте показывать крутилку
  await new Promise((resolve) => setTimeout(resolve, delay));
};
