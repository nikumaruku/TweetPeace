import puppeteer from "puppeteer";
import Sentiment from "sentiment";

async function isValidTweetUrl(tweetUrl) {
  const tweetUrlPattern = /^https:\/\/twitter\.com\/\w+\/status\/\d+$/;
  return tweetUrlPattern.test(tweetUrl);
}

async function analyzeTweetContent(tweetUrl) {
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

    const analysis = sentiment.analyze(isiTweet);

    const overallSentiment = analysis.comparative > 0 ? "Positive" : "Negative"; //Check back the logic

    let tweetCategory = "Green";
    tweetCategory =
      analysis.comparative < 0
        ? "Red"
        : analysis.comparative > 0 && analysis.comparative <= 0.1
        ? "Yellow"
        : "Green";

    const words = isiTweet.split(/\s+/);
    let negativeWordCount = 0;
    const badWords = {};

    words.forEach((word) => {
      const wordAnalysis = sentiment.analyze(word);
      if (wordAnalysis.score < 0) {
        negativeWordCount++;
        if (badWords[word]) {
          badWords[word]++;
        } else {
          badWords[word] = 1;
        }
      }
    });

    return {
      ...analysis,
      overallSentiment,
      isiTweet,
      tweetCategory,
      negativeWordCount,
      badWords: Object.entries(badWords).map(([word, count]) => ({
        word,
        count,
      })),
    };
  } catch (error) {
    console.error("Error extracting or analyzing tweet content:", error);
    return null; 
  } finally {
    await browser.close();
  }
}

export default analyzeTweetContent;
