import { screen, waitFor } from '@testing-library/react'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windowns'],
    precoAntigo: 199.5,
    preco: 150.99,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windowns'],
    precoAntigo: 199.5,
    preco: 150.99,
    titulo: 'Fallguys'
  },
  {
    id: 3,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windowns'],
    precoAntigo: 199.5,
    preco: 150.99,
    titulo: 'Batman'
  },
  {
    id: 4,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windowns'],
    precoAntigo: 199.5,
    preco: 150.99,
    titulo: 'Uncharted'
  }
]

const server = setupServer(
  rest.get('http://localhost:4000/produtos', (req, res, contexto) => {
    return res(contexto.json(mocks))
  })
)

describe('Testes para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com os produtos', async () => {
    renderizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Fallguys')).toBeInTheDocument()
    })
  })
})
