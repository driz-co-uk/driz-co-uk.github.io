source 'https://rubygems.org'

ruby '2.6.9'

gem 'jekyll', '3.8.5'
gem 'kramdown', '1.17.0'
gem 'uglifier'

# used when running on Heroku or AWS
gem 'rack-jekyll', '0.5.0'
gem 'rake', '12.3.1'
gem 'puma', '4.3.12'

gem 'font-awesome-sass', '~> 5.8.1'
gem 'jekyll-git_metadata'

group :jekyll_plugins do
   gem 'sprockets', '~> 4.0.0' # locked because of manifest
   gem 'jekyll-assets', git: "https://github.com/envygeeks/jekyll-assets"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]