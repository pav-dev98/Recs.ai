Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/register", to: "auth#register"
      post "/auth/login", to: "auth#login"
      get "/auth/me", to: "auth#me"

      resources :preferences, only: [ :index, :show, :create, :update ]

      get "/recommendations", to: "recommendations#index"
      post "/recommendations/generate", to: "recommendations#generate"
      get "/recommendations/jobs/:id", to: "recommendations#show_job"

      resources :content, only: [ :show ] do
        get "/search", to: "content#search", on: :collection
      end

      resources :favorites, only: [ :index, :create, :destroy ]

      resources :ratings, only: [ :create, :update, :destroy ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
