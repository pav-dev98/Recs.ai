class CreateRecommendations < ActiveRecord::Migration[8.1]
  def change
    create_table :recommendations do |t|
      t.references :user, null: false, foreign_key: true
      t.json :content_ids
      t.json :preferences_snapshot
      t.datetime :expires_at

      t.timestamps
    end
  end
end
