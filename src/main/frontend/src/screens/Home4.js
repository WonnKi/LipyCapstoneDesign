import React, {useState} from "react";

const Home4 = () => {
    return <div>

        <header>
            <h1 className="site-heading text-center text-faded d-none d-lg-block">
                <span className="site-heading-upper text-primary mb-3"></span>
                <span className="site-heading-lower">LIPY</span>
            </h1>
        </header>
        <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
            <div className="container">
                <a className="navbar-brand text-uppercase fw-bold d-lg-none" href="index.html">Start Bootstrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="index.html">Home</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="about.html">BookCase</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="products.html">Socialing</a></li>
                        {/*<li className="nav-item px-lg-4"><a className="nav-link text-uppercase"*/}
                        {/*                                    href="store.html">Store</a></li>*/}
                    </ul>
                </div>
            </div>
        </nav>

        <section className="page-section cta">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper">Our Promise</span>
                                <span className="section-heading-lower">To You</span>
                            </h2>
                            <p className="mb-0">When you walk into our shop to start your day, we are dedicated to
                                providing you with friendly service, a welcoming atmosphere, and above all else,
                                excellent products made with the highest quality ingredients. If you are not satisfied,
                                please let us know and we will do whatever we can to make things right!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>





    </div>
};

export default Home4;