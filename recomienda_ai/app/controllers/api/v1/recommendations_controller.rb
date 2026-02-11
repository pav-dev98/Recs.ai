module Api
  module V1
    class RecommendationsController < BaseController
      include Authenticable

      def index
        recommendations = RecommendationService.generate_for_user(current_user)
        print("Recommendation.....")
        pp(recommendations)

        if recommendations
          render_success(recommendations)
        else
          render_error("Could not generate recommendations. Please try again later.")
        end
      end

      def generate
        job = RecommendationGenerationJob.create(user: current_user, status: :pending)

        GenerateRecommendationsJob.perform_later(job.id)

        render_success(
          { job_id: job.id, status: job.status },
          meta: { message: "Recommendations are being generated" }
        )
      end

      def show_job
        job = RecommendationGenerationJob.find(params[:id])

        unless job.user_id == current_user.id
          return render_error("Unauthorized", status: :unauthorized)
        end

        render_success({ id: job.id, status: job.status, error_message: job.error_message })
      end

      private
    end
  end
end
