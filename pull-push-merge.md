# **Imperitive**

Before we begin anything or do any commits at all with sensitive info, add the file with the sensitive information to your .gitignore file. We'll take this out of gitignore when pushing to Heroku. I'll touch up on this later.

# **gitignore**

Add *all* files with sensitive information to the gitignore file before any pushes are made. Be sure to add node_modules and .gitignore to gitignore as well.

# **On Collaborating through GitHub**

the following will show how we can push, pull, merge, etc together with minimal issues: 

Before you begin, commit your changes. Then go on to the following steps.

So when you're working on your branch, and you want to do a pull request, switch to master branch and do a git pull

* git checkout master
* git pull

this updates your local master so that you can merge your branch with master

* git checkout <your branch>

You want to be on your branch for this next step. For this step, we'll be merging master into your branch. 

* git merge master

If there are issues (which there will be), use the gui with your text editor to resolve changes. What you see will be a bit wonky. Just make sure that important code isn't deleted, and that no duplicate code is created. This is something that is a little difficult to explain without a working example, so I'll come up with something soon. You're just reviewing the changes, since GitHub isn't perfect, some changes will be a false positive since it goes off of commit history to see changes. 

Push to github on your branch.

* git push <branch name>

After this, make a pull request in GitHub on the repo, and someone else will take a look at the changes too.

# **On Pushing to Heroku**

***FROM THIS POINT FORWARD, WE ARE NOT PUSHING TO GITHUB***

Take the files with the necessary sensitive info out of `.gitignore`. 

Log in to Heroku with your credentials in the cli.

* heroku login

Check for existing remotes to make sure you don't create two heroku apps.

* git remote -v

Create the heroku app

* heroku create

Check to see if it was created (slightly redundant)

* git remote -v

Push to heroku

* git push heroku master

Check the domain in heroku to make sure the app was constructed successfully

**AFTER PUSH**

If the application is running as expected, push on through

We need to reset our commit so that we do not accidentally push to GitHub. We will run this in bash:

* git reset head --hard

After you do this, run a git status

* git status

If this was successfull, the files should be red, and git should tell you they are untracked files. Add them back to the gitignore file and run the git status again. The files shouldn't show up at all.

At this point it should be safe to push to GitHub.