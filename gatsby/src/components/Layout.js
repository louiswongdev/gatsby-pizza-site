import React from 'react';

import 'normalize.css';

import Footer from './Footer';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
