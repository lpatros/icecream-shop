export const partials = [
    "navbar",
    "footer"
]

const thisHtml = await fetch('/pages/404/index.html')

export const notFoundHtml = await thisHtml.text();