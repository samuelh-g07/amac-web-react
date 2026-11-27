import { useState } from 'react'
import VacanteCard from '../components/VacanteCard'
import Filtros from '../components/Filtros'
import { IconoInfo } from '../components/Iconos'
import { vacantes } from '../data/vacantes'

const filtrosIniciales = {
  busqueda: '',
  municipio: '',
  categoria: '',
  horario: '',
  jornadas: [],
  modalidades: [],
}

const coincideHorario = {
  '': () => true,
  manana: (v) => v.horaFin <= 14,
  dia: (v) => v.horaFin <= 17,
  tarde: (v) => v.horaInicio >= 10,
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function Vacantes() {
  const [filtros, setFiltros] = useState(filtrosIniciales)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const busqueda = normalizar(filtros.busqueda.trim())

  const filtradas = vacantes.filter(
    (v) =>
      normalizar(`${v.titulo} ${v.empresa}`).includes(busqueda) &&
      (!filtros.municipio || v.municipio === filtros.municipio) &&
      (!filtros.categoria || v.categoria === filtros.categoria) &&
      coincideHorario[filtros.horario](v) &&
      (filtros.jornadas.length === 0 || filtros.jornadas.includes(v.jornada)) &&
      (filtros.modalidades.length === 0 || filtros.modalidades.includes(v.modalidad)),
  )

  const limpiar = () => setFiltros(filtrosIniciales)

  return (
    <main id="principal" className="pagina pagina--listado contenedor">
      <title>Vacantes disponibles | AMAC</title>

      <header className="cabecera-pagina">
        <p className="sobretitulo">Su experiencia tiene un lugar</p>
        <h1>Encuentre su próximo empleo</h1>
        <p>
          Oportunidades para personas de 60 años y más en Monterrey y su zona
          metropolitana.
        </p>
      </header>

      <form className="tarjeta buscador" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="busqueda">¿Qué trabajo busca?</label>
        <input
          type="search"
          id="busqueda"
          placeholder="Puesto o palabra clave"
          autoComplete="off"
          value={filtros.busqueda}
          onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
        />
        <button className="boton boton--primario" type="submit">Buscar</button>
      </form>

      <p className="nota-ejemplo">
        Datos de ejemplo: las empresas y vacantes de este diseño son ficticias.
      </p>

      <button
        className="boton boton--secundario solo-movil"
        type="button"
        aria-expanded={mostrarFiltros}
        aria-controls="panel-filtros"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        {mostrarFiltros ? 'Ocultar filtros' : 'Filtrar vacantes'}
      </button>

      <aside
        id="panel-filtros"
        className={`panel-lateral ${mostrarFiltros ? 'panel-lateral--abierto' : ''}`}
        aria-labelledby="titulo-filtros"
      >
        <Filtros filtros={filtros} setFiltros={setFiltros} onLimpiar={limpiar} />
        <p className="aviso-info">
          <IconoInfo />
          <span>Elija un empleo que se adapte a sus horarios e intereses.</span>
        </p>
      </aside>

      <section className="resultados" aria-labelledby="titulo-resultados" aria-live="polite">
        <h2 id="titulo-resultados">
          {filtradas.length} {filtradas.length === 1 ? 'vacante encontrada' : 'vacantes encontradas'}
        </h2>

        {filtradas.length === 0 ? (
          <>
            <p>No hay vacantes que coincidan con los filtros seleccionados.</p>
            <button className="boton boton--secundario" type="button" onClick={limpiar}>
              Ver todas las vacantes
            </button>
          </>
        ) : (
          <ul className="lista-vacantes">
            {filtradas.map((v) => (
              <li key={v.id}>
                <VacanteCard vacante={v} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Vacantes
