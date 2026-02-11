class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  private

  def not_found
    render json: { error: "Resource not found" }, status: :not_found
  end

  def parameter_missing(exception)
    render json: { error: exception.message }, status: :unprocessable_entity
  end
end
