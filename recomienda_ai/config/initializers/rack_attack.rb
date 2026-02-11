class Rack::Attack
  RATE_LIMIT_REQUESTS = ENV.fetch("RATE_LIMIT_REQUESTS", 100).to_i
  RATE_LIMIT_PERIOD = ENV.fetch("RATE_LIMIT_PERIOD", 1).to_i.minutes

  throttle("api/requests", limit: RATE_LIMIT_REQUESTS, period: RATE_LIMIT_PERIOD) do |req|
    if req.path.start_with?("/api/v1/")
      req.ip
    end
  end

  throttle("api/login", limit: 5, period: 1.minute) do |req|
    if req.path == "/api/v1/auth/login" && req.post?
      req.ip
    end
  end

  throttle("api/register", limit: 3, period: 1.minute) do |req|
    if req.path == "/api/v1/auth/register" && req.post?
      req.ip
    end
  end

  throttle("api/recommendations", limit: 10, period: 5.minutes) do |req|
    if req.path.start_with?("/api/v1/recommendations")
      req.ip
    end
  end
end

ActiveSupport::Notifications.subscribe("throttle.rack_attack") do |_name, _start, _finish, _id, payload|
  req = payload[:request]
  Rails.logger.warn("Rate limited: #{req.ip} #{req.path}")
end
