import * as React from 'react'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { Pagecontext } from './context/Pagecontext'

import { useEffect } from 'react'
export default function BasicPagination() {
  const [paggination, setpaggination] = React.useState(1)

  const { page, handleChange } = React.useContext(Pagecontext)
  //   const [page, setPage] = React.useState(1)

  useEffect(() => {
    getData()
  }, [])
  //   const handleChange = (event, value) => {
  //     setPage(value)
  //   }

  const getData = () => {
    fetch(`http://localhost:2345/artist`)
      .then((response) => response.json())
      .then((data) => {
        setpaggination(data.totalpages)
        console.log(data.totalpages)
      })
      .catch((err) => {})
  }

  return (
    <div
      style={{
        textAlign: 'center',

        marginTop: '15%',
        marginBottom: '10%',
        width: '50%',
        marginLeft: '45%',
      }}
    >
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={paggination} page={page} onChange={handleChange} />
      </Stack>
    </div>
  )
}

// const [paggination, setpaggination] = useState()

// return (
//   <div
//     style={{
//       textAlign: 'center',

//       marginTop: '15%',
//       marginBottom: '10%',
//       width: '50%',
//       marginLeft: '45%',
//     }}
//   >
//     <Pagination
//       count={paggination}
//       color="primary"
//       sx={{ textAlign: 'center' }}
//     />
//   </div>
// )
