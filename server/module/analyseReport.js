import puppeteer from "puppeteer";
import Sentiment from "sentiment";

async function isValidTweetUrl(tweetUrl) {
  const tweetUrlPattern = /^https:\/\/twitter\.com\/\w+\/status\/\d+$/;
  return tweetUrlPattern.test(tweetUrl);
}

async function analyzeReport(tweetUrl) {
  if (!isValidTweetUrl(tweetUrl)) {
    console.error("Invalid tweet URL:", tweetUrl);
    return null;
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const sentiment = new Sentiment();

  try {
    await page.goto(tweetUrl, { waitUntil: "networkidle2", timeout: 0 });
    const isiTweet = await page.$eval(
      'div[data-testid="tweetText"]',
      (tweet) => tweet.textContent
    );

    // Analyze the tweet content for sentiment
    const analysis = sentiment.analyze(isiTweet);

    //--------------------------------------------------------------------

    const overallSentiment = analysis.score > 0 ? "Positive" : "Negative"; //Check back the logic

    // Determine the tweet category
    let tweetCategory = "Green";
    tweetCategory =
      analysis.score < 0
        ? "Red"
        : analysis.score > 0 && analysis.score <= 5
        ? "Yellow"
        : "Green";

    return {
      overallSentiment,
      tweetCategory,
    };
  } catch (error) {
    console.error("Error extracting or analyzing tweet content:", error);
    return null; // Handle the error as needed
  } finally {
    await browser.close();
  }
}

export default analyzeReport;
