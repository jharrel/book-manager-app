class Api::BooksController < ApplicationController
    respond_to :json
  
    def index
      respond_with Book.order(release_date: :DESC)
    end
  
    def show
      respond_with Book.find(params[:id])
    end
  
    def create
      respond_with :api, Book.create(book_params)
    end
  
    def destroy
      respond_with Book.destroy(params[:id])
    end
  
    def update
      book = Book.find(params['id'])
      book.update(book_params)
      respond_with Book, json: book
    end
  
    private
  
    def book_params
      params.require(:book).permit(
        :id,
        :book_type,
        :release_date,
        :title,
        :author,
        :host,
        :published,
        :read,
        :book_image
      )
    end
  end