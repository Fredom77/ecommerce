import React from "react"
import PropTypes from "prop-types"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useNavigate } from "react-router-dom"
import { PAYPAL_ID } from "../../constants/env"

const PayPalPayment = ({ value, order }) => {
  const nav = useNavigate()
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_ID,
      }}
    >
      <PayPalButtons
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                },
                custom_id: order.id,
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((resp) => {
            if (resp.status === "COMPLETED") {
              nav("/pago-exitoso")
            } else {
              alert("Tu pago no se procesó. Intenta nuevamente.")
            }
          })
        }}
      />
    </PayPalScriptProvider>
  )
}

PayPalPayment.propTypes = {
  value: PropTypes.string.isRequired, // Si 'value' es un número, usa PropTypes.number
  order: PropTypes.shape({
    id: PropTypes.string.isRequired, // Si 'id' es un número, usa PropTypes.number
  }).isRequired,
}

export default PayPalPayment
