
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

After you create a character, their name will appear under the selection bar. You can click on it to view your character's information.

![Characters](/public/images/character.png)
Information like your character's stats, ability scores, features, spells, inventory, and notes will be available here.

## Games Page

This is the Games Page, where you can create and keep track of your games!

### Game Creation

Right now users can only enter a game name during game creation, but in the future they'll also be able to add any maps they want to use.

### Games

Once you create a game, they'll be viewable in the selection bar. Clicking on it will show you a list of the players in the game. In the future there'll also be a list of game sessions that show users some metadata, like what date the session was played on and any notes the DM wrote.

#### Edit Mode - Creating Game Invitations

Game owners can invite other users to their games by clicking on the **Edit** Button, then the **Invites** Button. This will open a panel that shows the game's active invites. Clicking on the **+** will create a game invite and automatically copy the invite link to your clipboard.

*Each game can have **up to four** active game invites.*

![Active Game Invites Panel](/public/images/activeInvites.jpg)
Lost the invite link? Navigate back to the **Active Invites Panel** and click on an invite under the **Link** column to copy the invite link to your clipboard again!

When users open that invite link, they'll be asked if they'd like to join the game. It'll then redirect them back to the Games Page, where the game will appear under their **Joined Games**.

## Maps Page

This is the Maps Page, where you can create and keep track of your maps!

### Map Creation

In map creation, users choose an image and name they'd like to use for the map. They're also able to use a slider that'll change the cell size of the grid that will be overlaid on the map, to use in-game.

![Map Creation](/public/images/mapCreation.png)

### Maps

When a map is selected, it'll show a preview of the map's image and any notes the user wrote for it.

![Apps Farm Map](/public/images/map.png)
*Accurate dimension descriptions are a WIP. Right now, the width is correct but the height isn't.*