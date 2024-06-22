import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API_URL } from "../../constants/env"
import LoginTemplate from "../templates/LoginTemplate"
import React from "react"

const Register = () => {
  const nav = useNavigate()

  const [error, setError] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      details: {
        fullname: e.target.fullname.value,
      },
    }

    axios
      .post(`${API_URL}/public/users`, data)
      .then(() => {
        nav("/login")
      })
      .catch((err) => {
        setError(err.response ? err.response.data : "Server error")
        console.error(err)
      })
  }

  return (
    <LoginTemplate title="Regístrate">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre completo"
            name="fullname"
            required
            autoComplete="name"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            required
            autoComplete="new-password"
          />
        </div>
        <div className="text-center pt-1 mb-12 pb-1">
          <button className="bg-gradient w-full" type="submit">
            Crear cuenta
          </button>
          <Link className="text-gray-500" to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
        {error && (
          <p className="text-center p-2 bg-red-100 text-red-800">
            {error.errors ? error.errors[0].message : "Error de registro"}
          </p>
        )}
      </form>
    </LoginTemplate>
  )
}

export default Register
