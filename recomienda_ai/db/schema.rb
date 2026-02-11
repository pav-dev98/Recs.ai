# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_29_213958) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "contents", force: :cascade do |t|
    t.json "authors"
    t.datetime "created_at", null: false
    t.text "description"
    t.json "directors"
    t.json "genres"
    t.string "google_books_id"
    t.string "image_url"
    t.integer "release_year"
    t.string "title"
    t.integer "tmdb_id"
    t.string "type"
    t.datetime "updated_at", null: false
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "content_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["content_id"], name: "index_favorites_on_content_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "preferences", force: :cascade do |t|
    t.json "book_genres"
    t.datetime "created_at", null: false
    t.json "favorite_authors"
    t.json "favorite_directors"
    t.json "movie_genres"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_preferences_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "content_id", null: false
    t.datetime "created_at", null: false
    t.integer "score"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["content_id"], name: "index_ratings_on_content_id"
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "recommendation_generation_jobs", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "error_message"
    t.integer "status"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_recommendation_generation_jobs_on_user_id"
  end

  create_table "recommendations", force: :cascade do |t|
    t.json "content_ids"
    t.datetime "created_at", null: false
    t.datetime "expires_at"
    t.json "preferences_snapshot"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_recommendations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "favorites", "contents"
  add_foreign_key "favorites", "users"
  add_foreign_key "preferences", "users"
  add_foreign_key "ratings", "contents"
  add_foreign_key "ratings", "users"
  add_foreign_key "recommendation_generation_jobs", "users"
  add_foreign_key "recommendations", "users"
end
