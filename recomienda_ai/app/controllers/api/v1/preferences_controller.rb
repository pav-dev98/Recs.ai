module Api
  module V1
    class PreferencesController < BaseController
      include Authenticable

      def index
        preference = current_user.preference || Preference.create(user: current_user)
        render_success(PreferenceSerializer.new(preference).serializable_hash[:data])
      end

      def show
        preference = current_user.preference || Preference.create(user: current_user)
        render_success(PreferenceSerializer.new(preference).serializable_hash[:data])
      end

      def create
        preference = current_user.build_preference(preference_params)

        if preference.save
          render_success(PreferenceSerializer.new(preference).serializable_hash[:data])
        else
          render_error(preference.errors.full_messages.join(", "))
        end
      end

      def update
        # console.log("Updating preference")
        preference = current_user.preference || current_user.build_preference

        if preference.update(preference_params)
          render_success(PreferenceSerializer.new(preference).serializable_hash[:data])
        else
          render_error(preference.errors.full_messages.join(", "))
        end
      end

      private

      def preference_params
        params.require(:preference).permit(
          :movie_genres,
          :book_genres,
          :favorite_authors,
          :favorite_directors
        ).tap do |whitelisted|
          whitelisted[:movie_genres] = params[:preference][:movie_genres].to_a
          whitelisted[:book_genres] = params[:preference][:book_genres].to_a
          whitelisted[:favorite_authors] = params[:preference][:favorite_authors].to_a
          whitelisted[:favorite_directors] = params[:preference][:favorite_directors].to_a
        end
      end
    end
  end
end
