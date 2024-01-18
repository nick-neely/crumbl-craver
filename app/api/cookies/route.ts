import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function GET(req: NextRequest) {
  const { data } = await axios.get("https://crumblcookies.com/");
  const $ = cheerio.load(data);
  const flavors = $("#weekly-cookie-flavors li");
  const cookies = flavors
    .map((_, el: cheerio.Element) => {
      const name = $(el).find("h3").text().trim();
      const description = $(el).find("p").text().trim();
      const imageUrl = $(el).find("img").attr("src");
      const calories = $(el).find("span").text().trim(); // Extract calories
      return { name, description, imageUrl, calories }; // Include calories in the returned object
    })
    .get();

  // Use NextResponse to create the response
  return NextResponse.json(cookies);
}
