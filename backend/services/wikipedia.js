import axios from "axios";

export async function fetchWikipediaSummary(name) {
  const wikipediaSlug = name.trim().replace(/\s+/g, "_");
  const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaSlug}`;
  let wikipediaSummary = "";

  try {
    const wikiResponse = await axios.get(wikipediaUrl);
    wikipediaSummary =
      wikiResponse.data.extract || "No Wikipedia summary found.";
  } catch (error) {
    console.warn(
      "Wikipedia page not found. Continuing without Wikipedia data."
    );
    wikipediaSummary = "No Wikipedia summary found.";
  }
  return wikipediaSummary;
}
