import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
    repositoryList: [],
  }

  componentDidMount() {
    this.getRepository()
  }

  updateToCamelCase = popularRepos =>
    popularRepos.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))

  getRepository = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeTabId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)

    if (response.ok) {
      const fetchedData = await response.json()
      const popularRepos = fetchedData.popular_repos
      const updatedPopularRepos = this.updateToCamelCase(popularRepos)
      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoryList: updatedPopularRepos,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepository)
  }

  renderTabsField = () => {
    const {activeTabId} = this.state

    return (
      <ul className="tabs-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            isActive={eachLanguage.id === activeTabId}
            updateActiveTabId={this.updateActiveTabId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {repositoryList} = this.state
    return (
      <ul className="success-view-container">
        {repositoryList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryField = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-bg-container">
        <div className="responsive-container">
          <h1 className="github-title">Popular</h1>
          {this.renderTabsField()}
          {this.renderRepositoryField()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
