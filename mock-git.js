// Mock replacement for @napi-rs/simple-git to prevent native binding issues
module.exports = {
  getCommitDate: () => null,
  getLastCommitDate: () => null,
  getGitTimestamp: () => null,
  getCommitInfo: () => null,
  // Add any other methods that might be called
  default: {},
};
