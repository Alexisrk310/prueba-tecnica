import React from 'react'

export const getSchedules = async () => {
    const response = await fetch("https://luegopago.blob.core.windows.net/luegopago-uploads/Pruebas%20LuegoPago/data.json")
    const data = await response.json()
    return data;


}
