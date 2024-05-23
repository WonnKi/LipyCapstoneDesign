import './App.css';

import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Bookcase from "./screens/Bookcase";
import Community from "./screens/Community";
import Socialing from "./screens/Socialing";
import NevBar from "./components/NevBar";
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


function App() {
  return (
      <BrowserRouter>
        <NevBar/>
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



        </Routes>
      </BrowserRouter>

  );
}

export default App;
