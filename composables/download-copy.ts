// downloads timelines.json
export function download(Download: string, type = "text/plain") {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    a.href = window.URL.createObjectURL(
        new Blob([Download], { type })
    );

    a.setAttribute("download", "timelines.json");

    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

export function copy(Download: string) {
    navigator.clipboard.writeText(Download);
}