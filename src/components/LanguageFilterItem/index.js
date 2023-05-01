import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, updateActiveTabId} = props
  const {id, language} = languageDetails
  const activeTabClassName = isActive ? 'active-tab' : ''

  const onClickTab = () => {
    updateActiveTabId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={`tab ${activeTabClassName}`}
        onClick={onClickTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
