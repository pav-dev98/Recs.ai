class JwtAuth
  SECRET_KEY = ENV.fetch("JWT_SECRET_KEY", Rails.application.credentials.dig(:jwt, :secret_key) || "secret_key_change_in_production")

  def self.encode(payload, exp: 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, true, algorithm: "HS256")
    decoded[0]
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
