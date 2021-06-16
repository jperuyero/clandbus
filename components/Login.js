import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const Login = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),

    onSubmit: async (formData, {}) => {
      const variables = {
        loginInput: formData,
      }
      try {
        console.log(variables)
        const raw = {
          name: formData.username,
          password: formData.password,
          tenant: `{{${formData.tenant}}}`,
          locale: 'en-US',
        }

        const requestOptions = {
          method: 'POST',
          body: raw,
          redirect: 'follow',
        }
        const response = await fetch(
          'https://soporte.clandbus.com/mejorcompra/entity/auth/login',
          requestOptions
        )
        console.log(response.text())

      } catch (error) {
        console.log('error', error)
      }
    },
  })

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