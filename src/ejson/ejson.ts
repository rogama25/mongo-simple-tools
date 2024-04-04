import {EJSON, ObjectId} from "bson";

if (document.readyState !== "loading") {
    interactivity()
} else {
    document.addEventListener("DOMContentLoaded", interactivity)
}

function replacer(key: string, obj: any) {
    if (obj.hasOwnProperty("$oid")) {
        return `ObjectId("${obj.$oid}")`
    }
    return obj
}

function replacerAfter(_match: string, p1: string) {
    return `ObjectId("${p1}")`
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
            const result = EJSON.stringify(EJSON.parse(src.value), replacer)
            dst.value = result.replaceAll(/"ObjectId\(\\"([a-f\d]{24})\\"\)"/gi, replacerAfter)
        }
    }
}
