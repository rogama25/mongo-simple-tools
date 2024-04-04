import {EJSON, ObjectId} from "bson";

if (document.readyState !== "loading") {
    interactivity()
} else {
    document.addEventListener("DOMContentLoaded", interactivity)
}

function replacer(key: string) {
}

function interactivity() {
    const ejsonToJsonButton = document.getElementById("ejson-to-json");
    if (ejsonToJsonButton) {
        ejsonToJsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            const myString = src.value.replaceAll('ObjectId("', 'new ObjectId("')
            dst.value = EJSON.stringify(eval(`(${myString})`))
        }
    }

    const jsonToEjsonButton = document.getElementById("json-to-ejson");
    if (jsonToEjsonButton) {
        jsonToEjsonButton.onclick = async () => {
            const src = document.getElementById("src") as HTMLTextAreaElement;
            const dst = document.getElementById("dst") as HTMLTextAreaElement;
            const parsed = EJSON.parse(src.value)
            const result = {
                ...parsed,
                toJSON(key: string) {
                    const obj = this.key
                    if (obj instanceof ObjectId) {
                        return `ObjectId("${obj.toHexString()}")`
                    }
                    return obj
                }
            }
            dst.value = JSON.stringify(result)
        }
    }
}
