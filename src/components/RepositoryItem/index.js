import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    id,
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-card">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <h2 className="name">{name}</h2>
      <div>
        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="details-text">{starsCount} stars</p>
        </div>
        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="details-text">{forksCount} forks</p>
        </div>
        <div className="details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="details-text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
