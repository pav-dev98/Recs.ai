class CreateRecommendationGenerationJobs < ActiveRecord::Migration[8.1]
  def change
    create_table :recommendation_generation_jobs do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :status
      t.text :error_message

      t.timestamps
    end
  end
end
