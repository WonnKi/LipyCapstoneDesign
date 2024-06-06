import './App.css';

import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Bookcase from "./screens/Bookcase";
import Community from "./screens/Community";
import Socialing from "./screens/Socialing";
import NavBar from "./components/NavBar";
import FirstBookCase from "./screens/firstBookCase";
import SecondBookCase from "./screens/secondBookCase";
import ThirdBookCase from "./screens/thirdBookCase";
import Write from "./screens/Write";
import SocialSearch from "./screens/SocialSearch";
import SocialPost from "./screens/SocialPost";
import CreateSocialingPost from "./screens/CreateSocialingPost";
import SocialingDetail from "./screens/SocialingDetail";
import UpdateSocialing from "./screens/UpdateSocialing";
import BookDetail from "./screens/BookDetail";
import SignUp from "./screens/SignUp";
import CreatePost from "./screens/CreatePost";
import Login from "./screens/Login";
import ViewPost from "./screens/ViewPost";
import HotSocialing from "./screens/HotSocialing";
import Home2 from "./screens/Home2";
import SignUp2 from "./screens/SignUp2";
import FavoriteSocialing from "./screens/FavoriteSocialing";
import Home3 from "./screens/Home3";
import MyPage from "./screens/MyPage";
import Socialing2 from "./screens/Socialing2";
import HotSocialing2 from "./screens/HotSocialing2";
import SocialSearch2 from "./screens/SocialSearch2";
import MyPage2 from "./screens/MyPage2";
import SecondBookCase2 from "./screens/secondBookCase2";
import SearchComponent from "./screens/SearchComponent";
function App() {
  return (
      <BrowserRouter>
        {/*<NavBar/>*/}
        <Routes>
            <Route path = "/" element={ <Home /> } />
            <Route path = "/Bookcase" element={ <Bookcase /> } />
            <Route path = "/Community" element={ <Community /> } />
            <Route path = "/Socialing" element={ <Socialing /> } />
            <Route path = "/FirstBookCase" element={ <FirstBookCase /> } />
            <Route path = "/SecondBookCase" element={ <SecondBookCase /> } />
            <Route path = "/ThirdBookCase" element={ <ThirdBookCase /> } />
            <Route path = "/Write" element={ <Write />} />
            <Route path = "/SocialSearch" element={ <SocialSearch /> } />
            <Route path = "/SocialPost" element={ <SocialPost /> } />
            <Route path = "/CreateSocialingPost" element={ <CreateSocialingPost />} />
            <Route path = "/socialing/:id" element={ <SocialingDetail />} />
            <Route path = "/socialing/:id/edit" element={ <UpdateSocialing />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CreatePost" element={<CreatePost />}/>
            <Route path="Login" element={<Login />} />
            <Route path="ViewPost" element={<ViewPost />} />
            <Route path="HotSocialing" element={<HotSocialing />} />
            <Route path="Home2" element={<Home2 />} />
            <Route path="SignUp2" element={<SignUp2 />} />
            <Route path="ViewPost" element={<ViewPost />} />
            <Route path="FavoriteSocialing" element={<FavoriteSocialing />} />
            <Route path="Home3" element={<Home3 />} />
            <Route path="MyPage" element={<MyPage />} />
            <Route path="Socialing2" element={<Socialing2 />} />
            <Route path="HotSocialing2" element={<HotSocialing2 />} />
            <Route path="SocialSearch2" element={<SocialSearch2 />} />
            <Route path="MyPage2" element={<MyPage2 />} />
            <Route path="/SecondBookCase2" element={ <SecondBookCase2 /> } />
            <Route path="/SearchComponent" element={ <SearchComponent />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
