import PropTypes from 'prop-types'

export default function TasksFilter({ filter, onFilterChange }) {
  const defButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = defButtons.map(({ name, label }) => {
    const isActive = filter === name

    return (
      <li key={name}>
        <button type="button" className={isActive ? 'selected' : ''} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}

TasksFilter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
