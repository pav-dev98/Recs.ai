module Api
  module V1
    class AuthController < BaseController
      def register
        user = User.new(user_params)

        if user.save
          print "User registered successfully"
          preference = Preference.create(user: user)
          token = JwtAuth.encode({user_id: user.id})

          render_success(
            {
              user: UserSerializer.new(user).serializable_hash[:data],
              token: token
            }
          )
        else
          render_error(user.errors.full_messages.join(", "))
        end
      end

      def login
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          token = JwtAuth.encode({user_id: user.id})

          render_success(
            {
              user: UserSerializer.new(user).serializable_hash[:data],
              token: token
            }
          )
        else
          render_error("Invalid email or password", status: :unauthorized)
        end
      end

      def me
        render_success(UserSerializer.new(current_user).serializable_hash[:data])
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :name)
      end
    end
  end
end
