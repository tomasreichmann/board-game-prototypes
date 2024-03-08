/*
This script batch downloads a list of songs as MP3s
1. Open https://www.tunemymusic.com/cs/transfer
2. Past a playlist of your choice
3. Select output as File - TXT
4. Open https://mp3-juices.nu/Bauq/
5. set your browser downloads to a specific folder and not ask about every file
6. Open browser console (F12)
7. Paste this script to the console
8. Paste the list of songs from the TXT file to the prompt
9. Press Enter
10. Observe your downloads folder to slowly fill with MP3s

You might need to allow the site to download multiple files in your site preferences or open links in tabs.
It works best if the songs are in this format "Artist - Song title" without too many artists and things in parentheses.
Create a bookmarklet for extra convenience: https://caiorss.github.io/bookmarklet-maker/
*/

(async () => {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function isResultLink() {
        const check = document.querySelector('#results [class="1"]') !== null;
        console.log("isResultLink", check);
        return check;
    }

    const checkInterval = (getCondition, resolve, reject, timeout = 10000, interval = 200, elapsed = 0) => {
        if (getCondition()) {
            resolve(elapsed);
            return;
        }
        if (elapsed + interval > timeout) {
            reject(elapsed);
            return;
        }
        setTimeout(() => checkInterval(getCondition, resolve, reject, timeout, interval, elapsed + interval), interval);
    };

    function isWaitingForResult() {
        return new Promise((resolve, reject) => {
            console.log("isWaitingForResult isResultLink: ", isResultLink());
            checkInterval(isResultLink, resolve, reject);
        });
    }

    const isDownloadLink = () => {
        const check = document.querySelector("#results .completed") !== null;
        console.log("isDownloadLink", check);
        return check;
    };

    function isWaitingForDownloadLink() {
        return new Promise((resolve, reject) => {
            checkInterval(isDownloadLink, resolve, reject);
        });
    }

    const clickResult = (index) => {
        const resultEl = document.querySelectorAll('#results [class="1"]')[index];
        if (!resultEl) {
            console.log("not found | results not present");
            if (retries === 0) {
                throw new Error("not found | no result link");
            }
        }
        console.log("Result download clicked. Waiting for download link");
        resultEl.click();
    };

    const waitForDownloadLink = async () => {
        return await isWaitingForDownloadLink().catch(async () => {
            await sleep(100);
            return isWaitingForDownloadLink().catch(async () => {
                await sleep(100);
                return isWaitingForDownloadLink().catch(() => true);
            });
        });
    };

    const parseUrl = async (song, retries = 0) => {
        const oldResults = document.getElementById("results");
        if (oldResults) {
            oldResults.id = "results_old";
            oldResults.style.margin = "auto";
            oldResults.style.opacity = "0.5";
        }

        console.log("-- Song:", song);
        const searchEl = document.getElementById("query");
        const normalizedSong = song.split("·")[0] + "-" + (song.split("-")[1] || "");
        searchEl.value = normalizedSong;

        await sleep(10);
        const submitEl = searchEl.parentNode.children[1];
        submitEl.click();
        await sleep(10);
        if (searchEl.value === "Please insert a valid query") {
            searchEl.value = song.replaceAll("(", " ").replaceAll(")", " ").slice(0, 40);
            // cut out everything between "·" and "-"
            searchEl.value = searchEl.value.split("·")[0] + "-" + (searchEl.value.split("-")[1] || "");
            submitEl.click();
        }

        await sleep(100);
        if (searchEl.value === "No results :(") {
            console.log("no results");
            return parseUrl(song, retries - 1);
        }
        await isWaitingForResult().catch(async () => {
            await sleep(100);
            return isWaitingForResult().catch(async () => {
                await sleep(100);
                return isWaitingForResult().catch(() => true);
            });
        });

        clickResult(0);

        await waitForDownloadLink().catch(async () => {
            clickResult(1);
            return waitForDownloadLink().catch(async () => {
                clickResult(2);
                return waitForDownloadLink().catch(() => true);
            });
        });

        const completedResult = document.querySelector("#results .completed");
        if (!completedResult) {
            console.log("not found | completed results not present");
            if (retries === 0) {
                throw new Error("not found | no completed result link");
            }
            return parseUrl(song, retries - 1);
        }
        completedResult.target = "_blank";
        completedResult.click();
        const url = completedResult.href;
        console.log("URL: ", url);
        return url;
    };

    const notFound = [];
    const songInput = prompt("Enter songs one per line");
    if (!songInput) {
        return;
    }
    const songs = songInput.split(/\n/);

    for (let index = 0; index < songs.length; index++) {
        const song = songs[index];
        const url = await parseUrl(song).catch((error) => {
            notFound.push(song);
            return undefined;
        });
        if (url) {
            window.open(url, "_blank");
        }
    }
    if (notFound.length > 0) {
        alert("Not Found:\n" + notFound.join(", "));
        console.log("Not Found:\n" + notFound.join("\n"));
    }
})();
