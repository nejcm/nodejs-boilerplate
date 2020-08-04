module.exports = {
  '*.js': ['eslint', 'jest --findRelatedTests --collectCoverage=0'],
  '*.+(js|jsx|json|yml|yaml|ts|tsx|md|graphql|mdx)': ['prettier --write'],
};
