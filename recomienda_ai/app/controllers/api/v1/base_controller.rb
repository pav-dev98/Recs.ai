module Api
  module V1
    class BaseController < ApplicationController
      def render_success(data, meta: {})
        render json: { data: data, meta: meta }
      end

      def render_error(message, status: :unprocessable_entity)
        render json: { error: message }, status: status
      end
    end
  end
end
