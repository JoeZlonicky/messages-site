/** @type {import("prettier").Config} */
export default {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: true,
  trailingComma: 'all',
  importOrderSortSpecifiers: true,
};
