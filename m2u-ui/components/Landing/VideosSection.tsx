import React from 'react'
import SparklesText from '../Animation/SparklesText'

function VideosSection() {
  return (
    <section id="learnMore" className="py-20">
      <div className="container mx-auto px-6">
        <div className="my-16">
          <SparklesText text="Our Videos" className="text-4xl font-bold  text-gray-900 sm:text-5xl text-center mb-4" />
          <div className="flex items-center justify-center mb-11 mr-1">
            <div className="border-t-2 border-brand-500 w-[12rem]"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <div className="transition-transform transform hover:scale-105 animate-fade-in-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/h5T2nuaa2cU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="transition-transform transform hover:scale-105 animate-fade-in-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/tSExfiYzKEk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="transition-transform transform hover:scale-110 animate-fade-in-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/IbMc6xdKYBc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="transition-transform transform hover:scale-110 animate-fade-in-up">
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src="https://www.youtube.com/embed/E1HmIEcOysg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideosSection
