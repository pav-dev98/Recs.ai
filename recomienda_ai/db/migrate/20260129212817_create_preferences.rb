class CreatePreferences < ActiveRecord::Migration[8.1]
  def change
    create_table :preferences do |t|
      t.references :user, null: false, foreign_key: true
      t.json :movie_genres
      t.json :book_genres
      t.json :favorite_authors
      t.json :favorite_directors

      t.timestamps
    end
  end
end
