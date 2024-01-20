import React from 'react';
import { Contact } from '../features/contact/Contact';
import Navvar from '../features/navvars/Navvar';
import Footer from '../features/common/Footer';

function ContactPage() {
  return (
    <div>
      <Navvar />
      <Contact />
      <Footer />
    </div>
  );
}

export default ContactPage;
