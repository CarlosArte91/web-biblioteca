import { useState } from 'react'
import { REGEX_NUMBER } from '../constants/regex'
import { createBook } from '../services/books.service'
import Swal from 'sweetalert2'

export default function CreateBookForm() {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    publisher: '',
    year: '',
    genre: 'Novela',
  })

  const [errors, setErrors] = useState({
    name: { isActive: false, message: '' },
    author: { isActive: false, message: '' },
    publisher: { isActive: false, message: '' },
    year: { isActive: false, message: '' },
    genre: { isActive: false, message: '' },
  })

  const createNewUser = async (newBookValues) => {
    const { data } = await createBook(newBookValues)

    Swal.fire({
      title: 'Nuevo libro',
      text: 'El nuevo libro se agregó correctamente',
      icon: 'success',
    })
    handleClear(null)
  }

  const handleChangeInput = (event) => {
    const { name, value } = event.target
    setNewBook({
      ...newBook,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: { isActive: false, message: '' },
    })
  }

  const handleChangeSelect = (event) => {
    const { name, value } = event.target
    setNewBook({
      ...newBook,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: { isActive: false, message: '' },
    })
  }

  const handleClear = (event) => {
    if (event) event.preventDefault()

    setNewBook({
      name: '',
      author: '',
      publisher: '',
      year: '',
      genre: 'Novela',
    })

    setErrors({
      name: { isActive: false, message: '' },
      author: { isActive: false, message: '' },
      publisher: { isActive: false, message: '' },
      year: { isActive: false, message: '' },
      genre: { isActive: false, message: '' },
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newBook.name) {
      setErrors({ ...errors, name: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (newBook.name.length < 3) {
      setErrors({ ...errors, name: { isActive: true, message: 'El título es demasiado corto' } })
      return
    } else if (!newBook.author) {
      setErrors({ ...errors, author: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (newBook.author.length < 3) {
      setErrors({ ...errors, author: { isActive: true, message: 'El nombre del autor es demasiado corto' } })
      return
    } else if (!newBook.publisher) {
      setErrors({ ...errors, publisher: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (newBook.publisher.length < 3) {
      setErrors({ ...errors, publisher: { isActive: true, message: 'El nombre de la editorial es demasiado corto' } })
      return
    } else if (!newBook.year) {
      setErrors({ ...errors, year: { isActive: true, message: 'Este campo no puede ser vacío' } })
      return
    } else if (!REGEX_NUMBER.test(newBook.year)) {
      setErrors({ ...errors, year: { isActive: true, message: 'El año solo puede ser de tipo número' } })
      return
    }

    const setYear = parseInt(newBook.year)
    const bookToSend = {...newBook, year: setYear}
    createNewUser(bookToSend)
  }

  return (
    <form
      className='text-neutral-700 px-[8%] pt-8 pb-20 mx-[10%] rounded-lg border border-indigo-600 relative flex flex-col gap-5'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-1'>
        <div className='flex gap-5'>
          <label htmlFor="name">Título</label>
          <input
            className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-4 py-1 text-sm w-full'
            id='name'
            name='name'
            value={newBook.name}
            onChange={handleChangeInput}
          />
        </div>
        <span className='text-sm text-red-700'>
          {errors.name.isActive && errors.name.message}
        </span>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex gap-5'>
          <label htmlFor="author">Autor</label>
          <input
            className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-4 py-1 text-sm w-full'
            id='author'
            name='author'
            value={newBook.author}
            onChange={handleChangeInput}
          />
        </div>
        <span className='text-sm text-red-700'>
          {errors.author.isActive && errors.author.message}
        </span>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex gap-5'>
          <label htmlFor="publisher">Editorial</label>
          <input
            className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-4 py-1 text-sm w-full'
            id='publisher'
            name='publisher'
            value={newBook.publisher}
            onChange={handleChangeInput}
          />
        </div>
        <span className='text-sm text-red-700'>
          {errors.publisher.isActive && errors.publisher.message}
        </span>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex gap-5'>
          <label htmlFor="year">Año</label>
          <input
            className='border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-4 py-1 text-sm w-full'
            id='year'
            name='year'
            value={newBook.year}
            onChange={handleChangeInput}
          />
        </div>
        <span className='text-sm text-red-700'>
          {errors.year.isActive && errors.year.message}
        </span>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex gap-5'>
          <label htmlFor="genre">Género</label>
          <select
            className="border border-indigo-300 focus:outline-none focus:border-indigo-800 rounded-md pl-4 py-1.5 text-sm w-full"
            name="genre"
            id="genre"
            value={newBook.genre}
            onChange={handleChangeSelect}
          >
            <option value="Ciencia ficción">ciencia ficción</option>
            <option value="Cuento">cuento</option>
            <option value="Ensayo">ensayo</option>
            <option value="Fantasía">fantasía</option>
            <option value="Poesía">poesía</option>
            <option value="Novela">novela</option>
            <option value="Teatro">teatro</option>
          </select>
        </div>
        <span className='text-sm text-red-700'>
          {errors.genre.isActive && errors.genre.message}
        </span>
      </div>

      <div className='absolute right-3 bottom-3 flex flex-row gap-4'>
        <input
          className='bg-indigo-500 hover:bg-indigo-800 hover:cursor-pointer text-white text-sm py-2 px-3 rounded-md'
          type="submit"
          value="Crear libro"
        />

        <button
          className='bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white text-sm py-2 px-3 rounded-md'
          onClick={handleClear}
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
