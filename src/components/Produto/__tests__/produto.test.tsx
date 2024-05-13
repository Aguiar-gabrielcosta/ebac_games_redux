import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 1,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windowns'],
  precoAntigo: 199.5,
  preco: 150.99,
  titulo: 'Elden Ring'
}

describe('Testes para o componente Produto', () => {
  test('Deve renderizar o componente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    fireEvent.click(screen.getByTestId('btn-adicionar'))
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
