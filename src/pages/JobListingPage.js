import React from 'react';
import { Joblisting } from '../features/joblisting/Joblisting';
import Navvar from '../features/navvars/Navvar';
import Footer from '../features/common/Footer';

function JobListingPage() {
  return (
    <div>
      <Navvar />
      <Joblisting />
      <Footer />
    </div>
  );
}

export default JobListingPage;
