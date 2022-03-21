import axios from "axios";

const getProducts = async () => {
  const res = await axios
    .get("https://static.pxl.ai/problem/data/products.json")
    .then((res) => res.data);
  return res;
};

const getRegions = async () => {
  const res = await axios
    .get("https://static.pxl.ai/problem/data/regions.json")
    .then((res) => res.data);
  return res;
};

export { getProducts, getRegions };
