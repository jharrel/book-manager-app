Rails.application.routes.draw do
  root to: redirect('/books')

  get 'books', to: 'site#index'
  get 'books/new', to: 'site#index'
  get 'books/:id', to: 'site#index'
  get 'books/:id/edit', to: 'site#index'

  namespace :api do
    resources :books, only: %i[index show create destroy update]
  end
end