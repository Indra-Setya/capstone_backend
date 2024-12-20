const fs = require("fs");

const loadData = () => {
  const rawData = fs.readFileSync("data.json");
  return JSON.parse(rawData);
};

const filterAndPaginateData = (
  data,
  { page, size, category, keyword, sort }
) => {
  let filteredData = data;

  if (category) {
    filteredData = filteredData.filter(
      (item) =>
        item.Category && item.Category.toLowerCase() === category.toLowerCase()
    );
  }

  if (keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.Place_Name &&
        item.Place_Name.toLowerCase().includes(lowerCaseKeyword)
    );
  }

  if (sort === "rating") {
    filteredData.sort((a, b) => b.Rating - a.Rating);
  }

  const totalItems = filteredData.length;
  const start = (page - 1) * size;
  const end = start + size;
  const paginatedData = filteredData.slice(start, end);

  return { totalItems, paginatedData };
};

module.exports = { loadData, filterAndPaginateData };
