set :application, 'tenzing-web-2016'
set :repo_url, 'git@git.gotenzing.com:tenzing/tenzing-web-2016.git'

# Branch options
# Prompts for the branch name (defaults to current branch)
#ask :branch, -> { `git rev-parse --abbrev-ref HEAD`.chomp }

# Hardcodes branch to always be master
# This could be overridden in a stage config file
set :branch, :master

set :deploy_to, -> { "/var/www/html/production/#{fetch(:application)}" }

# Use :debug for more verbose output when troubleshooting
set :log_level, :info

# Put all shared files/directories here (e.g. uploads that need to go on the NFS drive)
#set :linked_files, fetch(:linked_files, []).push('.env')
#set :linked_dirs, fetch(:linked_dirs, []).push('uploads')

namespace :deploy do
  desc 'Sync servers'
  task :sync do
    on roles(:web), in: :sequence, wait: 5 do
      execute('syncit')
    end
  end
end

namespace :deploy do
  desc 'Install composer packages'
  task :install_composer_packages
    on roles(:web), in: :sequence, wait: 5 do
      execute "cd '#{release_path}'; composer install --no-dev --prefer-dist --no-interaction --quiet --optimize-autoloader"
    end
  end
end

namespace :deploy do
  desc 'Sync servers'
  task :sync_again do
    on roles(:web), in: :sequence, wait: 5 do
      execute('syncit')
    end
  end
end

# The above update_option_paths task is not run by default
# Note that you need to have WP-CLI installed on your server
# Uncomment the following line to run it on deploys if needed
# after 'deploy:publishing', 'deploy:update_option_paths'

after 'deploy:updated', 'deploy:sync'
after 'deploy:updated', 'deploy:install_composer_packages'
after 'deploy:finished', 'deploy:sync_again'
