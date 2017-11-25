# nezumi

`nezumi` is a Chrome Extention that test code generator for RSpec/Capybara.

# Install

https://chrome.google.com/webstore/detail/nezumi/jphlnepdpbnjmjlnbbcfmcnngnaagpmc

# Usage

![image](https://raw.githubusercontent.com/wiki/mugi-uno/nezumi/images/motion.gif)

# Requirements on your rails application
- Ruby 2.4.1 or higher

# The list of gem files to use nezumi
```
  gem 'rails', '~> 5.1.4'
  gem 'capybara'
  gem 'poltergeist'
  gem 'rspec-rails'
```

# Supported Actions

- form edit
  - text
  - textarea
  - radio button
  - checkbox
  - select
- click
  - link(anchor)
  - button
  - and any element
- assertion
  - have_content (on text selection)

# Licence

MIT
