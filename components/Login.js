import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export const Login = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData, {}) => {
      const variables = {
        loginInput: formData,
      }
      console.log(variables)
      const raw2 = JSON.stringify({
        name: formData.username,
        password: formData.password,
        tenant: formData.tenant,
        locale: 'en-US',
      })

      const raw = `{\r\n  "name": "${formData.username}",\r\n  "password": "${formData.password}",\r\n  "tenant": "${formData.tenant}",\r\n  "locale":"en-US"\r\n}`
      console.log(raw)
      console.log(raw2)

      const requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        credentials: 'include',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
      try {
        const response = await fetch(
          'https://soporte.clandbus.com/mejorcompra/entity/auth/login/',
          requestOptions
        )
        console.log(response)
        // return response.json()
      } catch (error) {
        return error
      }
    },
  })

  const handleLogout = async () => {
    const myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      // mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
    try {
      const response = await fetch(
        'https://soporte.clandbus.com/mejorcompra/entity/auth/logout',
        requestOptions
      )
      console.log(response)
      // return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="tw-p-2 tw-w-full tw-my-1 tw-rounded-lg tw-bg-gray-100"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
        />
        <input
          className="tw-p-2 tw-w-full tw-my-1 tw-rounded-lg tw-bg-gray-100"
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
        />
        <input
          className="tw-p-2 tw-w-full tw-my-1 tw-rounded-lg tw-bg-gray-100"
          name="tenant"
          type="text"
          placeholder="Tenant"
          onChange={formik.handleChange}
        />
        <button
          className="tw-p-2 tw-rounded-lg tw-bg-green-500 tw-text-gray-100 disabled:tw-opacity-50 tw-w-full"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Entrar
        </button>
      </form>
      <button
        className="tw-p-2 tw-rounded-lg tw-bg-green-500 tw-text-gray-100 disabled:tw-opacity-50 tw-w-full tw-my-2"
        type="submit"
        onClick={handleLogout}
      >
        Salir
      </button>
    </div>
  )
}

function initialValues() {
  return {
    username: '',
    password: '',
    tenant: '',
  }
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    tenant: Yup.string().required(true),
  }
}
