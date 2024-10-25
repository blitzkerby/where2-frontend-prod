import React from 'react'

const RelevantLinks = ({links}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mx-5">
    <h3 className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-200">
      Relevant Links
    </h3>
    <div className="space-y-3">
      {links.map(({ link, label }) => 
        link && (
          <a
            key={label}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 truncate hover:bg-gray-50 p-2 rounded-lg"
          >
            {label}
          </a>
        )
      )}
    </div>
  </div>
  )
}

export default RelevantLinks