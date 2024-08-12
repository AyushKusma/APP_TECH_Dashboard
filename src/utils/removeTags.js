import { load } from "cheerio";
// Function to remove tags
export default removeTags = (content) => {
  const $ = load(content || "");
  return $("body").text();
};
