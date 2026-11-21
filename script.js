
// Translation Function
async function translateText() {

    const inputText = document.getElementById("inputText").value;
    const sourceLanguage = document.getElementById("sourceLanguage").value;
    const targetLanguage = document.getElementById("targetLanguage").value;

    const outputText = document.getElementById("outputText");
    const message = document.getElementById("message");

    // Check empty input
    if (inputText.trim() === "") {
        message.innerText = "Please enter some text!";
        return;
    }

    // Check text size
    if (new TextEncoder().encode(inputText).length > 500) {
        message.innerText = "Please enter shorter text (maximum 500 bytes).";
        return;
    }

    // Check same languages
    if (sourceLanguage === targetLanguage) {
        outputText.value = inputText;
        message.innerText = "Both languages are the same.";
        return;
    }

    try {

        message.innerText = "Translating...";
        outputText.value = "";

        // Create API URL
        const url = new URL(
            "https://api.mymemory.translated.net/get"
        );

        url.searchParams.set("q", inputText);
        url.searchParams.set(
            "langpair",
            sourceLanguage + "|" + targetLanguage
        );

        // Send request to Translation API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        // Get API response
        const data = await response.json();

        if (data.responseStatus !== 200) {
            throw new Error(
                data.responseDetails || "Translation failed"
            );
        }

        // Display translated text
        outputText.value = data.responseData.translatedText;

        message.innerText = "Translation successful!";

    } catch (error) {

        message.innerText = "Error: " + error.message;

    }
}


// Copy Translation Function
function copyText() {

    const outputText = document.getElementById("outputText");
    const message = document.getElementById("message");

    if (outputText.value.trim() === "") {
        message.innerText = "No translation to copy!";
        return;
    }

    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            message.innerText = "Translation copied!";
        })
        .catch(() => {
            message.innerText = "Unable to copy text.";
        });
}

function swapLanguages() {

    const source = document.getElementById("sourceLanguage");
    const target = document.getElementById("targetLanguage");

    const temp = source.value;

    source.value = target.value;
    target.value = temp;
}
