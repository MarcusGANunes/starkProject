const confirmFunction = async () => {
  const customerName = document.getElementById("name").value;
  const CNPJ = document.getElementById("CNPJ").value;
  const street = document.getElementById("street").value;
  const complement = document.getElementById("complement").value;
  const district = document.getElementById("district").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zipCode = document.getElementById("zipCode").value;
  const amount = document.getElementById("amount").value;
  const due = document.getElementById("due").value;

  const urlBase = 'https://sandbox.api.starkbank.com/v2'
  const url = urlBase + '/boleto'
  
  const payload = {
    amount: amount,
    name: customerName,
    taxId: CNPJ,
    streetLine1: street,
    streetLine2: complement,
    district: district,
    city: city,
    stateCode: state,
    zipCode: zipCode,
    due: due
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const boleto = await response.json();
      console.log(boleto);
    } else {
      console.log('Erro na chamada da API:', response.status);
    }
  } catch (error) {
    console.log('Erro na chamada da API:', error);
  }
};
