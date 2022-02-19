import React from 'react'
import styles from './Musicartist.module.css'
import { useEffect, useState } from 'react'
import BasicPagination from './paggination'
import { useContext } from 'react'
import { Pagecontext } from './context/Pagecontext'
const Musicartistdisplay = () => {
  const { page } = useContext(Pagecontext)
  const [details, setDetails] = useState([])
  useEffect(() => {
    getData()
  }, [page])
  const getData = () => {
    fetch(`http://localhost:2345/artist?page=${page}&size=6`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data.data)
        console.log(data.data)
      })
      .catch((err) => {})
  }
  const navigatePage = () => {
    // navigate(`/albums/${product._id}`)
  }

  return (
    <>
      <div className={styles.bigdiv}>
        {details.map((el) => {
          return (
            <div onClick={navigatePage}>
              <img
                src={el.album_id.imagealbum}
                alt=""
                className={styles.small}
              />
              <div>
                <p>{`Albumname:- ${el.album_id.albumname}`}</p>
                <p>{`releasedyear:- ${el.album_id.releasedyear}`}</p>
                <p>{`numberofsongs:- ${el.album_id.numberofsongs.length}`}</p>
              </div>
            </div>
          )
        })}
      </div>
      <BasicPagination />
    </>
  )
}

export default Musicartistdisplay
