
import { useNavigate } from "react-router-dom"
const Home = () => {

  const navigate = useNavigate()
  return (
    <div>
      <h1>Unlock your potential with ra'edat</h1>
       <br />
      <h1>Say Hello to ra’edat</h1>
      <br />
      <br />
      <br />
      <br />
      <p>
       ra'edat is an innovative initiative dedicated to fostering collaborations among members and organisations, empowering them to achieve shared goals and build meaningful partnerships within the creative economy, more specifically, the orange economy.
      </p>

        <button
            onClick={() => navigate("/about")}>
            Read More
          </button>

        <img
              className="app-img"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="app img"
            />

         <img
              className="store-img"
              src="src/assets/store.png"
              alt="store img"
            />

          <img
              className="google-img"
              src="src/assets/google.png"
              alt="google img"
            />



       <img
              className="home-img"
              src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
              alt="home img"
            />


              <img
              className="home-log1"
              src="https://www.raedat.online/MediaManager/Media/assest/icon-primaryColor.svg"
              alt="home log1"
            />

              <img
              className="home-log2"
              src="https://www.raedat.online/MediaManager/Media/assest/secondaryiconColor.svg"
              alt="home log1"
            />
           <h2>A Creative Community</h2>
           <br />
               <button
            onClick={() => navigate("/community")}>
            Read More
          </button>


              <img
              className="community-img"
              src="https://www.raedat.online/MediaManager/Media/home/lower_homescreen_banner_new.png"
              alt="community-img"
            />


       <h2>Member Benefits</h2>

         
            <h2>Job and Business Opportunites</h2>

    </div>
  )
}

export default Home
