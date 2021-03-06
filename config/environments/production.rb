Arenguidee::Application.configure do
  config.cache_classes = true
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  config.serve_static_assets = false
  config.assets.compress = true
  config.assets.compile = true
  config.assets.digest = true
  # Ignores any filename that begins with "_" (e.g. sass partials).
  # all other css/js/sass/image files are processed
  config.assets.precompile.push proc {|p| !File.basename(p).starts_with?("_") }
  config.assets.precompile += %w(.svg .eot .woff .ttf)

  # Let Nginx respond with static files:
  config.action_dispatch.x_sendfile_header = "X-Accel-Redirect"

  system = ":rails_root/public/system"
  Paperclip::Attachment.default_options[:path] =
    "#{system}/:class/:attachment/:id_partition/:style/:filename"
  Paperclip::Attachment.default_options[:url] =
    "/:class/:id_partition/:attachment/:style/:filename"

  config.force_ssl = true

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify

  config.action_mailer.delivery_method = :file
  config.action_mailer.default_url_options = {
    :protocol => "https", :host => "arenguidee.ee"
  }
end
