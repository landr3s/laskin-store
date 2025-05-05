import React from 'react'

function Message({ children, variant }) {
  const getVariant = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-400 text-green-900'
      case 'error':
        return 'bg-red-400 text-red-900'
      default:
        return 'bg-blue-400 text-blue-900'
    }
  }
  return (
    <div className={`px-4 py-2 rounded-md ${getVariant()}`}>{children}</div>
  )
}

export default Message
