module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def authenticate_request!
    @current_user ||= fetch_user_from_token
    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end

  def fetch_user_from_token
    header = request.headers["Authorization"]
    return nil unless header

    token = header.split(" ").last
    payload = JwtAuth.decode(token)
    return nil unless payload

    User.find_by(id: payload["user_id"])
  end

  def current_user
    @current_user
  end
end
