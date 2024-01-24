import './index.css'
import { TwitterFollowCard } from './twitter-follow-card/index.jsx'
function App() {
  const format = (username) => `@${username}`

  const usuarios = [
    { userName: "JuanPerez", name: "Juan Pérez", isFollowing: true },
    { userName: "MariaGomez", name: "María Gómez", isFollowing: false },
    { userName: "CarlosRodriguez", name: "Carlos Rodríguez", isFollowing: true }
  ];

  return (
    <>
      <section className="App">
        {/* <TwitterFollowCard
          formatUsername={format}
          username="microlink"
          name="microlink"
        />
        <TwitterFollowCard
          formatUsername={format}
          name="Miguel Angel Developer"
        />
        <TwitterFollowCard
          formatUsername={format}
          username="freeCodeCamp"
          name="freeCodeCamp"
        />
        <TwitterFollowCard
          formatUsername={format}
          username="elonmusk"
          name="elonmusk"
        />
        <TwitterFollowCard
          formatUsername={format}
          username="santiagobrito"
          name="santiagobrito"
        />
        <TwitterFollowCard
          formatUsername={format}
          username="pedrocosta"
          name="pedrocosta"
        /> */}
        {
          usuarios.map((u,index) =>{
            console.log(index)
            const {userName, name, isFollowing} = u
            return(
              <TwitterFollowCard
                key={userName}
                formatUsername={format} username={userName} name={name} initialIsFollowing={isFollowing}
                >
                </TwitterFollowCard>
            )
          })
        }
      </section>
    </>
  )
}

export default App
