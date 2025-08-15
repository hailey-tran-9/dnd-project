
# dnd-project

This is a tool I made to learn how to use React and make API requests! It's still a work in progress, but my end goal is for it to allow users to play the TTRPG Dungeon & Dragons online! :dragon_face:

Currently, you can make characters, games, and maps.

\* *Loading indicators and fallbacks are a WIP* \*

## Authentication

I'm using Firebase's Authentication SDK to create and verify user accounts. Click the **Sign In** button, then the **Create Account** button in the bottom-left corner to get started!

![Create Account Button](/public/images/createAccount.jpg)

You'll be sent a **verification email** after creating an account, so make sure you access that confirmation link or else you won't be able to sign in.

## Home Page

![Home Page](/public/images/homePage.png)

This is the Home Page! It has a little introductory blurb. In the future, there'll be content similar to this README that explains what the web app has to offer, so users know what they're signing up for.

## Characters Page

This is the Characters Page, where you can create and keep track of your characters!

### Character Creation

When you begin creating a character, the backend will fetch the relevant class and race information and display it.

![Character Creation Features](/public/images/charCreation1.png)
Features special to your character's class and race will be listed, and you can click on each tab to expand it for more information.

<br>

![Character Point-Buy System](/public/images/charCreation2.png)
To set up your character's ability scores, you can use the Point-Buy System. Colored skill boxes indicate that your character is proficient in that ability's saving throw.
<br><br>
In the future, manual skill point assignment will be available.

<br>

![Character Creation Spells](/public/images/charCreation3.png)
If your character is able to cast spells, this Spells section will appear. From it, you can learn a certain number of spells for each spell slot level based on your character's level. The spells that are shown are the ones available to your character's class.

### Characters

After you create a character, their name will appear under the red selection bar. You can click on it to view your character's information.

![Characters](/public/images/character.png)
Information like your character's stats, ability scores, features, spells, inventory, and notes will be available here.

## Games Page

This is the Games Page, where you can create and keep track of your games! Right now users can only enter a game name during game creation, but in the future they'll also be able to add any maps they want to use.