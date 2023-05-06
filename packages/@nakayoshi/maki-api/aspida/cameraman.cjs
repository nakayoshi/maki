// Borrowed from https://github.com/aspida/openapi2aspida
module.exports = {
  input: "./src/infra/generated/cameraman",
  outputEachDir: false,
  openapi: { inputFile: require.resolve("@nakayoshi/maki-cameraman-spec") },
};
