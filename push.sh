#!/bin/sh

setup_git() {
  git config --global user.email "avarugh1@binghamton.edu"
  git config --global user.name "Travis Triggered: Anson"
}

commit_website_files() {
  git checkout -b reports
  git add archives/*.html
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote set-url origin https://${GH_TOKEN}@github.com/avarugh1/testcafereporthandler.git > /dev/null 2>&1
  git push --quiet origin reports
}

setup_git
commit_website_files
upload_files

# git remote add origin-pages https://${GH_TOKEN}@github.com/MVSE-outreach/resources.git > /dev/null 2>&1