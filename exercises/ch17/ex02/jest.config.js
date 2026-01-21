export default {
  testEnvironment: "node",

  // Jest に .js を ESM として扱わせる
  extensionsToTreatAsEsm: [".js"],

  // Babel 等は使わない
  transform: {}
};
