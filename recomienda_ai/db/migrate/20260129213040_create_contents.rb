class CreateContents < ActiveRecord::Migration[8.1]
  def change
    create_table :contents do |t|
      t.string :type
      t.string :title
      t.text :description
      t.integer :release_year
      t.json :genres
      t.json :directors
      t.json :authors
      t.string :image_url
      t.integer :tmdb_id
      t.string :google_books_id

      t.timestamps
    end
  end
end
