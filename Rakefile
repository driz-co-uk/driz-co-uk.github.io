require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"

# for heroku
namespace :assets do
  task :precompile do
    puts `bundle exec jekyll build`
  end
end

GITHUB_REPONAME = "driz-co-uk/driz-co-uk.github.io"

desc "Generate blog files"
task :generate do
  # Jekyll::Site.new(Jekyll.configuration({
  #   "source"      => ".",
  #   "destination" => "_site"
  # })).process
  system "bundle exec jekyll build JEKYLL_ENV=production"
end

desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    #system "git checkout -b source"
    system "git checkout master"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    #system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git remote add origin https://github.com/driz-co-uk/driz-co-uk.github.io.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end