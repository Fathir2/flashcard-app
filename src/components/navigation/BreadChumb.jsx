import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="container mx-auto px-4 py-3">
      <div className="flex items-center text-sm">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <div key={name} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-blue-600 capitalize">{name}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-600 hover:text-blue-600 capitalize"
                >
                  {name}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default Breadcrumb