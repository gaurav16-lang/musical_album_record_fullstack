import { createContext } from 'react'
import React from 'react'

export const Pagecontext = createContext()

export const PagecontextProvider = ({ children }) => {
  const [page, setPage] = React.useState(1)

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <Pagecontext.Provider value={{ page, handleChange }}>
      {children}
    </Pagecontext.Provider>
  )
}
