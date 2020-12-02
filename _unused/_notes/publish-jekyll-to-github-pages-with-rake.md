---
layout: note
title: Publish Jekyll to GitHub Pages with Rake
date: 1993-01-01
excerpt: >
  In the modern world of responsive web design we have devices ranging from watches to televisions, and as more devices with varying screen sizes appear on the market, specifying a font size for each 'breakpoint' isn't a feasible approach going forward... introducing Fluid Typography!
---

The first question is why.

Doesn't GitHub Pages already support Jekyll automatically? Yes!

Why would you want to publish your Jekyll site using Rake?

However it's far more powerful to run your outputted final code from GitHub rather than have them build it for you.

This also works for Heroku and S3/CloudFront.

- Full control to manage your releases, tags, and builds from a central script.
- If you're like me, you might use custom Gems or Gems that are not normally allowed on to run GitHub Pages for security reasons, but because you are creating the build output yourself, this is no longer an issue.

### Disclaimers.

There's plenty of other ways you could achieve this... but Rake is pure Ruby and the easiest IMO.

This is just how I've implemented this... feel free to implement how you see fit.

### The code.

Because GitHub Pages works by using your actual repository code as the site, the trick is to use a dedicated repository or branch as your source and another one for your build output.

I opted to use the `master` branch for the source... and then create a `production_build` branch for the actual build output that will be displayed on my GitHub Pages site.

First of all you will need to require the following in your `Rakefile`.

```ruby
require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
```

The first task is to create the build for production:

```ruby
desc "Build"
task :build do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end
```

This will then create a production build output of your Jekyll site under `_site`.

Next you'll want to define some constants for your GitHub repository and branch name:

```ruby
GITHUB_REPOSITORY = "driz-co-uk/driz-co-uk.github.io"
GITHUB_BRANCH = "production_build"
```

Next we'll create a task that does the following:

- Copy the contents of your `_site` build to temp directory.
- Checkout or create your production build branch to store your build output.
- Commit and push the changes up to your GitHub repository.
- Done! GitHub will automatically use your updated code.

```ruby
desc "Publish to GitHub Pages"
task :publish do
  Dir.mktmpdir do |tmp|
    # copy your _site to your temp directory
    cp_r "_site/.", tmp
    # change directory to our temp directory
    Dir.chdir tmp
    # init git inside our new directory
    system "git init"
    # checkout or create the branch if this is the first deployment
    system "git checkout #{GITHUB_BRANCH} || git checkout -b #{GITHUB_BRANCH}"
    # add all files
    system "git add ."
    # commit
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    # add the remote repository
    system "git remote add origin https://github.com/#{GITHUB_REPOSITORY}.git"
    # push your changes using --force to make sure your changes take precedence
    system "git push origin #{GITHUB_BRANCH} --force"
  end
end
```

Finally create a task that calls both the build and publish:

```ruby
desc "Build and Publish to GitHub Pages"
task :build_and_publish => [:build, :publish] do
  puts 'Build and Publish to GitHub Pages'
end
```

And then you can run your Rake tasks from anywhere (even your CI/CD pipeline) with:

`bundle exec rake build_and_publish`

And that's your site published to GitHub Pages with Rake.