import axios from "axios"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../../constants/env"
import { CartContext } from "../../context/CartContext"
import { token } from "../../helpers/auth"
import SummaryItem from "../atoms/SummaryItem"
import PayPalPayment from "../organisms/PayPalPayment"
import React from "react"

function Cart() {
  const { state } = useContext(CartContext)
  const [order, setOrder] = useState()
  const [error, setError] = useState(null)

  let value = 0
  state.cart.forEach((c) => (value += c.price))

  const handleOrder = () => {
    const products = state.cart.map((p) => ({
      product_id: p.id,
      amount: 1,
      unit_price: p.price,
    }))

    const data = { products }

    console.log("Request data:", data)

    axios
      .post(`${API_URL}/private/purchase-orders`, data, {
        headers: {
          Authorization: `Bearer ${token()}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("Response data:", resp.data)
        setOrder(resp.data.data)
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to create order:", err)
        if (err.response) {
          console.error("Response error data:", err.response.data)
        }
        if (err.response && err.response.data && err.response.data.errors) {
          setError(
            `Failed to create order: ${err.response.data.errors.join(", ")}`
          )
        } else {
          setError("Failed to create order. Please try again.")
        }
      })
  }

  return (
    <div className="max-w-256 m-auto">
      <div className="grid grid-cols-3 gap-8 mb-16">
        <section className="col-span-2 pt-10">
          <h1 className="text-3xl font-semibold mb-6">Carrito de compras</h1>
          {state?.cart?.length > 0 ? (
            <div>
              <div className="grid mb-2 border-t border-gray-300/60">
                {state.cart.map((prod) => (
                  <SummaryItem key={prod.id} product={prod} />
                ))}
              </div>
              {!order ? (
                <>
                  <button className="bg-gradient" onClick={handleOrder}>
                    CREAR ORDEN
                  </button>
                  {error && <p className="text-red-500">{error}</p>}
                </>
              ) : (
                <>
                  <p>ID de la ORDEN de COMPRA: {order.id}</p>
                  <PayPalPayment value={value} order={order} />
                </>
              )}
            </div>
          ) : (
            <>
              <p className="mb-2">Tu carrito está vacío</p>
              <Link to="/productos" className="button bg-gradient">
                Ver productos
              </Link>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default Cart
