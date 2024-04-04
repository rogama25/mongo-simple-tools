import {EJSON, ObjectId} from "bson";

if (document.readyState !== "loading") {
    interactivity()
} else {
    document.addEventListener("DOMContentLoaded", interactivity)
}

function replacer(key: string, obj: any) {
    if (obj instanceof ObjectId) {
        return `ObjectId("${obj.toHexString()}")`
    }
    return obj
}

function interactivity() {
    const ejsonToJsonButton = document.getElementById("ejson-to-json");
    if (ejsonToJsonButton) {
        ejsonToJsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            const myString = src.value.replaceAll('ObjectId("', 'new ObjectId("')
            dst.value = JSON.stringify(eval(`(${myString})`))
        }
    }

    const jsonToEjsonButton = document.getElementById("json-to-ejson");
    if (jsonToEjsonButton) {
        jsonToEjsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            dst.value = JSON.stringify(EJSON.parse(src.value), replacer)
        }
    }
}
