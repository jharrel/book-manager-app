class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :book_type
      t.date :release_date
      t.text :title
      t.string :author
      t.string :publisher
      t.boolean :read
      t.string :book_image

      t.timestamps
    end
  end
end
