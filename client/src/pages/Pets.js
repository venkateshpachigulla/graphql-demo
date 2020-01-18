import React, { useState } from 'react'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`

export default function Pets() {

  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)

  const onSubmit = input => {
    setModal(false)
  }

  if(loading) {
    return <Loader />
  }

  if(error) {
    return <p>Error!</p>
  }

  if(modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>
          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>New Pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <PetsList pets={data.pets}/>
        </div>
      </section>
    </div>
  )
}
