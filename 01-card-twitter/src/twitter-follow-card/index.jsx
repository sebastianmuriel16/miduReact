import { useState } from 'react'
import PropTypes from 'prop-types';
import './styles.css'
const TwitterFollowCard = ({
  formatUsername,
  username = 'unknown',
  name,
  initialIsFollowing,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  console.log(isFollowing)
  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClasName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'
  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          src={`https://unavatar.io/${username}`}
          alt="avatar microlink"
        />
        <div className="tw-followCard-info">
          <strong className="tw-followCard-name">{name}</strong>
          <span className="tw-followCard-username">
            {formatUsername(username)}
          </span>
        </div>
      </header>
      <aside>
        <button className={buttonClasName} onClick={handleClick}>
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}

TwitterFollowCard.propTypes = {
  formatUsername: PropTypes.func,
  username: PropTypes.string,
  name: PropTypes.string,
  initialIsFollowing: PropTypes.bool,
}

export { TwitterFollowCard }
