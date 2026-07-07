import { useState, useEffect } from 'react'
import { getAliados, createAliado, deleteAliado } from '../services/pocketbase'
import './AliadoForm.css'

function AliadoForm() {
  const [aliados, setAliados] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    descripcion: '',
    lineatrabajo: ''
  })

  const lineasTrabajo = [
    'Tecnología',
    'Consultoría',
    'Marketing',
    'Finanzas',
    'Recursos Humanos',
    'Legal',
    'Educación',
    'Salud',
    'Otros'
  ]

  useEffect(() => {
    cargarAliados()
  }, [])

  const cargarAliados = async () => {
    setLoading(true)
    const data = await getAliados()
    setAliados(data)
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.telefono || !formData.email || 
        !formData.descripcion || !formData.lineatrabajo) {
      alert('Por favor, completa todos los campos')
      return
    }

    try {
      await createAliado(formData)
      await cargarAliados()
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        descripcion: '',
        lineatrabajo: ''
      })
      alert('✅ Aliado agregado correctamente')
    } catch (error) {
      alert('❌ Error al agregar aliado: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este aliado?')) return
    
    try {
      await deleteAliado(id)
      await cargarAliados()
      alert('✅ Aliado eliminado correctamente')
    } catch (error) {
      alert('❌ Error al eliminar aliado: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="aliado-container">
        <h1 className="titulo-principal">🤝 Aliados Estratégicos</h1>
        <div className="loading-container">
          <p>Cargando aliados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aliado-container">
      <h1 className="titulo-principal">🤝 Aliados Estratégicos</h1>
      
      <div className="formulario-card">
        <h2>Agregar Nuevo Aliado</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-grid">
            <div className="campo">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 1234-5678"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: juan@empresa.com"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="lineatrabajo">Línea de Trabajo *</label>
              <select
                id="lineatrabajo"
                name="lineatrabajo"
                value={formData.lineatrabajo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                {lineasTrabajo.map((linea) => (
                  <option key={linea} value={linea}>
                    {linea}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo campo-completo">
              <label htmlFor="descripcion">Descripción *</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe el perfil del aliado..."
                rows="3"
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn-agregar">
            ➕ Agregar Aliado
          </button>
        </form>
      </div>

      <div className="tabla-container">
        <h2>Lista de Aliados ({aliados.length})</h2>
        
        {aliados.length === 0 ? (
          <div className="mensaje-vacio">
            <p>📋 No hay aliados registrados aún</p>
            <p className="sub-mensaje">Agrega tu primer aliado estratégico</p>
          </div>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-aliados">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Línea de Trabajo</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {aliados.map((aliado) => (
                  <tr key={aliado.id}>
                    <td><strong>{aliado.nombre}</strong></td>
                    <td>{aliado.telefono}</td>
                    <td>{aliado.email}</td>
                    <td>
                      <span className="badge-linea">{aliado.lineatrabajo}</span>
                    </td>
                    <td className="descripcion-celda">{aliado.descripcion}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(aliado.id)}
                        className="btn-eliminar"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AliadoForm