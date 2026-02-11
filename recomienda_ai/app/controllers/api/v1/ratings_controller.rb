module Api
  module V1
    class RatingsController < BaseController
      include Authenticable

      def create
        content = Content.find(params[:content_id])
        rating = current_user.ratings.find_or_initialize_by(content: content)
        rating.score = params[:score]

        if rating.save
          render_success(RatingSerializer.new(rating).serializable_hash[:data])
        else
          render_error(rating.errors.full_messages.join(", "))
        end
      end

      def update
        rating = current_user.ratings.find_by(id: params[:id])
        return render_error("Rating not found", status: :not_found) unless rating

        if rating.update(score: params[:score])
          render_success(RatingSerializer.new(rating).serializable_hash[:data])
        else
          render_error(rating.errors.full_messages.join(", "))
        end
      end

      def destroy
        rating = current_user.ratings.find_by(id: params[:id])
        return render_error("Rating not found", status: :not_found) unless rating

        rating.destroy
        head :no_content
      end
    end
  end
end
