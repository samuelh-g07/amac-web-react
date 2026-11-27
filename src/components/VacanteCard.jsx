import { Link } from 'react-router-dom'
import { CATEGORIAS, JORNADAS, MODALIDADES } from '../data/vacantes'

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function VacanteCard({ vacante }) {
  return (
    <article className="tarjeta vacante">
      <h3 className="vacante__titulo">{vacante.titulo}</h3>
      <p className="vacante__empresa">{vacante.empresa}</p>
      <p className="vacante__ubicacion">
        {vacante.colonia} · {vacante.municipio}, N.L.
      </p>
      <p className="vacante__jornada">
        {JORNADAS[vacante.jornada]} · {MODALIDADES[vacante.modalidad]}
      </p>
      <p className="vacante__categoria">
        Categoría: {CATEGORIAS[vacante.categoria]}
      </p>
      <p className="vacante__sueldo">
        ${vacante.sueldo.toLocaleString('es-MX')} MXN al mes
      </p>
      <p className="vacante__horario">{vacante.horario}</p>
      <p className="vacante__fecha">
        Publicada el{' '}
        <time dateTime={vacante.fecha}>{formatearFecha(vacante.fecha)}</time>
      </p>
      <Link
        className="boton boton--secundario vacante__boton"
        to={`/vacante/${vacante.id}`}
      >
        Ver detalle
        <span className="solo-lectores">
          {' '}de {vacante.titulo}, {vacante.empresa}
        </span>
      </Link>
    </article>
  )
}

export default VacanteCard
