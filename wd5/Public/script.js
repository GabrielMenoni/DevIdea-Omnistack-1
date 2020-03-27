function onoff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("HideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("AddScroll")
}

function checkfields(event) {

    const ValuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link"
    ]

    const IsEmpty = ValuesToCheck.find(function(value){

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if (IsEmpty) {
        event.preventDefault()
        alert("Por favor, preencha os campos corretamente.")
    }
}