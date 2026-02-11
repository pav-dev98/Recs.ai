module Api
  module V1
    class ContentController < BaseController
      include Authenticable

      def show
        content = Content.find(params[:id])
        serializer = content.type == "Movie" ? MovieSerializer : BookSerializer
        render_success(serializer.new(content).serializable_hash[:data])
      end

      def search
        query = params[:q]
        return render_error("Search query is required") if query.blank?

        content = Content.where("title ILIKE ?", "%#{query}%")
                       .limit(20)

        results = content.map do |c|
          serializer = c.type == "Movie" ? MovieSerializer : BookSerializer
          serializer.new(c).serializable_hash[:data]
        end

        render_success(results)
      end
    end
  end
end
