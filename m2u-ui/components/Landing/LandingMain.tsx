import React from 'react'
import ContentSection from './ContentSection'
import WeAreWelcoming from './WeAreWelcoming'
import VideosSection from './VideosSection'
import Footer from '../common/Footer'
import WelcomeSection from './WelcomeSection'
import WhatWeDo from './WhatWeDo'
import OurPartner from './OurPartners'

function LandingMain() {
  return (
    <article className="relative isolate px-6 pt-14 lg:px-8">
      <WelcomeSection />
      {/* <OurPartner /> */}
      <ContentSection />
      <WeAreWelcoming />
      <WhatWeDo />
      <VideosSection />
      <Footer />
    </article>
  )
}

export default LandingMain
