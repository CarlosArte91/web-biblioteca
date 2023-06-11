import { useEffect, useState } from "react"
import { deleteBorrowed } from "../services/books.service"
import Loading from "./Loading"
import Swal from "sweetalert2"
import { getUsers, updateUser } from "../services/users.service"

export default function UsersList() {
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    const { data } = await getUsers()
    setUsers(data)
    setIsLoading(false)
  }

  const handleUpdate = async (id, permit) => {
    const info = { id, permit }
    const { data } = await updateUser(info)
    getData()

    Swal.fire({
      title: 'Lista de usuarios',
      text: `${data.message}`,
      icon: 'success',
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="min-w-full bg-white text-sm rounded-md">
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-gray-400 py-2 px-4 text-center">Identificación</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Apellido</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Nombre</th>
              <th className="border border-gray-400 py-2 px-4 text-center">Llevar libros a casa</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-400 pl-3 py-3">
                  {item.identification}
                </td>

                <td className="border border-gray-400 pl-3">
                  {item.name}
                </td>

                <td className="border border-gray-400 pl-3">
                  {item.lastname}
                </td>

                <td className="border border-gray-400 text-center">
                  <button
                    className={`text-white font-bold py-1 px-4 rounded-md ${item.loan_home ? 'bg-green-700 hover:bg-green-500' : 'bg-red-700 hover:bg-red-500'}`}
                    onClick={() => handleUpdate(item.id, !item.loan_home)}
                  >
                    {item.loan_home ? 'Habilitado' : 'Deshabilitado'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
