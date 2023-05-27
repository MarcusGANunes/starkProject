let fields = {
    slackAccounts: [],
    cnpjs: []
}

const confirmFunction = () =>{
    const slackAccountValue = document.getElementById("slackAccount-input").value
    const CNPJvalue = document.getElementById("CNPJ-input").value

    fields.slackAccounts.push(slackAccountValue)
    fields.cnpjs.push(CNPJvalue)

    console.log(fields)
}