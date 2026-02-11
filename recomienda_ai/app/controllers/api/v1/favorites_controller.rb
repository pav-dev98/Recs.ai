module Api
  module V1
    class FavoritesController < BaseController
      include Authenticable

      def index
        favorites = current_user.favorites.includes(:content)

        results = favorites.map do |favorite|
          serializer = favorite.content.type == "Movie" ? MovieSerializer : BookSerializer
          FavoriteSerializer.new(favorite).serializable_hash[:data]
        end

        render_success(results)
      end

      def create
        content = Content.find(params[:content_id])
        favorite = current_user.favorites.find_or_initialize_by(content: content)

        if favorite.save
          render_success(FavoriteSerializer.new(favorite).serializable_hash[:data])
        else
          render_error(favorite.errors.full_messages.join(", "))
        end
      end

      def destroy
        favorite = current_user.favorites.find_by(id: params[:id])
        return render_error("Favorite not found", status: :not_found) unless favorite

        favorite.destroy
        head :no_content
      end
    end
  end
end
