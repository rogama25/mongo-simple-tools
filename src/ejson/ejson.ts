import {EJSON} from "bson";

if (document.readyState !== "loading") {
    interactivity()
} else {
    document.addEventListener("DOMContentLoaded", interactivity)
}

function interactivity() {
    const ejsonToJsonButton = document.getElementById("ejson-to-json");
    if (ejsonToJsonButton) {
        ejsonToJsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            dst.value = JSON.stringify(EJSON.parse(src.value))
        }
    }

    const jsonToEjsonButton = document.getElementById("json-to-ejson");
    if (jsonToEjsonButton) {
        jsonToEjsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            dst.value = EJSON.stringify(JSON.parse(src.value))
        }
    }
}
