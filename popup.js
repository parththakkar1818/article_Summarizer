document.addEventListener("DOMContentLoaded", function () {
  const summarizeButton = document.getElementById("summarizeButton");
  const summaryDiv = document.getElementById("summary");
  const loadingDiv = document.getElementById("loading");

  summarizeButton.addEventListener("click", async function () {
    loadingDiv.innerHTML = '<div class="loading"></div>';
    summaryDiv.textContent = "";

    // Chrome
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const currentTab = tabs[0];

        if (currentTab.url) {
          const apiUrl =
            "https://article-extractor-and-summarizer.p.rapidapi.com/summarize";
          const apiKey = "705f5165e0msh5556e8f0470e3cdp165892jsna699bd4288e1";

          try {
            const response = await fetch(
              apiUrl +
                "?url=" +
                encodeURIComponent(currentTab.url) +
                "&length=3",
              {
                method: "GET",
                headers: {
                  "X-RapidAPI-Key": apiKey,
                  "X-RapidAPI-Host":
                    "article-extractor-and-summarizer.p.rapidapi.com",
                },
              }
            );

            const data = await response.json();
            if (data.error) {
              summaryDiv.textContent = "An error occurred: " + data.error;
              summaryDiv.style.color = "red";
            } else {
              summaryDiv.textContent = data.summary;
              summaryDiv.style.color = "black";
            }
          } catch (error) {
            console.error(error);
            summaryDiv.textContent = "Error summarizing article.";
            summaryDiv.style.color = "red";
          } finally {
            loadingDiv.innerHTML = "";
            summaryDiv.style.display = "block"; // Show the summary box
          }
        }
      }
    );
  });
});
