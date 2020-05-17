import React from 'react'
import Loadable from 'react-loadable'

class Loading extends React.Component {
  render() {
    return (
      <div>Component is loading...</div>
    )
  }
}

export default (loader, loading = Loading) => {
  return Loadable(
    {
      loader,
      loading
    }
  )
}