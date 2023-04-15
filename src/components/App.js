import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button, Table } from 'react-bootstrap'

function App() {
  const [vetements, setVetements] = useState([])
  const [cathegorie, setCathegorie] = useState('')
  const [taille, setTaille] = useState('')
  const [marque, setMarque] = useState('')
  const [couleur, setCouleur] = useState('')

  useEffect(() => {
    axios.get('/api/vetements').then((reponse) => {
      setVetements(reponse.data)
    })
  }, [])

  const handleCathegorieChange = (event) => {
    setCathegorie(event.target.value)
  }

  const handleTailleChange = (event) => {
    setTaille(event.target.value)
  }

  const handleMarqueChange = (event) => {
    setMarque(event.target.value)
  }

  const handleCouleurChange = (event) => {
    setCouleur(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVetements = { cathegorie, taille, marque, couleur }
    axios.post('/api/vetements', newVetements).then(() => {
      axios.get('/api/vetements').then((reponse) => {
        setVetements(reponse.data)
        setCathegorie('')
        setTaille('')
        setMarque('')
        setCouleur('')
      })
    })
  }

  return (
    <Container>
      <h1> Ajouter nouveau vetement</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formCathegorie'>
          <Form.Label>Cathegorie</Form.Label>
            <Form.Control type='text' placeholder='Enter Type' value={cathegorie} onChange={handleCathegorieChange} />
        </Form.Group> 
        <Form.Group controlId='formTaille'>
          <Form.Label>Taille</Form.Label>
          <Form.Control type='text' placeholder='Entrer la taille' value={taille} onChange={handleTailleChange} />
        </Form.Group>
        <Form.Group controlId='formMarque'>
          <Form.Label>Marque</Form.Label>
          <Form.Control type='text' placeholder='Entrer la marque' value={marque} onChange={handleMarqueChange} />
        </Form.Group>
        <Form.Group controlId='formCouleur'>
          <Form.Label>Couleur</Form.Label>
          <Form.Control type='text' placeholder='Entrer la couleur' value={couleur} onChange={handleCouleurChange} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Ajouter des vetements
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
           <tr>
            <th>Cathegorie</th>
            <th>Taille</th>
            <th>Marque</th>
            <th>Couleur</th>
          </tr>
        </thead>
        <tbody>
          {vetements.map((vetement) => {
            <tr key={vetement.id}>
              <td>{vetement.cathegorie}</td>
              <td>{vetement.taille}</td>
              <td>{vetement.marque}</td>
              <td>{vetement.couleur}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </Container>
    
  )
}

export default App