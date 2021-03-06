ENV["RAILS_ENV"] = "test"
require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "minitest/rails"
require "minitest/pride"
require "minitest/reporters"
require "timecop"

MiniTest::Reporters.use! MiniTest::Reporters::SpecReporter.new
Minitest.backtrace_filter.add_filter %r(/zeus-/)
Minitest.backtrace_filter.add_filter %r(/\.gem/)

require Rails.root.join("db/seeds") if Instance.count == 0
